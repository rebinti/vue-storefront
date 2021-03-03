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
      // argument omitted for validation purposes
      if (!this.$v.$invalid) {        
        if(this.$store.state.user.current !== null){
          this.user_id = this.$store.state.user.current.id;      
        }
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
