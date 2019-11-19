<template>
  <button
    @click.prevent="isOnWishlist ? removeFromWishlist(product) : addToWishlist(product)"
    class="inline-flex items-center text-grey-dark wishlist-bx"
    type="button"
    :class="{'act': isOnWishlist}"
    data-testid="addToWishlist"
  >
    <svg viewBox="0 0 25 25" class="vt-icon pr-1">
      <use xlink:href="#wishlist" />
    </svg>
    <template v-if="!isOnWishlist">
     <span class="h-mobile"> {{ $t('Add to Wishlist') }}</span>
    </template>
    <template v-else>
       <span class="h-mobile"> {{ $t('Remove') }} </span>
    </template>
  </button>
</template>

<script>
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist'
import { AddToWishlist } from '@vue-storefront/core/modules/wishlist/components/AddToWishlist'
import { RemoveFromWishlist } from '@vue-storefront/core/modules/wishlist/components/RemoveFromWishlist'

export default {
  mixins: [ IsOnWishlist, AddToWishlist, RemoveFromWishlist ],
  computed: {
    favoriteIcon () {
      return this.isOnWishlist ? 'favorite' : 'favorite_border'
    }
  }
}
</script>

<style scoped>

@media (min-width: 576px) {
  .wishlist-bx{ display: inline-block; }
  .wishlist-bx span{ display: inline-block;}
  .wishlist-bx .vt-icon{ display: inline-block;}
}

  @media (max-width: 576px) {

    .prod_list .h-mobile {
      display: none!important;
    }
    .product-image{
      position: relative;
    }
    .prod_list .wishlist-bx{
      width:25px;
      height:25px;
      background: #ffffff;
      padding: 2px;
      position: absolute;
      right:10px;  
      bottom: 10px;
      z-index: 2;
    }

    .prod_list .wishlist-bx .vt-icon{
       width: 24px;
      height: 24px;
      fill: currentColor;
      float: none;
      display: inline-block;
      margin-left: 1px;
     }
     .prod_list .wishlist-bx.act .vt-icon{
       fill: #f10;
     }
    

  }

</style>
