<template>
  <div id="page_not_found">
    <section class="bg-grey-lighter py-12 px-12">
      <div class="container">
        <!-- <div class="text-center mb-20">
          <img src="/assets/icons/404.svg" alt="404">
        </div> -->
     
        <h2 class="text-center">
          {{ $t("WHOOPS, OUR BAD...") }}
        </h2>
        <div class="text-center mt-10">
          <h3 class="text-center">
            {{ $t("The page you requested was not found, and we have a fine guess why.") }}
          </h3>          
          <p>
            {{ $t("If you typed the URL directly, please make sure the spelling is correct.") }}
          </p>
          <p>
            {{ $t("If you clicked on a link to get here, the link is outdated.") }}
          </p>   
          <h3 class="text-center">
            {{ $t("What can you do?") }}
          </h3>          
          <p>
            {{ $t("Have no fear, help is near! There are many ways you can get back on track with Magento Store.") }}
          </p>
          <p>{{ $t("Go back to the previous page.") }}</p>  
          <p>{{ $t("Use the search bar at the top of the page to search for your products.") }}</p>  
          <p>{{ $t("Follow these links to get you back on track!") }}</p>  
          
          <p>{{"Store "}}<router-link :to="localizedRoute('/')" class="cl-secondary no-underline">{{"Home"}}</router-link>{{ $t(" | ") }}<router-link :to="localizedRoute('/my-account')" class="cl-secondary no-underline">{{"My Account"}}</router-link></p>  
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
  </div>
</template>

<script>
import PageNotFound from '@vue-storefront/core/pages/PageNotFound'
import ProductTileCarousel from 'theme/components/core/ProductTileCarousel'
import { Carousel, Slide } from 'vue-carousel'
import NoSSR from 'vue-no-ssr'

export default {
  name: 'PageNotFound',
  data () {
    return {
      config: {
        perPageCustom: [[0, 2], [768, 3], [1024, 4],[1440, 6],[1599, 5], [1600, 6], [1920, 7],[2560, 8]],
        paginationEnabled: false,
        loop: false,
        paginationSize: 5,
        navigationEnabled: true,
        navigationNextLabel: `<button type="button" class="carousel-nav-nxt"><svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 22"><path d="M.75 11h22.5m-10.5 10.5L23.25 11 12.75.5" stroke="#0C1214" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`,
        navigationPrevLabel: `<button type="button" class="carousel-nav-pre"><svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 22"><path d="M23.25 11H.75M11.25.5L.75 11l10.5 10.5" stroke="#0C1214" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`        
      }
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
    }
  },
  mixins: [PageNotFound]
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
</style>
