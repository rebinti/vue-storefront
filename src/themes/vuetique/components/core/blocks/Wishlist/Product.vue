<template>
  <li class="row mb-3 pb-3 border-b border-grey-light relative p_list_block">
    <div class="col-4 bg-grey-lightest">
      <div @click="closeWishlist">
        <router-link :to="localizedRoute({
          name: product.type_id + '-product',
          params: { parentSku: product.parentSku ? product.parentSku : product.sku, slug: product.slug, childSku: product.sku }
        })"
        >
          <img class="image" v-lazy="thumbnail">
        </router-link>
      </div>
    </div>
    <div class="col-8 flex-col justify-start sm:justify-between prdct_cnt">
      <div>
        <div class="font-medium leading-6">
          <div @click="closeWishlist">
            <router-link
              class="text-black product-title"
              :to="localizedRoute({
                name: product.type_id + '-product',
                params: { parentSku: product.parentSku ? product.parentSku : product.sku, slug: product.slug, childSku: product.sku }
              })"
            >
              {{ product.name | htmlDecode }}
            </router-link>
          </div>
        </div>
        <div class="text-sm text-grey leading-normal mb-2" data-testid="productSku">
          {{ product.sku }}
        </div>

        <div class="col-auto font-bold text-right leading-6 price_left_out">
          <div class="text-error" v-if="product.special_price">
            {{ product.priceInclTax | price }}
          </div>
          <div class="line-through text-sm text-grey-dark" v-if="product.special_price">
            {{ product.originalPriceInclTax | price }}
          </div>
          <div class="text-grey-dark" v-if="!product.special_price" data-testid="productPrice">
            {{ product.priceInclTax | price }}
          </div>
        </div>
        <div class="absolute top-0 right-0 mb-3">
          <span @click="removeFromWishlist(product)"><remove-button class="cl-accent" /></span>
        </div>
        <div class="absolute bottom-0 right-0 mb-3 button_bx_link">
            <!-- <a href="#" class="btn_box_lnk">Add to Bag</a> -->
            <add-to-cart
              :product="product"
              :productname="'Add to Bag'"
              class="btn_box_lnk"
            />
        </div>

      </div>
    </div>
    
  </li>
</template>

<script>
import Product from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Product'
import RemoveButton from './RemoveButton'
import AddToCart from 'theme/components/core/AddToCart.vue'

export default {
  components: {
    RemoveButton,
    AddToCart
  },
  mixins: [Product]
}
</script>

<style scoped>
.col-xs {
  flex-direction: column;
}
input {
  width: 30px;
}
.prdct_cnt{
  text-align: left;
  padding-left: 15px;
}
.prdct_cnt .price_left_out{
  text-align: left;
  position: absolute;
  bottom: 10px;
  z-index: 1;
}
.button_bx_link{
  z-index: 10;
}
.button_bx_link .btn_box_lnk{
  border:1px solid #000;
  color:#fff;
  font-weight: normal;
  display: inline-block;
  background: #000!important;
  font-size: 12px;
  width:auto;
  padding: 2px 10px;
  display: inline-block;
}
.p_list_block .product-title{
  color: #000;
  padding-right: 18px;
  line-height: 20px;
  display: inline-block;
  margin-bottom: 10px;
}
.price_left_out .text-grey-dark{
  color:#000;
  font-size:13px;
}
.p_list_block .text-grey{
  color: #7c7c7c;
  font-size: 12px;
}
.p_list_block .text-grey.cl-accent{
  color:#000;
}

.right-sidebar .p_list_block .image{
  width:100%;
}


</style>
