import { extendModule } from '@vue-storefront/core/lib/module'
import { VueStorefrontModule } from '@vue-storefront/core/lib/module'
import { Catalog } from '@vue-storefront/core/modules/catalog'
import { Cart } from '@vue-storefront/core/modules/cart'
import { Checkout } from '@vue-storefront/core/modules/checkout'
import { Compare } from '@vue-storefront/core/modules/compare'
import { Review } from '@vue-storefront/core/modules/review'
import { Mailer } from '@vue-storefront/core/modules/mailer'
import { Wishlist } from '@vue-storefront/core/modules/wishlist'
import { Newsletter } from '@vue-storefront/core/modules/newsletter'
import { Notification } from '@vue-storefront/core/modules/notification'
import { RecentlyViewed } from '@vue-storefront/core/modules/recently-viewed'
import { Url } from '@vue-storefront/core/modules/url'
import { Homepage } from './homepage'
import { Claims } from './claims'
import { PromotedOffers } from './promoted-offers'
import { Ui } from './ui-store'
// import { GoogleAnalytics } from './google-analytics';
// import { Hotjar } from './hotjar';
import { googleTagManager } from './google-tag-manager';
import { AmpRenderer } from './amp-renderer';
import { PaymentBackendMethods } from './payment-backend-methods';
import { PaymentCashOnDelivery } from './payment-cash-on-delivery';
import { RawOutputExample } from './raw-output-example'
// import { InstantCheckout } from './instant-checkout'
import { OrderHistory } from './order-history'

import { DndPrismicCMS } from './dnd-prismic-cms'
import { Braintree } from './payment-braintree';  // M2

// import { PaymentBraintreeModule } from './payment-braintree'

import { Paypal } from './paypal'
import { FacebookPixel } from './vsf-facebook-pixel'

import { ExternalCheckout } from './vsf-external-checkout'

import { SearchSpringSearch } from './search-spring-search';

import { SearchSpringCategory } from './search-spring-category';


// import { Example } from './module-template'

// This is how you can extend any of VS modues
// const extendCartVuex = {
//   actions: {
//     load () {
//       Logger.info('New load function')()
//     }
//   }
//  }

//  const cartExtend = {
//   key: 'cart',
//   afterRegistration: function(isServer, config) {
//     Logger.info('New afterRegistration hook')()
//   },
//   store: { modules: [{ key: 'cart', module: extendCartVuex }] },
//  }

//  extendModule(cartExtend)

/**
 * Some of the modules are registered lazily only when components from the module are appearing on current page.
 * If you want to use this module in pages without its components you need to remember about registering module first
 * In VS 1.8 this modules will be seamlessly lazyLoaded after proper action dispatch
 * - Wishlist
 */

// import { layeredNavigationModule } from './vsf-layered-navigation';

// extendModule(layeredNavigationModule)

export const registerModules: VueStorefrontModule[] = [
  Checkout,
  Catalog,
  Cart,
  Compare,
  Review,
  Mailer,
  Wishlist,
  Newsletter,
  Notification,
  Ui,
  RecentlyViewed,
  Homepage,
  Claims,
  PromotedOffers,
  googleTagManager,
  // GoogleAnalytics,
  // Hotjar,
  PaymentBackendMethods,
  PaymentCashOnDelivery,
  RawOutputExample,
  AmpRenderer,
  // InstantCheckout,
  Url,
  OrderHistory,
  DndPrismicCMS,
  Paypal,
  // PaymentBraintreeModule
  Braintree,
  FacebookPixel,
  ExternalCheckout,
  SearchSpringSearch,
  SearchSpringCategory
  // layeredNavigationModule
  // Example
]
