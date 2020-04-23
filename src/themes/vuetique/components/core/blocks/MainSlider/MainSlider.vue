<template>
  <section class="main-slider w-full text-white">
    <no-ssr>
      <carousel :per-page="1" pagination-active-color="#ffffff" pagination-color="#e0e0e0">
        <slide v-for="(slide, index) in mainSliderData" :key="index">
          <div class="slide w-full" v-lazy:background-image="imageBaseUrl + slide.image">
            <div class="slide-content flex items-center justify-center">
              <div class="w-full px-10p">
                <h1 class="text-hero mt-0 mb-8 text-center" data-testid="mainSliderTitle">
                  {{ slide.name }}
                </h1>
                <div class="mx-auto w-48">
                  <button-full :link="{path: slide.click_url}" class="btn-primary">
                    {{ slide.button_text }}
                  </button-full>
                </div>
              </div>
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
      imageBaseUrl: config.homePageMainSliderConfig.imageBaseUrl
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
      mainSliderData: state => state.ui.mainSliderData.filter(val=> val.image !== null).map(slide => {
        slide.button_text= 'Find your purpose'
        return slide
      })
    }),
  },
  methods: {
    updateSliderData (data) {
      this.slides = data.slides
      this.totalSlides = data.total
    },
    checkSliderData() {
      if( this.windowWidth <= 760 ) {
         this.updateSliderData(sliderData.mobile)
      }
      else {
          this.updateSliderData(sliderData.web)
      }
    },
    async getSliderData() {
      if (this.mainSliderData.length > 0) { 
        return; 
      }
      this.$store.dispatch('ui/getSliderData', {
          key: '_type',
          value: "banner"
      }).then(res => {
        //  console.log('getSliderData', res );
      });
   },
  },
  mounted () {
    window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
        this.checkSliderData();
    });
    this.windowWidth =  window.innerWidth;
    this.checkSliderData();
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % (this.totalSlides)
    }, 5000)
  },
  created () {
    this.checkSliderData();
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
