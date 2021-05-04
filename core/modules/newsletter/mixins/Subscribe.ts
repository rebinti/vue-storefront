import { required, email } from 'vuelidate/lib/validators'

/**
 * Newsletter subscription form component.
 *
 * #### Data
 * - `email: String` - email that will be used for subscription, validated with vuelidate (email, required)
 *
 * #### Methods
 * - `subscribe(success?: Function, failure?: Function)` dispatches `newsletter/subscribe` with `email` data property. `success(res)` and `failure(err)` are callback functions called depending on subscription result and contain response info or error.
 *
 */
export default {
  name: 'NewsletterSubscribe',
  data () {
    return {
      email: '',
      user_id: '',
    }
  },
  validations: {
    email: {
      required,
      email
    },
  },
  methods: {
    subscribe (success?: Function, failure?: Function) {
      //this.captchacall = false
      // argument omitted for validation purposes
      if (!this.$v.$invalid) {        
        if(this.$store.state.user.current !== null){
          this.user_id = this.$store.state.user.current.id;      
        }
        if (!this.$store.state.googleRecaptcha.is_verified) {
          //captcha is not verified
          console.log("Newsletter subscribe captcha - invalid","1111")
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: this.$t('captcha is not verified'),
            action1: { label: this.$t('OK') }
          })
          this.$bus.$emit('notification-progress-stop')
          return          
        }   
        this.captchacall = false      
        const sendData = { userid: this.user_id ,email: this.email,type: 'subscribe'}        
        return this.$store.dispatch('newsletter/magentosubscribe', sendData).then(res  => { return res.json() })
        .then((res) => {
          if (success) success(res)
          console.log("TEST--DATA11111111111111111111111",res)
          this.$store.dispatch('notification/spawnNotification', {
            type: 'success',
            message: res.result,
            action1: { label:'OK' }
          })          
        }).catch(err => {
          if (failure) failure(err)
        }
        )
      }
    }
  }
}
