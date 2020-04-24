<template>
  <button
    type="button"
    class="bg-transparent border-0 pos-rel"
    @click="toggleWishlistPanel"
    :aria-label="$t('Open wishlist')"
  >
    <!-- <svg viewBox="0 0 25 25" class="vt-icon">
      <use xlink:href="#wishlist" />
    </svg> -->
    <div class="ic_list_m"><img src="/assets/heart_bold.png" alt=""/></div>
    <span
      class="minicart-count absolute flex justify-center items-center text-xs font-bold text-white bg-primary"
      v-cloak
      data-testid="minicartCount"
    >
        {{ getWishlistProducts.length }}
    </span>
  </button>
</template>

<script>
import WishlistIcon from '@vue-storefront/core/compatibility/components/blocks/Header/WishlistIcon'
// import Wishlist from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Wishlist'

export default {
  mixins: [WishlistIcon],
  computed: {
      getWishlistProducts () {
          return this.$store.state.wishlist.items.length > 0 ? this.$store.state.wishlist.items[0] : []
      }
  }
}
</script>
