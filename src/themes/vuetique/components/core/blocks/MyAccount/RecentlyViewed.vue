<template>
  <div>
    <template v-if="items && items.length">
      <h2 class="mb-4 text-center">
        {{ $t('Recently viewed') }}
      </h2>

      <div v-if="typeofview == 'carousel'">
        <no-ssr>
          <carousel v-bind="sliderConfig" @pageChange="setMuted" :key="refresh">
            <slide 
              v-for="product in items"
              :key="product.id"
            >
              <product-tile
                class="collection-product"
                :product="product"
                :labels-active="false"
              />
            </slide>
          </carousel>
        </no-ssr>
      </div>

      <product-listing v-else columns="4" :products="items" />
    </template>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import RecentlyViewed from '@vue-storefront/core/modules/recently-viewed/components/RecentlyViewed'
import ProductListing from 'theme/components/core/ProductListing.vue'
import ProductTile from 'theme/components/core/ProductTile'
import { Carousel, Slide } from 'vue-carousel'


export default {
  mixins: [RecentlyViewed],
  components: {
    ProductListing,
    ProductTile,
    Carousel,
    Slide
  },
  data () {
    return {
      currentPage: 0,
      sliderConfig: {
        // perPage: 1,
        perPageCustom: [[0, 2], [768, 3], [1024, 4]],
        paginationEnabled: false,
        loop: false,
        paginationSize: 6,
        navigationEnabled: true,
        navigationNextLabel: `<button type="button" class="carousel-nav-next"><svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 22"><path d="M.75 11h22.5m-10.5 10.5L23.25 11 12.75.5" stroke="#0C1214" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`,
        navigationPrevLabel: `<button type="button" class="carousel-nav-prev"><svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 22"><path d="M23.25 11H.75M11.25.5L.75 11l10.5 10.5" stroke="#0C1214" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`
      },
      refresh: 0
    }
  },
  props: {
    typeofview: {
      type: String,
      required: false,
      default: 'normalView'
    }
  },
  components: {
    'no-ssr': NoSSR, ProductListing, Carousel, Slide, ProductTile
  },
  methods: {
    setMuted (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>


<style lang="scss">
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


  .carousel-nav-next {
    position: absolute;
    left: -75px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ffffff;
    bottom: 15px;
    border: 1px solid #e2dddd;
  }
  .carousel-nav-next svg {
    margin: 0 auto;
  }
  .carousel-nav-prev svg {
    margin: 0 auto;
  }
  .carousel-nav-prev {
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
