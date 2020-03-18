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

    resetFilterData ({ commit }) {
        commit(types.RESET_FILTER_DATA)
    },

    addSearchSpringSearchResult ({ commit }, searchRes) {
        console.log('add Search Spring Search Result' , searchRes);
        if (searchRes) {
            commit(types.SET_SEARCH_RESULTS, searchRes)
        }
    },

    resetSearchSpringSearchRes ({ commit }) {
        console.log('reset Search Spring Search Result');
        commit(types.RESET_SEARCH_RESULTS)
    },


    set_categoryHierarchy  ({ commit }, searchRes) {
        console.log('set_categoryHierarchy' , searchRes);
        if (searchRes) {
            commit(types.set_categoryHierarchy, searchRes)
        }
    },

    set_priceSliderData  ({ commit }, priceData) {
        console.log('set_priceSliderData' , priceData);
        if (priceData) {
            commit(types.set_priceSliderData, priceData)
        }
    },

    set_priceSliderActiveRange  ({ commit }, activeRange) {
        console.log('set_priceSliderActiveRange' , activeRange);
        if (activeRange) {
            commit(types.set_priceSliderActiveRange, activeRange)
        }
    },

    set_sortingFilterSelcted  ({ commit }, searchRes) {
        console.log('set_sortingFilterSelcted' , searchRes);
        if (searchRes) {
            commit(types.set_sortingFilterSelcted, searchRes)
        }
    },

    set_sortingFilterOptions  ({ commit }, searchRes) {
        console.log('set_sortingFilterOptions' , searchRes);
        if (searchRes) {
            commit(types.set_sortingFilterOptions, searchRes)
        }
    },

    reset_categoryFilterOption ({ commit }) {
        console.log('reset_categoryFilterOption');
        commit(types.RESET_CATEGORY_FILTER)
    },

    resetAllFilterResult ({ commit }) {
        console.log('resetAllFilterResult actionn');
        commit(types.RESET_ALL_SEARCHED_FILETER_DATA_DEFAULT)
    },

    
    

}