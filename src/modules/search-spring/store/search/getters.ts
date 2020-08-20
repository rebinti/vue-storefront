import { SearchSpringState } from '../../types/SearchSpringState'
import RootState from '@vue-storefront/core/types/RootState'
import { GetterTree } from 'vuex';

export const getters: GetterTree<SearchSpringState, RootState> = {
    serachedProd: (state) => state.serachedProd,
    filterData:  (state) => state.filterData,
    searchRes: (state) => state.searchRes,
    categoryHierarchy:  (state) => state.categoryHierarchy,
    priceSliderData: (state) => state.priceSliderData,
    priceSliderActiveRange: (state) => state.priceSliderActiveRange,
    sortingFilterSelected: (state) => state.sortingFilterSelected,
    sortingFilterOptions: (state) => state.sortingFilterOptions
}
  
