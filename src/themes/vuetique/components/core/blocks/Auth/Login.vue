<template>
  <div class="login_out_bx">
    <header class="modal-header">
      <svg viewBox="0 0 25 25" class="vt-icon modal-close p-1 m-2" slot="close" @click="close">
        <use xlink:href="#close" />
      </svg>
      <h2 class="to-uppercase-text">{{ $t('Login') }}</h2>
    </header>
    <div class="modal-content" style="padding-bottom: 65px;">
      <div class="mobile-signup">
        <p>Dont have an account? 
          <b>  
            <a href="#" @click.prevent="switchElem" data-testid="registerLink">Sign up
            </a>
              </b> 
            </p>
      </div>

      <form @submit.prevent="login" novalidate style="padding-bottom: 15px;">
        <base-input
          class="mb-5 tx_bx_out"
          type="email"
          name="email"
          v-model="email"
          @blur="$v.email.$touch()"
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
        <base-input
          class="mb-5 tx_bx_out"
          type="password"
          name="password"
          v-model="password"
          @blur="$v.password.$touch()"
          :placeholder="$t('Password *')"
          :validation="{
            condition: !$v.password.required && $v.password.$error,
            text: $t('Field is required.')
          }"
        />
         <button-full class="mb-2 w-full l_login" type="submit" data-testid="loginSubmit">
          {{ $t('Login') }}
        </button-full>
        <div class="row mt-5 mb-5 lg:mb-10 mr_btm">
          <base-checkbox
            class="col-12 sm:col-6 text-black l_rmer"
            id="remember"
            v-model="remember"
            @click="remember = !remember"
          >
            {{ $t('Remember me') }}
          </base-checkbox>
          <div class="col-12 sm:col-6 mt-2 sm:mt-0 sm:text-right l_rk">
            <a href="#" @click.prevent="remindPassword">
              {{ $t('Forgot your password?') }}
            </a>
          </div>
        </div>

        <div class="l_g_rm">
        <button-full class="mb-2 w-full lrge_btn" type="submit" data-testid="loginSubmit">
          {{ $t('Log in to your account') }}
        </button-full>

         <!-- <div class="login_bx">
             <span @click="logInWithFacebook"><img src="/assets/fcbk_login.png" alt=""></span>
          </div> -->
        
        <div class="text-center">
          {{ $t('or') }}
          <a href="#" @click.prevent="switchElem" data-testid="registerLink">
            {{ $t('register an account') }}
          </a>
        </div>

        

        </div>
      </form>


        <div class="login_box_out">
           <facebook-sign-in></facebook-sign-in>
            <google-sign-in></google-sign-in>
          <!-- <div class="login_bx">
             <a href="#"><img src="/assets/fcbk_login.png" alt=""/></a>
          </div>
           <div class="login_bx">
             <a href="#"><img src="/assets/gle_login.png" alt=""/></a>
          </div> -->
        </div>
        <div class="login_box_out_web">
          <facebook-sign-in></facebook-sign-in>
          <google-sign-in></google-sign-in>
        </div>
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Login from '@vue-storefront/core/compatibility/components/blocks/Auth/Login'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'
import BaseInput from '../Form/BaseInput.vue'
import { required, email } from 'vuelidate/lib/validators'

import  GoogleSignIn from "theme/components/core/blocks/Auth/GoogleLogin"
import  FacebookSignIn from "theme/components/core/blocks/Auth/FacebookLogin"

export default {
  mixins: [Login],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  data () {
    return {
      hasRedirect: !!localStorage.getItem('redirect')
    }
  },
  computed: {
    ...mapState({
      checkoutWithoutLogin: state => state.ui.checkoutWithoutLogin
    })
  },
  methods: {
    close (e) {
      if (e) localStorage.removeItem('redirect')
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    login () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      this.callLogin()
    },
    remindPassword () {
      if (!(typeof navigator !== 'undefined' && navigator.onLine)) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Reset password feature does not work while offline!'),
          action1: { label: this.$t('OK') }
        })
      } else {
        this.callForgotPassword()
      }
    },
    onSuccess () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: this.$t('You are logged in!'),
        action1: { label: this.$t('OK') }
      })
    },
    onFailure (result) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t(result.result),
        action1: { label: this.$t('OK') }
      })
    }
  },
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput,
    GoogleSignIn,
    FacebookSignIn
  }
}
</script>
