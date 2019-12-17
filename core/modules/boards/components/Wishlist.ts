import { Boards as BoardsModule } from '../'
import wishlistMountedMixin from '@vue-storefront/core/modules/boards/mixins/wishlistMountedMixin'

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
      console.log('this.$store.state.boards.items' , this.$store.state);
      return this.$store.state.boards.items
    }
  },
  methods: {
    closeWishlist () {
      this.$store.dispatch('ui/toggleWishlist')
    }
  }
}
