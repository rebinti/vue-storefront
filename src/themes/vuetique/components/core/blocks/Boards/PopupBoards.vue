<template>
  <modal name="modal-create-boards" :width="620">
      <add-to-boards-list v-if="activeElem == 'add-to-board'"/>
      <create-board v-if="activeElem == 'create-board'"/>
  </modal>
</template>

<script>
import { mapState } from 'vuex'
import Modal from 'theme/components/core/Modal'
const AddToBoardsList = () => import('theme/components/core/blocks/Boards/AddToBoardsList.vue')
const CreateBoard = () => import('theme/components/core/blocks/Boards/CreateBoard.vue')

export default {
  name: 'PopupBoards',
  data() {
    return {
      // dataTabUsed: 'add-to-board'
    }
  },
 computed: {
    ...mapState({
      activeElem: state => state.ui.boardsElem
    })
  },
  components: {
    Modal,
    AddToBoardsList,
    CreateBoard
  }
}
</script>

<style scoped>
  .modal {
    font-size: 18px;
  }
</style>




