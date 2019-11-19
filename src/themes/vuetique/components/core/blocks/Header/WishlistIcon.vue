<template>
  <button
    type="button"
    class="bg-transparent border-0"
    @click="toggleWishlistPanel"
    :aria-label="$t('Open wishlist')"
  >
    <!-- <svg viewBox="0 0 25 25" class="vt-icon">
      <use xlink:href="#wishlist" />
    </svg> -->
    <div class="ic_list_m"><img src="/assets/heart_bold.png" alt=""/></div>
  </button>
</template>

<script>
import WishlistIcon from '@vue-storefront/core/compatibility/components/blocks/Header/WishlistIcon'

export default {
  mixins: [WishlistIcon]
}
</script>
