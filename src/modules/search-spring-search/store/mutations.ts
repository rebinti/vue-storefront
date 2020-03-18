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

  [types.RESET_FILTER_DATA] (state) {
    state.filterData = [];
  },

  [types.SET_SEARCH_RESULTS] (state, filterData) {
    console.log('SET_SEARCH_RESULTS', filterData);
    state.searchRes = filterData
  },

  [types.RESET_SEARCH_RESULTS] (state) {
    state.searchRes = []
  },


  [types.set_categoryHierarchy]  (state, filterData) {
    console.log('set_categoryHierarchy', filterData);
    state.categoryHierarchy.map(val => { if (val.active) val.active = false; });
    state.categoryHierarchy.push(filterData);
  },

  [types.set_priceSliderData] (state, filterData) {
    console.log('set_priceSliderData', filterData);
    state.priceSliderData = filterData.sliderData;
    state.priceSliderActiveRange = filterData.sliderActiveRange;
  },

  [types.set_priceSliderActiveRange] (state, activeRange) {
    console.log('set_priceSliderActiveRange', activeRange);
    state.priceSliderActiveRange[0] = activeRange.from;
    state.priceSliderActiveRange[1] = activeRange.to;
  },

  [types.set_sortingFilterSelcted] (state, filterData) {
    console.log('set_sortingFilterSelcted', filterData);
    state.searchRes = filterData
  },

  [types.set_sortingFilterOptions] (state, filterData) {
    console.log('set_sortingFilterOptions', filterData);
    state.searchRes = filterData
  },
  
  [types.RESET_CATEGORY_FILTER] (state) {
    state.categoryHierarchy = []
  },

  [types.RESET_ALL_SEARCHED_FILETER_DATA_DEFAULT] (state) {
    state.currentPage = 1
    state.squery = ''
    state.searchRes = null
    state.serachedProd = []
    state.filterData = []
    state.categoryHierarchy = []
    state.priceSliderData = {}
    state.priceSliderActiveRange = []
    state.sortingFilterSelcted = ''
    state.sortingFilterOptions = []
    state.paginationLoader = false
    state.mobileFilters = false
  }
}
