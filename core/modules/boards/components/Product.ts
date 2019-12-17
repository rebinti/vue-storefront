// import Product from '@vue-storefront/core/modules/catalog/types/Product'
import wishlistMountedMixin from '@vue-storefront/core/modules/boards/mixins/wishlistMountedMixin'

export const WishlistProduct = {
  name: 'Product',
  mixins: [wishlistMountedMixin],
  props: {
    product: {
      type: Object,
      required: false
    },
    indexValue: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    thumbnail () {
      return this.getThumbnail(this.product.image, 150, 150)
    }
  },
  methods: {
    removeFromWishlist (product) {
      return this.$store.state['boards'] ? this.$store.dispatch('boards/removeItem', product) : false
    }
  }
}
