import AppliedCoupon from '../types/AppliedCoupon'
import Product from '@vue-storefront/core/modules/catalog/types/Product'
import CartTotalSegments from '../types/CartTotalSegments'

export const Microcart = {
  name: 'Microcart',
  computed: {
    productsInCart (): Product[] {
      const updatedAtFlag = this.$store.state.cart.cartItems.every(val => { 
        if (val.server_updated_at && val.server_updated_at !== null) return true
        else return false
      })
      if (this.$store.state.cart.cartItems.length && updatedAtFlag) {
        return this.$store.state.cart.cartItems.sort((a: any, b: any) => {
          const newDateA:any = new Date(a.server_updated_at)
          const newDateB:any = new Date(b.server_updated_at)
          return newDateB-newDateA
        })
      } else {
        return this.$store.state.cart.cartItems.reverse()
      }
    },
    appliedCoupon (): AppliedCoupon | false {
      return this.$store.getters['cart/getCoupon']
    },
    totals (): CartTotalSegments {
      return this.$store.getters['cart/getTotals']
    },
    checktotalsupdatewatch (): CartTotalSegments {
      return this.$store.getters['cart/getTotals'].find(val => val.code == 'subtotal')&&this.$store.getters['cart/getTotals'].find(val => val.code == 'subtotal').value;
    },
    isOpen (): boolean {
      return this.$store.state.cart.isMicrocartOpen
    }
  },
  methods: {
    applyCoupon (code: string): Promise<boolean> {
      return this.$store.dispatch('cart/applyCoupon', code)
    },
    removeCoupon (): Promise<boolean> {
      return this.$store.dispatch('cart/removeCoupon')
    },
    toggleMicrocart (): void {
      this.$store.dispatch('ui/toggleMicrocart')
    }
  }
}
