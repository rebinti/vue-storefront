<template>
  <div class="wishlist right-sidebar max-w-full fixed p-8 pt-10" :class="{ active: isReviewPanelOpen }">
    <button
      type="button"
      :aria-label="$t('Close')"
      class="absolute top-0 right-0 m-4 h-4"
      @click="closeReviewPanel"
      data-testid="closeMicrocart"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#close" />
      </svg>
    </button>
       <h3>Product Reviews</h3>

        <div v-if="reviewpanelloaded"  style="margin: 150px;">
          <img src="/assets/opc-ajax-loader.gif" style="margin: 0 auto;width: 25px;">
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
