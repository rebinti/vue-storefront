<template>
  <div class="wishlist right-sidebar max-w-full fixed p-8 pt-10" :class="{ active: isWishlistOpen }" style="text-align: center;">
    <button
      type="button"
      :aria-label="$t('Close')"
      class="absolute top-0 right-0 m-4 h-4"
      @click="closeWishlist"
      data-testid="closeWishlist"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#close" />
      </svg>
    </button>

    <div v-if="!productsInWishlist.length">
      <img style="margin: 0px auto;" src="assets/wishlisticon.png" />
    </div>

    <h2 v-if="productsInWishlist.length" class="mb-8">
      {{ $t('Wishlist') }}
    </h2>

    <h4 v-if="!productsInWishlist.length" class="mb-2">
      {{ $t('Your wishlist is empty.') }}
    </h4>
<!-- 
    <div v-if="!productsInWishlist.length" class="mb-2">
      {{ $t("Don't hesitate and") }}
      <router-link class="text-primary" :to="localizedRoute('/')">
        {{ $t('browse our catalog') }}
      </router-link>
      {{ $t('to find something beautiful for You!') }}
    </div> -->

    <div v-if="!productsInWishlist.length">
       <p>Tap heart button to start saving your favorite items </p>
       <router-link class="add-now-button block border-none rounded-none bg-grey-dark px-4 py-2 ripple tracking-md text-sm text-white font-medium leading-base mb-2 w-full"
       :to="localizedRoute('/')"
       style="margin: 0px auto;top: 10px;background: white;color: black;border: 2px solid #bfbfbf"
       > Add now
       </router-link>
    </div>
    <ul class="products p-0 m-0">
      <product v-for="product in productsInWishlist" :key="product.id" :product="product" />
    </ul>
  </div>
</template>

<script>
import Wishlist from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Wishlist'
import Product from 'theme/components/core/blocks/Wishlist/Product'

export default {
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  components: {
    Product
  },
  mixins: [Wishlist],
  methods: {
    closeWishlist () {
      this.$store.dispatch('ui/closeWishlist')
    }
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

  .add-now-button{
    width: 100px;
  }
</style>
