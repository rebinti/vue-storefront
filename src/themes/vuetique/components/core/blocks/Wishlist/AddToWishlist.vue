<template>
<div>
  <button
    @click.prevent="isOnWishlist ? removeFromWishlist(product) : addToWishlist(product)"
    class="inline-flex items-center text-grey-dark wishlist-bx"
    type="button"
    :class="{'act': isOnWishlist}"
    data-testid="addToWishlist"
  >
    <!-- <svg v-if="!isOnWishlist" viewBox="0 0 25 25" class="vt-icon pr-1">
      <use xlink:href="#wishlist" />
    </svg> -->
    <img v-if="!isOnWishlist" class="vt-icon fa-icon-list  v-mobile" src="/assets/wishlist-fav.svg" alt="" />
    <img v-if="isOnWishlist" class="vt-icon fa-icon-list v-mobile" src="/assets/wishlist-fav-fill.svg" alt="" />
    <template v-if="!isOnWishlist">
     <span class="h-mobile"> {{ $t('Add to Wishlist') }}</span>
    </template>
    <template v-else>
       <span class="h-mobile"> {{ $t('Remove') }} </span>
    </template>
  </button>

  <!-- <button v-if="isOnWishlist" class="inline-flex items-center text-grey-dark wishlist-bx" type="button"
  style="left: 2px;width: 100px;background: black;color: white;padding: 0px 0 1px 6px;font-weight: 500;}"
  @click.prevent="$store.commit('ui/setSelectedBoardItem', product);$store.commit('ui/setBoardsElem', 'add-to-board');$bus.$emit('modal-show', 'modal-create-boards')"
  >   Add to board
  </button> -->
</div>
</template>

<script>
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist'
import { AddToWishlist } from '@vue-storefront/core/modules/wishlist/components/AddToWishlist'
import { RemoveFromWishlist } from '@vue-storefront/core/modules/wishlist/components/RemoveFromWishlist'
// import { IsOnBoardsWishlist } from '@vue-storefront/core/modules/boards/components/IsOnWishlist'

export default {
  mixins: [ IsOnWishlist , AddToWishlist , RemoveFromWishlist ], // IsOnBoardsWishlist
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
  .prod_list .wishlist-bx{ display:none}
  .v-mobile { display:none}
}

  .fa-icon-list { margin: 0 auto;}
  @media (max-width: 576px) {

    .hd-mobile{
      display: none!important;
    }
    .prod_list .h-mobile {
      display: none!important;
    }
    .product-image{
      position: relative;
    }
    .prod_list .wishlist-bx{
      width:25px;
      height:25px;
      /* background: #ffffff; */
      padding: 2px;
      position: absolute;
      right:10px;  
      bottom: 10px;
      z-index: 2;
    }

    .prod_list .wishlist-bx .vt-icon{
       width: 19px;
      height: 24px;
      fill: currentColor;
      float: none;
      display: inline-block;
      margin-left: 1px;
     }
     .prod_list .wishlist-bx.act .vt-icon{
       fill: #f10;
     }
    .mob_add_wish_btn .wishlist-bx span{
      display: none;
    }
    .mob_add_wish_btn .wishlist-bx .vt-icon{
      display: inline-block;
    }
    .mob_add_wish_btn .wishlist-bx.act .vt-icon{
        fill: #f10;
    }
    .v-mobile { display:block;}
  } 

</style>
