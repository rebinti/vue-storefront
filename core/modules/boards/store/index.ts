import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import BoardsState from '../types/WishlistState'

export const module: Module<BoardsState, RootState> = {
  namespaced: true,
  state: {
    loaded: false,
    items: []
  },
  actions,
  mutations,
  getters: {
    isBoardsLoaded: state => state.loaded
  }
}
