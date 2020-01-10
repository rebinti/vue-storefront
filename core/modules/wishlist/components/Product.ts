import Product from '@vue-storefront/core/modules/catalog/types/Product'
import wishlistMountedMixin from '@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin'

export const WishlistProduct = {
  name: 'Product',
  mixins: [wishlistMountedMixin],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    thumbnail () {
      return this.getThumbnail(this.product.image ? this.product.image : this.product.thumbnail ? this.product.thumbnail : null, 150, 150)
    }
  },
  methods: {
    removeFromWishlist (product: Product) {
      return this.$store.state['wishlist'] ? this.$store.dispatch('wishlist/removeItem', product) : false
    }
  }
}
