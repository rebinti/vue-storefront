<template>


      <div class="board_bx_out" >
         <header class="modal-header">
            <div class="board_bx">
                <div class="cncl_text">
                  <a href="#" @click="$bus.$emit('modal-hide', 'modal-create-boards');$store.commit('ui/setSelectedBoardItem', null)">Cancel</a>
                </div>
                <div class="hdr_text">
                  ADD TO BOARD
                </div>
                <div class="add_text">
                  <a href="#" @click="openCreateBoard">
                    <i class="fas fa-plus"></i>
                  </a>
                </div>
            </div>
         </header>

        <div class="modal-content" >

          <div class="board_list" v-for="(board, index) in boardsListItems" :key="board.id" @click="addProductToBoard(board, index)">

            <div class="image-block-col brd_bx_li">
                  <div class="img_col_2 lg_img_one">
                      <img v-if="board.items.length > 0" v-lazy="thumbnail(board.items[0].image)" alt="" title="">
                      <img v-else src="/assets/mid_1.png"/>

                      <img v-if="board.items.length > 1" v-lazy="thumbnail(board.items[1].image)" alt="" title="">
                      <img v-else src="/assets/small_1.png"/>
                      
                    
                  </div>
                  <div class="img_col_2 lg_img_two">
                     <img v-if="board.items.length > 2" v-lazy="thumbnail(board.items[2].image)" alt="" title="">
                     <img v-else src="/assets/small_1.png"/>

                     <img v-if="board.items.length > 3" v-lazy="thumbnail(board.items[3].image)" alt="" title="">
                     <img v-else src="/assets/mid_1.png"/>
 
               
                  </div>
              </div>

              <div class="ft_text">
                {{ board.name }}
              </div>

          </div>


        </div>

      </div>
</template>

<script>
import { mapState } from 'vuex'
import { Wishlist } from '@vue-storefront/core/modules/boards/components/Wishlist'
import { AddToWishlist } from '@vue-storefront/core/modules/boards/components/AddToWishlist'

export default {
  name: 'AddToBoardsList',
  mixins: [Wishlist, AddToWishlist],
  data () {
    return {
      hasRedirect: !!localStorage.getItem('redirect')
    }
  },
  computed: {
    ...mapState({
      selectedProduct: state => state.ui.selectedBoardItem
    })
  },
  components: {

  },
  methods: {
    close (e) {
      if (e) localStorage.removeItem('redirect');
      this.$bus.$emit('modal-hide', 'modal-create-boards');
      this.$store.commit('ui/setSelectedBoardItem', null);
    },
    openCreateBoard () {
      this.$store.commit('ui/setBoardsElem', 'create-board');
      this.$bus.$emit('modal-show', 'modal-create-boards');
    },
    async addProductToBoard (board, index) {
      let selectedItem = Object.assign({}, this.selectedProduct);
      console.log('selectedItem to board', this.selectedProduct);
      try {
        const _index = this.$store.state.boards.items.findIndex(val => val.wboard_id == board.wboard_id)
        const result = await this.addToWishlist({product: selectedItem, board: board, index: _index});
        if (result) {
          console.log('resultttttt success', result);
          this.$bus.$emit('modal-hide', 'modal-create-boards');
          this.$store.commit('ui/setSelectedBoardItem', null);
        }
      } catch {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please try again!'),
          action1: { label: this.$t('OK') }
        })
      } finally {
        console.log('finally')
      }
    },
    thumbnail (image) {
      return this.getThumbnail(image, 150, 150)
    }
  }
}
</script>

<style scoped>
/* Boards list style  */

.wishlist-top-button-row {
  max-width: 314px;
  margin: auto;
}
.wishlist-top-button-row .button-blck {
  display: block;
  float: left;
}
.wishlist-top-button-row .button-blck .button-type1 {
  border:1px solid #000000;
  padding: 4px 48px;
  color: #000000;
  width:157px;
}
.wishlist-top-button-row .button-blck .button-type1.active {
  background: #000000;
  color: #ffffff;
}
.image-block-wrapper .image-block-col {
  float: left; padding-left: 5px;
 
  
}
.image-block-wrapper .image-block-col:first-child {
  margin-left: 0;
}

.image-block-col{
  width:33.33%;
  float: left;
  height:100%;
}
.image-block-wrapper{
  width:100%;
  height:150px;
  overflow:hidden;
}

.img_col_2 img{
  margin-bottom: 5px;
}
.img_col_2{
  float: left;
  width:50%;
  padding-right: 5px;
  height:100%;
}

.image-block-col img{
  width:100%;
  height:100%;
}

.lg_img_one img:first-child{
  height: 60%;
}
.lg_img_one img:last-child{
  height: 40%;
}
.lg_img_two img:first-child{
  height: 40%;
}
.lg_img_two img:last-child{
  height: 60%;
}

.image-block-more{
  width:100%;
  display: inline-block;
  padding-top: 10px;
  padding-bottom: 15px;
}

.image-block-more h5{
  font-size:16px;
  color:#000;
  float: left;
  font-weight: bold;
}

.image-block-more span.sp_txt{
  float: right;
  font-size:11px;
  color:#7c7c7c;
  font-weight: 500;
}

.image-block-wrapper-out{
  padding-top: 20px;
  border-bottom: 1px solid #ccc;
}

.add_more_btn{
  width:50px;
  height:50px;
  background: #000;
  -webkit-border-radius: 50%;
	-moz-border-radius: 50%;
  border-radius: 50%;
  position: fixed;
  bottom: 100px;
  z-index: 100;
  right: 25px;
}
.add_more_btn a{
  width:100%;
  height:100%;
  font-size: 20px;
  color: #fff;
  padding-top: 13px;
  display: inline-block;
}

/* board_ popup */

.board_bx{
  width:100%;
  float: left;
  padding-top: 20px;
}
.cncl_text{
  width:20%;
  float: left;
}
.hdr_text{
  width:60%;
  float: left;
  font-size:16px;
  font-weight: bold;
}
.add_text{
  width:20%;
  float: left;
}
.cncl_text a{
  font-size: 16px;
  font-weight: 400;
}
.ft_text{
  font-size: 16px;
  font-weight: 500;
}
.brd_bx_li{
  float: left;
  width:25%;
}
.board_list{
  width:100%;
  float: left;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid #ccc;
  position: relative;
}

.ft_text{
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  padding-left: 30%;
}


/* addto board list popup */

.board_bx_out{
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 300px;
  background: rgb(255, 255, 255);
  overflow-x: scroll;
  padding: 10px 20px;
  left:0px;
}

.modal .modal-container{
  background: transparent;
}

.board_bx{
  text-align: center;
}

@media (max-width: 576px){

  .modal .modal-container {
      background:transparent;
  }
}

@media (min-width: 1024px) and (max-width: 2560px) {
    .board_bx_out {
        width: auto; 
        height: 100vh;
        left: auto;
        right: 0;
        min-width: 400px;
    }
}

</style>
