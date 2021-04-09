<template>
  <div class="login_out_bx">
    <div class="modal-content pt30 pb60 px65 cl-secondary">
      <template v-if="!passwordSent">
        <form @submit.prevent="sendEmail" novalidate>
          <div class="mb-5 tx_bx_out">
            <base-input
              class="mb-5 tx_bx_out board_input_box"
              type="text"
              name="user_name"
              v-model="name"
              :placeholder="$t('Name')"
              :validations="[
                {
                  condition: !$v.name.required && $v.name.$error,
                  text: $t('Field is required.')
                }
              ]"
            />         
            <input type="hidden" name="from_name" v-model="name">
            <base-input
              class="tx_bx_out"
              type="email"
              name="user_email"
              v-model="email"
              focus
              :placeholder="$t('E-mail address *')"
              :validations="[
                {
                  condition: !$v.email.required && $v.email.$error,
                  text: $t('Field is required.')
                },
                {
                  condition: !$v.email.email && $v.email.$error,
                  text: $t('Please provide valid e-mail address.')
                }
              ]"
            />
            <base-input
              class="mb-5 tx_bx_out board_input_box telephone"
              type="number"
              name="telephone"
              v-model="telephone"          
              :placeholder="$t('Telephone')"
            />             
          </div>
          <textarea class="formtextarea" name="message" required></textarea>          
          <button-full class="mb-5 w-full l_login" type="submit" style="display:block;">
            {{ $t('Send') }}
          </button-full>
          <div class="text-center t_mrg">
            {{ $t('or') }}
            <a href="#" @click.prevent="switchElem">
              {{ $t('return to log in') }}
            </a>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import emailjs from 'emailjs-com';
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import { required, email } from 'vuelidate/lib/validators'
import i18n from '@vue-storefront/i18n'

export default {
  validations: {
    email: {
      required,
      email
    },
    telephone: {
      required      
    },
    name: {
      required      
    },  
  },
  methods: {
    sendEmail (e) {
      // todo: send email with reset password instructions

      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: i18n.t('OK') }
        })
        return
      }

        emailjs.sendForm('service_enncvri', 'template_8d1n9ve', e.target, 'user_lb184Q42IBxTG3sAUHnvk')
          .then((result) => {
              console.log('SUCCESS!', result.status, result.text);
              this.$store.dispatch('notification/spawnNotification', {
                type: 'success',
                message: 'contact successfully sent',
                action1: { label: i18n.t('OK') }
              })            
          }, (error) => {
              console.log('FAILED...', error);
          });
    }
  },
  name: 'ForgotPass',
  data () {
    return {
      email: '',
      name:'',
      telephone:'',
      message:'',
      passwordSent: false
    }
  },
  components: {
    ButtonFull,
    BaseInput
  }
}
</script>

<style lang="scss" scoped>
  .modal-content {
  .align-button-center {
      margin: 0px auto;
      top: 10px;
      background: #000;
    }
    @media (max-width: 400px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  .formtextarea{
    border: 1px solid #ccc;
    width: 100%;
    height: 150px;    
  }
  .telephone{
    margin-top: 20px;
  }
</style>
