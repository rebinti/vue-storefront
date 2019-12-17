import { Boards as BoardsModule } from '../'
import wishlistMountedMixin from '@vue-storefront/core/modules/boards/mixins/wishlistMountedMixin'

export const IsOnBoardsWishlist = {
  name: 'IsOnBoardsWishlist',
  mixins: [wishlistMountedMixin],
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  created () {
    BoardsModule.register()
  },
  computed: {
    isOnBoardsWishlist (): boolean {
     console.log('this.product' , this.product);
     console.log('this.product skuu' , this.product.sku);
     console.log('this.$store.state.boards' , this.$store.state.boards);
     console.log( 'dsadsdsadad',this.$store.state.boards.items.filter(product1 => product1.items.find(item => item.sku == this.product.sku)));
      // this.$store.state.boards.items.find(item => item.items.some(p => p.sku === this.product.sku)))
     return false;
    //  return !!this.$store.state.boards.items.find(p => p.sku === this.product.sku) || false
    }
  }
}
