import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {

  [types.SET_SERACH_ITEMS] (state, product: any) {
    if (!product.product.onScroll) {
         state.serachedProd = product.product.products
    } else {
        state.serachedProd.push(...product.product.products);
    }
  },

  [types.CLEAR_SEARCHED_PRODCUTS] (state) {
    state.serachedProd = [];
  },

  [types.SET_FILTER_DATA] (state, filterData) {
    console.log('SET_FILTER_DATA', filterData);
    state.filterData.push(filterData)
  },

  [types.REMOVE_FILTER_DATA] (state, filterData) {
    console.log('REMOVE_FILTER_DATA', filterData);
    state.filterData.splice(state.filterData.findIndex(val => val.includes(filterData)),1);
  },
  
}
