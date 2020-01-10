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

const actions: ActionTree<BoardsState, RootState> = {
  clear (context) {
    context.commit(types.BOARDS_LOAD_BOARDS, [])
    cacheStorage.removeItem('current-boards');
  },
  async load ({ commit, getters }, force: boolean = false) {
    if (!force && getters.isBoardsLoaded) return
    commit(types.SET_BOARDSLISTS_LOADED)
    cacheStorage.getItem('current-boards', (err, storedItems) => {
      if (err) throw new Error(err)
      commit(types.BOARDS_LOAD_BOARDS, storedItems)
      Logger.info('current-boards state loaded from browser cache. ', 'cache', storedItems)()
    })

    /** To sync board from server    */
    // if(this.state.user && this.state.user.current === null && !force) return
    // commit(types.SET_BOARDSLISTS_LOADED)
    // const task = await TaskQueue.execute({ url: config.wishlist.sync_endpoint, // sync Board with server
    //   payload: {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    //     mode: 'cors'
    //   },
    //   silent: false
    // }).then(async task => {
    //   console.log('api Result' , task)
    //   if (task.resultCode === 200) {
    //     console.log('api dataaaa Sucesss' , task.result)
    //   } else {
    //     console.log('api dataaaa Errrrrr');
    //     commit(types.SET_BOARDSLISTS_LOADED , false);
    //   }
    // })
  },
  async addItem ({ commit }, product) {
    console.log('add item boards' , product);
    commit(types.BOARDS_ADD_ITEM, { product })
    // rootStore.dispatch('notification/spawnNotification', {
    //   type: 'success',
    //   message: i18n.t('Product {productName} has been added to Board list!', { productName: htmlDecode(product.product.name) }),
    //   action1: { label: i18n.t('OK') }
    // })

    /** To add product to board board to server    */
    // const task = await TaskQueue.execute({ url: config.wishlist.add_product_endpoint, // sync Board with server
    //   payload: {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     mode: 'cors',
    //     body: JSON.stringify({"pid":product.id,"cid":140})
    //   },
    //   silent: false
    // }).then(async task => {
    //   console.log('api Result' , task)
    //   if (task.resultCode === 200) {
    //     console.log('api dataaaa Sucesss' , task.result)
    //   } else {
    //     console.log('api dataaaa Errrrrr')
    //   }
    // })
  },
  async removeItem ({ commit }, product) {
    console.log('removeItem -- ' , product)
    commit(types.BOARDS_DEL_ITEM, { product })
    rootStore.dispatch('notification/spawnNotification', {
      type: 'success',
      message: i18n.t('Product {productName} has been removed from wishlit!', { productName: htmlDecode(product.product.name) }),
      action1: { label: i18n.t('OK') }
    })

    /** To remove product to board board to server   */
    // const task = await TaskQueue.execute({ url: config.wishlist.remove_product_endpoint, // sync Board with server
    //   payload: {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     mode: 'cors',
    //     body: JSON.stringify({"pid":product.id,"cid":140})
    //   },
    //   silent: false
    // }).then(async task => {
    //   console.log('api Result' , task)
    //   if (task.resultCode === 200) {
    //     console.log('api dataaaa Sucesss' , task.result)
    //   } else {
    //     console.log('api dataaaa Errrrrr')
    //   }
    // })
  },
  async createBoard ({ commit }, product) {
    commit(types.BOARDS_CREATE_BOARD, product )
    // rootStore.dispatch('notification/spawnNotification', {
    //   type: 'success',
    //   message: i18n.t('Board {productName} has been added to Boards!', { productName: htmlDecode(product.name) }),
    //   action1: { label: i18n.t('OK') }
    // })

      /** To get the Create board to server    */
    //   const task = await TaskQueue.execute({ url: config.wishlist.create_endpoint, // sync Board with server
    //   payload: {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     mode: 'cors',
    //     body: JSON.stringify({"pid":product.id,"cid":140})
    //   },
    //   silent: false
    // }).then(async task => {
    //   console.log('api Result' , task)
    //   if (task.resultCode === 200) {
    //     console.log('api dataaaa Sucesss' , task.result)
    //   } else {
    //     console.log('api dataaaa Errrrrr')
    //   }
    // })
  },
  async removeBoard ({ commit }, product) {
    commit(types.BOARDS_DELETE_BOARD,  product )
    rootStore.dispatch('notification/spawnNotification', {
      type: 'success',
      message: i18n.t('Board has been removed sucessfully!', { productName: htmlDecode(product.name) }), //{productName}
      action1: { label: i18n.t('OK') }
    })

     /** To get the Remove board to server */
    //  const task = await TaskQueue.execute({ url: config.wishlist.delete_endpoint, // sync Board with server
    //   payload: {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     mode: 'cors',
    //     body: JSON.stringify({"pid":product.id,"cid":140})
    //   },
    //   silent: false
    // }).then(async task => {
    //   console.log('api Result' , task)
    //   if (task.resultCode === 200) {
    //     console.log('api dataaaa Sucesss' , task.result)
    //   } else {
    //     console.log('api dataaaa Errrrrr')
    //   }
    // })
  },
}

export default actions
