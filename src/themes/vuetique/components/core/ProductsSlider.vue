<template>
  <div class="collection w-full main-product-slider">
    <header class="mb-6">
      <h2 class="text-center">
        {{ title }}
      </h2>
    </header>    
      <swiper class="swiper" :options="swiperOptions">
        <swiper-slide  v-for="product in products"
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
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import ProductTileCarousel from 'theme/components/core/ProductTileCarousel'
  import 'swiper/swiper.scss';
  export default {
    name: 'swiper-product slider',
    title: '',
    components: {
      Swiper,
      SwiperSlide,
      ProductTileCarousel,
    },
    props: {
        title: {
        type: String,
        default: ''
        },
        products: {
        type: Array,
        required: true
        },
        config: {
        type: Object,
        required: true
        }
    },     
    data() {
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
        }
      }
    },  
  }
</script>
<style lang="scss" scoped>
.swiperslider{
  .swiper-container{
    .collection-product{
      .product-link{
     
      }
    }
  }
}
</style>
<style lang="scss">
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