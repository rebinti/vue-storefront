<template>
  <div class="row gutter-md justify-center md:justify-start">
    <div
      v-for="(product, index) in products"
      :key="product.id"
      v-if="!product._dontShowInListingFlag"
      :class="['col-' +  checkGridView(index)  +  ' md:col-' + (12/columns)%10 +' '+'column'+(12/((12/columns)%10))+' '+'style-' + ((index % numberOfPlayers) + 1)]" 
    >
    <!-- :class="['md:col-' + (12/columns)%10]" -->
      <product-tile :product="product"/>
    </div>
  </div>
</template>

<script>
import ProductTile from 'theme/components/core/ProductTile'
export default {
  name: 'ProductListing',
  components: {
    ProductTile
  },
  data() {
    return {
      arr12: [],
      arr6: []
    }
  },
  props: {
    products: {
      type: null,
      required: true
    },
    columns: {
      type: [Number, String],
      required: true
    },
    mobColumns: {
      type: [Number, String],
      required: false,
      default:3
    }
  },
  computed: {
    numberOfPlayers: function() {
        return 2;
    }
  },
  methods: {
    checkGridView(index) {
      if (window && (window.innerWidth >= 580) && (window.innerWidth <= 768)){
        if(this.mobColumns==3){
           this.mobColumns = 33  // it for 768 screen 3 column fix 
        }
      }else if(window && (window.innerWidth < 580)){
        if(this.mobColumns==4){
           this.mobColumns = 44  // it for mobile screen 3 column fix 
        }        
      } 
      switch(this.mobColumns) {
        case 2: 
              return '6 item-2-6-grid'
              break;
        case 3: 
              return index%3 == 0 ? '12 item-3-12-grid one-item' : '6 item-3-6-grid';
              break;
        case 33: 
              return '3  item-4-3-grid'
              break;
        case 44: 
              return '4  item-4-3-grid'
              break;                            
        case 4:
              return '3  item-4-3-grid'
              break;
        default:
             return '6'
             break;
      }
    }
  }
}
</script>
<style lang="scss" >
@media (max-width: 576px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 200px !important;
    height: 300px !important;
  }
  .container .pr_list_sec_main .row.gutter-md .col-6.item-2-6-grid.style-1{
    padding-left: 0.550rem !important;
    padding-right: 0.225rem !important;
  }
  .container .pr_list_sec_main .row.gutter-md .col-6.item-2-6-grid.style-2{
    padding-left: 0.275rem !important;
    padding-right: 0.550rem !important;    
  }  
}
@media (max-width: 480px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 227.61px !important;
    height: 341.415px !important;
  }
}
@media (max-width: 425px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 200px !important;
    height: 300px !important;
  }
}
@media (max-width: 414px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 194.61px !important;
    height: 291.915px !important;
  }
}
@media (max-width: 375px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 175.11px !important;
    height: 262.665px !important;
  }
}
@media (max-width: 360px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 167.61px !important;
    height: 251.415px !important;
  }
}
@media (max-width: 320px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 147.61px !important;
    height: 221.415px !important;      
  }
}
</style>