import { required, email } from 'vuelidate/lib/validators'

/**
 * Newsletter subscription form component.
 *
 * #### Data
 * - `email: String` - email that will be used for subscription, validated with vuelidate (email, required)
 *
 * #### Methods
 * - `unsubscribe(success?: Function, failure?: Function)` dispatches `newsletter/unsubscribe` with `email` data property. `success(res)` and `failure(err)` are callback functions called depending on subscription result and contain response info or error.
 *
 */
export default {
  name: 'NewsletterUnsubscribe',
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
    }
  },
  methods: {
    unsubscribe () {
      // argument omitted for validation purposes
      if (!this.$v.$invalid) {
        if(this.$store.state.user.current !== null){
          this.user_id = this.$store.state.user.current.id;      
        }        
        const sendData = { userid: this.user_id ,email: this.email,type: 'unsubscribe'}         
        return this.$store.dispatch('newsletter/magentounsubscribe', sendData).then(res => {
          this.$emit('unsubscribed', res)
        }).catch(err =>
          this.$emit('unsubscription-error', err)
        )
      }
    }
  }
}
