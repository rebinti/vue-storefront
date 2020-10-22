<template>
   <div style="width: auto;height: 300px;width: auto;margin-left:10px;" 
   class="gift-card"> 

     <h1> Gift card </h1>
     <add-to-cart-quick-prod-btn  v-if="product !== null"
        :product="product"  
        class="cart-icon" :addtocarttype="'Text-Only'" />          
  </div>
</template>

<script>
import Vue from 'vue'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import AddToCartQuickProdBtn from 'theme/components/core/AddToCartQuickProdBtn.vue'

export default {
  name: 'GiftCardPage',
  components: {
    AddToCartQuickProdBtn
  },
  data () {
  return {
      product: null
    }
  },
  created () {
      this.getGiftCardProductData()
  },
  methods: {
      getGiftCardProductData () {
        let query = new SearchQuery()
        query = query.applyFilter({key: 'id', value: {'eq': 92323}})
        this.$store.dispatch('product/list', {
          query: query,
          start: 0,
          size: 1,
          updateState: false
        }).then((items) => {
            // console.log('gift card data---->', items);
            this.product = items.items[0];
        });
      }
  },

}
</script>

<style>
.gift-card .cart-icon {
    width: 200px;
    margin-left: 10px;
    margin-top: 50px;
}
</style>
