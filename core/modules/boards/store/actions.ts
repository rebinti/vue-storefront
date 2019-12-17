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

const actions: ActionTree<BoardsState, RootState> = {
  clear (context) {
    context.commit(types.BOARDS_LOAD_BOARDS, [])
  },
  load ({ commit, getters }, force: boolean = false) {
    if (!force && getters.isBoardsLoaded) return
    commit(types.SET_BOARDSLISTS_LOADED)
    cacheStorage.getItem('current-boards', (err, storedItems) => {
      if (err) throw new Error(err)
      commit(types.BOARDS_LOAD_BOARDS, storedItems)
      Logger.info('current-boards state loaded from browser cache. ', 'cache', storedItems)()
    })
  },
  addItem ({ commit }, product) {
    console.log('add item boards' , product);
    commit(types.BOARDS_ADD_ITEM, { product })
    // rootStore.dispatch('notification/spawnNotification', {
    //   type: 'success',
    //   message: i18n.t('Product {productName} has been added to Board list!', { productName: htmlDecode(product.product.name) }),
    //   action1: { label: i18n.t('OK') }
    // })
  },
  removeItem ({ commit }, product) {
    console.log('removeItem -- ' , product)
    commit(types.BOARDS_DEL_ITEM, { product })
    rootStore.dispatch('notification/spawnNotification', {
      type: 'success',
      message: i18n.t('Product {productName} has been removed from wishlit!', { productName: htmlDecode(product.product.name) }),
      action1: { label: i18n.t('OK') }
    })
  },
  createBoard ({ commit }, product) {
    commit(types.BOARDS_CREATE_BOARD, product )
    // rootStore.dispatch('notification/spawnNotification', {
    //   type: 'success',
    //   message: i18n.t('Board {productName} has been added to Boards!', { productName: htmlDecode(product.name) }),
    //   action1: { label: i18n.t('OK') }
    // })
  },
  removeBoard ({ commit }, product) {
    commit(types.BOARDS_DELETE_BOARD,  product )
    rootStore.dispatch('notification/spawnNotification', {
      type: 'success',
      message: i18n.t('Board has been removed sucessfully!', { productName: htmlDecode(product.name) }), //{productName}
      action1: { label: i18n.t('OK') }
    })
  },
}

export default actions
