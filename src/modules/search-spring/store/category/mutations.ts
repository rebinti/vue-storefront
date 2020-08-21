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
    state.filterData.push(filterData)
  },

  [types.REMOVE_FILTER_DATA] (state, filterData) {
    state.filterData.splice(state.filterData.findIndex(val => val.includes(filterData)),1);
  },

  [types.RESET_FILTER_DATA] (state) {
    state.filterData = [];
  },

  [types.SET_SEARCH_RESULTS] (state, filterData) {
    state.searchRes = filterData
  },

  [types.RESET_SEARCH_RESULTS] (state) {
    state.searchRes = []
  },


  [types.set_categoryHierarchy]  (state, filterData) {
    if (filterData && filterData.values) {
      if (filterData.serachFrom) delete filterData.serachFrom
      state.categoryHierarchy = filterData
    } else {
      if (filterData.serachFrom && filterData.serachFrom === 'brand') {
        delete filterData.serachFrom
        state.categoryHierarchy.map(val => { if (val.active) val.active = false; });
        state.categoryHierarchy.push(filterData);
      } else {
        if (filterData.serachFrom) delete filterData.serachFrom
        state.categoryHierarchy.values.map(val => { if (val.active) val.active = false; });
        const index = state.categoryHierarchy.values.findIndex(val => val.value === filterData.value)
        if (index >= 0) {
          state.categoryHierarchy.values[index].active = true;
        }
      }
    }
  },

  [types.set_priceSliderData] (state, filterData) {
    state.priceSliderData = filterData.sliderData;
    state.priceSliderActiveRange = filterData.sliderActiveRange;
    state.sortingFilterOptions = filterData.sortingFilterOptions;
    if (filterData.sortingFilterOptions && filterData.sortingFilterOptions.length) {
      state.sortingFilterSelected = `${filterData.sortingFilterOptions[0].field}$${filterData.sortingFilterOptions[0].direction}`
    }
  },

  [types.set_priceSliderActiveRange] (state, activeRange) {
    state.priceSliderActiveRange[0] = activeRange.from;
    state.priceSliderActiveRange[1] = activeRange.to;
  },

  [types.set_sortingFilterSelected] (state, sortFilterItem) {
    state.sortingFilterSelected = sortFilterItem
  },

  [types.set_sortingFilterOptions] (state, filterData) {
    state.searchRes = filterData
  },
  
  [types.RESET_CATEGORY_FILTER] (state) {
    state.categoryHierarchy = []
  },

  [types.RESET_ALL_SEARCHED_FILETER_DATA_DEFAULT] (state) {
    state.searchRes = null
    state.serachedProd = []
    state.filterData = []
    state.categoryHierarchy = []
    state.priceSliderData = {}
    state.priceSliderActiveRange = []
    state.sortingFilterSelected = ''
    state.sortingFilterOptions = []
  },

  [types.RESET_CATEGORY_HIERARCHY] (state) {
    state.categoryHierarchy = []
  },

  [types.SET_ROUTER_FULL_PATH] (state, fullPath) {
    state.routerFullPath = fullPath ? fullPath : ''
  }
}
