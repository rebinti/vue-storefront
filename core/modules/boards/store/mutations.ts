import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import BoardsState from '../types/WishlistState'
import rootStore from '@vue-storefront/core/store'
import i18n from '@vue-storefront/i18n'
import { htmlDecode } from '@vue-storefront/core/store/lib/filters'

const mutations: MutationTree<BoardsState> = {
  /**
  * Add product to Boards
  * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
  */
  [types.BOARDS_ADD_ITEM] (state, { product }) {
    const record = state.items[product.index].items.find(p => p.sku === product.product.sku)
    if (!record) {
      state.items[product.index].items.push(product.product);
      rootStore.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Product has been added to Board list!', { productName: htmlDecode(product.product.name) }), //{productName}
        action1: { label: i18n.t('OK') }
      })
    }
    else {
      rootStore.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Product has been already in the board!', { productName: htmlDecode(product.product.name) }), //{productName} 
        action1: { label: i18n.t('OK') }
      })
    }
  },
  [types.BOARDS_DEL_ITEM] (state: any, { product }) {
    console.log('removeItem -- mut ' , state , product)
    state.items[product.index].items = state.items[product.index].items.filter(p => p.sku !== product.product.sku)
  },
  [types.BOARDS_LOAD_BOARDS] (state, storedItems) {
    state.items = storedItems || []
  },
  [types.SET_BOARDSLISTS_LOADED] (state, isLoaded: boolean = true) {
    state.loaded = isLoaded
  },

  /* New mutation for Boards */
  [types.BOARDS_CREATE_BOARD] (state,  boardData ) {
    console.log('boardData' , state, boardData);
    const record = state.items.find(p => p.name === boardData.name)
    if (!record) {
      state.items.push({
        ...boardData,
        qty: 1
      });
      rootStore.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Board has been succesfully to created!', { productName: htmlDecode(boardData.name) }), // {productName}
        action1: { label: i18n.t('OK') }
      })
    }else {
      rootStore.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Board has been already created, Please try another!', { productName: htmlDecode(boardData.name) }), // {productName} 
        action1: { label: i18n.t('OK') }
      })
    }
  },
  [types.BOARDS_DELETE_BOARD] (state,  boardData) {
    state.items = state.items.filter(p => p.name !== boardData.name)
  },
}

export default mutations
