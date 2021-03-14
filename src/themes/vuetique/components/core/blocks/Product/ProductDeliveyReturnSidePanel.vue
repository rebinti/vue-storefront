<template>                                                                         
  <div class="wishlist right-sidebar max-w-full fixed p-8 pt-10" :class="{ active: isProductDeliveyReturnSidePanelOpen }">
    <div class="right-sidebar max-w-full fixed" style="height: 60px;box-shadow: 0 3px 3px -3px #00000045;">
        <button
          type="button"
          :aria-label="$t('Close')"
          class="absolute top-0 right-0 m-4 h-4"
          style="top: 10px;right: 10px;"
          @click="closeSearchpanel"
          data-testid="closeMicrocart"
        >
          <svg viewBox="0 0 25 25" class="vt-icon--sm">
            <use xlink:href="#close" />
          </svg>
        </button>
        
        <h3 style="position: absolute;top: 20px;left: 41px;">Delivey & Returns</h3>
      </div>
    <br>          
    <div data-styla-slot="09f5c950-74a6-405e-9c11-20f841e3a08a"></div>
<!-- <div data-styla-slot="b134b9e4-ce80-454e-ab79-c5da2b127128"></div>
<div data-styla-slot="683f8903-1766-49e8-b027-5744da543c01"></div>     -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import NoScrollBackground from 'theme/mixins/noScrollBackground'
import CmsBlock from 'theme/components/core/blocks/Cms/Block'

export default {
  name: 'ProductDeliveyReturnSidePanel',
  props: {
  },
  mixins: [CmsBlock],
  data () {
    return {      
        detailsOpen: false,        
        detailsAccordion: 'details',
        swipeToClosePanelFlag: false
    }
  },  
  components: {
     CmsBlock
  },
  computed: {
    ...mapState({
      isProductDeliveyReturnSidePanelOpen: state => state.ui.productDeliveyReturnSidePanelFlag
    }),
    ...mapGetters({
      product: 'product/productCurrent'
    }),    
    // isProductDeliveyReturnSidePanelOpen () {
    //   return this.$store.state.ui.productDeliveyReturnSidePanelFlag
    // }
  },
  mounted () {
    this.$nextTick(()=>{
       window.styla.init();
        setTimeout(() => {
              window.styla.init();
              window.styla.init();
              window.styla.init();
              window.styla.init();
              if ('styla' in window) {
                styla.init !== "undefined"&&styla.init()
              }  
          }, 2500);
    })

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
            // if(end < start - offset)  console.log('swiped right -> left swipe***')
            if(end > start + offset){
            if(this.swipeToClosePanelFlag) return
            this.swipeToClosePanelFlag = true;
            this.closeSearchpanel()
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
  mixins: [onEscapePress, NoScrollBackground],
  methods: {
    closeReviewPanel () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.dispatch('ui/toggleProductDeliveyReturnSidePanel')
    },
    toggletoggleReviewPanel () {
      this.$store.dispatch('ui/toggleProductDeliveyReturnSidePanel', false)
    },
    onEscapePress () {
      this.closeSearchpanel()
    },
    closeSearchpanel () {
     this.$store.dispatch('ui/toggleProductDeliveyReturnSidePanel' , false)
    },
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
    }    
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
