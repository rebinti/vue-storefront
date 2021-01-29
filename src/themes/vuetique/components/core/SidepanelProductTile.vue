<template>
  <div
    class="product w-full pb-2 md:pb-5" style="height:150px;"
    v-observe-visibility="visibilityChanged"
  >
    <router-link
      class="block no-underline product-link"
      :to="productLink"
      data-testid="productLink"
    >
      <div
        class="product-image w-full relative prod_list" style="width:30%;  float:left;"
        :class="[{ sale: labelsActive && isOnSale }, { new: labelsActive && isNew }]"
      >   
        <img
          :alt="product.name"
          :src="thumbnailObj.loading"
          v-lazy="thumbnailObj"
          height="150"
          width="100"
          data-testid="productImage"
          :class="{ 'default-image': hoverThumbnail !== null }"
        >                 
      </div>
      <div class="w-full title-and-wish" style="width:70%;  float:left; height: 120px;">
        <div class="ptitle" style="width:100%;"> 
            <div style="width:85%; float:left;">
                <p class="product-name mb-0 font-medium text-grey-dark mt-3" v-if="!onlyImage">
                    {{ product.name | htmlDecode }}
                </p>                
            </div>
            <div class="lg:col-3 pwishlist" style="width:15%; float:left;">
                <div class="title-and-wish relative-wishlist">
                    <div class="pwishlist">                 
                        <wishlist-button :product="product" class="wish-icon wish-icon-inside-img" />          
                    </div>  
                </div>                                      
                <!-- <wishlist-button :product="product" class="wish-icon" />           -->
            </div>               
        </div>
        <div class="" style="width:100%;"> 
            <div class="mt-1 text-grey-dark font-medium price_bx_it" style="width:85%; float:left; margin-top: 75px;">
                <span
                class="text-primary mr-2"
                style="color: #FF0000;"
                v-if="product.special_price && parseFloat(product.special_price) > 0 && !onlyImage"
                >
                {{ product.priceInclTax | price }}
                </span>

                <span
                class="line-through"
                v-if="product.special_price && parseFloat(product.originalPriceInclTax) > 0 && !onlyImage"
                >
                {{ product.originalPriceInclTax | price }}
                </span>

                <span
                v-if="!product.special_price && parseFloat(product.priceInclTax) > 0 && !onlyImage"
                >
                {{ product.priceInclTax | price }}
                </span> 
                
            </div>
            <div style="width:15%; float:left; margin-top: 75px;"> 
                <add-to-cart-quick-prod-btn :product="product" :addtocarttype="'Only-Icon'" class="cart-icon" />         
            </div>
        </div>
      </div>           
       <!-- <p class="product-category prd_cat" v-if="!onlyImage">
          Coats & Jackets
      </p>  -->
    </router-link>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import rootStore from '@vue-storefront/core/store'
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts'
import config from 'config'
import AddToCartQuickProdBtn from 'theme/components/core/AddToCartQuickProdBtn.vue'

export default {
  mixins: [ProductTile],
  components: {
    'no-ssr': NoSSR,
    AddToCartQuickProdBtn,
    'WishlistButton': () => import(/* webpackChunkName: "wishlist" */'theme/components/core/blocks/Wishlist/AddToWishlist'),
  },
  props: {
    labelsActive: {
      type: Boolean,
      required: false,
      default: true
    },
    onlyImage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    hoverThumbnail () {
      if (this.product.media_gallery) {
        let images = this.product.media_gallery.filter(item => item.typ === 'image')
        if (images.length > 1) {
          let thumbnail = images[images.length - 1].image
          for (let i = 0; i < images.length; i++) {
            if (images[i].lab === 'alternative') {
              thumbnail = images[i].image
              break
            }
          }
          return this.getThumbnail(thumbnail, config.products.thumbnails.width, config.products.thumbnails.height)
        }
      }
      return null
    },
    hoverThumbnailObj () {
      return {
        src: this.hoverThumbnail,
        loading: this.thumbnail,
        error: this.thumbnail
      }
    },
    getSpecialPercent () {
      if(this.product.originalPriceInclTax){
      let percent = 100- ((this.product.priceInclTax*100)/this.product.originalPriceInclTax);        
         return '-' + Math.round(percent)+"%";
      } else {
        return null
      }
    }      
  },
  methods: {
    onProductPriceUpdate (product) {
      if (product.sku === this.product.sku) {
        Object.assign(this.product, product)
      }
    },
    visibilityChanged (isVisible, entry) {
      if (isVisible) {
        if (rootStore.state.config.products.configurableChildrenStockPrefetchDynamic && rootStore.products.filterUnavailableVariants) {
          const skus = [this.product.sku]
          if (this.product.type_id === 'configurable' && this.product.configurable_children && this.product.configurable_children.length > 0) {
            for (const confChild of this.product.configurable_children) {
              const cachedItem = rootStore.state.stock.cache[confChild.id]
              if (typeof cachedItem === 'undefined' || cachedItem === null) {
                skus.push(confChild.sku)
              }
            }
            if (skus.length > 0) {
              rootStore.dispatch('stock/list', { skus: skus }) // store it in the cache
            }
          }
        }
      }
    },
    openProductOptionsPopup () {
      this.$bus.$emit('modal-show', 'modal-productwithoptions')
      this.$bus.$emit('update-product-with-options-data', this.product)
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-priceupdate', this.onProductPriceUpdate)
  },
  beforeDestroy () {
    this.$bus.$off('product-after-priceupdate', this.onProductPriceUpdate)
  }
}
</script>

<style lang="scss" scoped>

</style>
