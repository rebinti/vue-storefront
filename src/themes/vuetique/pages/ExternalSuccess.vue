<template>
  <div id="thank_you_external" style="padding-bottom: 30px;">
    <div class="thank-you-content align-justify py40 pl20" style="text-align: center;">
      <div class="container">
        <div v-if="orderApiCheck" style="height:300px;margin-top:50px;padding-top: 110px;">
           <img src="/assets/opc-ajax-loader.svg" style="margin: 0 auto;width: 25px;">
             <h3 style="text-align: center;"> Please wait... </h3>
        </div>
        <div class="row success-block" v-if="!orderApiCheck">
          <div class="col-md-6 pl20 pr20">
            <h2 class="category-title" style="text-transform: uppercase;">Your order has been received.</h2>
            <h3 class="mt-4" style="text-transform: uppercase;"> Thank you for your purchase! </h3>
            <!-- <p class="mt-4"> Your order # is: <span style="color: #787878;"> {{orderincremetid}}. </span> </p> -->
            <p>You will receive an order confirmation email with details of your order and a link to track its progress.</p>
            <div class="mb-8"> <p> <a href="#" class="print-order">Click here </a> print a copy of your order confirmation. </p> </div>
            <router-link class="continue-button" :to="localizedRoute('/')">
              CONTINUE SHOPPING
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- <div id="thank_you_external" style="padding-bottom: 50px;">
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
  </div> -->
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
      orderApiCheck: true,
      orderincremetid: '',
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
    //this.submitOrderDataforEmarsysandSegmentify()    
    //this.submitOrderDataforAffiliateCommissionJunction()  
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
    async submitOrderDataforEmarsysandSegmentify () {
     if (this.$route.query.orderid) {
       const res =   await this.$store.dispatch('ui/getOrderedDetails', this.$route.query.orderid)
       this.orderincremetid = res.incrementid
        console.log('UUUUUUUUUUUUUUUUres', res);
      //  console.log('itemsresult', res.itemsresult);
      //  console.log('grandtotal', res.grandtotal);
       if (res && res.itemsresult.length > 0) {
            this.orderApiCheck = false;
            let productList= [];
            let paperplane_productList= [];
            let searchspring_intellisuggestCart = [];
            const emarsys = {
                  orderId: this.$route.query.orderid,
                  items: []
            }            
            res.itemsresult.filter(val => {
              if (val.Price != 0) {  
                emarsys.items.push({item: val.Sku, price: val.Price, quantity: val.Qty})              
                productList.push({productId: val.Sku, price: val.Price, quantity: val.Qty})
                paperplane_productList.push({0:'addEcommerceItem',1:val.Sku, 2:val.Name,3:'',4:val.Price,5:val.Qty})
                // searchspring_intellisuggestCart.push({sku: val.Sku, qty: val.Qty, price: val.Price})
              } 
            })            
            console.log( ' Segmentify',  {
                orderNo: this.$route.query.orderid, // only on the thank you page
                totalPrice: res.grandtotal,
                productList: productList
            });
            window.segCheckoutObject = {
                orderNo: this.$route.query.orderid, // only on the thank you page
                totalPrice: res.grandtotal,
                productList: productList
            };
            // PAPERPLANES - ORDER SUCCESS PAGE
            // if (window && window._paq  != undefined) {
            //     // console.log("PAPERPLANE ORDER SUCCESS CCCCCCCCCC",this.$store.state.cart)
            //     window._paq.push(paperplane_productList);                                 
            //    // window._paq.push(['trackEcommerceOrder', res.grandtotal ? res.grandtotal : '']);
            //     if(res.guest_email_md5){
            //       window._paq.push(['setUserId', res.guest_email_md5]);  
            //     }else if(res.customer_email_md5){
            //       window._paq.push(['setUserId', res.customer_email_md5]);  
            //     }

            //     let couponst = res.is_coupon ? true : false              
            //     window._paq.push(['trackEcommerceOrder', res.id,res.total,res.subtotal,res.tax,res.shipping,couponst]);  
            //     window._paq.push(['setCustomVariable', 1, "First_Name", res.first_name, 'visit']);
            //     window._paq.push(['setCustomVariable', 2, "Last_Name", res.last_name, 'visit']);
            //     window._paq.push(['setCustomVariable', 3, "Address1", res.address1, 'visit']);
            //     window._paq.push(['setCustomVariable', 4, "Address2", res.address2, 'visit']);
            //     window._paq.push(['setCustomVariable', 5, "Address3", res.address3, 'visit']);
            //     window._paq.push(['setCustomVariable', 6, "Address4", res.address4, 'visit']);
            //     window._paq.push(['setCustomVariable', 7, "Address5", res.address5, 'visit']);  
            //     window._paq.push(['trackEvent', 'Ecommerce', 'DiscountCode', res.coupon_code]);	                                               
            //     window._paq.push(['trackPageView']);  
            //   }                
            console.log(' emarsys', emarsys);
            this.$bus.$emit('send-to-emarsys-tracking', { type: 'Purchase', purchaseData: emarsys });  
            // SEARCHSPRING TRACK
             if(window && window.IntelliSuggest  != undefined) {
                  window.IntelliSuggest.init({siteId:'akjx6f'});
                  res.itemsresult.filter(val => {                    
                    window.IntelliSuggest.haveItem({
                        sku:val.Sku,
                        qty:val.Qty,
                        price:val.Price
                    });              
                  })
                  window.IntelliSuggest.inSale();
             }
            // GOOGLE TAG MANAGER
            Vue.gtm.trackEvent({
              'event': 'purchase',
              'ecommerce': {
                'purchase': {
                  'actionField': {
                    'id': res.id,
                    'affiliation': 'Default',
                    'revenue': res.total,
                    'subtotal': res.subtotal,
                    'tax': res.tax,
                    'shipping': res.shipping,
                    'discount': res.discount,
                    'coupon': res.coupon_code
                  },
                  'products': res.itemsresult
                }
              }
            })             
                                
       } else {
          this.$router.push(this.localizedRoute('/'))
       }
      } else {
           this.$router.push(this.localizedRoute('/'))
      }           
    },        
    async submitOrderDataforAffiliateCommissionJunction () {

      let count;      
      let url = 'https://www.emjcd.com/tags/c?containerTagId=5398294&CID=1560239&TYPE=421000&CURRENCY=EUR';
      /* https://www.emjcd.com/tags/c?containerTagId=1560239&ITEM1=seg-test&AMT1=0.82&QTY1=2[…]5763&TYPE=421000&CURRENCY=EUR&COUPON=ab50&DISCOUNT=11&CJEVENT= */

      if (this.$route.query.orderid) {
      url += '&OID=' + this.$route.query.orderid;
      const res =   await this.$store.dispatch('ui/getOrderedDetails', this.$route.query.orderid)
       if (res && res.itemsresult.length > 0) {          
            res.itemsresult.filter(val => {
              if (val.Price != 0) {  
                count++;                
                url += '&ITEM' + count + '=' +val.Sku;
                url += '&AMT' + count + '=' + val.Price;
                url += '&QTY' + count + '=' + val.Qty;
              } 
            })   
            if(res.is_coupon){
              url += '&COUPON=' + res.coupon_code;              
            }            
            document.write('<iframe height="1" width="1" frameborder="0" scrolling="no" name="cj_conversion" src="' + url +'"></iframe>');
            console.log( ' AffiliateCJ',  {
                orderNo: this.$route.query.orderid, // only on the thank you page
                url: url,                
            });                 
       } else {
          this.$router.push(this.localizedRoute('/'))
       }
      } else {
           this.$router.push(this.localizedRoute('/'))
      }           
    },    
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
  .success-block{ 
    padding: 50px;
    line-height: 2.3;
  }

  .continue-button {
    padding: 12px;
    border: 1px solid;
    color: #fff;
    background: black;
    font-weight: 500;
    cursor: pointer;
  }
  .print-order {
    color: #787878;
  }
</style>
