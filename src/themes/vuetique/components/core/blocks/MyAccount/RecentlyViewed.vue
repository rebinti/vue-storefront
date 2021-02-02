<template>
  <div class="adj-margin">
    <template v-if="getrecentwithoutcurrent && getrecentwithoutcurrent.length">
      <h2 class="mb-4 text-center">
        {{ $t('Recently viewed') }}
      </h2>

      <div v-if="typeofview == 'carousel'" class="swiperslider">
        <no-ssr>
          <swiper class="swiper" :options="swiperOptions">
            <swiper-slide  v-for="product in getrecentwithoutcurrent"
                  v-if="!product._dontShowInListingFlag"
                  :key="product.id">
                  <product-tile-carousel
                    class="collection-product"
                    :product="product"
                    :labels-active="false"
                  />          
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>           
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
import ProductTileCarousel from 'theme/components/core/ProductTileCarousel'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  mixins: [RecentlyViewed],
  components: {
    'no-ssr': NoSSR,
    ProductListing,
    ProductTileCarousel,
    Swiper,
    SwiperSlide,    
  }, 
  data () {
    return {      
      swiperOptions: {
        slidesPerView: 6,
        spaceBetween: 2,
        slidesPerGroup: 3,
        lazy: true,
        loop: false,
        loopFillGroupWithBlank: false,
        direction: 'horizontal',
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          progressbarOpposite: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },          
        breakpoints: {
          2560: {
            slidesPerView: 8,
            spaceBetween: 5
          },              
          1920: {
            slidesPerView: 7,
            spaceBetween: 5
          },              
          1600: {
            slidesPerView: 6,
            spaceBetween: 5
          },              
          1440: {
            slidesPerView: 6,
            spaceBetween: 5
          },              
          1024: {
            slidesPerView: 4,
            spaceBetween: 5
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 5
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 2
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 2
          }
        }          
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
  methods: {
  }
}
</script>
<style lang="scss">
.new-collection{
  .swiperslider{
    .promotions__stamp-label{
        left:0px;
    }
  }
} 
.swiperslider{
  .swiper-container{
    .collection-product{
      .product-link{
        padding-left: 0rem;
        padding-right: 0rem;
        -ms-touch-action: pan-y;
        touch-action: pan-y;
        @media (min-width: 320px) {
          .prod_list{              
              height: 238.5px;
          }          
        }          
        @media (min-width: 375px) {
          .prod_list{              
              height: 279.75px;
          }          
        }          
        @media (min-width: 425px) {
          .prod_list{              
              height: 317.25px;
          }          
        }          
        @media (min-width: 768px) {
          .prod_list{              
              height: 379px;
          }          
        }          
        @media (min-width: 1024px) {
          .prod_list{              
              height: 378.375px;
          }          
        } 
        @media (min-width: 1440px) {
          .prod_list{              
              height: 353.745px;
          }          
        }                  
        @media (min-width: 1600px) {
          .prod_list{              
              height: 455.75px;
          }          
        }
        @media (min-width: 2000px) {
          .prod_list{              
              height: 473.445px;
          }          
        }
        @media (max-width: 576px){
          .prod_list{
            .wishlist-bx{
              right: 0px;
              bottom: 2px;
            }
          }
        }                        
      }
    }
  }
}
</style>
