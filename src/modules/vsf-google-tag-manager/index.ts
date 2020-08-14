import { afterRegistration } from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { module } from './store'
import { beforeEach } from './router/beforeEach'
import { afterEach } from './router/afterEach'

export const KEY = 'vsf-google-tag-manager'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  router: { beforeEach, afterEach },
  afterRegistration,
  store: { modules: [{ key: KEY, module }] },
}

export const VsfGoogleTagManager = new VueStorefrontModule(moduleConfig)
