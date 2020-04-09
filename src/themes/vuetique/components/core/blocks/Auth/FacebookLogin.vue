<template>
  <div>
      <facebook-login
            :appId="FBappId"
            @login="onLogin"
            @get-initial-status="getUserData"
            @sdk-loaded="sdkLoaded">
      </facebook-login>
</div>
</template>
<script>
import facebookLogin from 'facebook-login-vuejs'

export default {
  name: 'FacebookLogin',
  mixins: [],
  components: {
    facebookLogin
  },
   data () {
    return {
      FBappId : '249780349535973',
      FB: undefined,
      isConnected: false,
      name: '',
      email: '',
      personalID: '',
      picture: '',
    }
  },
  methods: {

//  Facebook Login Start here
//  https://www.npmjs.com/package/facebook-login-vuejs
    getUserData() {
      this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
        user => {

          console.log('User details from FB', user)
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
      console.log('sdkLoaded', payload)
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
      await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      await this.initFacebook();
      setTimeout(() => {
        window.FB.login(function(response) {
          if (response.authResponse) {
            console.log("You are logged in &amp; cookie set!", response);
            setTimeout(() => {
              window.FB.api('/me' , 'GET', { fields: 'id,name,email,picture, profile_pic,gender' }, function(response) {
                console.log('Good to see you, ', response);
              });
            }, 100);
            // Now you can redirect the user or do an AJAX request to
            // a PHP script that grabs the signed request from the cookie.
          } else {
            alert("User cancelled login or did not fully authorize.");
          }
        });
      }, 500);
      return false;
    },
    async initFacebook () {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: "249780349535973", //You will need to change this
          cookie: true, // This is important, it's not enabled by default
          version: "v6.0"
        });
      };
    },
    async loadFacebookSDK (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    },

    //  Facebook Login End here


  }
}
</script>
