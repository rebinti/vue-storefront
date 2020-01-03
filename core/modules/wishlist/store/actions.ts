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

const actions: ActionTree<WishlistState, RootState> = {
  clear (context) {
    context.commit(types.WISH_LOAD_WISH, [])
  },
  async load ({ commit, getters}, force: boolean = false) {
    if (!force && getters.isWishlistLoaded) return
    cacheStorage.getItem('current-wishlist', (err, storedItems) => {
      if (err) throw new Error(err)
      commit(types.WISH_LOAD_WISH, storedItems)
      Logger.info('Wishlist state loaded from browser cache. ', 'cache', storedItems)()
    })

    /** To sync wishlist with to server */
    // const task = await TaskQueue.execute({ url: config.wishlist.sync_endpoint, // sync the Wishlist to server
    //   payload: {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    //     mode: 'cors',
    //   },
    //   silent: false
    // }).then(async task => {
    //   console.log('api Result' , task)
    //   if (task.resultCode === 200) {
    //     console.log('API dataaaa Sucesss' , task.result)
    //     commit(types.WISH_LOAD_WISH, task.result)
    //     cacheStorage.setItem('current-wishlist', task.result).catch((reason) => {
    //       Logger.error(reason, 'wishlist') // it doesn't work on SSR
    //     })
    //   } else {
    //     Logger.error(task.result, 'wishlist')
    //     console.log('api dataaaa Errrrrr')
    //   }
    // })
  },
  async addItem ({ commit }, product) {
    commit(types.WISH_ADD_ITEM, { product })
    rootStore.dispatch('notification/spawnNotification', {
      type: 'success',
      message: i18n.t('Product {productName} has been added to wishlist!', { productName: htmlDecode(product.name) }),
      action1: { label: i18n.t('OK') }
    })

    // console.log('product', product);
    // /** To get the add Item to server */
    // const task = await TaskQueue.execute({ url: config.wishlist.add_endpoint, // sync the Wishlist to server
    //   payload: {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     mode: 'cors',
    //     body: JSON.stringify({"sid":product.parentSku,  "cid": this.state.user.current.id , "tid":"add"})
    //   },
    //   silent: false
    // }).then(async task => {
    //   console.log('api Result' , task)
    //   if (task.resultCode === 200) {
    //     console.log('api dataaaa Sucesss' , task.result)
    //     commit(types.WISH_ADD_ITEM, { product })
    //     rootStore.dispatch('notification/spawnNotification', {
    //       type: 'success',
    //       message: i18n.t('Product {productName} has been added to wishlist!', { productName: htmlDecode(product.name) }),
    //       action1: { label: i18n.t('OK') }
    //     })
    //   } else {
    //     Logger.error(task.result, 'wishlist')
    //     console.log('api dataaaa Errrrrr')
    //     rootStore.dispatch('notification/spawnNotification', {
    //       type: 'success',
    //       message: 'Error while adding to wishlist!',
    //       action1: { label: i18n.t('OK') }
    //     })
    //   }
    // })
  },
  async removeItem ({ commit }, product) {
    commit(types.WISH_DEL_ITEM, { product })
    rootStore.dispatch('notification/spawnNotification', {
      type: 'success',
      message: i18n.t('Product {productName} has been removed from wishlit!', { productName: htmlDecode(product.name) }),
      action1: { label: i18n.t('OK') }
    })

    /** To get the Remove Item to server */
    // const task = await TaskQueue.execute({ url: config.wishlist.remove_endpoint, // sync the Wishlist to server
    //   payload: {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     mode: 'cors',
    //     body: JSON.stringify({"pid":product.id,"cid": this.state.user.current.id , "tid":"delete"})
    //   },
    //   silent: false
    // }).then(async task => {
    //   console.log('api Result' , task)
    //   if (task.resultCode === 200) {
    //     console.log('api dataaaa Sucesss' , task.result)
    //     commit(types.WISH_DEL_ITEM, { product })
    //     rootStore.dispatch('notification/spawnNotification', {
    //       type: 'success',
    //       message: i18n.t('Product {productName} has been removed from wishlit!', { productName: htmlDecode(product.name) }),
    //       action1: { label: i18n.t('OK') }
    //     })
    //   } else {
    //     Logger.error(task.result, 'wishlist')
    //     rootStore.dispatch('notification/spawnNotification', {
    //       type: 'success',
    //       message: 'Error while deleting to wishlist!',
    //       action1: { label: i18n.t('OK') }
    //     })
    //   }
    // })
  },
}

export default actions
