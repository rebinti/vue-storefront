<template>
  <div id="thank_you_external" style="padding-bottom: 50px;">
    <header class="thank-you-title bg-cl-secondary py35 pl20">
      <div class="container">
        <breadcrumbs
          :routes="[{name: 'Homepage', route_link: '/'}]"
          :active-route="this.$t('Order confirmation')"
        />
        <h2 class="category-title">
          {{ $t('Order confirmation') }}
        </h2>
      </div>
    </header>
    <div class="thank-you-content align-justify py40 pl20">
      <div class="container">
        <div v-if="orderApiCheck" style="height:300px;"></div>
        <div class="row" v-if="!orderApiCheck">
          <div class="col-md-6 pl20 pr20">
            <h3 v-if="OnlineOnly" >
              {{ $t('Your purchase') }}  was successful #{{$route.query.orderid}}
            </h3>
            <p v-html="this.$t('You have successfuly placed the order. You can check status of your order by using our <b>delivery status</b> feature. You will receive an order confirmation e-mail with details of your order and a link to track its progress.')" />
            <p v-html="this.$t('E-mail us at <b>demo@vuestorefront.io</b> with any questions, suggestions how we could improve products or shopping experience')"/>
            <h4>
              {{ $t('Your Account') }}
            </h4>
            <p v-html="this.$t('You can log to your account using e-mail and password defined earlier. On your account you can <b>edit your profile data,</b> check <b>history of transactions,</b> edit <b>subscription to newsletter.</b>')"/>
          </div>
          <div class="col-md-6 pt30 bg-cl-secondary thank-you-improvment">
            <h3>
              {{ $t('What we can improve?') }}
            </h3>
            <p class="mb25">
              {{ $t('Your feedback is important fo us. Let us know what we could improve.') }}
            </p>
            <form @submit.prevent="sendFeedback" style="margin-top: 5px;">
              <base-textarea
                class="mb25"
                type="text"
                name="body"
                v-model="feedback"
                :placeholder="$t('Type your opinion')"
                :autofocus="true"
              />
              <button-outline color="dark"  style="margin-top: 5px;">
                {{ $t('Give a feedback') }}
              </button-outline>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Composite from '@vue-storefront/core/mixins/composite'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import BaseTextarea from 'theme/components/core/blocks/Form/BaseTextarea'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import VueOfflineMixin from 'vue-offline/mixin'
import { EmailForm } from '@vue-storefront/core/modules/mailer/components/EmailForm'
import rootStore from '@vue-storefront/core/store'
import { localizedRoute } from '@vue-storefront/core/lib/multistore'

export default {
  name: 'ExternalThankYouPage',
  mixins: [Composite, VueOfflineMixin, EmailForm],
  data () {
    return {
      feedback: '',
      orderApiCheck: true
    }
  },
  computed: {
    isNotificationSupported () {
      if (Vue.prototype.$isServer || !('Notification' in window)) return false
      return 'Notification' in window
    },
    isPermissionGranted () {
      if (Vue.prototype.$isServer || !('Notification' in window)) return false
      return Notification.permission === 'granted'
    },
    mailerElements () {
      return this.$store.state.config.mailer.contactAddress
    },
    user () {
      return this.$store.state.user.current
    }
  },
  components: {
    BaseTextarea,
    Breadcrumbs,
    ButtonOutline
  },
  beforeMount () {
    this.$bus.$on('application-after-loaded', (payload) => {
      if (document.getElementById('thank_you_external') != null) {
        this.clearTheCart()
      }
    })
    this.$bus.$on('cart-after-itemchanged', (payload) => {
      if (document.getElementById('thank_you_external') != null) {
        this.clearTheCart()
      }
    })
    // if(!this.user) this.$router.push(this.localizedRoute('/'))
    this.submitEmarsysOrderData()
  },
  mounted() {
    window.segPageInf = {
        "category": "Checkout Success Page",
        "subCategory": ''
      }
  },
  destroyed () {
    this.$bus.$off('application-after-loaded');
    this.$bus.$off('cart-after-itemchanged');
  },
  methods: {
    clearTheCart () {
      if (this.getNumberOfItemsInCart() > 0) {
        rootStore.dispatch('cart/clear', {}, { root: true })
        rootStore.dispatch('cart/serverCreate', {guestCart: false}, {root: true})
      }
    },
    getNumberOfItemsInCart () {
      return this.$store.state.cart.cartItems.length
    },
    requestNotificationPermission () {
      if (Vue.prototype.$isServer) return false
      if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission()
      }
    },
    sendFeedback () {
      this.sendEmail(
        {
          sourceAddress: this.checkoutPersonalEmailAddress,
          targetAddress: this.mailerElements.contactAddress,
          subject: this.$t('What we can improve?'),
          emailText: this.feedback
        },
        this.onSuccess,
        this.onFailure
      )
    },
    onSuccess (message) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message,
        action1: { label: this.$t('OK') }
      })
      if (this.mailerElements.sendConfirmation) {
        this.sendEmail(
          {
            sourceAddress: this.mailerElements.contactAddress,
            targetAddress: this.checkoutPersonalEmailAddress,
            subject: this.$t('Confirmation of receival'),
            emailText: this.$t(`Dear customer,\n\nWe have received your letter.\nThank you for your feedback!`),
            confirmation: true
          }
        )
      }
    },
    onFailure (message) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message,
        action1: { label: this.$t('OK') }
      })
    },

    async submitEmarsysOrderData () {
      console.log('this.$router', this.$route)
     if (this.$route.query.orderid) {
       const res =   await this.$store.dispatch('ui/getOrderedProducts', this.$route.query.orderid)
       console.log('order details', res);
       if (res && res.length > 0) {
            this.orderApiCheck = false;
            let productList= [];
            const emarsys = {
                  orderId: this.$route.query.orderid,
                  items: []
            }
            res.filter(val => {
              if (val.Price != 0) {
                emarsys.items.push({item: val.Sku, price: val.Price, quantity: val.Qty})
                productList.push({productId: val.Sku, price: val.Price, quantity: val.Qty})
              } 
            })
            console.log(' emarsys', emarsys);
            console.log( ' Segmentify',  {
                orderNo: this.$route.query.orderid, // only on the thank you page
                totalPrice: productList.reduce((c,v) => c + parseInt(v.price),0),
                productList: productList
            });
            window.segCheckoutObject = {
                orderNo: this.$route.query.orderid, // only on the thank you page
                totalPrice: productList.reduce((c,v) => c + parseInt(v.price),0),
                productList: productList
            };
          this.$bus.$emit('send-to-emarsys-tracking', { type: 'Purchase', purchaseData: emarsys });
       } else {
          this.$router.push(this.localizedRoute('/'))
       }
      } else {
           this.$router.push(this.localizedRoute('/'))
      }
    }
  }
  // async asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
  //   // return new Promise((resolve, reject) => {
  //   //   store.dispatch('ui/getOrderDeatilsById', {
  //   //       key: '_type',
  //   //       value: "banner"
  //   //   }).then(res => {
  //   //     console.log('jsonplaceholder', res)
  //   //     return resolve()
  //   //   }, err => { reject()});
  //   // })
  //   try {
  //     if (route.query.orderid) {
  //       let res =  await store.dispatch('ui/getOrderDeatilsById', {
  //         orderid: route.query.orderid
  //       })
  //       console.log('jsonplaceholder', res);
  //     } else {

  //     }
     
  //   } catch (error) {
  //     throw error
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  #thank_you_external ~ .notifications {
    display: none;
  }
</style>
