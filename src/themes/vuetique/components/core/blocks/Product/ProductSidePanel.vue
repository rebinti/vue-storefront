<template>
  <div class="wishlist right-sidebar max-w-full fixed p-8 pt-10" :class="{ active: isProductSidePanelOpen }">
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
    
    <h3>Size Guide</h3>

    <cms-block :identifier="'product-size-guide'" />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import NoScrollBackground from 'theme/mixins/noScrollBackground'
import CmsBlock from 'theme/components/core/blocks/Cms/Block'

export default {
  name: 'ProductSidePanel',
  props: {
  },
  mixins: [CmsBlock],
  components: {
     CmsBlock
  },
  computed: {
    // ...mapState({
    //   yoptoProduct: state => state.ui.yoptoProduct
    // }),
    isProductSidePanelOpen () {
      return this.$store.state.ui.productSidePanelFlag
    }
  },
  mounted () {
     console.log('yoptoProduct' , this.yoptoProduct);
  },
  mixins: [onEscapePress, NoScrollBackground],
  methods: {
    closeReviewPanel () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.dispatch('ui/toggleProductSidePanel')
    },
    toggletoggleReviewPanel () {
      this.$store.dispatch('ui/toggleProductSidePanel', false)
    },
    onEscapePress () {
      this.closeSearchpanel()
    },
    closeSearchpanel () {
     this.$store.dispatch('ui/toggleProductSidePanel' , false)
    }
  },
  
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
