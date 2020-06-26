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
            {{ $t('Shop new arrivals') }} -  Collection
          </h2>
        </header>
      </div>
      <div class="row center-xs">
          <no-ssr>
            <products-slider :products="newCollection" :config="sliderConfig"/>
          </no-ssr>
      </div>      
    </section>

    <promoted-offers collection="smallBanners" :limit="2" :columns="2" class="mt-2 mb-16 sm:my-8" /> 
    <!-- <promoted-offers collection="smallBanners" :limit="2" :offset="2" :columns="2" class="mt-2 mb-16 sm:my-8" /> -->
    <no-ssr>
      <products-slider class="mb-16" :title="$t('Sale and discount')" :products="salesCollection" :config="sliderConfig" />
    </no-ssr>
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
import NoSSR from 'vue-no-ssr'
// 3rd party dependecies
import { isServer } from '@vue-storefront/core/helpers'
import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'

// Core pages
import Home from '@vue-storefront/core/pages/Home'

// Theme core components
import ProductListing from 'theme/components/core/ProductListing'
import ProductsSlider from 'theme/components/core/ProductsSlider'
import MainSlider from 'theme/components/core/blocks/MainSlider/MainSlider-bkp1'  // MainSlider'

// Theme local components
import Onboard from 'theme/components/theme/blocks/Home/Onboard'
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import TileLinks from 'theme/components/theme/blocks/TileLinks/TileLinks'
import { Logger } from '@vue-storefront/core/lib/logger'
import CmsBlock from '../components/core/blocks/Cms/Block'
import PrismicCmsBlock from 'src/modules/dnd-prismic-cms/components/CmsBlock/View.vue'
import PrismicCmsPage from 'src/modules/dnd-prismic-cms/components/CmsPage/View.vue'
import config from 'config'
import { mapGetters } from 'vuex'
// import { Hooper,Slide,Pagination as HooperPagination} from 'hooper'
// import { Progress as HooperProgress} from 'hooper'
// import { Navigation as HooperNavigation} from 'hooper'
// import 'hooper/dist/hooper.css';
import ProductTile from 'theme/components/core/ProductTile'

export default {
  mixins: [Home , CmsBlock  ],  // PrismicCmsBlock , PrismicCmsPage
  components: {
    'no-ssr': NoSSR,
    MainSlider,
    Onboard,
    ProductListing,
    ProductsSlider,
    PromotedOffers,
    TileLinks,
    CmsBlock,
    PrismicCmsBlock,
    PrismicCmsPage,
    // Hooper,
    // Slide,
    // HooperProgress,
    // HooperPagination,
    // HooperNavigation,
    ProductTile     
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
      // hooperSettings: {
      //     infiniteScroll: true,
      //     centerMode: true,
      //     autoPlay: true,
      //     playSpeed: 3500,
      //     breakpoints: {
      //         1600: { 
      //             itemsToShow: 5
      //         },
      //         1024: { 
      //             itemsToShow: 4
      //         },
      //         768: { 
      //             itemsToShow: 3
      //         },
      //         425: {
      //             itemsToShow: 2
      //         },
      //         320: { 
      //             itemsToShow: 1
      //         },
      //         0: { 
      //             itemsToShow: 1
      //         }
      //     }
      // }        
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
    ...mapGetters('homepage', ['newCollection', 'salesCollection' ]),
    categories () {
      return this.$store.state.category.list
    },
    // newCollection () {
    //   return this.$store.state.homepage.new_collection
    // },
    // salesCollection () {
    //   return this.$store.state.homepage.sales_collection
    // },
  },
  created () {
    // Load personal and shipping details for Checkout page from IndexedDB
    this.$store.dispatch('checkout/load')
  },
  async beforeMount () {
    // this.$store.dispatch('attribute/list', { // load filter attributes for this specific category
    //     filterValues: config.products.defaultFilters, // TODO: assign specific filters/ attribute codes dynamicaly to specific categories
    //     includeFields: config.entities.optimize && isServer ? config.entities.attribute.includeFields : null
    // });
    // if (window && window.styla !== null) {
    //    window.styla.init && window.styla.init()
    // }
    if (this.$store.state.__DEMO_MODE__) {
      const onboardingClaim  = await this.$store.dispatch('claims/check', { claimCode: 'onboardingAccepted' });
      if (!onboardingClaim) { // show onboarding info
        this.$bus.$emit('modal-toggle', 'modal-onboard')
        this.$store.dispatch('claims/set', { claimCode: 'onboardingAccepted', value: true })
      }
    }
  },
  // asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
  //   const config = store.state.config
  //   return new Promise((resolve, reject) => {
  //     Logger.info('Calling asyncData in Home (theme)')()

  //     let newProductsQuery = prepareQuery({ queryConfig: 'Accessories' })
  //     let salesQuery = prepareQuery({ queryConfig: 'inspirations' })
  //     console.log('dataaaaaaaaaaa ===' , newProductsQuery);
  //     store.dispatch('category/list', { includeFields: config.entities.optimize ? config.entities.category.includeFields : null }).then((categories) => {
  //       store.dispatch('product/list', {
  //         query: newProductsQuery,
  //         size: 8,
  //         sort: 'created_at:desc',
  //         includeFields: config.entities.optimize ? (config.products.setFirstVarianAsDefaultInURL ? config.entities.productListWithChildren.includeFields : config.entities.productList.includeFields) : []
  //       }).catch(err => {
  //         reject(err)
  //       }).then((res) => {
  //         if (res) {
  //           store.state.homepage.new_collection = res.items
  //         }

  //         store.dispatch('product/list', {
  //           query: salesQuery,
  //           size: 12,
  //           sort: 'created_at:desc',
  //           includeFields: config.entities.optimize ? (config.products.setFirstVarianAsDefaultInURL ? config.entities.productListWithChildren.includeFields : config.entities.productList.includeFields) : []
  //         }).then((res) => {
  //           if (res) {
  //             store.state.homepage.sales_collection = res.items
  //           }
  //           return resolve()
  //         }).catch(err => {
  //           reject(err)
  //         })
  //       }).catch(err => {
  //         reject(err)
  //       })
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   })
  // },


  async asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    Logger.info('Calling asyncData in Home (theme)')()

    await Promise.all([
      store.dispatch('category/list', { includeFields: config.entities.optimize ? config.entities.category.includeFields : null }),
      store.dispatch('attribute/list', { // load filter attributes for this specific category
          filterValues: config.products.defaultFilters, // TODO: assign specific filters/ attribute codes dynamicaly to specific categories
          includeFields: config.entities.optimize && isServer ? config.entities.attribute.includeFields : null
      }),
      store.dispatch('ui/getSliderData', {
          key: '_type',
          value: "banner"
      }),
      // store.dispatch('homepage/fetchNewCollection'),
      // store.dispatch('homepage/loadBestsellers'),
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
    // if (window && window.styla !== null) {
    //    window.styla.init()
    // }
    
    this.$bus.$emit('send-to-emarsys-tracking');

    this.$store.dispatch('homepage/fetchNewCollection')

    this.$store.dispatch('homepage/loadBestsellers')
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
// @media (min-width: 320px) {
//   .new-collection{
//     .hooper{
//       height: 180px;
//     }  
//   }    
//   .hooper-list{
//     height: 180px;
//     .collection-product{
//       .product-link{
//         .prod_list{
//             width: 120px;
//             height: 180px;
//         }
//       }
//     }
//   }  
// }
// @media (min-width: 375px) {
//   .new-collection{
//     .hooper{
//       height: 221.25px;
//     }  
//   }   
//   .hooper-list{
//     height: 221.25px;
//     .collection-product{
//       .product-link{
//         .prod_list{
//             width: 147.5px;
//             height: 221.25px;
//         }
//       }
//     }
//   }  
// }
// @media (min-width: 425px) {
//   .new-collection{
//     .hooper{
//       height: 258.75px;
//     }  
//   }    
//   .hooper-list{
//     height: 258.75px;
//     .collection-product{
//       .product-link{
//         .prod_list{
//             width: 172.5px;
//             height: 258.75px;
//         }
//       }
//     }
//   }  
// }
// @media (min-width: 768px) {
//   .new-collection{
//     .hooper{
//       height: 333.99px;
//     }  
//   }
 
//   .hooper-list{
//     height: 333.99px;
//     .collection-product{
//       .product-link{
//         .prod_list{
//             width: 222.66px;
//             height: 333.99px;
//         }
//       }
//     }
//   }  
// }
// @media (min-width: 1024px) {
//   .new-collection{
//     .hooper{
//       height: 327px;
//     } 
//   }
 
//   .hooper-list{
//     height: 327px;
//     .collection-product{
//       .product-link{
//         .prod_list{
//             width: 218px;
//             height: 327px;
//         }
//       }
//     }
//   }  
// }
// @media (min-width: 1600px) {
//   .new-collection{
//     .hooper{
//       height: 438px;
//     }
//   }
//   .hooper{
//     height: 438px;
//   }
//   .hooper-list{
//     height: 438px;
//     .collection-product{
//       .product-link{
//         .prod_list{
//             width: 292px;
//             height: 438px;
//         }
//       }
//     }
//   }
// } 
</style>