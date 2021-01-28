<template>
<div>
  <button
    @click.prevent="isOnWishlist ? removeFromWishlist(product) : addToWishlist(product)"
    class="inline-flex items-center text-grey-dark wishlist-bx"
    type="button"
    :class="{'act': isOnWishlist}"
    data-testid="addToWishlist"
  >

    <img v-if="!isOnWishlist" class="vt-icon fa-icon-list  v-mobile" src="/assets/wishlist-fav.svg" alt="" />
    <img v-if="isOnWishlist" class="vt-icon fa-icon-list v-mobile" src="/assets/wishlist-fav-fill.svg" alt="" />

  </button>


</div>
</template>

<script>
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist'
import { AddToWishlist } from '@vue-storefront/core/modules/wishlist/components/AddToWishlist'
import { RemoveFromWishlist } from '@vue-storefront/core/modules/wishlist/components/RemoveFromWishlist'
// import { IsOnBoardsWishlist } from '@vue-storefront/core/modules/boards/components/IsOnWishlist'

export default {
  name: 'AddToWishlist',
  mixins: [ IsOnWishlist , AddToWishlist , RemoveFromWishlist ], // IsOnBoardsWishlist
  computed: {
    favoriteIcon () {
      return this.isOnWishlist ? 'favorite' : 'favorite_border'
    }
  }
}
</script>

<style scoped>
button.wishlist-bx{
        margin-top: 6px;
}
@media (max-width: 768px){
  .p_detail_box button.wishlist-bx{        
        border: 1px solid #000000;
        height: 46px;
        width: 46px;
        margin: 0px;        
  }  
}
@media (min-width: 576px) {
  /* .wishlist-bx{ display: inline-block; }
  .wishlist-bx span{ display: inline-block;}
  .wishlist-bx .vt-icon{ display: inline-block;}
  .prod_list .wishlist-bx{ display:none}
  .v-mobile { display:none} */
  .prod_list .wishlist-bx{
      width:30px;
      height:30px;
      /* background: #ffffff; */
      /* padding: 2px; */
      position: absolute;
      right:10px;  
      bottom: 6px;
      z-index: 2;      
  }
  .VueCarousel-inner .VueCarousel-slide .prod_list .wishlist-bx{
      top: 0px;
  }

  .prod_list .wishlist-bx .vt-icon{
       width: 30px;
      height: 30px;
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
    .VueCarousel-slide .prod_list .wishlist-bx{
      right:5px;  
      bottom: 5px;      
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
