<template>
  <div class="login_out_bx">
    <header class="modal-header">
      <svg viewBox="0 0 25 25" class="vt-icon modal-close p-1 m-2" slot="close" @click="close">
        <use xlink:href="#close" />
      </svg>
      <h2 style="text-transform: uppercase;">{{ $t('Create Board') }}</h2>
    </header>
    <div class="modal-content board_input_outer">
      
      <form @submit.prevent="createNewBoard" novalidate>
        <base-input
          class="mb-5 tx_bx_out board_input_box"
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

        <div class="sug_box" style="display: none">
          <h6>Suggested names:</h6>
          <ul>
            <li><a href="#">Dresses</a></li>
            <li><a href="#">Sales</a></li>
            <li><a href="#">Holiday</a></li>
          </ul>
        </div>
        <div class="board-button-wrap">
          <button-full class="mb-2 w-full lrge_btn" type="submit"
           data-testid="loginSubmit" :disabled="isSubmitBoard"
            style="background: black;">
            <div class="flex items-center justify-center">
              <span class="mr-2"> {{ $t('Create Board') }} </span>
              <div v-show="isSubmitBoard" class="loader ml-1" />
            </div>
          </button-full>
        </div>
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
      boardname: '',
      isSubmitBoard: false
    }
  },
  computed: {
    ...mapState({
      selectedBoardItem: state => state.ui.selectedBoardItem
    })
  },
  validations: {
    boardname: {
      required
    }
  },
  components: {
    ButtonFull,
    BaseInput
  },
  methods: {
    close (e) {
      if (e) localStorage.removeItem('redirect')
      console.log('this.selectedBoardItem', this.selectedBoardItem);
      if (this.selectedBoardItem === null) {
        this.$store.commit('ui/setSelectedBoardItem', null);
        this.$bus.$emit('modal-hide', 'modal-create-boards')
        const el = document.body;
        el.classList.remove('set-overlay-on-top');
        document.documentElement.classList.remove('set-overlay-on-top');
      } else {
        this.$store.commit('ui/setBoardsElem', 'add-to-board');
      }
    },
    async createNewBoard () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      this.isSubmitBoard = true;
      console.log('this.selectedBoardItem', this.selectedBoardItem);
      let Boarddata = { name: this.boardname, items: [] };
      if (this.selectedBoardItem) Boarddata.items.push(this.selectedBoardItem);
      try {
        const result = await this.$store.dispatch('boards/createBoard', Boarddata)
        // console.log('resultttttt', result)
        if (result) {
          this.isSubmitBoard = false;
          // console.log('resultttttt success', result);
          if (this.selectedBoardItem === null) {
            this.$bus.$emit('modal-hide', 'modal-create-boards')
          } else {
            this.$bus.$emit('modal-hide', 'modal-create-boards')
          }
        } else {
          this.isSubmitBoard = false;
        }
        return
      } catch (err) {
        console.log('resultttttt errr', err);
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please try again!'),
          action1: { label: this.$t('OK') }
        })
        this.isSubmitBoard = false;
        return
      } finally {
        this.isSubmitBoard = false;
        console.log('finally')
      }

      // if (this.selectedBoardItem === null) {
      //   this.$bus.$emit('modal-hide', 'modal-create-boards')
      // } else {
      //   this.$bus.$emit('modal-hide', 'modal-create-boards')
      // }
      // else {
      //   this.$store.commit('ui/setBoardsElem', 'add-to-board');
      // }
    }
  },
  beforeMount () {
      const el = document.body;
      el.classList.add('set-overlay-on-top');
      document.documentElement.classList.add('set-overlay-on-top')
  },
  destroyed () {
    const el = document.body;
    el.classList.remove('set-overlay-on-top');
    document.documentElement.classList.remove('set-overlay-on-top')
  }
}
</script>

<style scoped>

@media (max-width: 576px) {
.login_out_bx{
  height:100vh;
}
.modal .login_out_bx .modal-content.board_input_outer{ background: transparent; }

.sug_box{ width:100%; float: left;}
.sug_box h6{ font-size:20px; font-weight: bold; text-transform: uppercase;
  font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    color: #000;
    padding-left: 13px;
    padding-top: 10px;
 }
 .sug_box { margin-top: 20px; }
.sug_box ul{
  margin: 0px;
  padding: 0px;
  float: left;
  width: 100%;
  margin-left: 15px;
}
.sug_box ul li{
  width:100%; float: left;
  padding: 5px 0px;
}
.sug_box ul li a{
  color:#7c7c7c;
  font-size:12px; 
}
.board-button-wrap {
 position: fixed;bottom: 15px; 
 width:100%; padding:0 40px;
 text-align: center;
}
.board-button-wrap button {
  display: inline-block !important;
  padding: 10px !important;
  text-transform: capitalize !important;
}

}

.loader {
  display: inline-block;
  border: 3px solid #fff;
  border-top: 3px solid theme('colors.primary');
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>