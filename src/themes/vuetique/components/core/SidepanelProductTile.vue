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
      </router-link>      
      <div class="w-full title-and-wish" style="width:70%;  float:left; height: 120px;">
        <div class="ptitle" style=""> 
            <router-link
              class="block no-underline product-link"
              :to="productLink"
              data-testid="productLink"
            >
              <div style="width:84%; float:left;">
                  <p class="product-name mb-0 font-medium text-grey-dark mt-3" v-if="!onlyImage">
                      {{ product.name | htmlDecode }}
                  </p>                
              </div>
            </router-link>
            <div class="lg:col-3 pwishlist" style="width:15%; float:left;">
                <div class="title-and-wish relative-wishlist">
                    <div class="pwishlist">                 
                        <wishlist-button :product="product" class="wish-icon wish-icon-inside-img" />          
                    </div>  
                </div>                                      
                <!-- <wishlist-button :product="product" class="wish-icon" />           -->
            </div>               
        </div>
        <div class="price-and-add-button" style=""> 
            <div class="mt-1 text-grey-dark font-medium price_bx_it" style="width:50%; float:left;">
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
            <div style="width:50%; float:left;"> 
                <add-to-cart-quick-prod-btn :product="product" :addtocarttype="'Text-Only'" class="btn_box_lnk" />         
            </div>
        </div>
      </div>           
       <!-- <p class="product-category prd_cat" v-if="!onlyImage">
          Coats & Jackets
      </p>  -->
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
<style>
.title-and-wish button.btn_box_lnk{
  height: 25px;
  width: 125px;
}
.title-and-wish button.btn_box_lnk div span{
  line-height: .70rem;
}
.title-and-wish .text-grey-dark span{
  color: #000000;
  font-size: 13px;
}
.title-and-wish .wish-icon-inside-img button.button.wishlist-bx{
  margin-top: 10px;
}
.title-and-wish .wish-icon-inside-img button img.vt-icon{
  width: 20px;
  height: 20px;
}
.sidepanelitem .product-image img{
  margin-left: 13px;
}
.sidepanelitem .title-and-wish div.ptitle{
      height: 116px;
}
.sidepanelitem .title-and-wish div.ptitle p.product-name{
  margin-top: 0px;
}
.sidepanelitem .title-and-wish button.wishlist-bx{
  margin-top: 1px;
}
.price-and-add-button .price_left_out{
  width: 49% !important;
  float: left !important;  
}
.price-and-add-button .price_left_out div{
  float: left;  
}
@media (max-width: 425px) { 
  .sidepanelitem .product-image img{
    margin-left: 5px;
  }
  .title-and-wish button.btn_box_lnk {
    height: 25px;
    width: 110px;
  }
  .sidepanelitem .title-and-wish button.btn_box_lnk div.items-center span{
    font-size: 0.7125rem;
  }   
}
@media (max-width: 375px) { 
  .sidepanelitem .product-image img{
    margin-left: 1px;
  }  
  .title-and-wish button.btn_box_lnk {
    height: 20px;
    width: 100px;
  }
  .sidepanelitem .title-and-wish button.btn_box_lnk{
    padding-top: 0.25rem;
  }
  .sidepanelitem .title-and-wish button.btn_box_lnk div.items-center span{
    font-size: 0.60rem;
  } 
  .sidepanelitem .title-and-wish div.ptitle p.product-name {      
      margin-left: 5px;
  } 
  .sidepanelitem .price-and-add-button div.text-grey-dark{
    width: 46% !important;    
    margin-left: 5px !important;  
   /* margin-top: 25px;*/
  } 
}
@media (max-width: 320px){
  .sidepanelitem .title-and-wish div.ptitle{
      height: 95px;
  }
}
</style>
