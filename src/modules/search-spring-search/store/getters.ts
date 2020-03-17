import { SearchSpringState } from '../types/SearchSpringState'
import RootState from '@vue-storefront/core/types/RootState'
import { GetterTree } from 'vuex';

export const getters: GetterTree<SearchSpringState, RootState> = {
    serachedProd: (state) => state.serachedProd,
    filterData1:  (state) => state.filterData,
}
  
