<template>                                                                         
  <div class="wishlist right-sidebar max-w-full fixed p-8 pt-10" :class="{ active: isProductDeliveyReturnSidePanelOpen }">
    <button
      type="button"
      :aria-label="$t('Close')"
      class="absolute top-0 right-0 m-4 h-4"
      @click="closeSearchpanel"
      data-testid="closeMicrocart"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#close" />
      </svg>
    </button>
    
    <h3>Delivey & Return</h3>
    <br>          
    <div data-styla-slot="09f5c950-74a6-405e-9c11-20f841e3a08a"></div>
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
        detailsAccordion: 'details'
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
      window.styla.init();
     if ('styla' in window) {
      // if (window.styla !== null && window.styla['isReady'] !== undefined) {
      // if (typeof window.styla.init !== "undefined") window.styla.init()
       styla.init !== "undefined"&&styla.init()
    }      
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
