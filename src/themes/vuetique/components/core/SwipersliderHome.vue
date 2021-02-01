<template>
  <swiper class="swiper" :options="swiperOption">
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
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import ProductTileCarousel from 'theme/components/core/ProductTileCarousel'
  import 'swiper/swiper.scss';
  export default {
    name: 'swiper-example-loop-group',
    title: 'Loop mode with multiple slides per group',
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
        swiperOption: {
          slidesPerView: 6,
          spaceBetween: 2,
          slidesPerGroup: 3,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
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
              spaceBetween: 5
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 5
            }
          }          
        }
      }
    },  
  }
</script>
<style lang="scss" scoped>  
</style>