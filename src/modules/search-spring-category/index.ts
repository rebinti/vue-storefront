import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { module } from './store/index'
// import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'
const KEY = 'searchSpringCategory'
// export const cacheStorage = initCacheStorage(KEY)
const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module: module }] },
}
console.log('search-spring-Category module registed');
export const SearchSpringCategory = new VueStorefrontModule(moduleConfig)

