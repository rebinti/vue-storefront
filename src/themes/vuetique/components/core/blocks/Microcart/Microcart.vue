<template>
  <div
    class="right-sidebar microcart max-w-full fixed p-8 pt-10 mob_microcart"
    :class="{ active: showMicrocart }"
    data-testid="microcart"
  >

  <div class="hd_fix">
    <button
      type="button"
      :aria-label="$t('Close')"
      class="absolute top-0 right-0 m-4 h-4"
      @click="closeMicrocartExtend"
      data-testid="closeMicrocart"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#close" />
      </svg>
    </button>

    <h2 v-if="productsInCart.length" class="mb-8 h_title">
     <span v-if="productsInCart.length > 0"> {{productsInCart.length}} </span> {{ $t('Items') }}
    </h2>
  </div>

    <h4 v-if="!productsInCart.length" class="mb-2">
      {{ $t('Your shopping cart is empty.') }}
    </h4>
    <div v-if="!productsInCart.length" @click="closeMicrocartExtend">
      {{ $t("Don't hesitate and") }}
      <router-link class="text-primary" :to="localizedRoute('/')">
        {{ $t('browse our catalog') }}
      </router-link>
      {{ $t('to find something beautiful for You!') }}
    </div>
    <ul v-if="productsInCart.length" class="products p-0 m-0 p_crt_list">
      <product v-for="product in productsInCart" :key="product.sku" :product="product" 
       v-touch:swipe.left="swipeLeftHandler(product)"
       v-touch:swipe.right="swipeRightHandler(product)"
      />
    </ul>
    <div class="mb_smry_out_wrap">
    <div v-if="productsInCart.length" class="summary pt-8 mob_summary">
      <div v-for="(segment, index) in totals" :key="index" class="flex justify-between py-2 text-grey-dark font-medium mob_d_item" v-if="segment.code !== 'grand_total'">
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
      
      <Accordion class="mob_fltr" v-if="OnlineOnly"
              :title="$t('Use Promotional code')"
              :openType=false
            >
          <template >
              <div v-if="OnlineOnly" class="py-3 flex mob_rw_list">
                <div class="mr-3 flex-grow">
                  <base-input type="text" class="mob_t_bx" id="couponinput" :placeholder="$t('Add discount code')" :autofocus="true" v-model.trim="couponCode" @keyup.enter="setCoupon" />
                </div>
                <div>
                  <button-full :disabled="!couponCode" @click.native="setCoupon" class="ht_bx">
                    {{ $t('Apply') }}
                  </button-full>
                </div>
              </div>
          </template>
      </Accordion>

      <!-- <div v-if="OnlineOnly" class="py-3 flex mob_rw_list">
        <div class="mr-3 flex-grow">
          <base-input type="text" class="mob_t_bx" id="couponinput" :placeholder="$t('Add discount code')" :autofocus="true" v-model.trim="couponCode" @keyup.enter="setCoupon" />
        </div>
        <div>
          <button-full :disabled="!couponCode" @click.native="setCoupon" class="ht_bx">
            {{ $t('Apply') }}
          </button-full>
        </div>
      </div> -->

      <div class="row justify-between py-3 font-serif text-h2 font-bold mob_rw_price" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
        <div class="col-auto total-price-label">
          {{ segment.title }}
        </div>
        <div class="col-auto total-price-value">
          {{ segment.value | price }}
        </div>
      </div>
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
      <div class="col-12 md:col-auto">
        <button-full
          class="btn-primary py-3 px-6"
          :link="{ name: 'checkout' }"
          @click.native="closeMicrocartExtend"
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

export default {
  components: {
    Product,
    ButtonFull,
    ButtonOutline,
    BaseInput,
    Accordion
  },
  mixins: [
    Microcart,
    VueOfflineMixin,
    onEscapePress
  ],
  data () {
    return {
      addCouponPressed: false,
      couponCode: '',
      componentLoaded: false
    }
  },
  props: {
    isCheckoutMode: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  computed: {
    showMicrocart () {
      return this.isMicrocartOpen && this.componentLoaded
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
    swipeLeftHandler(param) {
      return function(dir) {
        console.log('swipeLeftHandler ' , param);
        param.swipedElement = true;
      }
    },
    swipeRightHandler(param) {
      return function(dir) {
        console.log('swipeRightHandler ' , param);
        param.swipedElement = false;
      }
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
 }
 .p_crt_list{
   width:100%;
   margin-bottom: 150px;
   margin-top: 15px;
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
    }

    .mob_summary .mob_d_item{
      border-bottom:1px solid #ededed;
      padding-bottom: 20px;
      display: none;
    }

    .mob_summary .mob_rw_list{
      border-bottom:1px solid #ededed;
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

 @media (max-width: 576px) {
    .hd_fix{
      position: fixed;
      top:70px;
      left:0px;
      background:#ffffff;
      width:100%;
      z-index: 100;
    }
    .hd_fix .h_title{
      margin-bottom: 3px;
    }
 }
  
  
</style>


