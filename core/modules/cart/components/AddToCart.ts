import Product from '@vue-storefront/core/modules/catalog/types/Product'
declare const _paq
export const AddToCart = {
  name: 'AddToCart',
  data () {
    return {
      isAddingToCart: false
    }
  },
  props: {
    product: {
      required: true,
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    },
    configuration:  {
      required: false,
      type: Object
    },
  },
  methods: {
    async addToCart (product: Product) {
          // PAPERPLANES - ADD TO CART
          //let _paq = window._paq;
          this.$store.state.cart.cartItems.forEach(product => {
            _paq.push(['addEcommerceItem',product.parentSku,product.name,'',product.price,product.qty]);                     
          })              
          _paq.push(['trackEcommerceCartUpdate', this.$store.state.cart.platformTotals.grand_total]);
          _paq.push(['trackPageView']);          
      this.isAddingToCart = true
      try {
        const diffLog = await this.$store.dispatch('cart/addItem', { productToAdd: product })
        if (diffLog) {
          this.$bus.$emit('modal-hide', 'modal-productwithoptions');
          const el = document.body;
          el.classList.remove('set-overlay-on-top');
          document.documentElement.classList.remove('set-overlay-on-top')

          // console.log('notification',JSON.stringify(diffLog))
          if (diffLog.clientNotifications && diffLog.clientNotifications.length > 0) {
            diffLog.clientNotifications.forEach(notificationData => {
              this.notifyUser(notificationData)
            })
          }
          if (diffLog && diffLog.items) {
              const diffData = diffLog.items.find(val => val.sku === product.sku)
              if (diffData && diffData.status === 'no-item' && diffLog.clientNotifications && diffLog.clientNotifications.length === 0) {
                  setTimeout(() => {
                      this.$bus.$emit('modal-show', 'modal-outofstocknotification')
                      this.$bus.$emit('update-out-of-stock-data', { product: this.product, configuration: this.configuration})
                      this.$store.commit('ui/setOverlay', true)
                  }, 300);
              }
          }
        } else {
          this.notifyUser({
            type: 'success',
            message: this.$t('Product has been added to the cart!'),
            action1: { label: this.$t('OK') },
            action2: null
          })
          this.$bus.$emit('modal-hide', 'modal-productwithoptions')         
        }
        return diffLog
      } catch (err) {
        console.log('notificatio err',err)
        this.notifyUser({
          type: 'error',
          message: err,
          action1: { label: this.$t('OK') }
        })
        return null
      } finally {
        this.isAddingToCart = false
      }
    }
  }
}
