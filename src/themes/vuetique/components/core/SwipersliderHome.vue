<template>
  <swiper
    :slides-per-view="3"
    :space-between="50"
    navigation
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide  v-for="product in products"
          v-if="!product._dontShowInListingFlag"
          :key="product.id">
          <product-tile-carousel
            class="collection-product"
            :product="product"
            :labels-active="false"
          />          
    </swiper-slide>
  </swiper>
</template>
<script>
  // import Swiper core and required components
  import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

  // Import Swiper Vue.js components
  //import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import ProductTileCarousel from 'theme/components/core/ProductTileCarousel'

  // Import Swiper styles
  import 'swiper/swiper.scss';
  import 'swiper/components/navigation/navigation.scss';
  import 'swiper/components/pagination/pagination.scss';
  import 'swiper/components/scrollbar/scrollbar.scss';

  // install Swiper components
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

  // Import Swiper styles
  export default {
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
    methods: {
      onSwiper(swiper) {
        console.log(swiper);
      },
      onSlideChange() {
        console.log('slide change');
      },
    },
  };
</script>
