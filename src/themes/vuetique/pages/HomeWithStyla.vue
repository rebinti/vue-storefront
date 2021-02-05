<template>
  <div id="home">
    <div class="loader--style3 mainhomestylaloader" style="" title="2" v-if="stylaloaderflag" >
          <img src="/assets/opc-ajax-loader.svg" style="margin: 0 auto;width:55px;">                  
    </div>    
    <!-- For loading the styla magazine content -->
    <Styla-home-magazine  />

    <!-- For loading the new arrivals Slider 
    <section class="new-collection w-full home-new-arrival mb-16">
      <div>
        <header class="mb-6">
          <h2 class="text-h1 leading-h1 text-center">
            {{ $t('Shop new arrivals') }}
          </h2>
        </header>
      </div>
      <div class="row center-xs swiperslider">
          <no-ssr>
            <products-slider :products="newCollection" :config="sliderConfig"/>
          </no-ssr>
      </div>
-->

  <!-- <div
    class="cms-content py-10 page-content"
    v-if="cmspageseodata"
    v-html="cmspageseodata.meta_description"
  />    
   </section>
           -->
   
  <div @click="segmentifyhandleClicks" class="segmentify-dynamic-content" id='seg-home-reco'></div>

  <div @click="testclick" class="testclick" id='testclick'>test click</div>
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
import SwipersliderHome from 'theme/components/core/SwipersliderHome'


// Theme local components
import { Logger } from '@vue-storefront/core/lib/logger'
import config from 'config'
import { mapGetters } from 'vuex'
import ProductTile from 'theme/components/core/ProductTile'

import StylaHomeMagazine from "theme/components/theme/blocks/Styla/StylaHomeMagazine";

import { htmlDecode } from '@vue-storefront/core/filters/html-decode'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'

export default {
  mixins: [Home ],
  components: {
    'no-ssr': NoSSR,
    ProductsSlider,
    StylaHomeMagazine,
    SwipersliderHome,
  },
  data () {
    return {
      loading: true,
      cmspageidentifier:'amphomepage',
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
      setTimeoutSubscription: null,
      stylaloaderflag: false,
    }
  },
  methods: {
    setSegmentify() {
      // For working Segmentify
      window.segPageInf = {
        "category": "Home Page",
        "subCategory": ""
      }
    },
    segmentifyhandleClicks (event) {
      this.$bus.$emit('segmentify-block-router-update',event);
      // event.preventDefault()
      //   // ensure we use the link, in case the click has been received by a subelement        
      //   let { target } = event                
      //   while (target && target.tagName !== 'A') target = target.parentNode
      //   // handle only links that occur inside the component and do not reference external resources
      //   if (target && target.matches(".segmentify-dynamic-content a") && target.href) {
      //     // some sanity checks taken from vue-router:
      //     // https://github.com/vuejs/vue-router/blob/dev/src/components/link.js#L106
      //     const { altKey, ctrlKey, metaKey, shiftKey, button, defaultPrevented } = event
      //     // don't handle with control keys
      //     if (metaKey || altKey || ctrlKey || shiftKey) return
      //     // don't handle when preventDefault called
      //     //if (defaultPrevented) return
      //     // don't handle right clicks
      //     if (button !== undefined && button !== 0) return
      //     // don't handle if `target="_blank"`
      //     if (target && target.getAttribute) {
      //       const linkTarget = target.getAttribute('target')
      //       if (/\b_blank\b/i.test(linkTarget)) return
      //     }
      //     // don't handle same page links/anchors
      //     const url = new URL(target.href)
      //     const to = url.pathname
      //     if (window.location.pathname !== to && event.preventDefault) {
      //       event.preventDefault()
      //       //this.$router.push(to)
      //       this.$router.push({ path: to, query: { _sgm_campaign: url.searchParams.get('_sgm_campaign') , _sgm_source: url.searchParams.get('_sgm_source') , _sgm_action: url.searchParams.get('_sgm_action') } })
      //     }
      //   }
    },
    testclick (event) {
      console.log("testttttttttttttttttt 000000000000007")
      
    }     
  },
  computed: {
    ...mapGetters('homepage', ['newCollection', 'salesCollection' ]),
    cmspageseodata () {
        
            return this.$store.getters[`cmsPage/cmsPageIdentifier`]('amphomepage')
        
    },
  },
  created () {
    // Load personal and shipping details for Checkout page from IndexedDB
    this.$store.dispatch('checkout/load')
    this.stylaloaderflag = true
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
      store.dispatch('cmsPage/single', {key: 'identifier.keyword',
        value: 'amphomepage',
        skipCache: true }),
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
    // console.log("GRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR",this.cmspageseodata)
    this.$bus.$emit('send-to-emarsys-tracking');    
    if ('styla' in window) {
      console.log("AAAAAAAAAA111", window.styla.callbacks )
      // if (window.styla !== null && window.styla['isReady'] !== undefined) {
      // if (typeof window.styla.init !== "undefined") window.styla.init()
       styla.init !== "undefined"&&styla.init()
       this.stylaloaderflag = false
    }
    // this.$nextTick(() => {
    //   if ('styla' in window) {
    //     styla.init()
    //     this.stylaloaderflag = false
    //   }
    // })
    // this.setTimeoutSubscription = setTimeout(() => {
    //   if ('styla' in window) {
    //     styla.init()
    //   }
    //   this.stylaloaderflag = false
    // }, 5000);
    // For working Segmentify
    this.setSegmentify()
  },
  beforeDestroy () {
    if (this.setTimeoutSubscription) clearTimeout(this.setTimeoutSubscription)
  },
  metaInfo () {
    const storeView = currentStoreView()
    return {
      link: [
        { rel: 'amphomepage',
          href: this.$router.resolve(localizedRoute({
            name: 'home-amp',
            params: {
              slug: '/'
            }
          }, storeView.storeCode)).href
        }
      ],
      title: htmlDecode(this.cmspageseodata.meta_title || 'Iclothing Homeee'),
      meta: this.cmspageseodata.meta_description ? [{ vmid: 'description', name: 'description', content: htmlDecode(this.cmspageseodata.meta_description) }] : []
    }
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
.mainhomestylaloader{
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    top: 500px;
}
@media screen and (max-width: 1024px) {
  .mainhomestylaloader{
      position: absolute;
      left: 0;
      right: 0;
      z-index: 1;
      top: 350px;
  }
}
@media screen and (max-width: 480px) {
  .mainhomestylaloader{
      position: absolute;
      left: 0;
      right: 0;
      z-index: 1;
      top: 150px;
  }
}
</style>