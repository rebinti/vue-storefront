import { Wishlist as WishlistModule } from '../'
import wishlistMountedMixin from '@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin'

export const IsOnWishlist = {
  name: 'isOnWishlist',
  mixins: [wishlistMountedMixin],
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  created () {
    WishlistModule.register()
  },
  computed: {
    isOnWishlist (): boolean {
      // return !!this.$store.state.wishlist[0].items.find(p => p.parentSku === this.product.parentSku) || false
      return (this.$store.state.wishlist.items.length > 0 ) && this.$store.state.wishlist.items[0].find(p => p.parentSku === this.product.parentSku) ? true :false
      // return !!((this.$store.state.wishlist.items.length > 0 ) && this.$store.state.wishlist.items[0].find(p => p.parentSku === this.product.parentSku)) || false
    }
  }
}
