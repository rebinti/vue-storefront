import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { module } from './store/index'
// import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'

const KEY = 'searchSpringSearch'

// export const cacheStorage = initCacheStorage(KEY)

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module: module }] },
}

console.log('search-spring-search module registed');

export const SearchSpringSearch = new VueStorefrontModule(moduleConfig)

