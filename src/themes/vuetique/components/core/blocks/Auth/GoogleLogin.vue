<template>
  <div>
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
                client_id: "418669224757-gsfnptrb98hlsbvpnoqjqcvgcv4u8apb.apps.googleusercontent.com"
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
    },
    onFailureGoogle (errorMsg) {
        console.log(errorMsg);
    }

  }
}
</script>
