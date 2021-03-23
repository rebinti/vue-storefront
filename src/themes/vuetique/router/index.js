import config from 'config'
// import SocialLogin from 'theme/pages/SocialLogin'
// import SplashScreen from 'theme/pages/SplashScreen'
import Brands from 'theme/pages/brands'
import BrandsCategory from 'theme/pages/search-spring/brandsCategory'
import SearchSpringSearch from 'theme/pages/search-spring/SearchSpringSearch'

// const Home = () => import(/* webpackChunkName: "vsf-home" */ 'theme/pages/Home.vue')
const HomeWithStyla = () => import(/* webpackChunkName: "vsf-home-with-styla" */ 'theme/pages/HomeWithStyla.vue')
const PageNotFound = () => import(/* webpackChunkName: "vsf-not-found" */ 'theme/pages/PageNotFound.vue')
const ErrorPage = () => import(/* webpackChunkName: "vsf-error" */ 'theme/pages/Error.vue')
const PrivacyCentre = () => import(/* webpackChunkName: "vsf-error" */ 'theme/pages/PrivacyCentre.vue')
const Product = () => import(/* webpackChunkName: "vsf-product" */ 'theme/pages/Product.vue')
const GiftCard = () => import(/* webpackChunkName: "vsf-gift-card" */ 'theme/pages/GiftCard.vue')
const ResetPasswordPost = () => import(/* webpackChunkName: "vsf-reset-password-post" */ 'theme/pages/ResetPasswordPost.vue')
const Category = () => import(/* webpackChunkName: "vsf-category" */ 'theme/pages/search-spring/SearchSpringCategory.vue') // Category.vue
const CmsPage = () => import(/* webpackChunkName: "vsf-cms" */ 'theme/pages/CmsPage.vue')
const CmsBlockDemoPageSsr = () => import(/* webpackChunkName: "vsf-cms-demo" */ 'theme/pages/CmsBlockDemoPageSsr.vue')
const Checkout = () => import(/* webpackChunkName: "vsf-checkout" */ 'theme/pages/Checkout.vue')
const Compare = () => import(/* webpackChunkName: "vsf-compare" */ 'theme/pages/Compare.vue')
const MyAccount = () => import(/* webpackChunkName: "vsf-my-account" */ 'theme/pages/MyAccount.vue')
const MyAccountMenu = () => import(/* webpackChunkName: "vsf-my-account-menu" */ 'theme/pages/MyAccountMenu.vue')
const Static = () => import(/* webpackChunkName: "vsf-static" */ 'theme/pages/Static.vue') // footer links CMS page use this
const Styla = () => import(/* webpackChunkName: "vsf-styla" */ 'theme/pages/Styla.vue')
const CustomCmsPage = () => import(/* webpackChunkName: "vsf-custom-cms" */ 'theme/pages/CustomCmsPage.vue')
const CmsData = () => import(/* webpackChunkName: "vsf-data" */ 'theme/pages/CmsData.vue')
const ContactUs = () => import(/* webpackChunkName: "vsf-custom-cms" */ 'theme/pages/ContactUs.vue')

const SocialLogin = () => import(/* webpackChunkName: "vsf-social-login" */ 'theme/pages/SocialLogin.vue')
// const SearchSpringSearch = () => import(/* webpackChunkName: "vsf-splash" */ 'theme/pages/SearchSpringSearch')

// const Brands = () => import(/* webpackChunkName: "vsf-brands" */ 'theme/pages/brands')
// const BrandsCategory = () => import(/* webpackChunkName: "vsf-brand-category" */ 'theme/pages/brandsCategory')
const ExternalThankYouPage = () => import(/* webpackChunkName: "vsf-ext-order-success" */ 'theme/pages/ExternalSuccess.vue')

let routes = [
  { name: 'home', path: '/', component: HomeWithStyla, alias: '/pwa.html' },
  { name: 'checkout', path: '/checkout', component: Checkout },
  { name: 'legal', path: '/legal', component: Static, props: { page: 'lorem', title: 'Legal Notice' }, meta: { title: 'Legal Notice', description: 'Legal Notice - example of description usage' } },
  { name: 'customer-service-general', path: '/customer-service-general', component: Static, props: { page: 'lorem', title: 'Customer service', pageidentifierfromindex: 'customer-service-general' } },
  { name: 'privacy-policy-cookie-restriction-mode', path: '/privacy-policy-cookie-restriction-mode', component: Static, props: { page: 'lorem', title: 'Privacy Policy', pageidentifierfromindex: 'privacy-policy-cookie-restriction-mode' } },
  { name: 'help-faq', path: '/help-faq', component: Static, props: { page: 'lorem', title: 'Help/Faqs', pageidentifierfromindex: 'help-faq' } },
  { name: 'delivery-returns', path: '/delivery-returns', component: Static, props: { page: 'lorem', title: 'Delivery & Return', pageidentifierfromindex: 'delivery-returns' } },
  { name: 'reviews', path: '/reviews', component: Static, props: { page: 'lorem', title: 'Reviews', pageidentifierfromindex: 'reviews' } },
  { name: 'students', path: '/students', component: Static, props: { page: 'lorem', title: 'Students', pageidentifierfromindex: 'students' } },
  { name: 'size-guide', path: '/size-guide', component: Static, props: { page: 'lorem', title: 'Size guide', pageidentifierfromindex: 'size-guide' } },
  { name: 'magazine', path: '/magazine', component: Static, props: { page: 'lorem', title: 'Magazine' } },
  { name: 'sales', path: '/sales', component: Static, props: { page: 'lorem', title: 'Sales' } },
  { name: 'order-tracking', path: '/order-tracking', component: Static, props: { page: 'lorem', title: 'Track my Order' } },
  { name: 'my-account-menu', path: '/my-account-menu', component: MyAccountMenu, meta: { requiresAuth: true } },
  { name: 'my-account', path: '/my-account', component: MyAccount, meta: { requiresAuth: true } },
  { name: 'my-shipping-details', path: '/my-account/shipping-details', component: MyAccount, props: { activeBlock: 'MyShippingDetails' }, meta: { requiresAuth: true } },
  { name: 'my-newsletter', path: '/my-account/newsletter', component: MyAccount, props: { activeBlock: 'MyNewsletter' }, meta: { requiresAuth: true } },
  { name: 'my-orders', path: '/my-account/orders', component: MyAccount, props: { activeBlock: 'MyOrders' }, meta: { requiresAuth: true } },
  { name: 'my-order', path: '/my-account/orders/:orderId', component: MyAccount, props: { activeBlock: 'MyOrder' }, meta: { requiresAuth: true } },
  { name: 'my-recently-viewed', path: '/my-account/recently-viewed', component: MyAccount, props: { activeBlock: 'MyRecentlyViewed' }, meta: { requiresAuth: true } },
  { name: 'store-locator', path: '/store-locator', component: Static, props: { page: 'lorem', title: 'Store locator' } },
  // { name: 'gift-card', path: '/gift-card', component: Static, props: { page: 'lorem', title: 'Gift card' } },
  { name: 'delivery', path: '/delivery', component: Static, props: { page: 'lorem', title: 'Delivery' } },
  { name: 'order-from-catalog', path: '/order-from-catalog', component: Static, props: { page: 'lorem', title: 'Order from catalog' } },
  { name: 'contact', path: '/contact', component: Static, props: { page: 'contact', title: 'Contact' } },
  { name: 'compare', path: '/compare', component: Compare, props: { title: 'Compare Products' } },
  { name: 'page-not-found', path: '/page-not-found', component: PageNotFound },
  { name: 'error', path: '/error', component: ErrorPage },
  { name: 'privacy-centre', path: '/privacy-centre', component: PrivacyCentre, meta: { layout: 'empty' } },
  { name: 'custom-cms-page', path: '/custom-cms-page', component: CustomCmsPage },
  { name: 'cms-block-demo-page-ssr', path: '/cms-block-demo-page-ssr', component: CmsBlockDemoPageSsr },
  { name: 'about-us', path: '/about-us', component: CmsData, props: { identifier: 'about-us', type: 'Page', sync: true } },
  { name: 'contact-us', path: '/contact-us', component: Static, props: { page: 'lorem', title: 'Contact Us', pageidentifierfromindex: 'contact-us' } },
  { name: 'gift-cards', path: '/gift-card', component: GiftCard },
  { name: 'reset-password-post', path: '/reset-password-post', component: ResetPasswordPost },

  { name: 'mobile-social-login', path: '/social-login', component: SocialLogin },
  { name: 'search-spring', path: '/search', component: SearchSpringSearch },
  { name: 'brands', path: '/brands', component: Brands },
  { name: 'brands-category', path: '/brands/:brandName', component: BrandsCategory },

  { name: 'external-thank-you', path: '/order-success', component: ExternalThankYouPage },

  { name: 'inspiration-landing', path: '/inspiration-landing', component: Styla, props: { page: 'lorem', title: 'Inspiration' } },
  { name: 'inspiration-home', path: '/inspiration', component: Styla, props: { page: 'lorem', title: 'Inspiration' } },
  { name: 'inspiration-sub', path: '/inspiration/:slug', component: Styla, props: { page: 'lorem', title: 'Inspiration' } },
  { name: 'inspiration-sub-child', path: '/inspiration/:slug/:childSlug', component: Styla, props: { page: 'lorem', title: 'Inspiration' } }
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
