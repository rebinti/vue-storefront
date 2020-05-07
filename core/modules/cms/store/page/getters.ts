import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CmsPageState from '../../types/CmsPageState'

const getters: GetterTree<CmsPageState, RootState> = {
  cmsPages: (state) => state.items,
  cmsPageIdentifier: (state) => (identifier) => {
    return state.items.find(item => item.identifier === identifier)
  },
  cmsPageId: (state) => (id) => {
    return state.items.find(item => item.id === id)
  }  
}

export default getters
