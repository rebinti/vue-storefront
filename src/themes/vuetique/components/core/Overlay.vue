<template>
  <div class="fixed z-overlay w-full h-screen top-0 left-0 bg-black opacity-75 overlay-fix" @click="close" v-if="isVisible" />
</template>

<script>
import Vue from 'vue'
import Overlay from '@vue-storefront/core/compatibility/components/Overlay'

export default {
  mixins: [Overlay],
  beforeCreate () {
    document.documentElement.classList.add('no-scroll')
  },
  destroyed () {
    document.documentElement.classList.remove('no-scroll')
  },
  methods: {
    close () {
      Vue.prototype.$bus.$emit('close-sidebar-panel', true);
      this.$bus.$emit('modal-hide', 'modal-productwithoptions')
      const el = document.body;
      el.classList.remove('set-overlay-on-top');
      document.documentElement.classList.remove('set-overlay-on-top')
      this.$store.commit('ui/setOverlay', false)
      this.$store.commit('ui/setMicrocart', false)
      this.$store.commit('ui/setWishlist', false)
      this.$store.commit('ui/setSearchpanel', false)
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setReviewPanel', false)
      this.$store.commit('ui/setProductSidePanelFlag', false)
      this.$store.commit('ui/setProductDetailsSidePanelFlag', false)
    }
  }
}
</script>

<style scoped>
.overlay-fix {
  z-index: 5;
}
.set-overlay-on-top .overlay-fix {
    z-index: 10;
}

</style>
