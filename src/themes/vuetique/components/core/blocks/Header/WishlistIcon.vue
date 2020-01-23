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
      <template v-if="productsInWishlist.length > 0">
        {{ productsInWishlist[0].length }}
      </template>
      <template v-else>
        0
      </template>
    </span>
  </button>
</template>

<script>
import WishlistIcon from '@vue-storefront/core/compatibility/components/blocks/Header/WishlistIcon'
import Wishlist from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Wishlist'

export default {
  mixins: [WishlistIcon, Wishlist]
}
</script>
