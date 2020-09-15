<template>
  <div class="default-layout" :class="{ 'header-fixed': navFixed, 'header-visible': navVisible }">
    <icons />
    <overlay v-if="overlayActive" />
    <loader />
    <div id="viewport" class="w-full relative">
      <announcement />
      <main-header />
      <header-menu />
      <transition name="slide-right">
        <sidebar-menu v-if="isSidebarOpen" />
      </transition>
      <transition name="slide-left">
        <microcart v-if="isMicrocartOpen" />
        <search-panel v-if="isSearchPanelOpen" />
        <wishlist v-if="isWishlistOpen" />
        <review-panel v-if="isReviewPanelOpen" />
        <productSidePanel v-if="isProductSidePanelOpen" />
        <productDetailsSidePanel v-if="isProductDetailsSidePanelOpen" />
      </transition>
      <slot />
      <main-footer />
      <notification />
      <sign-up />
      <popup-boards />
      <newsletter-popup />
      <out-of-stock-popup />
      <product-with-options-popup />
      <cookie-notification />
      <offline-badge />
      <modal-switcher />
      <order-confirmation :orders-data="ordersData" v-if="loadOrderConfirmation" />
    </div>
    <vue-progress-bar />
  </div>
</template>

<script>
import config from 'config'
import { mapState } from 'vuex'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { router } from '@vue-storefront/core/app'
import { localizedRoute, currentStoreView } from '@vue-storefront/core/lib/multistore'

import MainHeader from 'theme/components/core/blocks/Header/Header.vue'
import MainFooter from 'theme/components/core/blocks/Footer/Footer.vue'

import HeaderMenu from 'theme/components/core/blocks/HeaderMenu/HeaderMenu.vue'

import Overlay from 'theme/components/core/Overlay.vue'
import Loader from 'theme/components/core/Loader.vue'
import Modal from 'theme/components/core/Modal.vue'
import Notification from 'theme/components/core/Notification.vue'
import SignUp from 'theme/components/core/blocks/Auth/SignUp.vue'
import NewsletterPopup from 'theme/components/core/NewsletterPopup.vue'
import OutOfStockPopup from 'theme/components/core/OutOfStockPopup.vue'
import ProductWithOptionsPopup from 'theme/components/core/ProductWithOptionsPopup.vue'
import CookieNotification from 'theme/components/core/CookieNotification.vue'
import OfflineBadge from 'theme/components/core/OfflineBadge.vue'
import ModalSwitcher from 'theme/components/core/blocks/Switcher/Language.vue'

import Announcement from 'theme/components/theme/blocks/Header/Announcement.vue'
import Icons from 'theme/components/theme/Icons.vue'

import {EmarsysTracker} from 'theme/mixins/emarsys/EmarsysTracker'

import Head from 'theme/head'
import ReviewPanel from 'theme/components/core/blocks/ReviewsPanel/ReviewsPanel.vue'
import PopupBoards  from 'theme/components/core/blocks/Boards/PopupBoards.vue'

const SearchPanel = () => import(/* webpackChunkName: "vsf-search-panel" */ 'theme/components/core/blocks/SearchPanel/SearchPanel.vue')
const SidebarMenu = () => import(/* webpackChunkName: "vsf-sidebar-menu" */ 'theme/components/core/blocks/SidebarMenu/SidebarMenu.vue')
const Microcart = () => import(/* webpackChunkName: "vsf-microcart" */ 'theme/components/core/blocks/Microcart/Microcart.vue')
const Wishlist = () => import(/* webpackChunkName: "vsf-wishlist" */ 'theme/components/core/blocks/Wishlist/Wishlist.vue')
// const ReviewPanel = () => import(/* webpackChunkName: "vsf-reviews-panel" */ 'theme/components/core/blocks/ReviewsPanel/ReviewsPanel.vue')

const OrderConfirmation = () => import(/* webpackChunkName: "vsf-order-confirmation" */ 'theme/components/core/blocks/Checkout/OrderConfirmation.vue')
//  const Boards = () => import(/* webpackChunkName: "vsf-boards" */ 'theme/components/core/blocks/Boards/Wishlist.vue')

const ProductSidePanel = () => import(/* webpackChunkName: "vsf-reviews-panel" */ 'theme/components/core/blocks/Product/ProductSidePanel.vue')
const ProductDetailsSidePanel = () => import(/* webpackChunkName: "vsf-reviews-panel" */ 'theme/components/core/blocks/Product/ProductDetailsSidePanel.vue')

export default {
  data () {
    return {
      loadOrderConfirmation: false,
      ordersData: [],
      navFixed: false,
      navVisible: false,
      isScrolling: false,
      scrollTop: 0,
      lastScrollTop: 0,
      headerHeight: 165,
      navbarHeight: 70,
      stylaLoaded: false
    }
  },
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay,
      isSearchPanelOpen: state => state.ui.searchpanel,
      isSidebarOpen: state => state.ui.sidebar,
      isMicrocartOpen: state => state.ui.microcart,
      isWishlistOpen: state => state.ui.wishlist,
      isReviewPanelOpen: state => state.ui.reviewPanel,
      isProductSidePanelOpen: state => state.ui.productSidePanelFlag,
      isProductDetailsSidePanelOpen: state => state.ui.productDetailsSidePanelFlag
    })
  },
  methods: {
    onOrderConfirmation (payload) {
      this.loadOrderConfirmation = true
      this.ordersData = payload
      EventBus.$emit('modal-show', 'modal-order-confirmation')
    },
    hasScrolled () {
      this.scrollTop = window.scrollY
      if (this.scrollTop > this.headerHeight) {
        this.navFixed = true
        if (this.scrollTop < this.lastScrollTop && this.scrollTop > this.headerHeight + this.navbarHeight * 2) {
          this.navVisible = true
        } else {
          this.navVisible = false
        }
      } else {
        this.navFixed = false
        this.navVisible = false
      }
      this.lastScrollTop = this.scrollTop
    },
    fetchCmsBlockData () {
       return this.$store.dispatch('cmsBlock/list', {filterValues: config.cmsBlocksDataFetchConfig.cmsBLockList})
    },
    stylaScriptsInsatallation (f, b, e, v, callback) {
      let t, s;
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
      t.onload = callback;
    },
    initStyla() {
      this.stylaScriptsInsatallation(
      window,
      document,
      "script",
      "https://client-scripts.styla.com/scripts/clients/iclothing-import.js",
      () => { 
        this.stylaScriptsInsatallation(
                window,
                document,
                "script",
                "https://engine.styla.com/init.js",
                () => {
                 if(this.$route.path === '/' || this.$route.path.includes('inspiration')){
                   this.setStylaPageModuleTracker() 
                 } 
               }
            );
        }
     )
    },
    /*
      For managing Styla module pages contents and its routing href tags
      and changing those href tags to Vue.js based internel routing.
    */
    setStylaPageModuleTracker() {
         if(this.stylaLoaded) return
         window.styla.init()
         setTimeout(() => {
                if(this.stylaLoaded) return
                if(window.styla && window.styla.hooks) this.stylaLoaded = true;
                else return
                  window.styla.hooks.register( 'moduleRender', function( _data, domNode ) {
                  if (!domNode) {
                    return;
                  }
                  // Apply here any desired intervention over the module's DOM structure
                  let anchors = domNode.querySelectorAll('a');
                  let anchorClickLogic = (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    let target = event.target          
                    while (target) {
                        if (target instanceof HTMLAnchorElement) {
                          let link = target.getAttribute('href')
                          if (link.substr(0, 4) === 'http') {
                          const newLocation = link.replace('https://www.iclothing.com', '')
                            router.push(localizedRoute(newLocation, currentStoreView().storeCode))
                          } else {
                            router.push(localizedRoute(target.getAttribute('href'), currentStoreView().storeCode))
                          }
                          break
                    }
                    target = target.parentNode
                  }
              };
              anchors.forEach(anchor => anchor.onclick = anchorClickLogic);
            }, 'render' );
        }, 2000);
    }

  },
  serverPrefetch () {
    return this.fetchCmsBlockData()
  },
  beforeMount () {
    // Progress bar on top of the page
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start()
      this.$Progress.increase(40)
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
      if(!this.stylaLoaded) this.setStylaPageModuleTracker()
    })
    EventBus.$on('offline-order-confirmation', this.onOrderConfirmation)

    window.addEventListener('scroll', () => {
      this.isScrolling = true
    }, {passive: true})

    setInterval(() => {
      if (this.isScrolling) {
        this.hasScrolled()
        this.isScrolling = false
      }
    }, 250)
  
    this.initStyla();
  },
  beforeDestroy () {
    EventBus.$off('offline-order-confirmation', this.onOrderConfirmation)
  },
  created () {
      this.$store.dispatch('ui/getBrandList', {
        key: '_type',
        value: "brand"
      })
  },
  metaInfo: Head,
  components: {
    MainHeader,
    MainFooter,
    HeaderMenu,
    Microcart,
    Wishlist,
    // Boards,
    SearchPanel,
    SidebarMenu,
    Overlay,
    Loader,
    Notification,
    Modal,
    SignUp,
    NewsletterPopup,
    OutOfStockPopup,
    ProductWithOptionsPopup,
    PopupBoards,
    CookieNotification,
    OfflineBadge,
    ModalSwitcher,
    OrderConfirmation,
    Announcement,
    Icons,
    ReviewPanel,
    ProductSidePanel,
    ProductDetailsSidePanel
  },
   mixins: [EmarsysTracker]
}
</script>

<style lang="scss" src="theme/css/main.scss"></style>
<style lang="scss" scoped>
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: transform .25s;
  }

  .slide-left-enter,
  .slide-left-leave-to {
    transform: translateX(100%);
  }

  .slide-right-enter,
  .slide-right-leave-to {
    transform: translateX(-100%);
  }
</style>
