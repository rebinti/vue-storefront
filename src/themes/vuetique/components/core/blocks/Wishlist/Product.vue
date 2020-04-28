<template>
  <!-- <li class="row mb-3 pb-3 border-b border-grey-light relative p_list_block" 
     :style="'transform: translate(' + swipedValue +  'px, 0px);'"
      v-touch:swipe.left="swipeLeftHandler"
      v-touch:swipe.right="swipeRightHandler"
      v-touch:moving="movingHandler"
     > -->
  <div ref="content" class="card-content row pb-3 border-b border-grey-light relative p_list_block" >
    <div class="col-4 bg-grey-lightest">
      <div @click="closeWishlist">
        <router-link :to="productLink"
                     data-testid="productLink"
                     class="imglink"
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
              :to="productLink"
              data-testid="productLink"
            >
              {{ product.name | htmlDecode }}
            </router-link>
          </div>
        </div>
        <!-- <div class="text-sm text-grey leading-normal mb-2" data-testid="productSku">
          {{ product.parentSku }}
        </div> -->

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
        <div class="absolute top-0 right-0 mb-3 button_bx_link_lrg">
          <div class="ic_dlt_bx">
              <span @click="$emit('click', product)"><remove-button class="cl-accent" /></span>
           </div>
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
  </div>
  <!-- </li> -->
</template>

<script>
import Product from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Product'
import RemoveButton from './RemoveButton'
import AddToCart from 'theme/components/core/AddToCart.vue'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'

export default {
  data () {
    return {
      swipedValue: 0,
      swipedLeft: false,
      windowWidth: 0
    }
  },
  components: {
    RemoveButton,
    AddToCart
  },
  mounted () {
    this.windowWidth =  window.innerWidth;
  },
  computed: {
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    }
  },
  methods: {
    movingHandler () {
      //  console.log('movingHandler' , this.swipedValue );
        if( !this.swipedLeft && (this.swipedValue > -80  && this.swipedValue <= 0)  && this.windowWidth <= 760 ) {
          this.swipedValue = this.swipedValue - 10 ;
        }
        // if(this.leftSwipe) {
        //  this.swipedValue++;
        // }
    },
    // startHandler() {
    //    // this.swipedValue = 0;
    //    console.log('startHandler startHandler');
    // },
    // endHandler() {
    //    console.log('endHandler endHandler');
    // },
    // swipeAction (param) {
    //   return function(dir) {
    //     if(dir == 'left') {
    //       this.swipedValue = -80;
    //       this.swipedLeft =  true;
    //     }
    //     if(dir == 'right') {
    //       this.swipedValue = 0;
    //       this.swipedLeft =  false;
    //     }
    //   }
    // },
    swipeLeftHandler () {
      if (this.windowWidth <= 760) this.swipedValue = -80;
    },
    swipeRightHandler () {
      if (this.windowWidth <= 760) this.swipedValue = 0;
    }
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
  color:#fff;
  
}

.right-sidebar .p_list_block .image{
  /* width:100%; */
  width: 100px;
}
.right-sidebar .p_list_block a.imglink{
  max-width: 23.333333%;
}
.p_list_block{
  transition: all 0.5s ease;
}
.swipe-left{
  transform: translate(-80px, 0px);
 /* right:105px; */
 
}
@media (max-width: 576px) {
  .button_bx_link_lrg{
    display: none;
    width: 85px;
    height: 100%;
    background: #ff3a31;
    text-align: center;
    border: 0px;
    right: -106px;
  }
  .ic_dlt_bx{
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    color:#fff;
  }
}
</style>
