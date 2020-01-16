import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import i18n from '@vue-storefront/i18n'
import { htmlDecode } from '@vue-storefront/core/store/lib/filters'
import rootStore from '@vue-storefront/core/store'
import RootState from '@vue-storefront/core/types/RootState'
import WishlistState from '../types/WishlistState'
import { cacheStorage } from '../'
import { Logger } from '@vue-storefront/core/lib/logger'

import { TaskQueue } from '@vue-storefront/core/lib/sync'
import config from 'config'

import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'

const actions: ActionTree<WishlistState, RootState> = {
  clear (context) {
    context.commit(types.WISH_CLEAR_ITEM, [])
    cacheStorage.removeItem('current-wishlist');
    cacheStorage.removeItem('current-boards');
  },
  async load ({ commit, getters , dispatch}, force: boolean = false) {
    if (!force && getters.isWishlistLoaded) return
    // cacheStorage.getItem('current-wishlist', (err, storedItems) => {
    //   if (err) throw new Error(err)
    //   commit(types.WISH_LOAD_WISH, storedItems)
    //   Logger.info('Wishlist state loaded from browser cache. ', 'cache', storedItems)()
    // })
    
    /** To sync wishlist with to server */
    const clientCartAddItems = [];
    if(this.state.user && this.state.user.current === null && !force) return
    commit(types.SET_WISHLIST_LOADED)
    const task = await TaskQueue.execute({ url: config.wishlist.sync_endpoint, // sync the Wishlist to server
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({"cid": this.state.user.current.id , "tid":"list"})
      },
      silent: false
    }).then(async task => {
      if (task.resultCode === 200) {
        let data  = [];
        commit(types.SET_WISHLIST_LOADED)
        data.push(...Object.keys(task.result).map(i => { return { ...task.result[i], wishlistId: i } }));
        console.log('data datadata data', data);
        data.filter(async item => {
          let query = new SearchQuery()
          query = query.applyFilter({key: 'sku', value: {'eq': item.sku}})
          const { items } = await dispatch('product/list', { query, start: 0, size: 1, updateState: false }, { root: true })
          clientCartAddItems.push({...items[0], wishlistId: item.wishlistId })
          console.log('clientCartAddItems' , clientCartAddItems);
          commit(types.WISH_LOAD_WISH, items[0])
          if(clientCartAddItems.length === data.length) {
            cacheStorage.setItem('current-wishlist', clientCartAddItems).catch((reason) => {
                Logger.error(reason, 'wishlist') // it doesn't work on SSR
            })
          }
        });
        // commit(types.WISH_LOAD_WISH, data)
        // cacheStorage.setItem('current-wishlist', data).catch((reason) => {
        //   Logger.error(reason, 'wishlist') // it doesn't work on SSR
        // })
      } else {
        Logger.error(task.result, 'wishlist')
        commit(types.SET_WISHLIST_LOADED , false);
      }
    })
  },
  async addItem ({ commit }, product) {
    console.log('product', product );
    // commit(types.WISH_ADD_ITEM, { product })
    // rootStore.dispatch('notification/spawnNotification', {
    //   type: 'success',
    //   message: i18n.t('Product {productName} has been added to wishlist!', { productName: htmlDecode(product.name) }),
    //   action1: { label: i18n.t('OK') }
    // })

    /** To get the add Item to server */
    function addToboard() {
      rootStore.commit('ui/setSelectedBoardItem', product);
      rootStore.commit('ui/setBoardsElem', 'add-to-board');
      Vue.prototype.$bus.$emit('modal-show', 'modal-create-boards')
    }
    if(this.state.user && this.state.user.current === null) {
      rootStore.dispatch('notification/spawnNotification', {
        type: 'success',
        message: 'Please sign-in for adding to wishlist!'
      })
      rootStore.commit('ui/setAuthElem', 'login')
      Vue.prototype.$bus.$emit('modal-show', 'modal-signup')
      return
    }
    const task = await TaskQueue.execute({ url: config.wishlist.add_endpoint, // sync the Wishlist to server
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({"sid":product.parentSku,  "cid": this.state.user.current.id , "tid":"add"})
      },
      silent: false
    }).then(async task => {
      console.log('api Result' , task)
      if (task.resultCode === 200) {
        console.log('api dataaaa Sucesss' , task.result)
        product.wishlistId = task.result; // wishlistitemid
        commit(types.WISH_ADD_ITEM, { product })

        rootStore.dispatch('notification/spawnNotification', {
          type: 'warning',
          item: {},
          message: i18n.t('Product {productName} has been added to wishlist!', { productName: htmlDecode(product.name) }),
          action1: { label: i18n.t('Add to Board'), action: addToboard},
          action2: { label: i18n.t('OK'), action: 'close' },
          hasNoTimeout: true
        })

        // rootStore.dispatch('notification/spawnNotification', {
        //   type: 'warning',
        //   item: {},
        //   message: i18n.t('Product {productName} has been added to wishlist!', { productName: htmlDecode(product.name) }),
        //   action2: { label: i18n.t('Add to Board'), action: addToboard},
        //   action1: { label: i18n.t('Ok'), action: 'close' },
        //   hasNoTimeout: true
        // })

      } else {
        Logger.error(task.result, 'wishlist')
        console.log('api dataaaa Errrrrr')
        rootStore.dispatch('notification/spawnNotification', {
          type: 'success',
          message: 'Error while adding to wishlist!',
          action1: { label: i18n.t('OK') }
        })
      }
    })
  },
  async removeItem ({ commit }, product) {
    // commit(types.WISH_DEL_ITEM, { product })
    // rootStore.dispatch('notification/spawnNotification', {
    //   type: 'success',
    //   message: i18n.t('Product {productName} has been removed from wishlit!', { productName: htmlDecode(product.name) }),
    //   action1: { label: i18n.t('OK') }
    // })

      /** To get the add Item to server */
      if(this.state.user && this.state.user.current === null) {
        rootStore.dispatch('notification/spawnNotification', {
          type: 'success',
          message: 'Please sign-in for adding to wishlist!',
          action1: { label: i18n.t('OK') }
        })
        rootStore.commit('ui/setAuthElem', 'login')
        Vue.prototype.$bus.$emit('modal-show', 'modal-signup')
        return
      }

    /** To get the Remove Item to server */
    const task = await TaskQueue.execute({ url: config.wishlist.remove_endpoint, // sync the Wishlist to server
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({"sid":product.parentSku, "cid": this.state.user.current.id , "tid":"delete"})
      },
      silent: false
    }).then(async task => {
      console.log('api Result' , task)
      if (task.resultCode === 200) {
        console.log('api dataaaa Sucesss' , task.result)
        commit(types.WISH_DEL_ITEM, { product })
        rootStore.dispatch('notification/spawnNotification', {
          type: 'success',
          message: i18n.t('Product {productName} has been removed from wishlit!', { productName: htmlDecode(product.name) }),
          action1: { label: i18n.t('OK') }
        })
      } else {
        Logger.error(task.result, 'wishlist')
        rootStore.dispatch('notification/spawnNotification', {
          type: 'success',
          message: 'Error while deleting to wishlist!',
          action1: { label: i18n.t('OK') }
        })
      }
    })
  },
}

export default actions
