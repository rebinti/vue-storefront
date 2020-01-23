import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import WishlistState from '../types/WishlistState'

const mutations: MutationTree<WishlistState> = {
  /**
  * Add product to Wishlist
  * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
  */
  [types.WISH_ADD_ITEM] (state, { product }) {
    const record = state.items.length && state.items[0].find(p => p.parentSku === product.parentSku)
    if (!record) {
      if(state.items.length === 0) {
        const items = [];
        items.push({
          ...product,
          qty: 1
        })
        state.items.push(items);
      } else {
        state.items[0].push({
          ...product,
          qty: 1
        })
      }
    }
  },
  [types.WISH_DEL_ITEM] (state, { product }) {
    // state.items.splice(product.prodIndex,1)  
    if(state.items.length > 0 && state.items[0].length > 1 ) {
      let items = Object.assign([], state.items);
      items[0] = items[0].filter(p => p.parentSku !== product.parentSku)
      state.items = items;
    } else {
      state.items = []
    }
  },
  [types.WISH_LOAD_WISH] (state, storedItems) {
    //state.items = storedItems || []

    const item1 = []
    item1.push(...storedItems)
    state.items.push(item1)
    // state.items.push(storedItems)
  },
  [types.WISH_CLEAR_ITEM] (state) {
    state.items = [];
  },
  [types.SET_WISHLIST_LOADED] (state, isLoaded: boolean = true) {
    state.loaded = isLoaded
  },
  [types.WISH_SYNC_ITEMS] (state, items) {
    state.items = items
  }
}

export default mutations
