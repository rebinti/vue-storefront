<template>
  <div id="checkout" class="check_out_hd">
    <div class="container mx-auto">
      <div class="flex flex-wrap justify-between w-full" v-show="!isThankYouPage">
        <div class="w-full md:w-3/5 lg:w-1/2 md:px-3">
          <div class="checkout-title mt-5 md:mt-0 pb-5">
            <h1>
              {{ $t('Checkout') }}
            </h1>
          </div>
          <personal-details
            class="line relative"
            :is-active="activeSection.personalDetails"
            :focused-field="focusedField"
          />
          <shipping class="line relative" :is-active="activeSection.shipping" />
          <payment class="line relative" :is-active="activeSection.payment" />
          <div class="payment">
            <!-- <braintree-dropin v-if="payment.paymentMethod === 'braintree'"/> -->
          </div>
          <order-review class="line relative" :is-active="activeSection.orderReview" />
          <div id="custom-steps" />
        </div>
        <div class="w-full md:w-2/5 mt-10 md:mt-0 px-4 py-4 lg:px-8 lg:py-8 bg-grey-lighter">
          <cart-summary />
        </div>
      </div> 
    </div>
    <thank-you-page v-show="isThankYouPage" :cart="productsInCartList"  :totals="totalsAll"/>  
  </div>
</template>

<script>
import Checkout from '@vue-storefront/core/pages/Checkout'

import PersonalDetails from 'theme/components/core/blocks/Checkout/PersonalDetails'
import Shipping from 'theme/components/core/blocks/Checkout/Shipping'
import Payment from 'theme/components/core/blocks/Checkout/Payment'
import OrderReview from 'theme/components/core/blocks/Checkout/OrderReview'
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary'
import ThankYouPage from 'theme/components/core/blocks/Checkout/ThankYouPage'

// import BraintreeDropin from 'src/modules/payment-braintree/components/Dropin'  // M 2

export default {
  components: {
    PersonalDetails,
    Shipping,
    Payment,
    OrderReview,
    CartSummary,
    ThankYouPage,
    // BraintreeDropin
  },
  data() {
    return {
      productsInCartList: [],
      totalsAll: []
    }
  },
  mixins: [Checkout , CartSummary],
  mounted() {
      Object.assign(this.productsInCartList , this.productsInCart);
      Object.assign(this.totalsAll , this.totals);
      // this.productsInCartList = this.productsInCart;
      // this.totalsAll = this.totals;
      // console.log('Mountedddd ====' , this.productsInCartList , this.totalsAll )
  },
  methods: {
    notifyEmptyCart () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Shopping cart is empty. Please add some products before entering Checkout'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyOutStock (chp) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: chp.name + this.$t(' is out of the stock!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyNotAvailable () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('Some of the ordered products are not available!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyStockCheck () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Stock check in progress, please wait while available stock quantities are checked'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyNoConnection () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('There is no Internet connection. You can still place your order. We will notify you if any of ordered products is not available because we cannot check it right now.'),
        action1: { label: this.$t('OK') }
      })
    }
  }
}
</script>

<style lang="scss">
  //@import '~theme/css/base/text';
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $bg-secondary: color(secondary, $colors-background);
  $color-tertiary: color(tertiary);
  $color-secondary: color(secondary);
  $color-error: color(error);
  $color-white: color(white);
  $color-black: color(black);

  #checkout {
    .number-circle {
      width: 35px;
      height: 35px;
      border-radius: 100%;
      @apply .bg-grey;
      color: #fff;

      &.bg-cl-th-accent {
        @apply .bg-primary;
      }

      @media (max-width: 768px) {
        width: 25px;
        height: 25px;
        line-height: 25px;
      }
    }
    .radioStyled {
      display: block;
      position: relative;
      padding-left: 35px;
      margin-bottom: 12px;
      cursor: pointer;
      font-size: 16px;
      line-height: 30px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }

      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        border-radius: 50%;
        border: 1px solid $bg-secondary;

        &:after {
          content: "";
          position: absolute;
          display: none;
          top: 3px;
          left: 3px;
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: $color-secondary;
        }
      }

      input:checked ~ .checkmark:after {
        display: block;
      }
    }
  }

  .line {
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 17px;
      z-index: -1;
      width: 1px;
      height: 100%;
      background-color: $bg-secondary;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .checkout-title {
    @media (max-width: 767px) {
      margin-bottom: 25px;
      text-align: center;
      h1 {
        font-size: 36px;
      }
    }
  }

@media (max-width: 576px) {

  .check_out_hd{
    .checkout-title{
        padding: 0px;
        margin:0px;
        margin-bottom: 10px;
      h1{
        border-bottom: 0px;
        font-size:17px;
        width: 100%;
        text-align: center;
        margin: 0px;
        margin-top: 20px;
        text-transform: uppercase;
      }
    }
  }

  #checkout .number-circle.bg-cl-th-accent{
    background: #000000;
  }
   #checkout .text-primary{
     color: #000000;
   }
   .checkbox-wrap input[type="radio"]:checked + label:before{
     background-color: #000000;
     border:0px;
   }

}
  

</style>
