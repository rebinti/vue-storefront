<template>
  <div>
    <div class="thanks_page_dsk">
        <header class="thank-you-title w-full">
          <breadcrumbs
            :routes="[{name: 'Homepage', route_link: '/'}]"
            :active-route="this.$t('Order confirmation')"
          />
          <div class="container mx-auto">
            <h2 class="category-title mb-12">
              {{ $t('Order confirmation') }}
            </h2>
          </div>
        </header>
        <div class="container mx-auto">
          <div class="flex flex-wrap justify-between">
            <div class="w-3/5">
              <h3 v-if="OnlineOnly" class="mb-3">
                {{ $t('Your purchase') }}
              </h3>
              <p v-if="OnlineOnly" v-html="this.$t('You have successfuly placed the order. You can check status of your order by using our <b>delivery status</b> feature. You will receive an order confirmation e-mail with details of your order and a link to track its progress.')" />
              <div class="bg-grey-lighter my-5 text-black px-5 text-h2 py-3 inline-block font-serif font-medium" v-if="OnlineOnly && lastOrderConfirmation" v-html="this.$t('Thank you for your Order #') + lastOrderConfirmation.backendOrderId" />
              <p v-if="OnlineOnly" v-html="this.$t('E-mail us at <b>demo@vuestorefront.io</b> with any questions, suggestions how we could improve products or shopping experience')" />
              <h4 v-if="OfflineOnly" class="my-2">
                {{ $t('You are offline') }}
              </h4>
              <p v-if="OfflineOnly && !isNotificationSupported">
                {{ $t('To finish the order just come back to our store while online. Your order will be sent to the server as soon as you come back here while online and then confirmed regarding the stock quantities of selected items') }}
              </p>
              <p v-if="OfflineOnly && isNotificationSupported && !isPermissionGranted">
                {{ $t("You can allow us to remind you about the order via push notification after coming back online. You'll only need to click on it to confirm.") }}
              </p>
              <p v-if="OfflineOnly && isNotificationSupported && isPermissionGranted">
                <strong>{{ $t('You will receive Push notification after coming back online. You can confirm the order by clicking on it') }}</strong>
              </p>
              <p v-if="!isPermissionGranted && isNotificationSupported">
                <button class="btn-grey-dark mt-5" @click.native="requestNotificationPermission()">
                  {{ $t('Keep me notified about this order') }}
                </button>
              </p>
              <div id="thank-you-extensions" />

              <h3 class="border-t mt-10 pt-10 mb-5">
                {{ $t('What we can improve?') }}
              </h3>
              <p class="mb-3">
                {{ $t('Your feedback is important fo us. Let us know what we could improve.') }}
              </p>
              <form @submit.prevent="sendFeedback">
                <base-textarea
                  class=""
                  type="text"
                  name="body"
                  v-model="feedback"
                  :placeholder="$t('Type your opinion')"
                  :autofocus="true"
                />
                <button class="btn btn-primary btn-md uppercase mt-3">
                  {{ $t('Give a feedback') }}
                </button>
              </form>
            </div>
            <div class="w-1/3">
              <div class="p-10 bg-grey-lighter">
                <h3 class="text-h3 mb-3">
                  {{ $t('Your Account') }}
                </h3>
                <p v-html="this.$t('You can log to your account using e-mail and password defined earlier. On your account you can <b>edit your profile data,</b> check <b>history of transactions,</b> edit <b>subscription to newsletter.</b>')" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="thanks_page_mbl">

        <div class="inner_thanks_page">

          <div class="inner_thanks_top">

            <i class="fas fa-check-circle"></i>
            <h3>Congratulations</h3>
            <h6>Your purchase was successful</h6>

          </div>

          <div class="inner_thanks_bottom">

            <div class="inner_prd_box">

              <div class="inner_prd_box_item">

                      <div class="inner_prd_box_top">

                          <span class="prd_ordr_id">Order ID : Q935-AG45</span>
                          <span class="prd_ordr_id_it">1Item</span>

                      </div>
                      <div class="inner_prd_box_middle">
                      
                        <div class="prd_bx_pic">
                          <img src="http://localhost:3000/assets/vuetique-small-banners-2.jpg" alt="" title="">
                        </div>
                        <div class="prd_bx_pic_cnt">
                        
                        <h5>Pyjama -style trousers</h5>
                        <div class="prd_bx_details_sec">Item ID:123456</div>
                        <div class="prd_bx_details_sec">Size:M / Colour :red</div>
                        <div class="prd_bx_details_right"><b>$35</b> * 1</div>

                        </div>

                      </div>

              </div>

              <div class="inner_prd_price_bx">

                  <div class="p_box_item">
                      <span class="p_box_p_label">Sub-total</span>
                      <span class="p_box_p_size">$35.59</span>
                  </div>

                  <div class="p_box_item">
                      <span class="p_box_p_label">Delivery</span>
                      <span class="p_box_p_size">$0</span>
                  </div>

                  <div class="p_box_item">
                      <span class="p_box_p_label">Delivery</span>
                      <span class="p_box_p_size red_val">-$10</span>
                  </div>

                  <div class="p_box_item pr_box">
                      <span class="p_box_p_label">Total</span>
                      <span class="p_box_p_size">$25.59</span>
                  </div>

              </div>



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

export default {
  name: 'ThankYouPage',
  mixins: [Composite, VueOfflineMixin, EmailForm],
  data () {
    return {
      feedback: ''
    }
  },
  computed: {
    lastOrderConfirmation () {
      return this.$store.state.order.last_order_confirmation ? this.$store.state.order.last_order_confirmation.confirmation : {}
    },
    isNotificationSupported () {
      if (Vue.prototype.$isServer || !('Notification' in window)) return false
      return 'Notification' in window
    },
    isPermissionGranted () {
      if (Vue.prototype.$isServer || !('Notification' in window)) return false
      return Notification.permission === 'granted'
    },
    checkoutPersonalEmailAddress () {
      return this.$store.state.checkout.personalDetails.emailAddress
    },
    mailerElements () {
      return this.$store.state.config.mailer.contactAddress
    }
  },
  methods: {
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
    }
  },
  destroyed () {
    this.$store.dispatch('checkout/setThankYouPage', false)
  },
  components: {
    BaseTextarea,
    Breadcrumbs,
    ButtonOutline
  }
}
</script>

<style lang="scss">
  .thank-you-content {
    padding-left: 0;

    p {
      line-height: 25px
    }

    @media (min-width: 64em) {
      h4 {
        font-size: 24px;
      }
    }
  }
  .thank-you-improvment {
    padding: 0 20px 15px;

    @media (min-width: 64em) {
      padding: 0 40px 10px;
    }

    textarea {
      min-height: 100px;
    }
  }

@media (min-width: 577px) {

  .thanks_page_mbl{
    display: none; 
  }

}
@media (max-width: 576px) {

  .thanks_page_dsk{
    display: none; 
  }

/* for edit purpose */
  .thanks_page_mbl{
    display: none; 
  }

  .thanks_page_dsk{
    display: block; 
  }
/*  ---- */
  .thanks_page_mbl{
    min-height:600px;
    position: relative;
    background: #e9e9e9;
    .inner_thanks_page{
      width:100%;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      position: absolute;
      left:0px;
      text-align: center;
      .svg-inline--fa{
        color:#17e3c8;
        font-size:40px;
      }
      h3{
        font-size:30px;
        color:#000;
        font-weight: bold;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      h6{
        font-size:12px;
        color:#7c7c7c;
        padding-bottom: 10px;
        font-weight: 600;
        letter-spacing: 1px;
      }
    }

    .inner_thanks_top{
      width:100%;
      float: left;
    }
    .inner_thanks_bottom{
      width:100%;
      float: left;
      .inner_prd_box{
        width:96%;
        float: left;
        padding: 10px;
        margin: 5% 2%;
        background: #ffffff;
       -webkit-box-shadow: -1px -1px 15px 0px #cccccc;
        -moz-box-shadow: -1px -1px 15px 0px #cccccc;
        box-shadow: -1px -1px 15px 0px #cccccc;
        -webkit-border-radius: 3px;
          -moz-border-radius: 3px;
          border-radius: 3px;
        .inner_prd_box_item{
          width:100%;
          float: left;

          .inner_prd_box_top{
            width:100%;
            float: left;
            padding-bottom: 10px;

            .prd_ordr_id{
              float: left;
              color:#7f7f7f;
              font-size:11px;
            }
            .prd_ordr_id_it{
              float: right;
              color:#7f7f7f;
              font-size:11px;
            }
          }
          .inner_prd_box_middle{
            width:100%;
            float: left;
            .prd_bx_pic{
              width:30%;
              float:left;
            }
            .prd_bx_pic_cnt{
              width:65%;
              float:left;
              padding-left: 15px;
              text-align: left;
              h5{
                color:#000;
                font-size:18px;
                font-weight: bold;
                line-height: 18px;
                margin-bottom: 5px;
              }
              .prd_bx_details_sec{
                font-size:11px;
                line-height: 14px;
                color:#7f7f7f;
                padding-top: 2px;
              }
              .prd_bx_details_right{
                text-align: right;
                font-size:11px;
                line-height: 14px;
                color:#7f7f7f;
                b{
                  font-size:13px;
                  font-weight: bold;
                  color:#000;
                  line-height: 12px;
                }
              }
            }
          }
        }
        .inner_prd_price_bx{
          width:100%;
          float: left;
          border-top:1px solid #cccccc;
          margin-top: 15px;
          padding-top: 15px;
          .p_box_item{
            width:100%;
            float: left;
            font-size:11px;
            line-height: 13px;
            color:#7f7f7f;
            margin-bottom: 8px;
            .p_box_p_label{
              width:50%;
              float: left;
              text-align: left;
            }
            .p_box_p_size{
              width:50%;
              float: left;
              text-align: right;
              &.red_val{
                color:#f10;
              }
            }
            &.pr_box{
              font-size:15px;
              line-height: 17px;
              color: #000;
              font-weight: bold;
              padding-top: 10px;
            }
          }
        }
      }
    }

  }

}

</style>
