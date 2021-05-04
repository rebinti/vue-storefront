<template>
  <modal name="modal-newsletter" :width="450">
    <p slot="header">
      {{ $t('Newsletter') }}
    </p>
    <div slot="content">
      <form @submit.prevent="subscribe(onSuccesfulSubmission)" novalidate>
        <div @click="captchacallevent">
          <p class="mb-2">
            {{ $t('Sign up to our newsletter and receive a coupon for 10% off!') }}
          </p>
          <base-input
            focus            
            type="text"
            name="email"
            v-model="email"
            @blur="$v.email.$touch()"
            autocomplete="email"
            :placeholder="$t('E-mail address *')"
            :validations="[
              {
                condition: !$v.email.required && $v.email.$error,
                text: $t('Field is required.')
              },
              {
                condition: !$v.email.email && $v.email.$error,
                text: $t('Please provide valid e-mail address.')
              }
            ]"
          />
        </div>
        <button-full
          class="mt-3 w-full"
          type="submit"
          :disabled="this.$v.$invalid"
          @click.native="$v.email.$touch"
        >
          {{ $t('Subscribe') }}
        </button-full>
      </form>
    </div>
  </modal>
</template>
<script>
import SubscriptionStatus from '@vue-storefront/core/modules/newsletter/mixins/SubscriptionStatus'
import Subscribe from '@vue-storefront/core/modules/newsletter/mixins/Subscribe'
import i18n from '@vue-storefront/i18n'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Modal from 'theme/components/core/Modal'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'

export default {
  beforeDestroy () {
    this.$off('validation-error')
  },
  data () {
    return {
      captchacall: false
    }
  },  
  methods: {
    onSuccesfulSubmission () {
      // this.$store.dispatch('notification/spawnNotification', {
      //   type: 'success',
      //   message: i18n.t('You have been successfully subscribed to our newsletter!'),
      //   action1: { label: i18n.t('OK') }
      // })      
      this.$bus.$emit('modal-hide', 'modal-newsletter')
    },
    captchacallevent () {     
      if(this.captchacall==false){
        this.captchacall = true
        console.log('data  55555555555 AAAAAAAA','11111111111')
        this.$store.dispatch('googleRecaptcha/isVerifiedCaptcha')
      }
      
    }
  },
  components: {
    ButtonFull,
    Modal,
    BaseInput
  },
  mixins: [
    SubscriptionStatus, Subscribe
  ]
}
</script>
