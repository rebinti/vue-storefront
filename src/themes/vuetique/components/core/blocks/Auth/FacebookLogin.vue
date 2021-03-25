<template>
  <div class="fb-view">


      <div class="login_bx" >
          <span @click="logInWithFacebook" >
            <img style="cursor: pointer;" src="/assets/fcbk_login.png" alt="">
            </span>
      </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import i18n from '@vue-storefront/i18n'
import config from 'config'
import facebookLogin from 'facebook-login-vuejs'
const md5 = require('md5');

export default {
  name: 'FacebookLogin',
  mixins: [],
  components: {
    facebookLogin
  },
   data () {
    return {
      FBappId : config.socialLogin.facebook.appID,
      FB: undefined,
      isConnected: false,
      name: '',
      email: '',
      personalID: '',
      picture: '',
    }
  },
  computed: {
    ...mapState({
      checkoutWithoutLogin: state => state.ui.checkoutWithoutLogin
    })
  },
  methods: {

//  Facebook Login Start here
//  https://www.npmjs.com/package/facebook-login-vuejs
    getUserData() {
      this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
        user => {
          console.log('User details from FB', user)
          this.$store.commit('ui/setAuthElem', 'set-social-login-password')
          // this.personalID = user.id;
          // this.email = user.email;
          // this.name = user.name;
          // this.picture = user.picture.data.url;
        }
      )
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      // console.log('sdkLoaded', payload)
      // if (this.isConnected) this.getUserData()
    },
    onLogin() {
      this.isConnected = true
      this.getUserData()
    },
    onLogout() {
      this.isConnected = false;
    },

    /* Direct Method FB login
       https://medium.com/@mrjohnkilonzi/a-simple-facebook-login-component-in-vue-js-5ee71997bb97
    */
    async logInWithFacebook () {
      const This = this;
      if (window && window.FB) {
         window.FB.login(function(response) {
          if (response.authResponse) {
            console.log("You are logged in &amp; cookie set!", response);
            setTimeout(() => {
              window.FB.api('/me' , 'GET', { fields: 'id,name,email,picture,gender' }, function(response) {
                console.log('Good to see you, ***', response);
                This.callCheckSocialLoginUser(response)
              });
            }, 100);
            // Now you can redirect the user or do an AJAX request to
            // a PHP script that grabs the signed request from the cookie.
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        },  { scope: 'email' });
      } else {
        await this.loadFacebookSDK(document, "script", "facebook-jssdk" , this.initFacebook());
        // await this.initFacebook();
        setTimeout(() => {
          window.FB.login(function(response) {
            if (response.authResponse) {
              console.log("You are logged in &amp; cookie set!", response);
              setTimeout(() => {
                window.FB.api('/me' , 'GET', { fields: 'id,name,email,picture,gender' }, function(response) {
                  console.log('Good to see you, ', response);
                  This.callCheckSocialLoginUser(response)
                });
              }, 100);
              // Now you can redirect the user or do an AJAX request to
              // a PHP script that grabs the signed request from the cookie.
            } else {
              console.log("User cancelled login or did not fully authorize.");
            }
          }, { scope: 'email' });
        }, 500);
      }
    },
    async initFacebook () {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: config.socialLogin.facebook.appID, // You will need to change this
          cookie: true, // This is important, it's not enabled by default
          version: "v6.0"
        });
      };
    },
    async loadFacebookSDK (d, s, id, callback) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = callback;
    },

    // Facebook Login End here
    callCheckSocialLoginUser (fbData) {
      console.log('callCheckSocialLoginUser', fbData);
      this.$bus.$emit('notification-progress-start', i18n.t('Please wait...'))
      this.$store.dispatch('user/checkSocialLoginUser', { email: fbData.email }).then((result) => {
        console.log('Resultt--->>>', result)  
        this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          console.log('errrorrrr', result)  
          this.onFailure(result)
        } else {
          if (result.result === 'Email Not exist') {
              this.$store.commit('ui/setSocialLoginInfo', { type: 'facebook', social_data: fbData})
              this.$store.commit('ui/setAuthElem', 'set-social-login-password');
          } else if (result.result === 'Email exist') {
              this.callSocialLogin(fbData);
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
                           social_type : 'facebook' , 
                           social_id: social_data.id 
                           }
      console.log('socialData Api', socialData);
      this.$bus.$emit('notification-progress-start', i18n.t('Authorization in progress ...'));
      this.$store.dispatch('user/socialUserlogin', socialData).then((result) => {
        if (!this.checkoutWithoutLogin) this.$bus.$emit('notification-progress-stop', {})

        if (result.code !== 200) {
          this.onFailure(result)
          this.$bus.$emit('notification-progress-stop', {})
        } else {
          this.onSuccess()
          console.log("GUUUUUUUUUUU - email fb",social_data.email)
          console.log("GUUUUUUUUUUU - email uppper fb",social_data.email.toUpperCase())
          console.log("GUUUUUUUUUUU - email md5 fb",md5(social_data.email.toUpperCase()))
          _paq.push(["setUserId",md5(social_data.email.toUpperCase())]);  
          _paq.push(["trackPageView"]);          
          if (!this.checkoutWithoutLogin) this.close()
          if (this.checkoutWithoutLogin) this.$bus.$emit('notification-progress-start', i18n.t('Checkout in progress ...'))
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
.login_box_out_web .fb-view {
  /* width: 45%;float: left;margin: 6px 25px 0 10px; */
  margin: 6px 18px 0 2px;
  width: 48%;
  float: left;
}
</style>
