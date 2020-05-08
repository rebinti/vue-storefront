<template>
  <div id="home">

    <div class="search_out_pop">

      <div class="search_out_pop_inner">
        <svg viewBox="0 0 25 25" class="vt-icon">
          <use xlink:href="#search" />
        </svg>
       <input type="text" @click="toggleSearchpanel" class="icon_bg"  style="width: 94%;" placeholder="Search for Products">
       
      </div>

    </div>
    
    <main-slider />
    
     <div class="container banner_3_sec">
          <div class="menu-list col-6">
                <cms-block :identifier="'vue-cms-home-block1'" />
          </div>
    </div> 
    <div class="container">
          <div class="menu-list col-6">
                 <!-- <prismic-cms-block :identifier="'banner'"  />  -->
                 <!-- <prismic-cms-page :slug="'123456'"  />  -->
          </div>
    </div> 

    <!-- <promoted-offers collection="smallBanners" :limit="2" :columns="2" class="mt-2 mb-16 sm:my-8" /> -->

    <div class="container">
              <div class="menu-list col-6">
                    <cms-block :identifier="'vue-home-2banner'"  />
              </div>
    </div> 

    <section class="new-collection container mb-16">
      <div>
        <header class="mb-6">
          <h2 class="text-h1 leading-h1 text-center">
            {{ $t('Shop new arrivals') }}
          </h2>
        </header>
      </div>
      <div class="row center-xs">
        <product-listing columns="4" :products="newCollection" />
      </div>
    </section>

    <promoted-offers collection="smallBanners" :limit="2" :columns="2" class="mt-2 mb-16 sm:my-8" /> 
    <!-- <promoted-offers collection="smallBanners" :limit="2" :offset="2" :columns="2" class="mt-2 mb-16 sm:my-8" /> -->

    <products-slider class="mb-16" :title="$t('Sale and discount')" :products="salesCollection" :config="sliderConfig" />

    <section class="container mb-16">
      <div class="justify-center">
        <header class="mb-6">
          <h2 class="text-h1 leading-h1 text-center">
            {{ $t('Get inspired') }}
          </h2>
        </header>
      </div>
      <!-- <tile-links /> -->
      <!-- <cms-block :identifier="'vue-home-6banner'" /> -->
        <prismic-cms-block :identifier="'vue-home-6banner'"/>
    </section>
    <Onboard />

    <section class="container mb-16">
      <div data-styla-slot="f0adc473-c041-43a6-9370-646ac8d44fae"></div>
    </section>

    <div class="container mr_kst">
        <div class="menu-list col-6">
              <cms-block :identifier="'vue-cms-home-offer-banner'" />
        </div>
    </div>     
  </div>
</template>

<script>
// 3rd party dependecies
import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'

// Core pages
import Home from '@vue-storefront/core/pages/Home'

// Theme core components
import ProductListing from 'theme/components/core/ProductListing'
import ProductsSlider from 'theme/components/core/ProductsSlider'
import MainSlider from 'theme/components/core/blocks/MainSlider/MainSlider'

// Theme local components
import Onboard from 'theme/components/theme/blocks/Home/Onboard'
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import TileLinks from 'theme/components/theme/blocks/TileLinks/TileLinks'
import { Logger } from '@vue-storefront/core/lib/logger'
import CmsBlock from '../components/core/blocks/Cms/Block'
import PrismicCmsBlock from 'src/modules/dnd-prismic-cms/components/CmsBlock/View.vue'
import PrismicCmsPage from 'src/modules/dnd-prismic-cms/components/CmsPage/View.vue'


export default {
  mixins: [Home , CmsBlock  ],  // PrismicCmsBlock , PrismicCmsPage
  components: {
    MainSlider,
    Onboard,
    ProductListing,
    ProductsSlider,
    PromotedOffers,
    TileLinks,
    CmsBlock,
    PrismicCmsBlock,
    PrismicCmsPage
  },
  data () {
    return {
      sliderConfig: {
        perPage: 1,
        perPageCustom: [[0, 2], [1024, 4]],
        paginationEnabled: true,
        loop: true,
        paginationSize: 6
      }
    }
  },
  methods: {
    toggleSearchpanel () {
      // this.$store.commit('ui/setSearchpanel', true)
       this.$router.push(this.localizedRoute('/search'))
      // this.$bus.$emit('HomefocusSearchInput') 
    }
  },
  computed: {
    categories () {
      return this.$store.state.category.list
    },
    newCollection () {
      return this.$store.state.homepage.new_collection
    },
    salesCollection () {
      return this.$store.state.homepage.sales_collection
    }
  },
  created () {
    // Load personal and shipping details for Checkout page from IndexedDB
    this.$store.dispatch('checkout/load')
  },
  beforeMount () {
    if (window.styla !== null) {
       window.styla.init()
    }
    if (this.$store.state.__DEMO_MODE__) {
      this.$store.dispatch('claims/check', { claimCode: 'onboardingAccepted' }).then((onboardingClaim) => {
        if (!onboardingClaim) { // show onboarding info
          this.$bus.$emit('modal-toggle', 'modal-onboard')
          this.$store.dispatch('claims/set', { claimCode: 'onboardingAccepted', value: true })
        }
      })
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    const config = store.state.config
    return new Promise((resolve, reject) => {
      Logger.info('Calling asyncData in Home (theme)')()

      let newProductsQuery = prepareQuery({ queryConfig: 'Accessories' })
      let salesQuery = prepareQuery({ queryConfig: 'inspirations' })
      console.log('dataaaaaaaaaaa ===' , newProductsQuery);
      store.dispatch('category/list', { includeFields: config.entities.optimize ? config.entities.category.includeFields : null }).then((categories) => {
        store.dispatch('product/list', {
          query: newProductsQuery,
          size: 8,
          sort: 'created_at:desc',
          includeFields: config.entities.optimize ? (config.products.setFirstVarianAsDefaultInURL ? config.entities.productListWithChildren.includeFields : config.entities.productList.includeFields) : []
        }).catch(err => {
          reject(err)
        }).then((res) => {
          console.log('newProductsQuery --- ress' , res);
          if (res) {
            store.state.homepage.new_collection = res.items
          }

          store.dispatch('product/list', {
            query: salesQuery,
            size: 12,
            sort: 'created_at:desc',
            includeFields: config.entities.optimize ? (config.products.setFirstVarianAsDefaultInURL ? config.entities.productListWithChildren.includeFields : config.entities.productList.includeFields) : []
          }).then((res) => {
            if (res) {
              store.state.homepage.sales_collection = res.items
            }
            return resolve()
          }).catch(err => {
            reject(err)
          })
        }).catch(err => {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    })
  },
  mounted() {
    if (window.styla !== null) {
       window.styla.init()
    }
    
    this.$bus.$emit('send-to-emarsys-tracking');
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
