import { Module } from 'vuex'
import { SearchSpringState } from '../types/SearchSpringState'
import { state } from './state'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'

export const module: Module<SearchSpringState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

