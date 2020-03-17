import { SearchSpringState } from '../types/SearchSpringState'
import RootState from '@vue-storefront/core/types/RootState'
import { GetterTree } from 'vuex';

export const getters: GetterTree<SearchSpringState, RootState> = {
    serachedProd: (state) => state.serachedProd,
    filterData:  (state) => state.filterData,
    searchRes: (state) => state.searchRes,
    categoryHierarchy:  (state) => state.categoryHierarchy,
    priceSliderData: (state) => state.priceSliderData,
    priceSliderActiveRange1: (state) => state.priceSliderActiveRange,
    sortingFilterSelcted1: (state) => state.sortingFilterSelcted,
    sortingFilterOptions1: (state) => state.sortingFilterOptions
}
  
