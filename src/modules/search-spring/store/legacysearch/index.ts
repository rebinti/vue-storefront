import { Module } from 'vuex'
import { SearchSpringLegacyState } from "../../types/SearchSpringLegacyState";
import { state } from './state'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'

export const legacysearchModule: Module<SearchSpringLegacyState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

