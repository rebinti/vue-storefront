<template>
  <div class="braintree" id="braintree" />
</template>

<script>
// import store from '@vue-storefront/store'
import store from '@vue-storefront/core/store'
// import {currentStoreView} from '@vue-storefront/store/lib/multistore'
import { currentStoreView } from '@vue-storefront/core/store/lib/multistore'
import Vue from 'vue'

export default {
  name: 'BraintreeDropin',
  data () {
    const storeView = currentStoreView()
    return {
      loader: false,
      commit: true,
      nonce: '',
      currency: storeView.i18n.currencyCode,
      locale: storeView.i18n.defaultLocale.replace('-', '_') // Convert to PayPal format of locale
    }
  },
  mounted () {
    this.configureBraintree()
    Vue.prototype.$bus.$emit('notification-progress-start', 'Please wait for payment....')
  },
  computed: {
    grandTotal () {
      let cartTotals = store.getters['cart/getTotals'] // cart.getters.getTotals() //store.getters['cart/totals']
      return cartTotals.find(seg => seg.code === 'grand_total').value
    }
  },
  methods: {
    configureBraintree () {
      console.log('configureBraintree')
      var self = this
      store.dispatch('braintree/generateToken').then((resp) => {
        var dropin = require('braintree-web-drop-in')
        console.debug('Code for braintree:' + resp)
        var button = document.querySelector('.place-order-btn')
        dropin.create({
          authorization: resp,
          container: '#braintree',
          paypal: {
            flow: 'checkout',
            amount: this.getTransactions().amount.total,
            currency: this.getTransactions().amount.currency
          }
        }).then((dropinInstance) => {
          console.log('dropinInstance', dropinInstance);
          Vue.prototype.$bus.$emit('notification-progress-stop')
          button.addEventListener('click', () => {
            console.log('dropinInstance button click', dropinInstance);
            if (dropinInstance.isPaymentMethodRequestable()) {
              Vue.prototype.$bus.$emit('notification-progress-start', 'Processing payment...')
              setTimeout(() => {  
                dropinInstance.requestPaymentMethod((err, payload) => {
                  if (!err) {
                    console.debug(payload)
                    console.log('requestPaymentMethod payload succ', payload)
                    // Submit payload.nonce to your server
                    self.nonce = payload.nonce
                    console.error('success')
                    self.doPayment()
                    // self.$bus.$emit('checkout-do-placeOrder', {
                    //   payment_method_nonce: self.nonce
                    // })
                  } else {
                    console.error('requestPaymentMethod payload succ', err)
                    Vue.prototype.$bus.$emit('notification-progress-stop')
                  }
                }).catch((requestPaymentMethodErr) => {
                  // No payment method is available.
                  // An appropriate error will be shown in the UI.
                  console.error('catch requestPaymentMethod payload succ', requestPaymentMethodErr)
                })
              }, 400)
            }
          })
        }).catch((error) => {
          console.error(error)
        })
      }).catch((error) => {
        console.error(error)
      })
    },
    getTransactions () {
      console.log('getTransactions --> ', this.grandTotal, this.currency);
      return {amount: {total: this.grandTotal, currency: this.currency}}
    },
    getNonce () {
      console.log('getNonce --> ', this.nonce, this.grandTotal, this.currency);
      return {nonce: this.nonce, total: this.grandTotal, currency: this.currency}
    },
    doPayment () { //  doPayment (data, actions)
      // Vue.prototype.$bus.$emit('notification-progress-stop')
      store.dispatch('braintree/doPayment', this.getNonce()).then(res => {
        console.log('result', res);
        if (res && res.code && res.code === 200) {
          this.$bus.$emit('checkout-do-placeOrder', {
            payment_method_nonce: this.nonce,
            do_payment_status: res.result.result.transaction
          })
        } else {
          Vue.prototype.$bus.$emit('notification-progress-stop')
        }  
      }, err => {
            Vue.prototype.$bus.$emit('notification-progress-stop')
      })
    },
    onAuthorize (data, actions) {
      return true
    },
    onCancel (data) {
      this.$emit('payment-braintree-cancelled', data)
    }
  }
}
</script>
