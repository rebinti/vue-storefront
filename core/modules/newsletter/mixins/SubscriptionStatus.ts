import { required, email } from 'vuelidate/lib/validators'

/**
 * Newsletter subscription form component.
 *
 * #### Data
 * - `email: String` - email that will be used for subscription, validated with vuelidate (email, required)
 *
 * ### Computed
 * - `isSubscribed: boolean` - returns true if user subscribed to the newsletter in this session
 *
 * #### Methods
 * - `checkStatus(success?: Function, failure?: Function)` dispatches `newsletter/status` with `email` data property. `success(res)` and `failure(err)` are callback functions called depending on subscription result and contain response info or error.
 *
 */
export default {
  name: 'SubscriptionStatus',
  data () {
    return {
      email: '',
      user_id: '',      
      user: {
        isSubscribed: false
      }
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    onLoggedIn () {
      this.email = this.$store.state.user.current.email
      this.checkStatus(response => {
        this.user.isSubscribed = response.result === 'subscribed'
      })
    },
    checkStatus (success?: Function, failure?: Function) {
      // argument omitted for validation purposes
      console.log("test 11111111",this.$store.state.user.current.id)
      if (!this.$v.$invalid) {
        console.log("test 2222222",this.$store.state.user.current.id)
        if(this.$store.state.user.current !== null){
          console.log("test 333333333",this.$store.state.user.current.id)
          this.user_id = this.$store.state.user.current.id;      
        }        
        const sendData = { userid: this.user_id ,email: this.email,type: 'status'} 
        console.log("test 44444444",sendData)
        return this.$store.dispatch('newsletter/magentosubscribestatus', sendData).then(res => {
          if (success) success(res)
          console.log("test 5555555",res)
          console.log("test 55555551111",res.result)
          if(res.result=='subscribed'){
            this.user.isSubscribed = true
          }
        }).catch(err => {
          if (failure) failure(err)
        }
        )
      }
    }
  },
  beforeMount () {
    // the user might already be logged in, so check the subscription status
    if (this.$store.state.user.current) this.onLoggedIn()
    this.$bus.$on('user-after-loggedin', this.onLoggedIn)
  },
  beforeDestroy () {
    this.$bus.$off('user-after-loggedin', this.onLoggedIn)
  },
  computed: {
    isSubscribed (): boolean {
      return this.$store.getters['newsletter/isSubscribed']
    }
  }
}
