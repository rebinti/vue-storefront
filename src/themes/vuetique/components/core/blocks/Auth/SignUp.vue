<template>
  <modal name="modal-signup" :width="620">
    <login v-if="activeElem === 'login'" />
    <register v-if="activeElem === 'register'" />
    <forgot-pass v-if="activeElem === 'forgot-pass'" />
    <set-social-login-password  v-if="activeElem === 'set-social-login-password'">
    </set-social-login-password>
  </modal>
</template>

<script>
import { mapState } from 'vuex'
import Modal from 'theme/components/core/Modal'
import Login from 'theme/components/core/blocks/Auth/Login'
import Register from 'theme/components/core/blocks/Auth/Register'
import ForgotPass from 'theme/components/core/blocks/Auth/ForgotPass'
import SetSocialLoginPassword from 'theme/components/core/blocks/Auth/SetSocialLoginPassword'

export default {
  name: 'SignUp',
  computed: {
    ...mapState({
      activeElem: state => state.ui.authElem,
      checkoutWithoutLogin: state => state.ui.checkoutWithoutLogin
    })
  },
  components: {
    Modal,
    Login,
    Register,
    ForgotPass,
    SetSocialLoginPassword
  },
  beforeMount () {
    this.$bus.$on('servercart-after-diff', this.gotoCheckpage)
  },
  beforeDestroy () {
    this.$bus.$off('servercart-after-diff')
  },
  methods: {
    gotoCheckpage (event) {
      console.log('gotoCheckpage checkout goto checkout')
        if (this.checkoutWithoutLogin) {
         this.$store.commit('ui/setCheckoutWithoutLoginFlag', false);
         this.$router.push(this.localizedRoute('/checkout'))
       }
    }
  }
}
</script>

<style scoped>
  .modal {
    font-size: 18px;
  }
</style>
