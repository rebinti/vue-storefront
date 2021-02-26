<template>
  <div
    class="right-sidebar microcart max-w-full fixed p-8 pt-10 mob_microcart"
    :class="{ active: showMicrocart }"
    data-testid="microcart"
  >

  <div class="right-sidebar max-w-full fixed" style="height: 50px;box-shadow: 0px 3px 2px -3px #00000045;overflow: hidden;">
    <button
      type="button"
      :aria-label="$t('Close')"
      class="absolute top-0 right-0 m-4 h-4"
      style="margin-top: 14px;"
      @click="closeMicrocartExtend"
      data-testid="closeMicrocart"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#close" />
      </svg>
    </button>

    <h2 v-if="productsInCart.length" class="mb-8 h_title" style="margin-top: 2px;">
     <span v-if="productsInCart.length > 0"> {{productsInCart.length}} </span> {{ $t('Items') }}
    </h2>
  </div>

    <h4 v-if="!productsInCart.length" class="mb-2" style="margin-top: 64px;">
      {{ $t('Your shopping cart is empty.') }}
    </h4>
    <div v-if="!productsInCart.length" @click="closeMicrocartExtend">
      {{ $t("Don't hesitate and") }}
      <router-link class="text-primary" :to="localizedRoute('/')">
        {{ $t('browse our catalog') }}
      </router-link>
      {{ $t('to find something beautiful for You!') }}
    </div>
     <swipe-list v-if="productsInCart.length" class="products p-0 m-0 p_crt_list" 
     ref="list" :items="productsInCart" item-key="sku" 
     style="margin-top: 60px;" :key="componentKey">
        <template v-slot="{ item, index, revealLeft, revealRight, close, revealed }" class="mb-3">
          <product :product="item" @click="removeItem" @parentevent="getupdateclick" />
        </template>
        <template v-slot:right="{ item }">
          <div class="swipeout-action red button_bx_link_lrg" @click="removeItem(item)">

            <remove-button class="cl-accent" />
          </div>
        </template>
     </swipe-list>

    <div class="mb_smry_out_wrap">
    <div v-if="productsInCart.length" class="summary pt-8 mob_summary">
      <div v-for="(segment, index) in totals" :key="index" class="flex justify-between py-2 text-grey-dark font-medium mob_d_item" v-if="segment.code === 'subtotal'"> 
       
        <div class="flex-grow mr-2">
          {{ segment.title }}
          <button v-if="appliedCoupon && segment.code === 'discount'" type="button" class="close delete-button" @click="clearCoupon">
            <i class="material-icons">close</i>
          </button>
        </div>
        <div v-if="segment.value != null" class="mob_d_price" :class="{'text-primary mob_d_price': segment.code === 'discount'}">
          {{ segment.value | price }}
        </div>
      </div>
      
    

      <!-- <div class="row bbbbbbbbb justify-between py-3 font-serif text-h2 font-bold mob_rw_price" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
        <div class="col-auto total-price-label">
          {{ segment.title }}
        </div>
        <div v-if="loadtotals" class="col-auto total-price-value">
          {{ segment.value | price }}
        </div>
        <div v-else>
          <img src="/assets/opc-ajax-loader.gif" style="margin: 0 auto;width: 25px;">
        </div>
      </div> -->
    </div>

    <div
      class="row justify-between items-center py-4 actions back_sec"
      v-if="productsInCart.length && !isCheckoutMode"
    >
      <div class="col-12 md:col-auto">
        <router-link :to="localizedRoute('/')" class="no-underline text-grey link back-to-shopping font-medium">
          <span @click="closeMicrocartExtend" class="block align-middle">
            <svg viewBox="0 0 25 25" class="vt-icon--xs align-middle ic_l"><use xlink:href="#left" /></svg>
            <span class="align-middle icl_span">{{ $t('Back to shopping') }}</span>
          </span>
        </router-link>
      </div>
      <div v-if="userlogin" class="col-12 md:col-auto">
        <button-full          
          class="btn-primary py-3 px-6"
          :link="{ name: 'checkout' }"
          @click.native="closeMicrocartExtend"
        >
          {{ $t('Go to checkout') }}          
        </button-full>

      </div>
      <div v-else class="col-12 md:col-auto"        
        @click="loginBeforeCheckout"
        >
        <button-full          
          class="btn-primary py-3 px-6"                    
        >
          {{ $t('Go to checkout') }}          
        </button-full>          
      </div>     
    </div>
    </div>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import Microcart from '@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart'
import VueOfflineMixin from 'vue-offline/mixin'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonFull from 'theme/components/theme/ButtonFull'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import Product from 'theme/components/core/blocks/Microcart/Product'
import Accordion from 'theme/components/theme/Accordion'
import NoScrollBackground from 'theme/mixins/noScrollBackground'
import { SwipeList, SwipeOut } from 'vue-swipe-actions';
import RemoveButton from './RemoveButton';
import config from 'config'

export default {
  components: {
    Product,
    ButtonFull,
    ButtonOutline,
    BaseInput,
    Accordion,
    SwipeList,
    RemoveButton
  },
  mixins: [
    Microcart,
    VueOfflineMixin,
    onEscapePress,
    NoScrollBackground
  ],
  data () {
    return {
      addCouponPressed: false,
      couponCode: '',
      componentLoaded: false,
      selectedRemoveProduct: null,
      componentKey: 0,
      loadtotals:true
    }
  },
  props: {
    isCheckoutMode: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  watch: {
      checktotalsupdatewatch (val, oldVal) {
        if (val !== oldVal) {
          this.loadtotals = true
        }
      }
    },  
  computed: {
    showMicrocart () {
      return this.isMicrocartOpen && this.componentLoaded
    },
    userlogin () {
      return this.$store.state.user.current
    }    
  },
  beforeMount () { 
      // PAPERPLANES - MICRO CART      
      if (window && window._paq != undefined) {
          //console.log("PAPERPLANE MICRO CART BBBBBBBBBB",this.$store.state.cart)
          this.$store.state.cart.cartItems.forEach(product => {
            window._paq.push(['addEcommerceItem',product.parentSku,product.name,'',product.price,product.qty]);                     
          })              
          window._paq.push(['trackEcommerceCartUpdate', this.$store.state.cart.platformTotals && this.$store.state.cart.platformTotals.grand_total ? this.$store.state.cart.platformTotals.grand_total : '']);          
          window._paq.push(['trackPageView']);  
        }     
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
  },
  methods: {
    addDiscountCoupon () {
      this.addCouponPressed = true
    },
    clearCoupon () {
      this.removeCoupon()
      this.addCouponPressed = false
    },
    setCoupon () {
      this.applyCoupon(this.couponCode).then(() => {
        this.addCouponPressed = false
        this.couponCode = ''
      }).catch(() => {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t("You've entered an incorrect coupon code. Please try again."),
          action1: { label: i18n.t('OK') }
        })
      })
    },
    closeMicrocartExtend () {
      this.closeMicrocart()
      this.$store.commit('ui/setSidebar', false)
      this.addCouponPressed = false
    },
    onEscapePress () {
      this.closeMicrocart()
    },
    swipeLeftHandler (param) {
      return function (dir) {
        // console.log('swipeLeftHandler ' , param);
        param.swipedElement = true;
      }
    },
    swipeRightHandler (param) {
      return function (dir) {
        // console.log('swipeRightHandler ' , param);
        param.swipedElement = false;
      }
    },
    removeItem (product) {
      this.loadtotals = false
      this.selectedRemoveProduct = product;
      // if (config.cart.askBeforeRemoveProduct) {
      //   this.$store.dispatch('notification/spawnNotification', {
      //     type: 'warning',
      //     item: product,
      //     message: i18n.t('Are you sure you would like to remove this item from the shopping cart?'),
      //     action2: { label: i18n.t('OK'), action: this.removeFromCart },
      //     action1: { label: i18n.t('Cancel'), action: 'close' },
      //     hasNoTimeout: true
      //   })
      // } else {
        this.removeFromCart()
      // }
    },
    removeFromCart (product) {
      this.$store.dispatch('cart/removeItem', { product: this.selectedRemoveProduct })      
      window.sgfLayer = {
        'basket': {
          step: 'remove',
          productId: this.selectedRemoveProduct.sku,
          quantity: this.selectedRemoveProduct.qty,
          price: this.selectedRemoveProduct.price
        }
      }
      this.forceRerender()
    },
    forceRerender () {
      this.componentKey += 1
    },
    loginBeforeCheckout () {
      if (!this.userlogin) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'success',
          message: 'Please Register/Sign-in to Checkout!',
          action1: { label: i18n.t('OK') }
        }) 
        this.closeMicrocartExtend();       
        this.$store.commit('ui/setAuthElem', 'login')
        this.$store.commit('ui/setCheckoutWithoutLoginFlag', true);
        this.$bus.$emit('modal-show', 'modal-signup')
      }
    },
    getupdateclick () {
      this.loadtotals = false
    },
  }
}
</script>

<style lang="scss" scoped>
  .heading {
    @media (max-width: 767px) {
      margin: 12px 0 12px 15px;
      font-size: 24px;
    }
  }

 .mb_smry_out_wrap{
   background: #ffffff;
   position: fixed;
   bottom:0px;
   right:0px;
   width:100%;
   max-width: 480px;
   padding: 10px 15px;
   z-index: 100;
   box-shadow: #121212 0px 4px 5px 2px;
 }
 .p_crt_list{
   width:100%;
   margin-bottom: 150px;
   margin-top: 15px;
   padding-bottom: 50px;
 }

    .mob_microcart .h_title{
      border-bottom: 0px;
      font-size: 17px;
      width: 100%;
      text-align: center;
      margin: 0px;
      margin-bottom: 20px;
      text-transform: uppercase;

    }

    .right-sidebar.microcart{
      padding-left: 15px;
      padding-right: 15px;
    }
    .right-sidebar.microcart .summary{
      padding-top: 0px;
      padding-right: 10px;
    }

    .mob_summary .mob_d_item{
      border-bottom:1px solid #ededed;
      padding-bottom: 20px;
      // display: block;
    }

    .mob_summary .mob_rw_list{
      /*border-bottom:1px solid #ededed;*/
      padding-top: 4px;
      padding-bottom: 15px;
    }

    .mob_summary .mob_rw_list button{
      background: #000;
      color: #ffffff;
      border-color: #000;
    }
    
    .mob_summary .mob_d_price{
      color:#000;
    }

    .mob_rw_price .total-price-label{
        color: #666666;
        font-size:15px;
        font-weight: 500;
    }

    .mob_rw_price .total-price-value{
       color:#000;
       font-size:15px;
        font-weight: 500;
    }

    .back_sec{
      padding-top: 0px;
    }

    .back_sec .ic_l{
      float: left;
      margin-right: 10px;
    }
    .back_sec .back-to-shopping{ display: none; }
    .back_sec .back-to-shopping .icl_span{
      float: left;
      line-height: 12px;
      color: #000;

    }

    .input-number-controls button .vt-icon{
      margin-left:5px;
    }

    .ht_bx{
       background: #000;
      color: #ffffff;
      border-color: #000;
    }

    .right-sidebar{
        top: 0px;
        height: 100vh;
        z-index: 8;
        max-height: calc(100vh - 0px);
    }
    .pt-10.mob_microcart {
        padding-top: 0.50rem;
    }
 @media (max-width: 576px) {
    .hd_fix{
      position: fixed;
      top:0px;
      left:0px;
      background:#ffffff;
      width:100%;
      z-index: 100;
    }
    .hd_fix .h_title{
      margin-bottom: 3px;
    }
 }

/*** new Swipe to delete css */

.swipeout-action {
  display: flex;
  align-items: center;
  padding: 0 3rem;
  cursor: pointer;
  left: 0;
}
.swipeout-action.blue {
  color: white;
  background-color: rgb(0, 122, 255);
}
.swipeout-action.blue:hover {
  background-color: darken(rgb(0, 122, 255), 5%);
}
.swipeout-action.purple {
  color: white;
  background-color: rgb(88, 86, 214);
}
.swipeout-action.purple:hover {
  background-color: darken(rgb(88, 86, 214), 5%);
}

.swipeout-action.red {
  color: white;
  background-color: rgb(255, 59, 48);
  margin-left: 15px;
  margin-bottom: 10px;
}
.swipeout-action.red:hover {
  background-color: darken(rgb(255, 59, 48), 5%);
}
.swipeout-action.green {
  color: white;
  background-color: rgb(76, 217, 100);
}
.swipeout-action.green:hover {
  background-color: darken(rgb(76, 217, 100), 5%);
}

.swipeout-list-item {
  flex: 1;
  border-bottom: 1px solid lightgray;
}

.swipeout-list-item:last-of-type {
  border-bottom: none;
}

.card {
  width: 100%;
  background-color: white;
  border-radius: 3px;
  box-shadow: none;
  border: 1px solid lightgray;
}
.card-content {
  padding: 10px;
  margin-bottom: 10px;
  padding-top: 0px;
}
.transition-right {
  transform: translate3d(100%, 0, 0) !important;
}
.transition-left {
  transform: translate3d(-100%, 0, 0) !important;
}

.toolbar {
  display: flex;
  align-items: center;
}

.toolbar .toolbar-section {
  flex: 0 0 auto;
}

.toolbar .toolbar-section--center {
  flex: 1000 1 0%;
}

.swipeout-right {
  padding-left: 15px;
}
// .microcart .btn-primary{
//   background: #4fce76 !important;
// }
</style>