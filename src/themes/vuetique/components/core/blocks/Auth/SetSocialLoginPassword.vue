<template>
  <div class="login_out_bx">
    <header class="modal-header py25 px65 h1 serif weight-700 bg-cl-secondary">
      <svg viewBox="0 0 25 25" class="vt-icon modal-close p-1 m-2" slot="close" @click="close">
        <use xlink:href="#close" />
      </svg>
      <h2 class="to-uppercase-text">
        Set Password
      </h2>
    </header>

    <div class="modal-content pt30 pb60 px65 cl-secondary">
      <p style="padding-bottom: 3px;">
        Please set a new password for your Accout.
      </p>
      <form @submit.prevent="register" novalidate>
        <base-input
          class="mb-5 tx_bx_out"
          type="password"
          name="password"
          ref="password"
          autocomplete="new-password"
          v-model="password"
          @blur="$v.password.$touch()"
          :placeholder="$t('Password *')"
          :validations="[
            {
              condition: !$v.password.required && $v.password.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.password.minLength && $v.password.$error,
              text: $t('Password must have at least 8 letters.')
            }
          ]"
        />
        <base-input
          class="mb-5 tx_bx_out"
          type="password"
          name="password-confirm"
          autocomplete="new-password"
          v-model="rPassword"
          @blur="$v.rPassword.$touch()"
          :placeholder="$t('Repeat password *')"
          :validations="[
            {
              condition: !$v.rPassword.required && $v.rPassword.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.rPassword.sameAsPassword && $v.rPassword.$error,
              text: $t('Passwords must be identical.')
            }
          ]"
        />
        
        <button-full class="mb-2 w-full" type="submit">
          Set Password
        </button-full>
        
        <!-- <div class="text-center" style="margin-top: 15px;">
          <span>
            {{ $t('or') }}
            <a href="#" @click.prevent="switchElem">
              {{ $t('login to your account') }}
            </a>
          </span>
        </div> -->
      </form>
    </div>
  </div>
</template>
<script>
// import Register from '@vue-storefront/core/compatibility/components/blocks/Auth/Register'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox.vue'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import i18n from '@vue-storefront/i18n'
import { Logger } from '@vue-storefront/core/lib/logger'

export default {
  name: 'SetSocialLoginPassword',
   data () {
    return {
      password: '',
      rPassword: '',
    }
  },
  validations: {
    password: {
      minLength: minLength(8),
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
  },
  mixins: [], // Register
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput
  },
  methods: {
    register () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      console.log('password set', this.password);
      let socialData = {  email: '', 
                          password: this.password,
                          firstname: '', 
                          lastname: '' 
                      }

      if ( this.$store.state.ui.selectedSocialLoginType === 'facebook') {
            const fbData =  this.$store.state.ui.fbLoggedInfo;
            socialData.email = fbData.email;
            socialData.firstname = fbData.name.split(' ')[0];
            socialData.lastname = fbData.name.split(' ')[1];
      } else if ( this.$store.state.ui.selectedSocialLoginType === 'google') {
           console.log('Google Logged Info', this.$store.state.ui.googleLoggedInfo)
           const googleData =  this.$store.state.ui.googleLoggedInfo;
            socialData.email = googleData.email;
            socialData.firstname = googleData.firstname;
            socialData.lastname = googleData.lastname;
      }
      console.log('socialData For Register', socialData);
      if ( socialData.email !== '') {
         this.callRegister(socialData);
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
        message: result.result,
        action1: { label: this.$t('OK') }
      })
    },
    close () {
      // TODO Move to theme
      this.$bus.$emit('modal-hide', 'modal-signup')
    },

    callRegister (social_data) {
      // // TODO Move to theme
      // { email: fb_data.email, password: this.password,
      //   firstname: fb_data.firstName, lastname: fb_data.lastName }
      console.log('callRegister' , social_data);
      this.$bus.$emit('notification-progress-start', i18n.t('Registering the account ...'))
      this.$store.dispatch('user/register', social_data ).then((result) => {
        Logger.debug(result, 'user')()
        console.log('resgister User', result)
        // TODO Move to theme
        this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          this.onFailure(result)
          // If error includes a word 'password', focus on a corresponding field
          if (result.result.includes('password')) {
            this.$refs['password'].setFocus('password')
            this.password = ''
            this.rPassword = ''
          }
        } else {
          /* 
          For Subscribe the Newsletter subscription Action to Server
          */
          if(social_data.email){  // if(this.newsLatest && social_data.email){
            this.$store.dispatch('newsletter/subscribe', social_data.email).then(res => {
              console.log('Newsletter Subscribed', res);
            }).catch(err => {
              console.log('Error in subscripton', err);
            });
          }
          this.$store.dispatch('user/login', { username: social_data.email, password: social_data.password })
          this.onSuccess()
          this.close()
        }
      }).catch(err => {
        // TODO Move to theme
        this.onFailure({ result: 'Unexpected authorization error. Check your Network conection.' })
        this.$bus.$emit('notification-progress-stop')
        Logger.error(err, 'user')()
      })
    }
  }
}
</script>
