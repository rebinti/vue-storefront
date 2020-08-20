import { SearchSpringState } from '../../types/SearchSpringState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
import config from 'config'
import rootStore from '@vue-storefront/core/store'


export const actions: ActionTree<SearchSpringState, any> = {
    
    addProdcutsItems ({ commit }, product) {
        
        if (product) {
            commit(types.SET_SERACH_ITEMS, { product })
        }
    },

    resetSearchedProducts  ({ commit }) {
        commit(types.CLEAR_SEARCHED_PRODCUTS)
    },

    addFilterItems ({ commit }, filterData) {
        
        if (filterData) {
            commit(types.SET_FILTER_DATA, filterData)
        }
    },

    removeFilterItem ({ commit }, filterItem) {
        
        if (filterItem) {
            commit(types.REMOVE_FILTER_DATA, filterItem)
        }
    },

    resetFilterData ({ commit }) {
        commit(types.RESET_FILTER_DATA)
    },

    addSearchSpringSearchResult ({ commit }, searchRes) {
        searchRes.facets = searchRes.facets.map(val => {
            if (val.label === 'Brand') {
                val.values = val.values.filter(brand => {
                    if (rootStore.getters[`ui/checkBrandActiveFlag`]({name: brand.label})) return brand
                })
                return val
            } else return val
        })

        if (searchRes) {
            commit(types.SET_SEARCH_RESULTS, searchRes)
        }
    },

    resetSearchSpringSearchRes ({ commit }) {
        
        commit(types.RESET_SEARCH_RESULTS)
    },


    set_categoryHierarchy  ({ commit }, searchRes) {
        
        if (searchRes) {
            commit(types.set_categoryHierarchy, searchRes)
        }
    },

    resetCategoryHierarchy ({commit}) {
        commit(types.RESET_CATEGORY_HIERARCHY);
    },

    set_priceSliderData  ({ commit }, priceData) {
        
        if (priceData) {
            commit(types.set_priceSliderData, priceData)
        }
    },

    set_priceSliderActiveRange  ({ commit }, activeRange) {
        
        if (activeRange) {
            commit(types.set_priceSliderActiveRange, activeRange)
        }
    },

    set_sortingFilterSelected  ({ commit }, sortFilterItem) {
        
        if (sortFilterItem) {
            commit(types.set_sortingFilterSelected, sortFilterItem)
        }
    },

    set_sortingFilterOptions  ({ commit }, searchRes) {
        
        if (searchRes) {
            commit(types.set_sortingFilterOptions, searchRes)
        }
    },

    reset_categoryFilterOption ({ commit }) {
        
        commit(types.RESET_CATEGORY_FILTER)
    },

    resetAllFilterResult ({ commit }) {
        
        commit(types.RESET_ALL_SEARCHED_FILETER_DATA_DEFAULT)
    },

    async searchInSearchSpringPlatform  ({ commit } , searchData) {
        let searchUrl = config.searchspring.url + config.searchspring.paginationResPerPage + searchData.filterData.join('&');
        const searchResults = await fetch(searchUrl, {
            method: 'GET',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            signal: searchData.signal,
          }).then(res => {
            return res.json();
        }, err => {
            return err;
        });
        return searchResults
    }
    

}