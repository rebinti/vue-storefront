<template>
  <!-- <li class="row mb-3 pb-3 border-b border-grey-light relative p_list_block" 
     :style="'transform: translate(' + swipedValue +  'px, 0px);'"
      v-touch:swipe.left="swipeLeftHandler"
      v-touch:swipe.right="swipeRightHandler"
      v-touch:moving="movingHandler"
  > -->
  <div ref="content" class="card-content row pb-3 border-b border-grey-light relative p_list_block" @click.native="itemClick(item)">
    <!-- <div class="col-12 flex-col justify-start sm:justify-between prdct_cnt">
      <div>
        {{product.name}}
        <div class="absolute top-0 right-0 mb-3 button_bx_link_lrg">
          <div class="ic_dlt_bx">
              <span @click.prevent="removeFromBoards(product)"><remove-button class="cl-accent" /></span>
           </div>
        </div>
      </div>
    </div> -->

    <div class="image-block-wrapper-out">
        <div @click="$emit('click')">
          <div class="image-block-wrapper clearfix">
              <div class="image-block-col"><img src="/assets/wishlist-image1.jpg"/></div>
              <div class="image-block-col"><img src="/assets/wishlist-image2.jpg"/></div>
              <div class="image-block-col">
                  <div class="img_col_2 lg_img_one">
                      <img src="/assets/wishlist-image3.jpg"/>
                      <img src="/assets/wishlist-image4.jpg"/>  
                  </div>
                  <div class="img_col_2 lg_img_two">
                    <img src="/assets/wishlist-image5.jpg"/>
                    <img src="/assets/wishlist-image6.jpg"/>
                  </div>
              </div>
          </div>

          <div class="image-block-more">
            <h5>{{product.name}}</h5>
            <span class="sp_txt">{{product.items.length}} Items</span>
          </div>
        </div>

        <div class="absolute top-0 right-0 mb-3 button_bx_link_lrg">
          <div class="ic_dlt_bx">
              <span @click.prevent="removeFromBoards(product)"><remove-button class="cl-accent" /></span>
          </div>
       </div>
    </div>
 </div>
  <!-- </li> -->
</template>

<script>

import { WishlistProduct } from '@vue-storefront/core/modules/boards/components/Product'
import RemoveButton from './RemoveButton'

export default {
  name: 'BoardsItem',
  data() {
    return {
      swipedValue: 0,
      swipedLeft: false,
      windowWidth: 0
    }
  },
  components: {
    RemoveButton
  },
  mixins: [ WishlistProduct], 
  mounted() {
     this.windowWidth =  window.innerWidth;
  },
  methods: {
    movingHandler() {
        if( !this.swipedLeft && (this.swipedValue > -80  && this.swipedValue <= 0)  && this.windowWidth <= 760 ) {
          this.swipedValue = this.swipedValue - 10 ;
        }
    },
    swipeLeftHandler() {
        if(this.windowWidth <= 760)  this.swipedValue = -80;
    },
    swipeRightHandler() {
      if(this.windowWidth <= 760)  this.swipedValue = 0;
    },
    closeWishlist () {
      this.$store.commit('ui/setWishlist', false)
    },
    removeFromBoards (product) {
       this.$store.state['boards'] ? this.$store.dispatch('boards/removeBoard', product) : false;
       this.swipedValue = 0;

    }
  }
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
  width:100%;
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
    display: none !important;
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




/*** Boards list page style */

.wishlist-top-button-row {
  max-width: 314px;
  margin: auto;
}
.wishlist-top-button-row .button-blck {
  display: block;
  float: left;
}
.wishlist-top-button-row .button-blck .button-type1 {
  border:1px solid #000000;
  padding: 4px 48px;
  color: #000000;
  width:157px;
}
.wishlist-top-button-row .button-blck .button-type1.active {
  background: #000000;
  color: #ffffff;
}
.image-block-wrapper .image-block-col {
  float: left; padding-left: 5px;
 
  
}
.image-block-wrapper .image-block-col:first-child {
  margin-left: 0;
}

.image-block-col{
  width:33.33%;
  float: left;
  height:100%;
}
.image-block-wrapper{
  width:100%;
  height:150px;
  overflow:hidden;
}

.img_col_2 img{
  margin-bottom: 5px;
}
.img_col_2{
  float: left;
  width:50%;
  padding-right: 5px;
  height:100%;
}

.image-block-col img{
  width:100%;
  height:100%;
}

.lg_img_one img:first-child{
  height: 60%;
}
.lg_img_one img:last-child{
  height: 40%;
}
.lg_img_two img:first-child{
  height: 40%;
}
.lg_img_two img:last-child{
  height: 60%;
}

.image-block-more{
  width:100%;
  display: inline-block;
  padding-top: 10px;
  padding-bottom: 15px;
}

.image-block-more h5{
  font-size:16px;
  color:#000;
  float: left;
  font-weight: bold;
}

.image-block-more span.sp_txt{
  float: right;
  font-size:11px;
  color:#7c7c7c;
  font-weight: 500;
}

.image-block-wrapper-out{
  padding-top: 20px;
  /* border-bottom: 1px solid #ccc; */
  /* margin: 0 auto; */
  width: 100%;
}

.add_more_btn{
  width:50px;
  height:50px;
  background: #000;
  -webkit-border-radius: 50%;
	-moz-border-radius: 50%;
  border-radius: 50%;
  position: fixed;
  bottom: 100px;
  z-index: 100;
  right: 25px;
}
.add_more_btn a{
  width:100%;
  height:100%;
  font-size: 20px;
  color: #fff;
  padding-top: 13px;
  display: inline-block;
}

/** End */
</style>
