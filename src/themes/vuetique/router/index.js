import config from 'config'
// import SocialLogin from 'theme/pages/SocialLogin'
// import SplashScreen from 'theme/pages/SplashScreen'
import Brands from 'theme/pages/brands'
import BrandsCategory from 'theme/pages/brandsCategory'
import SearchSpringSearch from 'theme/pages/SearchSpringSearch'

const Home = () => import(/* webpackChunkName: "vsf-home" */ 'theme/pages/Home.vue')
const PageNotFound = () => import(/* webpackChunkName: "vsf-not-found" */ 'theme/pages/PageNotFound.vue')
const ErrorPage = () => import(/* webpackChunkName: "vsf-error" */ 'theme/pages/Error.vue')
const Product = () => import(/* webpackChunkName: "vsf-product" */ 'theme/pages/Product.vue')
const Category = () => import(/* webpackChunkName: "vsf-category" */ 'theme/pages/SearchSpringCategory.vue') // Category.vue
const CmsPage = () => import(/* webpackChunkName: "vsf-cms" */ 'theme/pages/CmsPage.vue')
const CmsBlockDemoPageSsr = () => import(/* webpackChunkName: "vsf-cms-demo" */ 'theme/pages/CmsBlockDemoPageSsr.vue')
const Checkout = () => import(/* webpackChunkName: "vsf-checkout" */ 'theme/pages/Checkout.vue')
const Compare = () => import(/* webpackChunkName: "vsf-compare" */ 'theme/pages/Compare.vue')
const MyAccount = () => import(/* webpackChunkName: "vsf-my-account" */ 'theme/pages/MyAccount.vue')
const Static = () => import(/* webpackChunkName: "vsf-static" */ 'theme/pages/Static.vue') // footer links CMS page use this
const Styla = () => import(/* webpackChunkName: "vsf-styla" */ 'theme/pages/Styla.vue')
const CustomCmsPage = () => import(/* webpackChunkName: "vsf-custom-cms" */ 'theme/pages/CustomCmsPage.vue')
const CmsData = () => import(/* webpackChunkName: "vsf-data" */ 'theme/pages/CmsData')
const ContactUs = () => import(/* webpackChunkName: "vsf-custom-cms" */ 'theme/pages/ContactUs.vue')

const SocialLogin = () => import(/* webpackChunkName: "vsf-social-login" */ 'theme/pages/SocialLogin')
// const SearchSpringSearch = () => import(/* webpackChunkName: "vsf-splash" */ 'theme/pages/SearchSpringSearch')

// const Brands = () => import(/* webpackChunkName: "vsf-brands" */ 'theme/pages/brands')
// const BrandsCategory = () => import(/* webpackChunkName: "vsf-brand-category" */ 'theme/pages/brandsCategory')

let routes = [
  { name: 'home', path: '/', component: Home, alias: '/pwa.html' },
  { name: 'checkout', path: '/checkout', component: Checkout },
  { name: 'legal', path: '/legal', component: Static, props: { page: 'lorem', title: 'Legal Notice' }, meta: { title: 'Legal Notice', description: 'Legal Notice - example of description usage' } },
  { name: 'customer-service', path: '/customer-service', component: Static, props: { page: 'lorem', title: 'Customer service', pageidentifierfromindex: 'customer-service' } },
  { name: 'privacy', path: '/privacy', component: Static, props: { page: 'lorem', title: 'Privacy', pageidentifierfromindex: 'privacy' } },
  { name: 'faq', path: '/help-faq', component: Static, props: { page: 'lorem', title: 'Help/Faqs', pageidentifierfromindex: 'help-faq' } },
  { name: 'delivery-returns', path: '/delivery-returns', component: Static, props: { page: 'lorem', title: 'Delivery & Return', pageidentifierfromindex: 'delivery-returns' } },
  { name: 'students', path: '/students', component: Static, props: { page: 'lorem', title: 'Students', pageidentifierfromindex: 'students' } },
  { name: 'size-guide', path: '/size-guide', component: Static, props: { page: 'lorem', title: 'Size guide', pageidentifierfromindex: 'size-guide' } },
  { name: 'magazine', path: '/magazine', component: Static, props: { page: 'lorem', title: 'Magazine' } },
  { name: 'inspiration', path: '/inspiration-landing', component: Styla, props: { page: 'lorem', title: 'Inspiration' } },
  { name: 'sale', path: '/sale', component: Static, props: { page: 'lorem', title: 'Sale' } },
  { name: 'order-tracking', path: '/order-tracking', component: Static, props: { page: 'lorem', title: 'Track my Order' } },
  { name: 'my-account', path: '/my-account', component: MyAccount, meta: { requiresAuth: true } },
  { name: 'my-shipping-details', path: '/my-account/shipping-details', component: MyAccount, props: { activeBlock: 'MyShippingDetails' }, meta: { requiresAuth: true } },
  { name: 'my-newsletter', path: '/my-account/newsletter', component: MyAccount, props: { activeBlock: 'MyNewsletter' }, meta: { requiresAuth: true } },
  { name: 'my-orders', path: '/my-account/orders', component: MyAccount, props: { activeBlock: 'MyOrders' }, meta: { requiresAuth: true } },
  { name: 'my-order', path: '/my-account/orders/:orderId', component: MyAccount, props: { activeBlock: 'MyOrder' }, meta: { requiresAuth: true } },
  { name: 'my-recently-viewed', path: '/my-account/recently-viewed', component: MyAccount, props: { activeBlock: 'MyRecentlyViewed' }, meta: { requiresAuth: true } },
  { name: 'store-locator', path: '/store-locator', component: Static, props: { page: 'lorem', title: 'Store locator' } },
  { name: 'gift-card', path: '/gift-card', component: Static, props: { page: 'lorem', title: 'Gift card' } },
  { name: 'delivery', path: '/delivery', component: Static, props: { page: 'lorem', title: 'Delivery' } },
  { name: 'order-from-catalog', path: '/order-from-catalog', component: Static, props: { page: 'lorem', title: 'Order from catalog' } },
  { name: 'contact', path: '/contact', component: Static, props: { page: 'contact', title: 'Contact' } },
  { name: 'compare', path: '/compare', component: Compare, props: { title: 'Compare Products' } },
  { name: 'page-not-found', path: '/page-not-found', component: PageNotFound },
  { name: 'error', path: '/error', component: ErrorPage },
  { name: 'custom-cms-page', path: '/custom-cms-page', component: CustomCmsPage },
  { name: 'cms-block-demo-page-ssr', path: '/cms-block-demo-page-ssr', component: CmsBlockDemoPageSsr },
  { name: 'about-us', path: '/about-us', component: CmsData, props: { identifier: 'about-us', type: 'Page', sync: true } },
  { name: 'contact-us', path: '/contact-us', component: ContactUs },

  { name: 'search-spring', path: '/search', component: SearchSpringSearch },
  { name: 'mobile-social-login', path: '/social-login', component: SocialLogin },
  { name: 'brands', path: '/brands', component: Brands },
  { name: 'brands-category', path: '/brands/:brandName', component: BrandsCategory }
]
if (!config.products.useShortCatalogUrls) {
  routes = routes.concat([{ name: 'virtual-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'bundle-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'simple-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'downloadable-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'grouped-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'configurable-product', path: '/p/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'product', path: '/p/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'category', path: '/c/:slug', component: Category },
    { name: 'cms-page', path: '/i/:slug', component: CmsPage },
    { name: 'cms-data', path: '/page/:slug', component: CmsData, props: { type: 'Page', sync: true } }])
} else {
  routes = routes.concat([{ name: 'virtual-product', path: '/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'bundle-product', path: '/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'simple-product', path: '/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'downloadable-product', path: '/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'grouped-product', path: '/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'configurable-product', path: '/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'product', path: '/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'cms-page', path: '/i/:slug', component: CmsPage },
    { name: 'category', path: '/:slug', component: Category },
    { name: 'cms-data', path: '/p/:slug', component: CmsData, props: { type: 'Page', sync: true } }])
}

export default routes
