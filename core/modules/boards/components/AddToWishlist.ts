import Product from '@vue-storefront/core/modules/catalog/types/Product'
import { Boards as BoardsModule } from '../'
import wishlistMountedMixin from '@vue-storefront/core/modules/boards/mixins/wishlistMountedMixin'

export const AddToWishlist = {
  name: 'AddToWishlist',
  mixins: [wishlistMountedMixin],
  props: {
    product: {
      required: false,
      type: Object
    }
  },
  created () {
    BoardsModule.register()
  },
  methods: {
    addToWishlist (product) {
      return this.$store.state['boards'] ? this.$store.dispatch('boards/addItem', product) : false
    }
  }
}
