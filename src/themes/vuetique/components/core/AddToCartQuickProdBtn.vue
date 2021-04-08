<template>
   <button-full :type="addtocartButtonType"
   v-if="addtocarttype === 'Text-Only'"
   @click.native="addToCartWrapper(product)" 
   :disabled="isProductDisabled" 
   data-testid="addToCart" class="w-full" :class="{'bg-primary': isProductDisabled || added}">
    <div class="flex items-center justify-center">
      <span>{{ failed ? $t('Error while adding') : added ? $t('Added to bag') : $t(productname) }}</span>
      <div v-if="isAddingToCart" class="loader ml-1" />
      <svg v-if="added" viewBox="0 0 17.333 9.333" class="vt-icon--sm ml-1">
        <use xlink:href="#success" />
      </svg>
      <svg v-if="failed" viewBox="0 0 17.313 17.311" class="vt-icon--sm ml-1 fill-white">
        <use xlink:href="#error" />
      </svg>
    </div>
  </button-full>
  <button
      :class="{'loader-style' : isAddingToCart}"
      v-else-if="addtocarttype === 'Only-Icon'"
      :disabled="isProductDisabled" 
      @click.prevent="addToCartWrapper(product)"
      class="inline-flex items-center text-grey-dark wishlist-bx"
      type="button"
        >
        <div v-if="isAddingToCart" class="loader ml-1" />
        <img v-else class="vt-icon fa-icon-list v-mobile" src="/assets/shop-bag.png" alt="" />
  </button>
  <button
      v-else-if="addtocarttype === 'Quick-View'"
      :disabled="isProductDisabled" 
      @click.prevent="addToCartWrapper(product)"
      class="inline-flex items-center text-grey-dark wishlist-bx"
      type="button"
        >
         <div v-if="isAddingToCart" class="loader ml-1" />
        <img class="vt-icon fa-icon-list v-mobile mr-8" src="/assets/shop-bag.png" alt="" />
        Quick View
  </button>
</template>

<script>
import { formatProductMessages } from '@vue-storefront/core/filters/product-messages'
import focusClean from 'theme/components/theme/directives/focusClean'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { AddToCart } from '@vue-storefront/core/modules/cart/components/AddToCart'
import { setTimeout } from 'timers'

export default {
  name: 'AddToCartQuickProdBtn',
  mixins: [AddToCart],
  directives: { focusClean },
  components: { ButtonFull },
  data () {
    return {
      added: false,
      failed: false
    }
  },
  props: {
    productname: {
      type: String,
      required: false,
      default: 'Add to bag'
    },
    /* 
      @parms  'Quick-View', 'Text-Only'
    */
    addtocarttype: {  
      type: String,
      required: false,
      default: 'Only-Icon'
    },
    addtocartButtonType: {  
      type: String,
      required: false,
      default: 'button'
    },
    addtocartFormValidationFlag: {
      type: Boolean,
      required: false,
      default: false
    }  
  },
  computed: {
    isProductDisabled () {
      return this.disabled || formatProductMessages(this.product.errors) !== '' || this.isAddingToCart
    }
  },
  methods: {
    onAfterRemovedVariant () {
      this.$forceUpdate()
    },
    notifyUser (notificationData) {
      if((notificationData.message=="Product has been added to the cart!")||(notificationData.message=="Product quantity has been updated!")){
        // no notify
      }else{
        this.$store.dispatch('notification/spawnNotification', notificationData, { root: true })
      }            
      if (notificationData.type === 'success') {         
        this.added = true
        // segmentify 
        window.sgfLayer = {
          'basket': {
              step: 'add',
              productId: this.product.parentSku,
              quantity: 1, 
              price: this.product.price
          }
        }          
      } else {
        this.failed = true
      }
      setTimeout(() => {
        this.added = false
        this.failed = false
      }, 2000)
    },
    addToCartWrapper (product) {
      this.$emit('click');
      if(this.addtocartFormValidationFlag)  return
      this.added = false
      this.failed = false
      if((this.product.type_id === 'simple') || (this.product.type_id === 'virtual') || (this.product.type_id === 'bundle')) {
         this.addToCart(product)
      } else {
        if((this.product.type_id === 'configurable')&&(product.configurable_children)){
          this.openProductOptionsPopup()
        }else{          
          this.addToCart(product)
        }        
      }
    },
    openProductOptionsPopup () {
      this.$bus.$emit('modal-show', 'modal-productwithoptions')
      this.$bus.$emit('update-product-with-options-data', this.product)
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-removevariant', this.onAfterRemovedVariant)
  },
  beforeDestroy () {
    this.$bus.$off('product-after-removevariant')
  }
}
</script>

<style lang="scss" scoped>
.loader {
  display: inline-block;
  border: 3px solid #fff;
  border-top: 3px solid theme('colors.primary');
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader-style {
 display: inline-block;
 background: #d2c4c47d !important;
 padding: 3px 9px 0 4px;
 margin-left: -8px;
}
</style>
