import i18n from '@vue-storefront/i18n'
import { Logger } from '@vue-storefront/core/lib/logger'

export const Register = {
  name: 'Register',
  data () {
    return {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      rPassword: '',
      mobile: '',
      conditions: false,
      newsLatest: false
    }
  },
  methods: {
    switchElem () {
      // TODO Move to theme
      this.$store.commit('ui/setAuthElem', 'login')
    },
    close () {
      // TODO Move to theme
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    callRegister () {
      // TODO Move to theme
      this.$bus.$emit('notification-progress-start', i18n.t('Registering the account ...'))
      this.$store.dispatch('user/register', { email: this.email, password: this.password, firstname: this.firstName, lastname: this.lastName, mobile: this.mobile }).then((result) => {
        Logger.debug(result, 'user')()
        // TODO Move to theme
        if (!this.checkoutWithoutLogin) this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          this.onFailure(result)
          // If error includes a word 'password', focus on a corresponding field
          if (result.result.includes('password')) {
            this.$refs['password'].setFocus('password')
            this.password = ''
            this.rPassword = ''
          }
          this.$bus.$emit('notification-progress-stop')
        } else {
          /* 
          For Subscribe the Newsletter subscription Action to Server
          */
          if(this.newsLatest && this.email){
            this.$store.dispatch('newsletter/subscribe', this.email).then(res => {
              console.log('Newsletter Subscribed', res);
            }).catch(err => {
              console.log('Error in subscripton', err);
            });
          }
          this.$store.dispatch('user/login', { username: this.email, password: this.password })
          this.onSuccess()
          if (!this.checkoutWithoutLogin) this.close()
          if (this.checkoutWithoutLogin) {
            this.$bus.$emit('notification-progress-start', i18n.t('Checkout in progress ...'))
             setTimeout(() => {
                // this.$bus.$emit('notification-progress-stop')
                this.$store.commit('ui/setCheckoutWithoutLoginFlag', false);
                this.close()
                this.$router.push(this.localizedRoute('/checkout'))
             }, 1500);
          }
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
