import { createModule } from '@vue-storefront/core/lib/module'
// TODO: Move the logic to appropriate modules and depreciate this one
import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'

const KEY = 'homepage'
const store = {
  namespaced: true,
  state: {
    new_collection: [],
    bestsellers: []
  },
  actions: {
    async fetchNewCollection ({ commit, dispatch }) {
      const newProductsQuery = prepareQuery({ queryConfig: 'Accessories' }) // 'newProducts' 

      const newProductsResult = await dispatch('product/list', {
        query: newProductsQuery,
        size: 8,
        sort: 'created_at:desc'
      }, { root: true })
      // const configuredProducts = await dispatch(
      //   'category-next/configureProducts',
      //   { products: newProductsResult.items
      //   }, { root: true })
      commit('SET_NEW_COLLECTION', newProductsResult.items)
    },
    async loadBestsellers ({ commit, dispatch }) {
      const response = await dispatch('product/list', {
        query: prepareQuery({ queryConfig: 'inspirations' }), // 'bestSellers'
        size: 8,
        sort: 'created_at:desc'
      }, { root: true })

      commit('SET_BESTSELLERS', response.items)
    }
  },
  mutations: {
    SET_NEW_COLLECTION (state, products) {
      state.new_collection = products || []
    },
    SET_BESTSELLERS (state, bestsellers) {
      state.bestsellers = bestsellers
    }
  },
  getters: {
    newCollection: state => state.new_collection,
    salesCollection: state => state.bestsellers
  }
}
export const Homepage = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] }
})
