<template>
  <div class="row gutter-md justify-center md:justify-start">
    <div
      v-for="(product, index) in products"
      :key="product.id"
      v-if="!product._dontShowInListingFlag"
      :class="['col-' +  checkGridView(index)  +  ' md:col-' + (12/columns)%10 +' '+'column'+(12/((12/columns)%10))+' '+'style-' + ((index % twoColumnMobile) + 1)+' '+'threecolumn-' + ((index % threeColumnMobile) + 1)+' '+'fourcolumn-' + ((index % fourColumn) + 1)]" 
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
      arr6: [],
      threecolumn:1
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
    twoColumnMobile: function() {
        return 2;
    },
    threeColumnMobile: function() {
        return 3;
    },
    fourColumn: function() {
        return 4;
    },        
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
@media (min-width: 769px) and (max-width: 1599px){
  /* 3 column image size */   

  .col-6.item-2-6-grid.column3 .product-image img.default-image,.col-6.item-2-6-grid.column3 .product-image img.hover-image{
    width: 228px;
    height: 342px;   
  }
  
  /* 2 column image size */ 
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 352px;
    height: 528px;   
  } 
  /* 4 column image size */ 
  .item-4-3-grid.column4 .product-image img.default-image,.item-4-3-grid.column4 .product-image img.hover-image{
    width: 166px;
    height: 249px;   
  }  
}
@media (max-width: 768px){
  /* ipad screen 3 column and above */
  .container .pr_list_sec_main .row.gutter-md .col-3.item-4-3-grid.threecolumn-1,.container .pr_list_sec_main .row.gutter-md .col-6.item-2-6-grid.column3.threecolumn-1{
    padding-left: 0.625rem !important;
    padding-right: 0.325rem !important;
  }
  .container .pr_list_sec_main .row.gutter-md .col-3.item-4-3-grid.threecolumn-2,.container .pr_list_sec_main .row.gutter-md .col-6.item-2-6-grid.column3.threecolumn-2{
    padding-left: 0.325rem !important;
    padding-right: 0.325rem !important;
  }
  .container .pr_list_sec_main .row.gutter-md .col-3.item-4-3-grid.threecolumn-3,.container .pr_list_sec_main .row.gutter-md .col-6.item-2-6-grid.column3.threecolumn-3{
    padding-left: 0.325rem !important;
    padding-right: 0.625rem !important;
  } 
  /* ipad screen 2 column and above */
  .container .pr_list_sec_main .row.gutter-md .col-6.item-2-6-grid.style-1{
    padding-left: 0.625rem !important;
    padding-right: 0.325rem !important;
  } 
  .container .pr_list_sec_main .row.gutter-md .col-6.item-2-6-grid.style-2{
    padding-left: 0.325rem !important;
    padding-right: 0.625rem !important;
  }
  /* ipad screen 4 column and above */
  .container .pr_list_sec_main .row.gutter-md .item-4-3-grid.column4.fourcolumn-1{
    padding-left: 0.625rem !important;
    padding-right: 0.325rem !important;
  }
  .container .pr_list_sec_main .row.gutter-md .item-4-3-grid.column4.fourcolumn-2{
    padding-left: 0.325rem !important;
    padding-right: 0.325rem !important;
  }
  .container .pr_list_sec_main .row.gutter-md .item-4-3-grid.column4.fourcolumn-3{
    padding-left: 0.325rem !important;
    padding-right: 0.325rem !important;
  }
  .container .pr_list_sec_main .row.gutter-md .item-4-3-grid.column4.fourcolumn-4{
    padding-left: 0.325rem !important;
    padding-right: 0.625rem !important;
  }      
  /* 3 column image size */   
  .col-3.item-4-3-grid .product-image img.default-image,.col-3.item-4-3-grid .product-image img.hover-image,.col-6.item-2-6-grid.column3 .product-image img.default-image,.col-6.item-2-6-grid.column3 .product-image img.hover-image{
    width: 240.81px;
    height: 361.215px;   
  }
  
  /* 2 column image size */ 
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 368.81px;
    height: 553.215px;   
  } 
  /* 4 column image size */ 
  .item-4-3-grid.column4 .product-image img.default-image,.item-4-3-grid.column4 .product-image img.hover-image{
    width: 181.63px;
    height: 272.445px;   
  }     
}
@media (max-width: 576px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 275.61px !important;
    height: 413.415px !important;
  }
  .container .pr_list_sec_main .row.gutter-md .col-6.item-2-6-grid.style-1{
    padding-left: 0.550rem !important;
    padding-right: 0.225rem !important;
  }
  .container .pr_list_sec_main .row.gutter-md .col-6.item-2-6-grid.style-2{
    padding-left: 0.275rem !important;
    padding-right: 0.550rem !important;    
  }   
  .container .pr_list_sec_main .row.gutter-md .col-4.item-4-3-grid.column4.threecolumn-1{
    padding-left: 0.625rem !important;
    padding-right: 0.225rem !important;
  }
  .container .pr_list_sec_main .row.gutter-md .col-4.item-4-3-grid.column4.threecolumn-2{
    padding-left: 0.425rem !important;
    padding-right: 0.425rem !important;
  }
  .container .pr_list_sec_main .row.gutter-md .col-4.item-4-3-grid.column4.threecolumn-3{
    padding-left: 0.225rem !important;
    padding-right: 0.625rem !important;
  } 
  .container .pr_list_sec_main .row.gutter-md .col-6.item-3-6-grid.threecolumn-2{
    padding-left: 0.625rem !important;
    padding-right: 0.325rem !important;
  }    
  .container .pr_list_sec_main .row.gutter-md .col-6.item-3-6-grid.threecolumn-3{
    padding-left: 0.325rem !important;
    padding-right: 0.625rem !important;
  }    

}
@media (max-width: 480px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 227.61px !important;
    height: 341.415px !important;
  }
  .item-4-3-grid.column4 .product-image img.default-image,.item-4-3-grid.column4 .product-image img.hover-image{
    width: 146.39px;
    height: 219.585px;    
  }    
}
@media (max-width: 425px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 200px !important;
    height: 300px !important;
  }
  .item-4-3-grid.column4 .product-image img.default-image,.item-4-3-grid.column4 .product-image img.hover-image{
    width: 128.06px;
    height: 182.43px;    
  }
  .col-6.item-3-6-grid .product-image img.default-image,.col-6.item-3-6-grid .product-image img.hover-image{
    width: 199.72px;
    height: 299.58px;    
  }  
}
@media (max-width: 414px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 194.61px !important;
    height: 291.915px !important;
  }
  .item-4-3-grid.column4 .product-image img.default-image,.item-4-3-grid.column4 .product-image img.hover-image{
    width: 124.39px;
    height: 186.585px;    
  }
  .col-6.item-3-6-grid .product-image img.default-image,.col-6.item-3-6-grid .product-image img.hover-image{
    width: 191.81px;
    height: 287.715px;    
  }       
}
@media (max-width: 412px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 193.61px !important;
    height: 290.415px !important;
  }
  .item-4-3-grid.column4 .product-image img.default-image,.item-4-3-grid.column4 .product-image img.hover-image{
    width: 123.73px;
    height: 185.595px;    
  }    
}
@media (max-width: 393px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 184.11px !important;
    height: 276.165px !important;
  }
  .item-4-3-grid.column4 .product-image img.default-image,.item-4-3-grid.column4 .product-image img.hover-image{
    width: 117.39px;
    height: 176.085px;    
  }    
}
@media (max-width: 375px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 175.11px !important;
    height: 262.665px !important;
  }
  .item-4-3-grid.column4 .product-image img.default-image,.item-4-3-grid.column4 .product-image img.hover-image{
    width: 111.41px;
    height: 167.115px;    
  } 
  .col-6.item-3-6-grid .product-image img.default-image,.col-6.item-3-6-grid .product-image img.hover-image{
    width: 172.31px;
    height: 258.465px;    
  }       
}
@media (max-width: 360px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 167.61px !important;
    height: 251.415px !important;
  }
  .item-4-3-grid.column4 .product-image img.default-image,.item-4-3-grid.column4 .product-image img.hover-image{
    width: 106.41px;
    height: 159.615px;    
  }    
}
@media (max-width: 320px) {
  .col-6.item-2-6-grid .product-image img.default-image,.col-6.item-2-6-grid .product-image img.hover-image{
    width: 147.61px !important;
    height: 221.415px !important;      
  }
  .item-4-3-grid.column4 .product-image img.default-image,.item-4-3-grid.column4 .product-image img.hover-image{
    width: 93.06px;
    height: 139.59px;    
  }  
}
</style>