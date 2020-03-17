import { SearchSpringState } from '../types/SearchSpringState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
import config from 'config'


export const actions: ActionTree<SearchSpringState, any> = {
    
    addProdcutsItems ({ commit }, product) {
        console.log('add item boards' , product);
        if (product) {
            commit(types.SET_SERACH_ITEMS, { product })
        }
    },

    resetSearchedProducts  ({ commit }) {
        commit(types.CLEAR_SEARCHED_PRODCUTS)
    },

    addFilterItems ({ commit }, filterData) {
        console.log('add Filter Items' , filterData);
        if (filterData) {
            commit(types.SET_FILTER_DATA, filterData)
        }
    },

    removeFilterItem ({ commit }, filterItem) {
        console.log('add Filter Items' , filterItem);
        if (filterItem) {
            commit(types.REMOVE_FILTER_DATA, filterItem)
        }
    },

}