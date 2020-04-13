<template>
  <div class="google-view" >
        <GoogleLogin :params="params"
        :onSuccess="onSuccessGoogle" 
        :onFailure="onFailureGoogle">
           <div class="login_bx">
             <a href="javascript:void(0);"><img src="/assets/gle_login.png" alt=""/></a>
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
          // console.log('/**** Personale Info ****/')
          // console.log('*getId*', googleUser.getBasicProfile().getId());
          // console.log('/*getName/*', googleUser.getBasicProfile().getName());
          // console.log('/*getGivenName/*', googleUser.getBasicProfile().getGivenName());
          // console.log('/*getFamilyName/*', googleUser.getBasicProfile().getFamilyName());
          // console.log('/*getImageUrl/*', googleUser.getBasicProfile().getImageUrl());
          // console.log('/*getEmail/*', googleUser.getBasicProfile().getEmail());
          const googleUserInfo = {  
              email: googleUser.getBasicProfile().getEmail(),
              name: googleUser.getBasicProfile().getName(),
              firstname: googleUser.getBasicProfile().getGivenName(), 
              lastname: googleUser.getBasicProfile().getFamilyName() ,
              id: googleUser.getBasicProfile().getId(),
              imageUrl: googleUser.getBasicProfile().getImageUrl()
          }
          if (googleUserInfo.email) {
            this.callCheckSocialLoginUser(googleUserInfo);
            }
    },

    onFailureGoogle (errorMsg) {
        console.log(errorMsg);
    },

    // Google Login End here
    callCheckSocialLoginUser (googleData) {
      console.log('callCheckSocialLoginUser', googleData);
      this.$bus.$emit('notification-progress-start', i18n.t('Please wait...'))
      this.$store.dispatch('user/checkSocialLoginUser', { email: googleData.email }).then((result) => {
        console.log('Resultt--->>>', result)  
        this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          console.log('errrorrrr', result)  
          this.onFailure(result)
        } else {
          if (result.result === 'Email Not exist') {
              this.$store.commit('ui/setSocialLoginInfo', { type: 'google', social_data: googleData})
              this.$store.commit('ui/setAuthElem', 'set-social-login-password');
          } else if (result.result === 'Email exist') {
              this.callSocialLogin(googleData);
          }
        }
      }).catch(err => {
        Logger.error(err, 'user')()
        this.onFailure({ result: 'Unexpected authorization error. Check your Network conection.' })
        // TODO Move to theme
        this.$bus.$emit('notification-progress-stop')
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
    },

    callSocialLogin (social_data) {
      const socialData = { useremail: social_data.email,
                           username: social_data.name,
                           social_type : 'google' , 
                           social_id: social_data.id 
                           }
      console.log('socialData Api', socialData);
      this.$bus.$emit('notification-progress-start', i18n.t('Authorization in progress ...'));
      this.$store.dispatch('user/socialUserlogin', socialData).then((result) => {
        this.$bus.$emit('notification-progress-stop', {})

        if (result.code !== 200) {
          this.onFailure(result)
        } else {
          this.onSuccess()
          this.close()
        }
      }).catch(err => {
        Logger.error(err, 'user')()
        this.onFailure({ result: 'Unexpected authorization error. Check your Network conection.' })
        // TODO Move to theme
        this.$bus.$emit('notification-progress-stop')
      })
    },

    close (e) {
      if (e) localStorage.removeItem('redirect')
      this.$bus.$emit('modal-hide', 'modal-signup')
    }

  }
}
</script>

<style scoped>
.login_box_out_web .google-view {
  width: 45%; float: left; margin: 6px 0 0 0;
}
</style>