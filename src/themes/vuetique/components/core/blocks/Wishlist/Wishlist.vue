<template>
  <div class="wishlist wishlist_out right-sidebar max-w-full fixed p-8 pt-10" :class="{ active: isWishlistOpen }" style="text-align: center;">
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

    <div  class="wish_wrap_box" :class="{'item-in-it': productsInWishlist.length>0}">

    <div v-if="!productsInWishlist.length" class="wish_ico_box">
      <img  src="/assets/wishlisticon.png" alt=""/>
    </div>

    <h2 v-if="productsInWishlist.length" class="mb-8 upper-letter" >
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

    <div class="wish_cnt" v-if="!productsInWishlist.length">
       <p>Tap heart button to start saving your favorite items </p>
       <router-link class="add-now-button block border-none rounded-none bg-grey-dark px-4 py-2 ripple tracking-md text-sm text-white font-medium leading-base mb-2 w-full"
       :to="localizedRoute('/')"
       > Add now
       </router-link>
    </div>
    <ul class="products p-0 m-0">
      <product v-for="product in productsInWishlist" :key="product.id" :product="product" />
    </ul>
     </div>
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

.wish_wrap_box{
  text-align: center;
}

.wish_ico_box{
  text-align: center;
}
.wish_ico_box img{
  display: inline-block;
}
.wish_wrap_box h4{
  font-size:25px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 15px;
}
.wish_cnt{
  text-align: center;
}
.wish_cnt p{
  font-size:12px;
  margin-bottom: 15px;
}
.wish_cnt a{
  border:1px solid #000;
  color:#000;
  font-weight: bold;
  display: inline-block;
  background: transparent!important;
  font-size: 15px;
  width:auto;
}



.wish_wrap_box
{
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  position: absolute;
  width: 100%;
  left: 0px;
}

.wish_wrap_box.item-in-it{
  top:0px;
  position: relative;
  -webkit-transform: translateY(0%);
  -ms-transform: translateY(0%);
  transform: translateY(0%);
  left: 0px;
}

.wishlist.wishlist_out{
  padding-left: 20px;
  padding-right: 20px;
}

.upper-letter{
    font-weight: bold;
    text-transform: uppercase;
    font-size: 20px;
}

</style>
