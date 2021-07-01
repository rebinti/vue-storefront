<template>
  <div id="page_not_found" class="page_not_foundddd">
    <section class="bg-grey-lighter py-12 px-12">
      <div class="container">
        <div class="text-center mb-20">
          <img src="/assets/icons/500.svg" alt="500">
        </div>
        <h2 class="text-center">
          {{ $t("Something went wrong ...") }}
        </h2>
        <div class="text-center mt-10">
          <p>
            {{ $t("We've noticed Internal Server Error while rendering this request.") }}
          </p>
          <p>
            {{ $t('If you need an assistance you can write to us through') }}
            <router-link :to="localizedRoute('/contact')" class="cl-secondary no-underline">
              {{ $t('a contact page') }}
            </router-link>.
          </p>
        </div>
      </div>
    </section>
    <section class="mb-20">
      <div class="container">
        <section class="container">
          <header class="col-md-12 py-4 mt-12 mb-6">
            <h2 class="text-center text-h2">
              {{ $t('See our bestsellers') }}
            </h2>
          </header>
          <div class="flex mb-6">
            <div class="w-full">
              <div class="justify-center cool-stuff-collection">
                <no-ssr>
                  <carousel v-bind="config">
                    <slide
                      v-for="product in ourBestsellersCollection"
                      :key="product.id"
                       v-if="!product._dontShowInListingFlag"
                    >
                      <product-tile-carousel
                        class="collection-product"
                        :product="product"
                        :labels-active="false"
                      />
                    </slide>
                  </carousel>
                </no-ssr>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <div @click="segmentifyhandleClicks" v-if="cookiebotSegmentifyrender" class="segmentify-dynamic-content"  id="seg-404-reco"></div>
  </div>
</template>

<script>
import Error from '@vue-storefront/core/pages/Error'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'
import { Carousel, Slide } from 'vue-carousel'
import NoSSR from 'vue-no-ssr'

import ProductTileCarousel from 'theme/components/core/ProductTileCarousel'

export default {
  name: 'Error',
  data () {
    return {
      config: {
        perPageCustom: [[0, 2.25], [768, 3], [1024, 4],[1440, 6],[1599, 5], [1600, 6], [1920, 7],[2560, 8]],
        paginationEnabled: false,
        loop: false,
        paginationSize: 5,
        navigationEnabled: true,
        navigationNextLabel: `<button type="button" class="carousel-nav-nxt"><svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 22"><path d="M.75 11h22.5m-10.5 10.5L23.25 11 12.75.5" stroke="#0C1214" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`,
        navigationPrevLabel: `<button type="button" class="carousel-nav-pre"><svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 22"><path d="M23.25 11H.75M11.25.5L.75 11l10.5 10.5" stroke="#0C1214" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`        
      },
      cookiebotSegmentifyrender: false,
    }
  },
  computed: {
    ourBestsellersCollection () {
      return this.$store.state.homepage.bestsellers
    }
  },
  components: {
    Slide,
    Carousel,
    ProductTileCarousel,
    'no-ssr': NoSSR
  },
  methods: {
    toggleSearchpanel () {
      document.querySelector('#search input[type="text"]').focus()
    },
    segmentifyhandleClicks (event) {
      this.$bus.$emit('segmentify-block-router-update',event);
    },     
  },
  mixins: [Error],
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      let ourBestsellersQuery = prepareQuery({ queryConfig: 'bestSellers' })
      store.dispatch('category/list', {}).then(categories => {
        store.dispatch('product/list', {
          query: ourBestsellersQuery,
          size: 8,
          sort: 'created_at:desc'
        }).then(res => {
          if (res) {
            store.state.homepage.bestsellers = res.items
            EventBus.$emitFilter('errorpage-after-load', { store: store, route: route }).then(results => {
              return resolve()
            }).catch(err => {
              console.error(err)
              return resolve()
            })
          }
        })
      })
    })
  },
  mounted() {
    window.segPageInf = {
        "category": "404 Page",
        "subCategory": ''
      }
      if(window && window.Cookiebot && window.Cookiebot.consent && window.Cookiebot.consent.preferences){
        this.cookiebotSegmentifyrender = true;
      }
  },
}
</script>

<style scoped lang="scss">
  a {
    @apply .font-medium .text-black;

    &:hover {
      @apply text-primary;
    }
  }
 .product {
    &.collection-product {
      padding: 0;
    }
  }

.collection-product {
  .product-link {
    @apply px-sm;
  }

  .product-image {
    height: auto;
    will-change: opacity;

    img {
      max-width: 100%;
      max-height: 100%;
      height: auto;
      vertical-align: bottom;
    }
  }
}

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
@media (max-width: 576px){
        .VueCarousel .VueCarousel-navigation .VueCarousel-navigation-prev{
            display:none;     
        }
        .VueCarousel .VueCarousel-navigation .VueCarousel-navigation-next{
            display:none;        
        }
}  
</style>
