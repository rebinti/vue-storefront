import { module } from './store'
import { plugin } from './store/plugin'
import { createModule } from '@vue-storefront/core/lib/module'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'

export const KEY = 'boards'
export const cacheStorage = initCacheStorage(KEY)
export const Boards = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }], plugin }
}
)
