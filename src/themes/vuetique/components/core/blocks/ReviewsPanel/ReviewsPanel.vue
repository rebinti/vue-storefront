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
        Review yotpo panel Demo
        <div v-if="yoptoProduct !== null"
          class="yotpo yotpo-main-widget"
          data-product-id="yoptoProduct.id"
          data-price="yoptoProduct.price"
          data-currency="yoptoProduct.currency"
          data-name="yoptoProduct.name"
          data-url="yoptoProduct.url_path"
          data-image-url="yoptoProduct.image">
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
      return this.$store.state.ui.reviewPanel
    }
  },
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
