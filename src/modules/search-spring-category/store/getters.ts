import { SearchSpringCategoryState } from '../types/SearchSpringCategoryState'
import RootState from '@vue-storefront/core/types/RootState'
import { GetterTree } from 'vuex';

export const getters: GetterTree<SearchSpringCategoryState, RootState> = {
    serachedProd: (state) => state.serachedProd,
    filterData:  (state) => state.filterData,
    searchRes: (state) => state.searchRes,
    categoryHierarchy:  (state) => state.categoryHierarchy,
    priceSliderData: (state) => state.priceSliderData,
    priceSliderActiveRange: (state) => state.priceSliderActiveRange,
    sortingFilterSelected: (state) => state.sortingFilterSelected,
    sortingFilterOptions: (state) => state.sortingFilterOptions,
    getStoredCurrentRouterPath: (state) => state.routerFullPath,
    getMerchandisingContent: (state) => { 
        return state.searchRes && state.searchRes.merchandising && state.searchRes.merchandising.content ?
        state.searchRes.merchandising.content : null
    }
}