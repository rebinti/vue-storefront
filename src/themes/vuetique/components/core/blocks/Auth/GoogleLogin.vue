<template>
  <div style="width: 45%; float: left; margin: 6px 0 0 0;">
        <GoogleLogin :params="params"
        :onSuccess="onSuccessGoogle" 
        :onFailure="onFailureGoogle">
           <div class="login_bx">
             <a href="#"><img src="/assets/gle_login.png" alt=""/></a>
          </div>
        </GoogleLogin>
</div>
</template>
<script>
import i18n from '@vue-storefront/i18n'
import config from 'config'
import GoogleLogin from 'vue-google-login';

export default {
  name: 'GoogleSignIn',
  mixins: [],
  components: {
    GoogleLogin
  },
   data () {
    return {
      params: {
                client_id: config.socialLogin.google.clientID
              },
      // only needed if you want to render the button with the google ui
      renderParams: {
          width: 250,
          height: 50,
          longtitle: true
      }
    }
  },
  methods: {
  /*  Google Login Start here 
        https://www.npmjs.com/package/vue-google-login
    */
    onSuccessGoogle (googleUser) {
            console.log(googleUser);
            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
            console.log('/**** Personale Info ****/')
            console.log('*getId*', googleUser.getId());
            console.log('/*getName/*', googleUser.getName());
            console.log('/*getGivenName/*', googleUser.getGivenName());
            console.log('/*getFamilyName/*', googleUser.getFamilyName());
            console.log('/*getImageUrl/*', googleUser.getImageUrl());
            console.log('/*getEmail/*', googleUser.getEmail());

            // console.log('/*/*', googleUser.getId());
            // console.log('/*/*', googleUser.getId());

            // BasicProfile.getId()
            // BasicProfile.getName()
            // BasicProfile.getGivenName()
            // BasicProfile.getFamilyName()
            // BasicProfile.getImageUrl()
            // BasicProfile.getEmail()
    },

    onFailureGoogle (errorMsg) {
        console.log(errorMsg);
    },

    // Google Login End here
    callCheckSocialLoginUser () {
      this.$bus.$emit('notification-progress-start', i18n.t('Please wait...'))
      this.$store.dispatch('user/checkSocialLoginUser', { email: this.email }).then((result) => {
        console.log('Resultt--->>>', result)  
        this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          console.log('errrorrrr', result)  
          //this.onFailure(result)
        } else {



        }
      });
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

  }
}
</script>
