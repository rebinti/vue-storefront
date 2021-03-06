<template>
  <div>
    <header class="modal-header py25 px65 h1 serif weight-700 bg-cl-secondary">
      <svg viewBox="0 0 25 25" class="vt-icon modal-close p-1 m-2" slot="close" @click="close">
        <use xlink:href="#close" />
      </svg>
      <h2>{{ $t('Register') }}</h2>
    </header>

    <div class="modal-content pt30 pb60 px65 cl-secondary">
      <form @submit.prevent="register" novalidate>
        <base-input
          class="mb-5"
          type="email"
          name="email"
          autocomplete="email"
          v-model="email"
          @blur="$v.email.$touch()"
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
        <div class="row mb-5 -mx-2">
          <base-input
            class="w-full sm:w-1/2 px-2"
            type="text"
            name="fist-name"
            autocomplete="given-name"
            v-model="firstName"
            @blur="$v.firstName.$touch()"
            :placeholder="$t('First name *')"
            :validation="{
              condition: !$v.firstName.required && $v.firstName.$error,
              text: $t('Field is required.')
            }"
          />

          <div class="w-full sm:hidden md:hidden lg:hidden mb-5" />

          <base-input
            class="w-full sm:w-1/2 px-2"
            type="text"
            name="last-name"
            autocomplete="last-name"
            v-model="lastName"
            @blur="$v.lastName.$touch()"
            :placeholder="$t('Last name *')"
            :validation="{
              condition: !$v.lastName.required && $v.lastName.$error,
              text: $t('Field is required.')
            }"
          />
        </div>
        <base-input
          class="mb-5"
          type="password"
          name="password"
          ref="password"
          autocomplete="new-password"
          v-model="password"
          @blur="$v.password.$touch()"
          :placeholder="$t('Password *')"
          :validations="[
            {
              condition: !$v.password.required && $v.password.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.password.minLength && $v.password.$error,
              text: $t('Password must have at least 8 letters.')
            }
          ]"
        />
        <base-input
          class="mb-5"
          type="password"
          name="password-confirm"
          autocomplete="new-password"
          v-model="rPassword"
          @blur="$v.rPassword.$touch()"
          :placeholder="$t('Repeat password *')"
          :validations="[
            {
              condition: !$v.rPassword.required && $v.rPassword.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.rPassword.sameAsPassword && $v.rPassword.$error,
              text: $t('Passwords must be identical.')
            }
          ]"
        />
        <base-checkbox
          class="mb-3 text-black"
          id="terms"
          v-model="conditions"
          @click="conditions = !conditions"
          @blur="$v.conditions.$reset()"
          @change="$v.conditions.$touch()"
          :validation="{
            condition: !$v.conditions.required && $v.conditions.$error,
            text: $t('You must accept the terms and conditions.')
          }"
        >
          {{ $t('I accept terms and conditions') }} *
        </base-checkbox>

        <button-full class="mb-2 w-full" type="submit">
          {{ $t('Register an account') }}
        </button-full>

        <div class="text-center">
          <span>
            {{ $t('or') }}
            <a href="#" @click.prevent="switchElem">
              {{ $t('login to your account') }}
            </a>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Register from '@vue-storefront/core/compatibility/components/blocks/Auth/Register'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox.vue'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  validations: {
    email: {
      required,
      email
    },
    firstName: {
      required
    },
    lastName: {
      required
    },
    password: {
      minLength: minLength(8),
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    conditions: {
      required
    }
  },
  mixins: [Register],
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput
  },
  methods: {
    register () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      this.callRegister()
    },
    onSuccess () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: this.$t('You are logged in!'),
        action1: { label: this.$t('OK') }
      })
    },
    onFailure (result) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: result.result,
        action1: { label: this.$t('OK') }
      })
    }
  }
}
</script>
