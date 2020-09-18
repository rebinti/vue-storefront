import { Boards as BoardsModule } from '../'
import wishlistMountedMixin from '@vue-storefront/core/modules/boards/mixins/wishlistMountedMixin'
import cloneDeep from 'lodash-es/cloneDeep'

export const Wishlist = {
  name: 'Wishlist',
  mixins: [wishlistMountedMixin],
  created () {
    BoardsModule.register()
  },
  computed: {
    isWishlistOpen () {
      return this.$store.state.ui.wishlist
    },
    boardsListItems () {
      // return this.$store.state.boards.items

      if (this.$store.state.boards.items.length) {
        // let boards: any = [...this.$store.state.boards.items]
        // boards.forEach(boardItem => {
          // const updatedAtFlag = boardItem.items.every(val => { 
          //   if (val.board_updated_at && val.board_updated_at !== null) return true
          //   else return false
          // })
          // if (boardItem.items.length && updatedAtFlag) {
          //   boardItem.items = boardItem.items.sort((a: any, b: any) => {
          //     const newDateA:any = new Date(a.board_updated_at)
          //     const newDateB:any = new Date(b.board_updated_at)
          //     return newDateB-newDateA
          //   })          
          // } else {
            // boardItem.items = boardItem.items.reverse();
          // }
        // })
        // return boards

        let boards = cloneDeep(this.$store.state.boards.items);
        console.log('boardsboardsboards', boards)
        boards.forEach(boardItem => {
            boardItem.items = boardItem.items.reverse()
        });
        return boards.reverse()
      } else {
        return this.$store.state.boards.items
      }
    }
  },
  methods: {
    closeWishlist () {
      this.$store.dispatch('ui/toggleWishlist')
    }
  }
}
