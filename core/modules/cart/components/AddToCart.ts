import Product from '@vue-storefront/core/modules/catalog/types/Product'

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
    }
  },
  methods: {
    async addToCart (product: Product) {
      this.isAddingToCart = true
      try {
        const diffLog = await this.$store.dispatch('cart/addItem', { productToAdd: product })
        if (diffLog) {
          // console.log('notification',JSON.stringify(diffLog))
          if (diffLog.clientNotifications && diffLog.clientNotifications.length > 0) {
            diffLog.clientNotifications.forEach(notificationData => {
              this.notifyUser(notificationData)
            })
          }
          if (diffLog && diffLog.items) {
              const diffData = diffLog.items.find(val => val.sku === product.sku)
              if (diffData && diffData.status === 'no-item' && diffLog.clientNotifications && diffLog.clientNotifications.length === 0) {
                  this.$bus.$emit('modal-show', 'modal-outofstocknotification')
                  this.$bus.$emit('update-out-of-stock-data', true)
              }
          }
        } else {
          this.notifyUser({
            type: 'success',
            message: this.$t('Product has been added to the cart!'),
            action1: { label: this.$t('OK') },
            action2: null
          })
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
