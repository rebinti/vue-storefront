// import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import App from './App.vue'
import routes from './router'
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import VueSocialSharing from 'vue-social-sharing'
import '@vue-storefront/core/lib/passive-listeners'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import { once } from '@vue-storefront/core/helpers'

import { extendModule } from '@vue-storefront/core/lib/module'
import uiStore from 'theme/store/ui'
// import Vue2TouchEvents from 'vue2-touch-events'
// import '@fortawesome/fontawesome-free/css/all.css'
// import '@fortawesome/fontawesome-free/js/all.js'

once('__VUE_EXTEND_DROPPOINT_VPB__', () => {
  Vue.use(VueProgressBar);
  Vue.use(VueSocialSharing);
})

// once('__VUE_EXTEND_DROPPOINT_VPB__', () => {
//   Vue.use(Vue2TouchEvents, {
//     disableClick: false,
//     touchClass: '',
//     tapTolerance: 10,
//     touchHoldTolerance: 400,
//     swipeTolerance: 5,
//     longTapTimeInterval: 400
//   })
// })

const themeEntry = App
function initTheme (app, router, store, config, ssrContext) {
  // if youre' runing multistore setup this is copying the routed above adding the 'storeCode' prefix to the urls and the names of the routes
  // You can do it on your own and then be able to customize the components used for example for German storeView checkout
  // To do so please execlude the desired storeView from the config.storeViews.mapStoreUrlsFor and map the urls by Your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized },
  // setupMultistoreRoutes(config, router, routes)
  RouterManager.addRoutes(routes, router)
}

const uiExtend = {
  key: 'ui',
  store: { modules: [{ key: 'ui', module: uiStore }] }
}
extendModule(uiExtend)

export {
  themeEntry,
  initTheme
}
