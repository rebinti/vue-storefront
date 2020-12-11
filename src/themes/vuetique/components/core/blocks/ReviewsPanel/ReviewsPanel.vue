<template>
  <div class="wishlist right-sidebar max-w-full fixed p-8 pt-10" :class="{ active: isReviewPanelOpen }">
   <div class="right-sidebar max-w-full fixed" style="height: 60px;box-shadow: 0 3px 3px -3px #00000045;">
    <button
      type="button"
      :aria-label="$t('Close')"
      class="absolute top-0 right-0 m-4 h-4"
      style="top: 10px;right: 10px;"
      @click="closeReviewPanel"
      data-testid="closeReviewPanel"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#close" />
      </svg>
    </button>
     <h3 style="position: absolute;top: 20px;left: 41px;">Product Reviews</h3>
    </div>
      <div v-if="reviewpanelloaded"  style="margin: 150px;">
          <img src="/assets/opc-ajax-loader.svg" style="margin: 0 auto;width: 25px;">
        </div> 
        <div id="stamped-main-widget" 
                :data-product-id="originalProduct.id" 
                :data-name="originalProduct.name" 
                :data-url="originalProduct.url_path" 
                :data-image-url="originalProduct.image" 
                :data-description="originalProduct.description" 
                :data-product-sku="originalProduct.sku"> 
        </div>
         
  </div>  
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import NoScrollBackground from 'theme/mixins/noScrollBackground'

export default {
  name: 'ReviewPanel',
  data () {
    return {
      reviewpanelloaded:true
    }
  },  
  props: {

  },
  components: {
  
  },
  computed: {
    ...mapState({
      // yoptoProduct: state => state.ui.yoptoProduct,
      isReviewPanelOpen: state => state.ui.reviewPanel,
    }),
    ...mapGetters({
      originalProduct: 'product/productOriginal',
    }),
    // isReviewPanelOpen () {
    //   console.log('state all data' , this.$store.state);
    //       // let elements = document.querySelectorAll(".stamped-container");
    //       // if (elements.length > 0) {
    //       //   elements.forEach(el => el.remove())
    //       // }
    //       // window.StampedFn.reloadUGC()
    //       // window.StampedFn.loadWidget()
    //       // window.StampedFn.loadBadges()
    //       // window.StampedFn.loadDisplayWidgets()
    //   return this.$store.state.ui.reviewPanel
    // },
  },
   mounted () {
    //  console.log('yoptoProduct' , this.yoptoProduct);
         let elements = document.querySelectorAll(".stamped-container");
          if (elements.length > 0) {
            elements.forEach(el => el.remove())
          }
          window.StampedFn&&window.StampedFn.reloadUGC()
          window.StampedFn&&window.StampedFn.loadWidget()
          window.StampedFn&&window.StampedFn.loadDisplayWidgets()
          //this.reviewpanelloaded = true
          document.addEventListener( 'stamped:reviews:loaded', () => {
            this.reviewpanelloaded = false;
          }); 
          let start = null;
          const touchStart = (event) => {
              if(event.touches.length === 1) start = event.touches.item(0).clientX;
              else  start = null;
          }
          const touchend = (event) => {
              const offset = 100;
              if(start){
                const end = event.changedTouches.item(0).clientX;
                // if(end > start + offset) console.log('swiped left -> right swipe***')
                if(end < start - offset ){
                  if(this.swipeToClosePanelFlag) return
                  this.swipeToClosePanelFlag = true;
                  this.closeReviewPanel()
                } 
              }
          }
          document.addEventListener("touchstart", touchStart);
          document.addEventListener("touchend", touchend);
          this.$once('hook:destroyed', () => {
              document.removeEventListener('touchstart', touchStart)
              document.removeEventListener('touchend', touchend)
          })
  },
  //  watch: {
  //   isReviewPanelOpen: {
  //     handler () {
  //      console.log('state all data--' , this.$store.state)
  //      let elements = document.querySelectorAll(".stamped-container");
  //         if (elements.length > 0) {
  //           elements.forEach(el => el.remove())
  //         }
  //         window.StampedFn.reloadUGC()
  //         window.StampedFn.loadWidget()
  //         window.StampedFn.loadBadges()
  //         window.StampedFn.loadDisplayWidgets()
  //         this.$forceUpdate();
  //     }
  //   }
  // },
  mixins: [onEscapePress, NoScrollBackground],
  methods: {
    closeReviewPanel () {
      // this.$store.dispatch('ui/closeReviewPanel')
      // console.log('yoptoProduct' , this.yoptoProduct)
      this.$store.commit('ui/setSidebar', false)

      this.$store.dispatch('ui/toggleReviewPanel')
    },
    toggletoggleReviewPanel () {
      this.$store.dispatch('ui/toggleReviewPanel')
    },
    onEscapePress () {
      this.closeSearchpanel()
    },
    closeSearchpanel () {
     this.$store.dispatch('ui/toggleReviewPanel' , false)
    },
  },
   beforeCreate () {
    const el = document.body;
    el.classList.add('menu-high-opacity');
    document.documentElement.classList.add('menu-high-opacity')
  },
  beforeDestroy () {
    window.removeEventListener("touchstart", null);
    window.removeEventListener("touchend", null);
  },
  destroyed () {
    const el = document.body;
    el.classList.remove('menu-high-opacity');
    document.documentElement.classList.remove('menu-high-opacity')
    document.removeEventListener('stamped:reviews:loaded', null)         
  }  
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";

  i {
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
</style>
