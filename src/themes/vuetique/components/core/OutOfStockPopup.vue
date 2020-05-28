<template>
  <modal name="modal-outofstocknotification" :width="450">
    <span slot="header"></span>
    <div slot="content" style="margin-top: -46px;">
      <form @submit.prevent="subscribeOutOfStockNotification()" novalidate>
        <div>
          <h4>NOTIFY ME WHEN THIS PRODUCT IS IN STOCK:</h4>
          <div class="row sel-box" v-if="configuration && Object.keys(configuration).length>0">
            <div v-for="(selected, index) in Object.keys(configuration)" :key="index" class="col-6">
              <span style="float: left;margin-right: 10px;"
              v-if="attributesByCode[selected]"
              >{{attributesByCode[selected].frontend_label}}: </span>
               <div class="sel-item">  {{configuration[selected].label}} 
                </div>
          </div>
          </div>
          <base-input
            focus
            type="email"
            name="email"
            v-model="email"
            autocomplete="email"
            :placeholder="$t('Enter your email')"
            :validations="[
              {
                condition: $v.email.$error && !$v.email.required,
                text: $t('Field is required.')
              },
              {
                condition: !$v.email.email && $v.email.$error,
                text: $t('Please provide valid e-mail address.')
              }
            ]"
          />
        </div>
        <button-full
          class="mt-3 w-full"
          type="submit"
          :disabled="this.$v.$invalid"
          @click.native="$v.email.$touch"
        >
          Notify me
        </button-full>
      </form>
    </div>
  </modal>
</template>
<script>
import i18n from '@vue-storefront/i18n'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Modal from 'theme/components/core/Modal'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters, mapState } from 'vuex'

export default {
  data () {
    return {
      email: ''
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  computed: {
    ...mapState({
       product: state => state.product.current,
       attributesByCode: state => state.attribute.list_by_code,
       configuration: state => state.product.current_configuration,
    })
  },
  beforeMount () {
    this.$bus.$on('update-out-of-stock-data', this.forceUpdateData);
    this.$bus.$on('user-after-loggedin', this.setLoggedInUserData)
    this.$bus.$on('user-after-logout', this.setLoggedInUserData)
    if (this.$store.state.user.current) this.setLoggedInUserData()
  },
  beforeDestroy () {
    this.$bus.$off('validation-error');
    this.$bus.$off('update-out-of-stock-data');
    this.$bus.$off('user-after-loggedin');
    this.$bus.$off('user-after-logout');
  },
  methods: {
    setLoggedInUserData () {
      if (this.$store.state.user.current) {
         this.email = this.$store.state.user.current.email
      } else {
         this.email = ''
      }
    },
    onSuccesfulSubmission (msg) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: msg,
        action1: { label: i18n.t('OK') }
      })
      this.$bus.$emit('modal-hide', 'modal-outofstocknotification')
    },
    onErrorInSubmission () {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: 'Error in while subscribing!',
          action1: { label: i18n.t('OK') }
        })
    },
    subscribeOutOfStockNotification () {
      // argument omitted for validation purposes
      if (!this.$v.$invalid) {
          const sendData = { pid: this.product.id ,email: this.email}
          this.$store.dispatch('ui/submitOutOfStockNotification', sendData).then(res => {
           if (res == 'Already notified') {
            this.onSuccesfulSubmission('You are already subscribed!');
           } else if ( res == 'Notified') {
            this.onSuccesfulSubmission('You have been successfully subscribed!');
           }
          }).catch(err => {
            this.onErrorInSubmission();
          }
        )
      }
    },
    forceUpdateData (event) {
      this.$forceUpdate()
    }
  },
  components: {
    ButtonFull,
    Modal,
    BaseInput
  }
}
</script>

<style type="text/css">
  
  .sel-item {
    width: 39px;
    height: 33px;
    border-color: #222222;
    color: #ffffff;
    background: #000000;
    padding-left: 10px;
    padding-right: 15px;
    padding-top: 3px;
    float: left;
  }

  .sel-box {
    margin-bottom: 45px;
    margin-top: 30px;
    margin-left: 10px;
    text-align: center;
  }
</style>
