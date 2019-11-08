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
        Review panel Demo
  </div>
</template>

<script>
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'

export default {
  name: 'ReviewPanel',
  props: {

  },
  components: {
  
  },
  computed: {
    isReviewPanelOpen () {
      return this.$store.state.ui.reviewPanel
    }
  },
  mixins: [onEscapePress],
  methods: {
    closeReviewPanel () {
      // this.$store.dispatch('ui/closeReviewPanel')
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
