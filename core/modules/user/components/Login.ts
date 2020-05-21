import i18n from '@vue-storefront/i18n'
import { Logger } from '@vue-storefront/core/lib/logger'

export const Login = {
  name: 'Login',
  data () {
    return {
      remember: false,
      email: '',
      password: ''
    }
  },
  methods: {
    callLogin () {
      this.$bus.$emit('notification-progress-start', i18n.t('Authorization in progress ...'))
      this.$store.dispatch('user/login', { username: this.email, password: this.password }).then((result) => {
        if (!this.checkoutWithoutLogin) this.$bus.$emit('notification-progress-stop', {})

        if (result.code !== 200) {
          this.onFailure(result)
        } else {
          this.onSuccess()
          this.close()
          if (this.checkoutWithoutLogin) {
            setTimeout(() => {
                this.$bus.$emit('notification-progress-stop', {})
                this.$store.commit('ui/setCheckoutWithoutLoginFlag', false);
                this.$router.push(this.localizedRoute('/checkout'))
            }, 300);
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
    }
  }
}
