import i18n from '@vue-storefront/i18n'
import { Logger } from '@vue-storefront/core/lib/logger'
const md5 = require('md5');
declare const _paq,Cookiebot

export const Login = {
  name: 'Login',
  data () {
    return {
      remember: false,
      email: '',
      password: ''
    }
  }, 
  // beforeMount () {
  //   this.$bus.$on('servercart-after-diff', this.gotoCheckpage)
  // },
  // beforeDestroy () {
  //   this.$bus.$off('servercart-after-diff')
  // },
  methods: {
    callLogin () {
      this.$bus.$emit('notification-progress-start', i18n.t('Authorization in progress ...'))
      this.$store.dispatch('user/login', { username: this.email, password: this.password }).then((result) => {
        if (!this.checkoutWithoutLogin) this.$bus.$emit('notification-progress-stop', {})

        if (result.code !== 200) {
          this.onFailure(result)
          this.$bus.$emit('notification-progress-stop', {})
        } else {
          console.log("GUUUUUUUUUUU - email",this.email)
          console.log("GUUUUUUUUUUU - email uppper",this.email.toUpperCase())
          console.log("GUUUUUUUUUUU - email md5",md5(this.email.toUpperCase()))
          if (window && _paq != undefined && Cookiebot.consent.marketing) {
			  _paq.push(["setUserId",md5(this.email.toUpperCase())]);
			  _paq.push(["trackPageView"]);
          }
          this.onSuccess()
          if (!this.checkoutWithoutLogin) this.close()
          if (this.checkoutWithoutLogin) {
            this.$bus.$emit('notification-progress-start', i18n.t('Checkout in progress ...'))
            // setTimeout(() => {
            //     console.log('checkoutttttt')
            //     // this.$bus.$emit('notification-progress-stop', {})
            //     this.$store.commit('ui/setCheckoutWithoutLoginFlag', false);
            //     // this.close()
            //     // this.$router.push(this.localizedRoute('/checkout'))
            // }, 1500);
          }
        }
      }).catch(err => {
        Logger.error(err, 'user')()
        this.onFailure({ result: 'Unexpected authorization error. Check your Network conection.' })
        // TODO Move to theme
        this.$bus.$emit('notification-progress-stop')
      })
    },
    switchElem () {
      // TODO Move to theme
      this.$store.commit('ui/setAuthElem', 'register')
    },
    callForgotPassword () {
      // TODO Move to theme
      this.$store.commit('ui/setAuthElem', 'forgot-pass')
    },
    // gotoCheckpage (event) {
    //   console.log('gotoCheckpage checkout goto checkout')
    //     if (this.checkoutWithoutLogin) {
    //      this.$store.commit('ui/setCheckoutWithoutLoginFlag', false);
    //      this.$router.push(this.localizedRoute('/checkout'))
    //    }
    // }
  }
}
