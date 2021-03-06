<template>
  <div>
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
</style>
