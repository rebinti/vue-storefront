<template>
  <div class="adj-margin">
    <template v-if="getrecentwithoutcurrent && getrecentwithoutcurrent.length">
      <h2 class="mb-4 text-center">
        {{ $t('Recently viewed') }}
      </h2>

      <div v-if="typeofview == 'carousel'">
        <no-ssr>
          <carousel v-bind="sliderConfig" @pageChange="setMuted" :key="refresh">
            <slide 
              v-for="product in getrecentwithoutcurrent"
              v-if="!product._dontShowInListingFlag"
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

      <product-listing v-else columns="4" :products="getrecentwithoutcurrent" />
    </template>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { mapGetters } from 'vuex'
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
        perPageCustom: [[0, 2], [768, 3], [1024, 4], [1600, 5]],
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
    },
    currentproductsku: {
      type: String,
      required: false,
      default: 'skuvalue'
    }
  },
  computed: {
    ...mapGetters({
      currentProduct: 'product/productCurrent',
    }),
    getrecentwithoutcurrent () {
      if (this.items.length) {
         return this.items.filter(val => val.sku != this.currentproductsku)
      } else {
         return null
      }
    },    
  },
  beforeMount () {
    this.$bus.$on('product-after-load', ()=> { this.$store.dispatch('recently-viewed/addItem', this.currentProduct)})
  },
  beforeDestroy () {
    this.$bus.$off('product-after-load')
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
@media (min-width: 320px) {   
  .VueCarousel{    
    .collection-product{
      .product-link{
        .prod_list{
            width: 120px;
            height: 180px;
        }
      }
      // .title-and-wish{
        // .ptitle{
        //   width: 61%;
        // }
        // .pwishlist{
        //   width: 38%;     
        // }   
      // }      
    }
  }  
}
@media (min-width: 375px) { 
  .VueCarousel{    
    .collection-product{
      .product-link{
        .prod_list{
            width: 147.5px;
            height: 221.25px;
        }
      }
      // .title-and-wish{
      //   .ptitle{
      //     width: 69%;
      //   }
      //   .pwishlist{
      //     width: 31%;     
      //   }   
      // }       
    }
  }  
}
@media (min-width: 425px) {   
  .VueCarousel{    
    .collection-product{
      .product-link{
        .prod_list{
            width: 172.5px;
            height: 258.75px;
        }
      }
      // .title-and-wish{
      //   .ptitle{
      //     width: 71%;
      //   }
      //   .pwishlist{
      //     width: 29%;     
      //   }   
      // }        
    }
  }  
}
@media (min-width: 768px) {  
  .VueCarousel{    
    .collection-product{
      .product-link{
        .prod_list{
            width: 222.66px;
            height: 333.99px;
        }
      }
    }
  }  
}
@media (min-width: 1024px) {
  .VueCarousel{    
    .collection-product{
      .product-link{
        .prod_list{
            width: 218px;
            height: 327px;
        }
      }
    }
  }  
}
@media (min-width: 1600px) {
  .VueCarousel{    
    .collection-product{
      .product-link{
        .prod_list{
            width: 292px;
            height: 438px;
        }
      }
      // .title-and-wish{
      //   .ptitle{
      //     width: 80%;
      //   }
      //   .pwishlist{
      //     width: 20%;     
      //   }   
      // }      
    }
  }
} 

@media (max-width: 768px) {
  .adj-margin {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>
