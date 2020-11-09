<template>
  <div class="container-fluid">
    <div class="modal-content pt30 pb60 px65 cl-secondary" style="padding: 50px;">
      <template>
        <form @submit.prevent="resetPasswordPost" novalidate>
          <div class="mb-4 tx_bx_out">
            <!-- <p class="mb-5 m_hide">
              {{ $t('Enter your email to receive instructions on how to reset your password.') }}
            </p> -->
            <base-input
            class="col-12 md:col-6 mb-4 mt-2 txt_blk_out"
            type="password"
            name="password"
            autocomplete="new-password"
            :placeholder="$t('New password *')"
            v-model="password"
            @input="$v.password.$touch()"
            :validation="{
                condition: !$v.password.required && $v.password.$error,
                text: $t('Field is required')
            }"
            />

            <base-input
            class="col-12 md:col-6 mb-4 mt-2 txt_blk_out"
            type="password"
            name="password-confirm"
            autocomplete="new-password"
            :placeholder="$t('Repeat new password *')"
            v-model="rPassword"
            @input="$v.rPassword.$touch()"
            :validations="[
                {
                condition: !$v.rPassword.required && $v.rPassword.$error,
                text: $t('Field is required')
                },
                {
                condition: !$v.rPassword.sameAsPassword,
                text: $t('Passwords must be identical.')
                }
            ]"
            />                      
          </div>
          <button-full class="mb-2 w-full resetpasswordpostbutton" type="submit">
            {{ $t('Reset password') }}
          </button-full>

        </form>
      </template>
    </div>
  </div>
</template>

<script>

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import i18n from '@vue-storefront/i18n'

export default {
  data () {
    return {
      password: '',
      rPassword: '',
    }
  },    
  validations: {
    password: {
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
  },
  methods: {
    resetPasswordPost () {
      // todo: send email with reset password instructions

      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: i18n.t('OK') }
        })
        return
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Resetting the password ... '))
      this.$store.dispatch('user/resetPasswordPost', { password: this.password,confirmation: this.rPassword,token:'example-tttt',id:122222 }).then((response) => {        
        this.$bus.$emit('notification-progress-stop')
        if (response.code === 200) {
          this.passwordSent = true
        } else {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: i18n.t(response.result) || i18n.t('Error while sending password update'),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
        }
      }).catch((err) => {
        console.error(err)
        this.$bus.$emit('notification-progress-stop')
      })
    }
  },
  components: {
    ButtonFull,
    BaseInput
  }
}
</script>

<style lang="scss" scoped>
  .modal-content {
  .align-button-center {
      margin: 0px auto;
      top: 10px;
      background: #000;
    }
    @media (max-width: 400px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
</style>
