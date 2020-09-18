import { Wishlist as WishlistModule } from '../'
import wishlistMountedMixin from '@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin'

export const Wishlist = {
  name: 'Wishlist',
  mixins: [wishlistMountedMixin],
  created () {
    WishlistModule.register()
  },
  computed: {
    isWishlistOpen () {
      return this.$store.state.ui.wishlist
    },
    productsInWishlist () {
     // return this.$store.state.wishlist.items

      // if(this.$store.state.wishlist.items.length){
        // const wishList = [...this.$store.state.wishlist.items]
        // const updatedAtFlag = this.$store.state.wishlist.items[0].every(val => { 
        //   if (val.wishlist_updated_at && val.wishlist_updated_at !== null) return true
        //   else return false
        // })
        // if (this.$store.state.wishlist.items[0].length && updatedAtFlag) {
        //   wishList[0] = wishList[0].sort((a: any, b: any) => {
        //     const newDateA:any = new Date(a.wishlist_updated_at)
        //     const newDateB:any = new Date(b.wishlist_updated_at)
        //     return newDateB-newDateA
        //   })
        //   return wishList
        // } else {
          // wishList[0] = wishList[0].reverse()
          // return wishList
        // }
      // } else {
      //   return this.$store.state.wishlist.items
      // }

      const wishList = [...this.$store.state.wishlist.items]
      if (wishList[0]) {
        const wishLsitItems = [...wishList[0]]
        let wishlistReversed = [];
        wishlistReversed.push(wishLsitItems.reverse())
        return wishlistReversed
      } else {
        return wishList
      }
    }
  },
  methods: {
    closeWishlist () {
      this.$store.dispatch('ui/toggleWishlist')
    }
  }
}
