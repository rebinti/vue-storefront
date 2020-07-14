<template>
  <div class="media-gallery-carousel">
    <hooper :infiniteScroll="true" :itemsToShow="Itemshow" :centerMode="true" pagination="yes" :progress="true">
      <slide
        v-for="(images, index) in gallery"
        :key="images.src"
      >
        <div class="product-image-container" :class="{'video-container w-full h-full flex relative': images.video}" 
        @click="openOverlay" style="cursor: pointer;">
          <img
            v-show="placeholderImagesMap[index]"
            key="placeholderImage"
            class="product-image inline-flex cursor-pointer mw-full"
            src="/assets/placeholder.png"
            ref="images"
            :alt="productName | htmlDecode"
          >
          <img
            v-if="!lowerQualityImagesErrorsMap[index] || isOnline"
            v-show="lowerQualityImagesMap[index]"
            key="lowQualityImage"
            class="product-image inline-flex cursor-pointer mw-full"
            :src="images.loading"
            @load="lowerQualityImageLoaded(index, true)"
            @error="lowerQualityImageLoaded(index, false)"
            ref="images"
            :alt="productName | htmlDecode"
            data-testid="productGalleryImage"
            itemprop="image"
          >
          <img
            v-if="!highQualityImagesErrorsMap[index] || isOnline"
            v-show="highQualityImagesLoadedMap[index]"
            key="highQualityImage"
            :src="images.src"
            @load="highQualityImageLoaded(index, true)"
            @error="highQualityImageLoaded(index, false)"
            class="product-image inline-flex cursor-pointer mw-full"
            ref="images"
            @dblclick="openOverlay"
            :alt="productName | htmlDecode"
            data-testid="productGalleryImage"
            itemprop="image"
          >
          <product-video-slide
            v-if="images.video && images.video !== null"
            :video_id="images.video"
            :video_thumbnail="images.src"
            :index="index"
          />
        </div>
      </slide>
      <!-- <hooper-navigation slot="hooper-addons"></hooper-navigation> -->
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>
    <i
      class="zoom-in material-icons p-4 cursor-pointer"
      @click="openOverlay"
    >zoom_in</i>
  </div>
</template>

<script>
import store from '@vue-storefront/core/store'
import { Carousel } from 'vue-carousel'
// import { Hooper,Slide } from 'hooper'
import { Hooper,Slide,Pagination as HooperPagination} from 'hooper';
import { Progress as HooperProgress} from 'hooper';
import ProductVideo from './ProductVideo'
import { onlineHelper } from '@vue-storefront/core/helpers'
import 'hooper/dist/hooper.css';

import ProductVideoSlide from './ProductVideoSlide'

export default {
  name: 'ProductGalleryCarousel',
  components: {
    Carousel,
    Hooper,
    Slide,
    HooperProgress,    
    HooperPagination,
    ProductVideo,
    ProductVideoSlide
  },
  props: {
    gallery: {
      type: Array,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    configuration: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      carouselTransitionSpeed: 0,
      currentPage: 0,
      Itemshow: 0,
      windowWidth: 0,
      hideImageAtIndex: null,
      lowerQualityImagesLoadedMap: {},
      highQualityImagesLoadedMap: {},
      lowerQualityImagesErrorsMap: {},
      highQualityImagesErrorsMap: {}
    }
  },
  computed: {
    placeholderImagesMap () {
      let visibilityMap = {}
      this.gallery.forEach((image, index) => {
        visibilityMap[index] = !this.lowerQualityImagesLoadedMap[index] && !this.highQualityImagesLoadedMap[index]
      })
      return visibilityMap
    },
    lowerQualityImagesMap () {
      let visibilityMap = {}
      this.gallery.forEach((image, index) => {
        visibilityMap[index] = !!this.lowerQualityImagesLoadedMap[index] && !this.highQualityImagesLoadedMap[index] && this.hideImageAtIndex !== index
      })
      return visibilityMap
    },
    highQualityImagesMap () {
      let visibilityMap = {}
      this.gallery.forEach((image, index) => {
        visibilityMap[index] = !!this.highQualityImagesLoadedMap[index] && this.hideImageAtIndex !== index
      })
      return visibilityMap
    },
    isOnline () {
      return onlineHelper.isOnline
    }
  },
  beforeMount () {
    this.$bus.$on('filter-changed-product', this.selectVariant)
    this.$bus.$on('product-after-load', this.selectVariant)
  },
  mounted () {
    this.selectVariant()
    if (this.$refs.carousel) {
      let navigation = this.$refs.carousel.$children.find(c => c.$el.className === 'VueCarousel-navigation')
      let pagination = this.$refs.carousel.$children.find(c => c.$el.className === 'VueCarousel-pagination')
      if (navigation !== undefined) {
        navigation.$on('navigationclick', this.increaseCarouselTransitionSpeed)
      }
      if (pagination !== undefined) {
        pagination.$on('paginationclick', this.increaseCarouselTransitionSpeed)
      }
    }
    this.$emit('loaded')
    window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
        this.checkWindowSize();
    });
    this.windowWidth =  window.innerWidth;       
    this.checkWindowSize();
  },
  beforeDestroy () {
    this.$bus.$off('filter-changed-product', this.selectVariant)
    this.$bus.$off('product-after-load', this.selectVariant)
  },
  methods: {
    navigate (index) {
      if (this.$refs.carousel) {
        this.$refs.carousel.goToPage(index)
      }
    },
    selectVariant () {
      if (store.state.config.products.gallery.mergeConfigurableChildren) {
        let option = this.configuration[store.state.config.products.gallery.variantsGroupAttribute]
        if (typeof option !== 'undefined' && option !== null) {
          let index = this.gallery.findIndex(obj => obj.id && Number(obj.id) === Number(option.id))
          this.navigate(index)
        }
      }
    },
    openOverlay () {
      const currentSlide = this.$refs.carousel.currentPage
      this.$emit('toggle', currentSlide)
    },
    increaseCarouselTransitionSpeed () {
      this.carouselTransitionSpeed = 500
    },
    pageChange (index) {
      this.currentPage = index
      this.hideImageAtIndex = null
      this.$emit('pageChange', index)
    },
    onVideoStarted (index) {
      this.hideImageAtIndex = index
    },
    lowerQualityImageLoaded (index, success = true) {
      this.$set(this.lowerQualityImagesLoadedMap, index, success)
      this.$set(this.lowerQualityImagesErrorsMap, index, !success)
    },
    highQualityImageLoaded (index, success = true) {
      this.$set(this.highQualityImagesLoadedMap, index, success)
      this.$set(this.highQualityImagesErrorsMap, index, !success)
    },
    checkWindowSize() {
      console.log('this.windowWidth' , this.windowWidth)
      if( this.windowWidth < 768 ) {
         this.Itemshow = 1
      }else if(this.windowWidth == 768 ){
        this.Itemshow = 2
      }else if(this.windowWidth <= 1024 ){
        this.Itemshow = 3
      }
      else {
          this.Itemshow = 4
      }
    }
  },
  created () {
    this.windowWidth =  window&&window.innerWidth ? window.innerWidth: 0; 
    this.checkWindowSize();    
  },
  destroyed () {
    window.removeEventListener('resize', null);
  }  
}
</script>

<style lang="scss" scoped>
.media-gallery-carousel {
  position: relative;
  text-align: center;
  height: 100%;
}
.zoom-in {
  position: absolute;
  bottom: 0;
  right: 0;
}
.product-image-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.product-image {
  width: 100%;
  height: auto;
}
img {
  opacity: 1;
  mix-blend-mode: multiply;
  vertical-align: top;
  &:hover {
    opacity: 1;
  }
}
img[lazy=error] {
  width: 100%;
}
img[lazy=loading] {
  width: 100%;
}
img[lazy=loaded] {
  -webkit-animation: none;
  animation: none;
}

.video-container {
  align-items: center;
  justify-content: center;
}
</style>

<style lang="scss">
.media-gallery-carousel,
.media-zoom-carousel {
  .VueCarousel-pagination {
    @apply mt-2 mb-5 float-left;
  }
  .VueCarousel-navigation-button {
    margin: 0;
    transform: translateY(-50%) !important;
  }
  .VueCarousel-slide {
      @apply bg-grey-lightest;
    backface-visibility: unset;
  }
  .VueCarousel-navigation {
    opacity: 0;
    &--disabled {
      opacity: 0.3;
    }
  }
  .VueCarousel-dot {
    button {
      max-width: 6px;
      max-height: 6px;
      outline: none;

      &:focus,
      &:active {
        outline: none;
      }
    }
  }
  &:hover {
    .VueCarousel-navigation {
      opacity: .9;
    }
    .VueCarousel-navigation-button {
      transition: opacity 3s;
      &:after {
        background-color: transparent;
      }
    }
  }
}

@media (min-width: 577px) {
  .hooper {
    height: 693px;
  }
  .details-section{
      position: absolute;
      top: 0px;
      right: 0px;
      background: #FFF;
      /* margin: 64px; */
      margin-top: 0px;
      margin-right: 64px;
      height: 100%;
  }
  /*.bg-grey-lightest{
      position: relative;
  }  */

}
@media (max-width: 3000px) {
  .hooper-slide .product-image-container img{
      width: 640px;
      height: 960px;
  }      
  .hooper {
    height: 960px;
  }      
}
@media (max-width: 2560px) {
  .hooper-slide .product-image-container img{
      width: 640px;
      height: 960px;
  }      
  .hooper {
    height: 960px;
  }      
}
@media (max-width: 1920px) {
  .hooper-slide .product-image-container img{
      width: 461px;
      height: 691px;
  }      
  .hooper {
    height: 691px;
  }      
}
@media (max-width: 1440px) {
  .hooper-slide .product-image-container img{
      width: 360px;
      height: 540px;
  }      
  .hooper {
    height: 540px;
  }      
}
@media (max-width: 1280px) {
  .hooper-slide .product-image-container img{
      width: 320px;
      height: 480px;
  }      
  .hooper {
    height: 480px;
  }      
}
@media (max-width: 1024px) {
  .hooper-slide .product-image-container img{
      width: 341px;
      height: 511.5px;
  }      
  .hooper {
    height: 511.5px;
  }      
}
@media (max-width: 768px) {
  .hooper-slide .product-image-container img{
      width: 384px;
      height: 576px;
  }      
  .hooper {
    height: 576px;
  }      
}
@media (max-width: 576px) {
  .VueCarousel{
      .btn-primary{
          background: transparent!important;
          border:1px solid #ffffff;    
          font-weight: normal;            
      }
      .VueCarousel-pagination{
          position: absolute;
          left:0px;
          bottom:0px;
          .VueCarousel-dot{
              width: 5px!important;
              height: 5px!important;
              padding: 2px!important;
              border-radius:0px!important;
              outline: none!important;
          }
          
      }
      .VueCarousel-inner{
          .text-hero{ font-size:35px;}
      }
  }
  .zoom-in.material-icons.p-4.cursor-pointer{
    display: none!important;
  }
  .hooper-slide .product-image-container img{
      width: 576px;
      height: 864px;
  } 
  .hooper {
    height: 864px;
  }

}
@media (max-width: 425px) {
  .hooper-slide .product-image-container img{
      width: 425px;
      height: 637.5px;
  }      
  .hooper {
    height: 637.5px;
  }      
}
@media (max-width: 375px) {
  .hooper-slide .product-image-container img{
      width: 375px;
      height: 562.5px;
  }      
  .hooper {
    height: 562.5px;
  }      
}
@media (max-width: 320px) {
  .hooper-slide .product-image-container img{
      width: 320px;
      height: 480px;
  }      
  .hooper {
    height: 480px;
  }      
}

</style>
