import { Module } from 'vuex'
import { SearchSpringCategoryState } from '../types/SearchSpringCategoryState'
import { state } from './state'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'

export const module: Module<SearchSpringCategoryState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

