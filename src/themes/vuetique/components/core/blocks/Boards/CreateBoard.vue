<template>
  <div class="login_out_bx">
    <header class="modal-header">
      <svg viewBox="0 0 25 25" class="vt-icon modal-close p-1 m-2" slot="close" @click="close">
        <use xlink:href="#close" />
      </svg>
      <h2 style="text-transform: uppercase;">{{ $t('Create Board') }}</h2>
    </header>
    <div class="modal-content">
        <p style="padding: 0 0 0 8px;font-weight: 400;">Board name </p>
        <form @submit.prevent="createNewBoard" novalidate>
            <base-input
            class="mb-5 tx_bx_out"
            type="text"
            name="boardname"
            v-model="boardname"
            @blur="$v.boardname.$touch()"
            :placeholder="$t('Enter a name for this board')"
            :validation="{
                condition: !$v.boardname.required && $v.boardname.$error,
                text: $t('Field is required.')
            }"
            />

            <button-full class="mb-2 w-full lrge_btn" type="submit" data-testid="loginSubmit" style="position: fixed;bottom: 15px; background: black;">
            {{ $t('Create Board') }}
            </button-full>
        </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseInput from '../Form/BaseInput.vue'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'CreateBoard',
  mixins: [],
  data () {
    return {
      hasRedirect: !!localStorage.getItem('redirect'),
      boardname: ''
    }
  },
  computed: {
    ...mapState({
      selectedBoardItem: state => state.ui.selectedBoardItem
    })
  },
  validations: {
    boardname: {
      required,
    },
  },
  components: {
     ButtonFull,
     BaseInput
  },
  methods: {
    close (e) {
      if (e) localStorage.removeItem('redirect')
      console.log('this.selectedBoardItem' , this.selectedBoardItem);
      if(this.selectedBoardItem === null) {
          this.$store.commit('ui/setSelectedBoardItem', null);
          this.$bus.$emit('modal-hide', 'modal-create-boards')
      } else {
          this.$store.commit('ui/setBoardsElem', 'add-to-board');
      }
    },
    createNewBoard () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      this.$store.dispatch('boards/createBoard', { name: this.boardname , items: []  });
      if(this.selectedBoardItem === null) {
          this.$bus.$emit('modal-hide', 'modal-create-boards')
      } else {
          this.$store.commit('ui/setBoardsElem', 'add-to-board');
      }
    },
  }
}
</script>

<style scoped>

@media (max-width: 576px) {
.login_out_bx{
  height:100vh;
}

}
</style>