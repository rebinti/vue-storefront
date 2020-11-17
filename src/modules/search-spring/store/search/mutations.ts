import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {

  [types.SET_SERACH_ITEMS] (state, product: any) {
    console.log("FINAL2222222",product)
    if (!product.product.onScroll) {
      console.log("FINAL3333333",product)
         state.serachedProd = product.product.products
         console.log("FINAL555555 - state value",state.serachedProd)
    } else {
      console.log("FINAL4444444",product)
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
    state.categoryHierarchy.map(val => { if (val.active) val.active = false; });
    if (Array.isArray(filterData)) {
      state.categoryHierarchy = filterData;
    } else {
      state.categoryHierarchy.push(filterData);
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

  [types.RESET_CATEGORY_FILTER_INNER_DATA] (state) {
      if (state.searchRes && state.searchRes.facets) {
        state.searchRes.facets =  state.searchRes.facets.map(val => {
            if (val.type === 'hierarchy') val.values = []
            return val
        })
      }
  }
}
