import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import i18n from '@vue-storefront/i18n'
import { htmlDecode } from '@vue-storefront/core/store/lib/filters'
import rootStore from '@vue-storefront/core/store'
import RootState from '@vue-storefront/core/types/RootState'
import BoardsState from '../types/WishlistState'
import { cacheStorage } from '../'
import { Logger } from '@vue-storefront/core/lib/logger'

import { TaskQueue } from '@vue-storefront/core/lib/sync'
import config from 'config'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'

const actions: ActionTree<BoardsState, RootState> = {
  clear (context) {
    context.commit(types.BOARDS_LOAD_BOARDS, [])
    cacheStorage.removeItem('current-boards');
  },
  async load ({ commit, getters , dispatch }, force: boolean = false) {
    if (!force && getters.isBoardsLoaded) return
    // commit(types.SET_BOARDSLISTS_LOADED)
    // cacheStorage.getItem('current-boards', (err, storedItems) => {
    //   if (err) throw new Error(err)
    //   commit(types.BOARDS_LOAD_BOARDS, storedItems)
    //   Logger.info('current-boards state loaded from browser cache. ', 'cache', storedItems)()
    // })

    /** To sync board from server    */
    if(this.state.user && this.state.user.current === null && !force) return
    commit(types.SET_BOARDSLISTS_LOADED)
    const task = await TaskQueue.execute({ url: config.boards.sync_endpoint, // sync Board with server
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({"cid":this.state.user.current.id, "tid":"boardlist"})
      },
      silent: false
    }).then(async task => {
      console.log('api Result Boards' , task);
      commit(types.SET_BOARDSLISTS_LOADED)
      if (task.resultCode === 200) {
        let copyData = task.result // task.result.filter(val => val.items = []);
        let storedItems = JSON.parse(JSON.stringify(copyData))
        copyData = copyData.filter(val => val.items = []);
        // commit(types.BOARDS_LOAD_BOARDS, copyData)
        if(storedItems.length > 0) {
          storedItems.filter(async (board , index) => {
            console.log('items' ,board.items)

            if(board.items && board.items.length > 0) { 
              console.log('items' ,board.items)
              let clientBoardItems = [];
              board.items.filter(async (boardItem , indexItem) => {
                let query = new SearchQuery()
                query = query.applyFilter({key: 'sku', value: {'eq': boardItem.sku}})
                const { items } = await dispatch('product/list', { query, start: 0, size: 1, updateState: false }, { root: true })
                // clientBoardItems.push({...items[0], wishlistId: boardItem.wishlist_id , "wishlist_item_id": boardItem.wishlist_item_id })
                copyData[index].items.push({...items[0], wishlistId: boardItem.wishlist_id , "wishlist_item_id": boardItem.wishlist_item_id })
                if(copyData[index].items.length === board.items.length) {
                  console.log('clientBoardItems' , clientBoardItems);
                  commit(types.BOARDS_BOARD_PRODUCT_LIST , { products: clientBoardItems, board: {...copyData[index], boardIndex: index} })
                }
              })
            } else {
              commit(types.BOARDS_BOARD_PRODUCT_LIST , { board: {...copyData[index], boardIndex: index} })
            }
          });
        }
        cacheStorage.getItem('current-boards', (err, storedItems) => {
          if (err) throw new Error(err)
          Logger.info('current-boards state loaded from browser cache. ', 'cache', storedItems)()
        })
      } else {
        commit(types.SET_BOARDSLISTS_LOADED , false);
      }
    })
  },
  async addItem ({ commit }, product) {
    console.log('add item boards' , product);
    // commit(types.BOARDS_ADD_ITEM, { product })
    // rootStore.dispatch('notification/spawnNotification', {
    //   type: 'success',
    //   message: i18n.t('Product {productName} has been added to Board list!', { productName: htmlDecode(product.product.name) }),
    //   action1: { label: i18n.t('OK') }
    // })

    /** To add product to board board to server    */
    const task = await TaskQueue.execute({ url: config.boards.add_product_endpoint, // sync Board with server
      payload: {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({"bid":product.board.wboard_id,"witemid":product.product.wishlistItemId,"tid":"addproduct"}) 
      },
      silent: false
    });
    if (task && task.resultCode === 200) {
      console.log('api dataaaa Sucesss' , task.result)
      commit(types.BOARDS_ADD_ITEM, { product })
      return task
    } else {
      rootStore.dispatch('notification/spawnNotification', {
          type: 'success',
          message: i18n.t('Error while adding the Board!', { productName: htmlDecode(product.product.name) }),
          action1: { label: i18n.t('OK') }
      })
      return task
    }
  },
  async removeItem ({ commit }, product) {
    console.log('removeItem -- ' , product)
    // commit(types.BOARDS_DEL_ITEM, { product })
    // rootStore.dispatch('notification/spawnNotification', {
    //   type: 'success',
    //   message: i18n.t('Product {productName} has been removed from wishlit!', { productName: htmlDecode(product.product.name) }),
    //   action1: { label: i18n.t('OK') }
    // })
    
    /** To remove product to board board to server   */
    const task = await TaskQueue.execute({ url: config.boards.remove_product_endpoint, // sync Board with server
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({"bid": product.board.wboard_id,"witemid": product.product.wishlistItemId,"tid":"deleteproduct"}) 
      },
      silent: false
    }).then(async task => {
      console.log('api Result remove_product_endpoint' , task)
      if (task.resultCode === 200) {
        console.log('api dataaaa Sucesss remove_product_endpoint' , task.result)
        commit(types.BOARDS_DEL_ITEM, { product })
      } else {
        console.log('api dataaaa Errrrrr')
      }
    })
  },
  async createBoard ({ commit }, product) {
    // commit(types.BOARDS_CREATE_BOARD, product )
    // rootStore.dispatch('notification/spawnNotification', {
    //   type: 'success',
    //   message: i18n.t('Board {productName} has been added to Boards!', { productName: htmlDecode(product.name) }),
    //   action1: { label: i18n.t('OK') }
    // })

      /** To get the Create board to server    */
      if(this.state.user && this.state.user.current === null) {
        rootStore.dispatch('notification/spawnNotification', {
          type: 'success',
          message: 'Please sign-in for create boards!'
        })
        rootStore.commit('ui/setAuthElem', 'login')
        Vue.prototype.$bus.$emit('modal-show', 'modal-signup')
        return
      }
      const task = await TaskQueue.execute({ url: config.boards.create_endpoint, // sync Board with server
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({"cid":this.state.user.current.id, "boardname": product.name, "tid":"create"})
      },
        silent: false
      });
      if (task && task.resultCode === 200) {
        console.log('api dataaaa Sucesss' , task.result)
        product = {...product, wboard_id: task.result, customer_id: this.state.user.current.id }

        if( product.items.length > 0 ) {
          const taskADD = await TaskQueue.execute({ url: config.boards.add_product_endpoint, // sync Board with server
            payload: {  
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              mode: 'cors',
              body: JSON.stringify({"bid":task.result,"witemid":  product.items[0].wishlistItemId,"tid":"addproduct"}) 
            },
            silent: false
          });
          if (taskADD && taskADD.resultCode === 200) {
            console.log('api dataaaa Sucesss in adding product' , task.result)
            commit(types.BOARDS_CREATE_BOARD, product )
            return taskADD
          } else {
  
          }
        } else {
          commit(types.BOARDS_CREATE_BOARD, product )
          return task
        }

        //commit(types.BOARDS_CREATE_BOARD, product )
        // return task
      } else {
        return task
      }
  },
  async removeBoard ({ commit }, product) {
    // commit(types.BOARDS_DELETE_BOARD,  product )
    // rootStore.dispatch('notification/spawnNotification', {
    //   type: 'success',
    //   message: i18n.t('Board has been removed sucessfully!', { productName: htmlDecode(product.name) }), //{productName}
    //   action1: { label: i18n.t('OK') }
    // })

     /** To get the Remove board to server */
     const task = await TaskQueue.execute({ url: config.boards.delete_endpoint, // sync Board with server
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({"bid":product.wboard_id,"cid":this.state.user.current.id,"tid":"delete"})  // {"bid":3,"tid":"delete"}
      },
      silent: false
    });
    if (task && task.resultCode === 200) {
      console.log('api dataaaa Sucesss' , task.result)
      commit(types.BOARDS_DELETE_BOARD,  product )

      return task
    } else {
      return task
    }
  },
  async getBoardProducts ({ commit, getters, dispatch }, board) {
    if (board.items_count === 0) return

    /** To sync board items from the server    */
    if(this.state.user && this.state.user.current === null ) return
    const clientBoardItems = [];
    const task = await TaskQueue.execute({ url: config.boards.sync_endpoint, // sync Board with server
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({"bid": board.board.wboard_id,"tid":"itemlist"}) // {"bid":3,"tid":"itemlist"}
      },
      silent: false
    }).then(async task => {
      console.log('api Result Boards' , task);

      if (task.resultCode === 200) {

        task.result.filter(async item => {
          let query = new SearchQuery()
          query = query.applyFilter({key: 'id', value: {'eq': item.product_id}})
          const { items } = await dispatch('product/list', { query, start: 0, size: 1, updateState: false }, { root: true })
          clientBoardItems.push({...items[0], wishlistId: item.wishlist_id , "wishlist_item_id": item.wishlist_item_id })
          console.log('clientBoardItems' , clientBoardItems);
          if(clientBoardItems.length === task.result.length) {
            commit(types.BOARDS_BOARD_PRODUCT_LIST , { products: clientBoardItems, board: board })
          }
        });
        
      }
    })
  }
}

export default actions
