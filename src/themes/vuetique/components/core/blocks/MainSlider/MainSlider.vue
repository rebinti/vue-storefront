<template>
  <section v-if="desktopslide" class="main-slider w-full text-white desktop">
    <no-ssr>
      <carousel :per-page="1" pagination-active-color="#ffffff" pagination-color="#e0e0e0">
        <slide v-for="(slide, index) in mainSliderData" :key="index">
          <div class="slide w-full" v-lazy:background-image="imageBaseUrl + slide.image">
            <div class="slide-content flex items-center justify-center">
              <div v-html='slide.description'></div>
            </div>
          </div>
        </slide>
      </carousel>   
    </no-ssr>
  </section>
  <section v-else-if="deviceslide" class="main-slider w-full text-white device">
    <no-ssr>
      <carousel :per-page="1" pagination-active-color="#ffffff" pagination-color="#e0e0e0">           
        <slide v-for="(deviceslide, index) in mainSliderDeviceData" :key="index">
          <div class="slide w-full" v-lazy:background-image="imageBaseUrl + deviceslide.image">
            <div class="slide-content flex items-center justify-center">
              <div v-html='deviceslide.description'></div>
            </div>
          </div>
        </slide>        
      </carousel> 
      </no-ssr>   
  </section>
</template>

<script>
import config from 'config'
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
import sliderData from 'theme/resource/slider.json'

import ButtonFull from 'theme/components/theme/ButtonFull'

import { mapState } from 'vuex'

export default {
  data () {
    return {
      currentSlide: 1,
      slides: [],
      totalSlides: 1,
      windowWidth: 0,
      imageBaseUrl: config.homePageMainSliderConfig.imageBaseUrl,
      desktopslide:false,
      deviceslide:false,
    }
  },
  components: {
    ButtonFull,
    Carousel,
    Slide,
    'no-ssr': NoSSR
  },
  computed: {
     ...mapState({
      sliderData: state => state.ui.mainSliderData
    }),
    mainSliderData () {
      return this.sliderData.filter(val=> (val.bannerslider_id === "1" && val.image !== null))  
    },
    mainSliderDeviceData () {
      return this.sliderData.filter(val=> (val.bannerslider_id === "2" && val.image !== null))             
    }    
  },  
  methods: {
    async getSliderData() {      
      if (this.mainSliderData.length > 0) { 
        return; 
      }
      this.$store.dispatch('ui/getSliderData', {
          key: '_type',
          value: "banner"
      }).then(res => {
        //  console.log('getSliderData', res );
        if( this.windowWidth <= 760 ) {
          this.deviceslide = true
          this.desktopslide = false
        }
        else {
          this.desktopslide = true
          this.deviceslide = false
        }         
      });
   },
  },
  mounted () {    
      this.windowWidth =  window.innerWidth;      
      if( this.windowWidth <= 760 ) {
        this.deviceslide = true
      }
      else {
        this.desktopslide = true
      }    
  },
  created () {
    // this.checkSliderData();
    this.getSliderData();    
    //this.updateSliderData(sliderData.web)
  },
  destroyed () {
    window.removeEventListener('resize' , null);
  }
}
</script>
<style lang="scss">
.main-slider {
  .VueCarousel-pagination {
    position: absolute;
    bottom: 15px;
  }
  .VueCarousel-dot--active .VueCarousel-dot-inner {
    border: 2px solid #fff;
    margin-top: -2px;
  }
}
</style>
<style scoped>
.main-slider {
  height: 640px;
}
.slide {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.slide-content {
  height: 640px;
}
@media (max-width: 75em) {
  .main-slider {
    height: 400px;
  }
  .slide-content {
    height: 400px;
  }
}
@media (max-width: 64em) {
  .main-slider {
    height: 359px;
  }
  .slide {
    background-position: left;
  }
  .slide-content {
    height: 359px;
  }
}
@media (max-width: 576px) {
  .main-slider {
    height: 450px;
  }
  .slide {
    background-position: left;
  }
  .slide-content {
    height: 450px;
  }
  
}
</style>
