<template>
  <div class="row sidepanelitem gutter-md justify-center md:justify-start">
    <div
      v-for="(product, index) in products"
      :key="product.id"
      v-if="!product._dontShowInListingFlag" class="itemlist" style="width:100%;padding-top: 15px;border-bottom: 1px solid #ededed"
    >
    <!-- :class="['md:col-' + (12/columns)%10]" -->
      <sidepanel-product-tile :product="product"/>
    </div>
  </div>
</template>

<script>
import SidepanelProductTile from 'theme/components/core/SidepanelProductTile'
export default {
  name: 'ProductListing',
  components: {
    SidepanelProductTile
  },
  data() {
    return {
      arr12: [],
      arr6: [],
      threecolumn:1
    }
  },
  props: {
    products: {
      type: null,
      required: true
    },
  },
  computed: {       
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.sidepanelitem{
  .itemlist{
    border-bottom: 1px solid #ededed !important;
  }
} 
@media (min-width: 769px) and (max-width: 1599px){

}
@media (max-width: 768px){

}
@media (max-width: 576px) { 

}
@media (max-width: 480px) {
  
}
@media (max-width: 425px) {
 
}
@media (max-width: 414px) {
     
}
@media (max-width: 412px) {
   
}
@media (max-width: 393px) {
  
}
@media (max-width: 375px) {
   
}
@media (max-width: 360px) {
   
}
@media (max-width: 320px) {

}
</style>