import { SearchSpringLegacyState } from "../../types/SearchSpringLegacyState";
import RootState from '@vue-storefront/core/types/RootState'
import { GetterTree } from 'vuex';

export const getters: GetterTree<SearchSpringLegacyState, RootState> = {
    legacyserachedProd: (state) => state.legacyserachedProd,
    legacysearchRes: (state) => state.legacysearchRes
}