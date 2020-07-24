import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ProductState from '../../types/ProductState'

const getters: GetterTree<ProductState, RootState> = {
  productParent: (state) => state.parent,
  productCurrent: (state) => state.current,
  currentConfiguration: (state) => state.current_configuration,
  productOriginal: (state) => state.original,
  currentOptions: (state) => state.current_options,
  breadcrumbs: (state) => state.breadcrumbs,
  productGallery: (state) => state.productGallery,
  productCurrentFilterSwaped (state) {
    if ( state.current && state.current.configurable_options && state.current.configurable_options.length > 1) {
      // if (Object.keys( state.current.configurable_options[0]).every(p => state.current.configurable_options[0][p] === state.original.configurable_options[0][p])) {
      let prod = Object.assign({}, state.current);
      const index = prod.configurable_options.findIndex(val=> val.attribute_code === 'size')
      if (index === 0) [prod.configurable_options[0], prod.configurable_options[1]] = [prod.configurable_options[1], prod.configurable_options[0]]
      return prod
      // }
    } else {
      return  state.current
    } 
  },
}

export default getters
