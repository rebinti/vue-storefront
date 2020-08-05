<template>
  <div id="home">
    <!-- For loading the styla magazine content -->
    <Styla-home-magazine  />

    <!-- For loading the new arrivals Slider -->
    <section class="new-collection container mb-16">
      <div>
        <header class="mb-6">
          <h2 class="text-h1 leading-h1 text-center">
            {{ $t('Shop new arrivals') }}
          </h2>
        </header>
      </div>
      <div class="row center-xs">
          <no-ssr>
            <products-slider :products="newCollection" :config="sliderConfig"/>
          </no-ssr>
      </div>      
    </section>

  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
// 3rd party dependecies
import { isServer } from '@vue-storefront/core/helpers'
import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'

// Core pages
import Home from '@vue-storefront/core/pages/Home'

// Theme core components
// import ProductListing from 'theme/components/core/ProductListing'
import ProductsSlider from 'theme/components/core/ProductsSlider'


// Theme local components
import { Logger } from '@vue-storefront/core/lib/logger'
import config from 'config'
import { mapGetters } from 'vuex'
import ProductTile from 'theme/components/core/ProductTile'

import StylaHomeMagazine from "theme/components/theme/blocks/Styla/StylaHomeMagazine";

export default {
  mixins: [Home ],
  components: {
    'no-ssr': NoSSR,
    ProductsSlider,
    StylaHomeMagazine   
  },
  data () {
    return {
      loading: true,
      sliderConfig: {
        perPage: 5,
        // perPageCustom: [[0, 2], [768, 3], [1024, 4], [1600, 5]],  // Use this in product slider - to fix an infinte load issue
        paginationEnabled: false,
        loop: true,
        paginationSize: 6,
        navigationEnabled: true,
        navigationNextLabel: `<button type="button" class="carousel-nav-nxt"><svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 22"><path d="M.75 11h22.5m-10.5 10.5L23.25 11 12.75.5" stroke="#0C1214" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`,
        navigationPrevLabel: `<button type="button" class="carousel-nav-pre"><svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 22"><path d="M23.25 11H.75M11.25.5L.75 11l10.5 10.5" stroke="#0C1214" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`
      }, 
      setTimeoutSubscription: null    
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters('homepage', ['newCollection', 'salesCollection' ]),
  },
  created () {
    // Load personal and shipping details for Checkout page from IndexedDB
    this.$store.dispatch('checkout/load')
  },
  async beforeMount () {
    if (this.$store.state.__DEMO_MODE__) {
      const onboardingClaim  = await this.$store.dispatch('claims/check', { claimCode: 'onboardingAccepted' });
      if (!onboardingClaim) { // show onboarding info
        this.$bus.$emit('modal-toggle', 'modal-onboard')
        this.$store.dispatch('claims/set', { claimCode: 'onboardingAccepted', value: true })
      }
    }
  },

  async asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    Logger.info('Calling asyncData in Home (theme)')()

    await Promise.all([
      store.dispatch('category/list', { includeFields: config.entities.optimize ? config.entities.category.includeFields : null }),
      store.dispatch('attribute/list', { // load filter attributes for this specific category
          filterValues: config.products.defaultFilters, // TODO: assign specific filters/ attribute codes dynamicaly to specific categories
          includeFields: config.entities.optimize && isServer ? config.entities.attribute.includeFields : null
      }),
      // store.dispatch('ui/getSliderData', {
      //     key: '_type',
      //     value: "banner"
      // }),
      store.dispatch('homepage/fetchNewCollection'),
      store.dispatch('homepage/loadBestsellers'),
    ])
  },
  beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) { // Loading products to cache on SSR render
      next(vm =>
        vm.$store.dispatch('homepage/fetchNewCollection').then(res => {
          vm.loading = false
        })
      )
    } else {
      next()
    }
  },
  mounted() {
    this.$bus.$emit('send-to-emarsys-tracking');
    if ('styla' in window) {
    // if (window.styla !== null && window.styla['isReady'] !== undefined) {
      // if (typeof window.styla.init !== "undefined") window.styla.init()
       styla.init !== "undefined"&&styla.init()
    }
    this.$nextTick(() => {
      if ('styla' in window) {
        styla.init()
      }
    })
    this.setTimeoutSubscription = setTimeout(() => {
      if ('styla' in window) {
        styla.init()
      }
    }, 5000);
  },
  beforeDestroy () {
    if (this.setTimeoutSubscription) clearTimeout(this.setTimeoutSubscription)
  }
}
</script>
<style>

menu-list button.btn.btn-primary.p_btn{
 color: red !important;
 font-size: 26px;
}
@media screen and (max-width: 480px) {
    menu-list button.btn.btn-primary.p_btn{
        color: green !important;
        font-size: 42px;
       }
  } 
</style>
<style lang="scss">
.VueCarousel {
  .VueCarousel-dot {
    line-height: 1;

    &:focus {
      outline: none;
    }
  }

  .VueCarousel-navigation--disabled {
    display: none;
  }
  .carousel-nav-nxt { 
    position: absolute;
    left: -75px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ffffff;
    bottom: 15px;
    border: 1px solid #e2dddd;
  }
  .carousel-nav-nxt svg {
    margin: 0 auto;
  }
  .carousel-nav-pre svg {
    margin: 0 auto;
  }
  .carousel-nav-pre {
    position: absolute;
    right: -75px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ffffff;
    bottom: 15px;
    border: 1px solid #e2dddd;
  }
}
</style>