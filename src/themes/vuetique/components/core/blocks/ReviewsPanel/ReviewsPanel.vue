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
        <!-- <div v-if="yoptoProduct !== null"
          class="yotpo yotpo-main-widget"
          data-product-id="yoptoProduct.id"
          data-price="yoptoProduct.price"
          data-currency="yoptoProduct.currency"
          data-name="yoptoProduct.name"
          data-url="yoptoProduct.url_path"
          data-image-url="yoptoProduct.image">
        </div>  -->

         <div id="stamped-main-widget" 
                  :data-product-id="yoptoProduct" 
                  :data-name="'test'" 
                  :data-url="'test'" 
                  :data-image-url="'test'" 
                  :data-description="'Testing prduct'" 
                  :data-product-sku="'test'"> 
          </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import NoScrollBackground from 'theme/mixins/noScrollBackground'

export default {
  name: 'ReviewPanel',
  props: {

  },
  components: {
  
  },
  computed: {
    ...mapState({
      yoptoProduct: state => state.ui.yoptoProduct
    }),
    isReviewPanelOpen () {
      console.log('state all data' , this.$store.state);
          // let elements = document.querySelectorAll(".stamped-container");
          // if (elements.length > 0) {
          //   elements.forEach(el => el.remove())
          // }
          // window.StampedFn.reloadUGC()
          // window.StampedFn.loadWidget()
          // window.StampedFn.loadBadges()
          // window.StampedFn.loadDisplayWidgets()
      return this.$store.state.ui.reviewPanel
    }
  },
   mounted () {
     console.log('yoptoProduct' , this.yoptoProduct);
         let elements = document.querySelectorAll(".stamped-container");
          if (elements.length > 0) {
            elements.forEach(el => el.remove())
          }
          window.StampedFn.reloadUGC()
          window.StampedFn.loadWidget()
          window.StampedFn.loadDisplayWidgets()
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
      console.log('yoptoProduct' , this.yoptoProduct)
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
