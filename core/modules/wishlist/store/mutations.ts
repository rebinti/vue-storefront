import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import WishlistState from '../types/WishlistState'

const mutations: MutationTree<WishlistState> = {
  /**
  * Add product to Wishlist
  * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
  */
  [types.WISH_ADD_ITEM] (state, { product }) {
    const record = state.items.find(p => p.parentSku === product.parentSku)
    if (!record) {
      state.items.push({
        ...product,
        qty: 1
      })
    }
  },
  [types.WISH_DEL_ITEM] (state, { product }) {
    const dupData = Object.assign([],state.items)
    dupData.splice(product.prodIndex,1)
    console.log('Copy data', dupData);
    state.items = []
    setTimeout(() => {
      state.items = dupData
    }, 0);

    // state.items.splice(product.prodIndex,1) 

    // state.items = state.items.filter(p => p.parentSku !== product.parentSku)
  },
  [types.WISH_LOAD_WISH] (state, storedItems) {
    state.items = storedItems || []
    // state.items.push(storedItems)
  },
  [types.WISH_CLEAR_ITEM] (state) {
    state.items = [];
  },
  [types.SET_WISHLIST_LOADED] (state, isLoaded: boolean = true) {
    state.loaded = isLoaded
  }
}

export default mutations
