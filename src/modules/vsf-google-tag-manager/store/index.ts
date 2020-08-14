import { Module } from 'vuex'
import { GTMState } from '../types/GTMState'
import { mutations } from './mutations'

export const module: Module<GTMState, any> = {
  namespaced: true,
  mutations
}