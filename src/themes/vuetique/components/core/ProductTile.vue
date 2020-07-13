<template>
  <div
    class="product w-full pb-2 md:pb-5"
    v-observe-visibility="visibilityChanged"
  >
    <router-link
      class="block no-underline product-link"
      :to="productLink"
      data-testid="productLink"
    >
      <div
        class="product-image w-full relative prod_list"
        :class="[{ sale: labelsActive && isOnSale }, { new: labelsActive && isNew }]"
      >
       <div class="title-and-wish relative-wishlist">
          <div class="pwishlist">                 
            <wishlist-button :product="product" class="wish-icon wish-icon-inside-img" />          
          </div>  
        </div>    
        <img
          :alt="product.name"
          :src="thumbnailObj.loading"
          v-lazy="thumbnailObj"
          height="auto"
          width="auto"
          data-testid="productImage"
          :class="{ 'default-image': hoverThumbnail !== null }"
        >
        <img
          v-if="hoverThumbnail !== null"
          :alt="product.name"
          :src="hoverThumbnailObj.loading"
          v-lazy="hoverThumbnailObj"
          height="auto"
          width="auto"
          data-testid="productHoverImage"
          class="hover-image"
        >
        
        <div v-if="product.badge" :badge="product.badge" class="product-badge">
            <div v-if="product.badge_type === 241" class="rectangle"> <!-- 237 for rectangle -->
                <span class="badge badge1">
                  	<span class="badge-inner1">{{product.badge}}</span>
                </span>
            </div>
            <div v-else-if="product.badge_type === 237"  class="squre"> <!-- 236 for round -->
                <span class="badge badge1">
                  	<span class="badge-inner1">{{product.badge}}</span>
                </span>
            </div>
            <div v-else class="round">
                <span class="badge badge1">
                  	<span class="badge-inner1">{{product.badge}}</span>
                </span>
            </div>                  
        </div>          
      </div>
      <div class="w-full title-and-wish">
        <div class="lg:col-9 ptitle">  
          <p class="product-name mb-0 font-medium text-grey-dark mt-3" v-if="!onlyImage">
            {{ product.name | htmlDecode }}
          </p>
        </div>
        <div class="lg:col-3 pwishlist">
          <add-to-cart-quick-prod-btn :product="product" :addtocarttype="'Only-Icon'" class="cart-icon" />          
          <!-- <wishlist-button :product="product" class="wish-icon" />           -->
        </div>  
      </div>    
       <!-- <p class="product-category prd_cat" v-if="!onlyImage">
          Coats & Jackets
      </p>  -->
      <div class="mt-1 text-grey-dark font-medium price_bx_it">
        <span
          class="text-primary mr-2"
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
@import '~theme/css/animations/transitions';

%label {
  @apply text-xs font-medium tracking-sm absolute top-0 left-0 flex justify-center items-center uppercase border border-solid;

  padding: 7px 10px;
  line-height: 8px;
}

.product-image {
  @apply flex bg-grey-lightest;
  overflow: hidden;

  .hover-image {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: visibility $duration-main $motion-main, opacity $duration-main $motion-main;
  }

  &:hover {
    &.sale::after,
    &.new::after {
      opacity: 0.8;
    }

    .hover-image {
      visibility: visible;
      opacity: 1;
    }

    .default-image {
      opacity: 0;
    }
  }

  img {
    display: block;
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    margin: auto;
    mix-blend-mode: darken;
    transition: opacity $duration-main $motion-main;

    &[lazy="loaded"] {
      animation: products-loaded;
      animation-duration: 0.3s;
    }

    @keyframes products-loaded {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  &.sale {
    &::after {
      @extend %label;
      @apply m-1 text-error border-error-lighter bg-error-lightest;
      content: 'Sale';
    }
  }

  &.new {
    &::after {
      @extend %label;
      @apply m-1 text-primary border-primary-lighter bg-primary-lightest;
      content: 'New';
    }
  }
}

.product-link {
  .product-name {
    transition: color $duration-main $motion-main;
  }

  &:hover {
    .product-name {
      // @apply text-primary;
    }
  }
}
.product.w-full{
    position: relative;
}
.relative-wishlist{
    top: 0px;
    position: absolute;
    right: 0px;  
}
.product{
  .title-and-wish{
    .ptitle{
      width: 90%;
      float: left;
      padding-right: 10px;
    }
    .pwishlist{
      width: 10%;
      float: left;
      padding-top: 10px;
        .cart-icon{
          float: right;
          // margin-right: 4px;
        }
        .wish-icon{
          float: left;
          // margin-left:10px;
          // margin-top: -4px;
          // margin-right: 10px;
          width: 20px; 
        }
        .wish-icon-inside-img{
          width: 20px;
          position: absolute;
          top: 41px;
          right: -3px;
        }              
    }   
  }
  .price_bx_it{
    clear: both;
  }
}
@media (max-width: 2560px) {
  .item-2-6-grid.column2 .product-image img{
      width: 580px;
      height: 870px;
  }
  .item-4-3-grid.column4 .product-image img{
      width: 280px;
      height: 420px;
  }
  .column4{
    .product{
      .title-and-wish{
        .ptitle{
          width: 90%;
          padding-right: 10px;
        }
        .pwishlist{
          width: 10%;    
            .wish-icon{
              width: 20px;
            }     
        }   
      }
    }    
  }    
}
@media (max-width: 1440px) {
  .item-2-6-grid.column2 .product-image img{
      width: 352px;
      height: 528px;
  }
  .item-3-12-grid.column3 .product-image img{
      width: 228px;
      height: 342px;
  }   
  .item-4-3-grid.column4 .product-image img{
      width: 166px;
      height: 249px;
  }     
  .product{
    .title-and-wish{
      .ptitle{
        width: 90%;
        padding-right: 10px;
      }
      .pwishlist{
        width: 10%;
          .cart-icon{
            width: 20px;
            .vt-icon{
              width: 20px;
              height: 20px;
            }
          }
          .wish-icon{
            width: 20px;
          }       
      }   
    }
  } 
  .column4{
    .product{
      .title-and-wish{
        .ptitle{
          width: 90%;
          padding-right: 10px;
        }
        .pwishlist{
          width: 10%;     
        }   
      }
    }    
  }      
}
@media (max-width: 1024px) {
  .item-2-6-grid .product-image img{
      width: 228px;
      height: 342px;
  } 
  .item-3-12-grid.column3 .product-image img{
      width: 228px;
      height: 342px;
  }   
  .item-4-3-grid.column4 .product-image img{
      width: 166px;
      height: 249px;
  } 
  .column4{
    .product{
      .title-and-wish{
        .ptitle{
          width: 90%;
          padding-right: 10px;
        }
        .pwishlist{
          width: 10%;     
        }   
      }
    }    
  }      
}
@media (max-width: 768px) {
  .item-2-6-grid .product-image img{
      width: 236px;
      height: 354px;
  }  
  .item-3-12-grid.column3 .product-image img{
      width: 236px;
      height: 354px;
  }  
  .item-4-3-grid.column4 .product-image img{
      width: 172px;
      height: 258px;
  } 
  .column4{
    .product{
      .title-and-wish{
        .ptitle{
          width: 90%;
          padding-right: 10px;
        }
        .pwishlist{
          width: 10%;     
        }   
      }
    }    
  }      
}
@media (min-width: 577px) {

  .pr_list_sec_main{

   
    .prd_cat{
     display: none;
    }
    

  }
  

}

@media (max-width: 576px) {

.pr_list_sec_main{

    .product-name{
      // font-size: 13px;
      // color: #000;
      // font-weight: bold;
      line-height: 16px;

      font-size: 12px; 
      color: #282828;
      font-weight: 400;
      text-transform: uppercase;

    }
    .prd_cat{
      font-size: 9px;
      color: #787878;
      text-transform: uppercase;
      line-height: 13px;
      padding-top: 5px;
    }
    .price_bx_it{
        font-size:14px;
        color:#000;
        line-height: 16px;
        font-weight: bold;
        margin-bottom: 15px;
      span{
        font-size:14px;
        color:#000;
        line-height: 16px;
        font-weight: 500;
      }
    }

  }

  .item-2-6-grid .product-image img{
      width: 192.5px;
      height: 288.75px;
  }
  .item-2-6-grid.column2 .product-image img{
      width: 192.5px;
      height: 288.75px;   
  }    
  .item-3-12-grid.column3 .product-image img{
      width: 405px;
      height: 607.5px;    
  }  
  .item-3-6-grid.column3 .product-image img{
      width: 192.5px;
      height: 288.75px;
  }
  .item-4-3-grid.column4 .product-image img{
      width: 121.66px;
      height: 182.43px;
  } 
.item-4-3-grid {  
    .product-name{
       display: none;
    }
    .product-category{
      display: none;
    }
    .price_bx_it{
      display: none;
    }
    .product-image{
      img{
        height: 100px;
      }
    }
    .wishlist-bx{
      display: none;
    }
}
}
@media (max-width: 425px) {
  .item-2-6-grid .product-image img{
      width: 192.5px;
      height: 288.75px;
  }
  .item-2-6-grid.column2 .product-image img{
      width: 192.5px;
      height: 288.75px;   
  }  
  .item-3-12-grid.column3 .product-image img{
      width: 405px;
      height: 607.5px;    
  }  
  .item-3-6-grid.column3 .product-image img{
      width: 192.5px;
      height: 288.75px;
  }
  .item-4-3-grid.column4 .product-image img{
      width: 121.66px;
      height: 182.43px;
  }   
  .product{
    .title-and-wish{
      .pwishlist{
        .wish-icon{
          // margin-left:8px;
          // margin-right: 10px;
          top: 36px;
          right: -9px;
        }       
      }   
    }
  }   
}
@media (max-width: 375px) {
  .item-2-6-grid .product-image img{
      width: 167.5px;
      height: 251.25px;
  } 
  .item-2-6-grid.column2 .product-image img{
      width: 167.5px;
      height: 251.25px;    
  }
  .item-3-12-grid.column3 .product-image img{
      width: 355px;
      height: 532.5px;    
  }    
  .item-3-6-grid.column3 .product-image img{
      width: 167.5px;
      height: 251.25px;  
  } 
  .item-4-3-grid.column4 .product-image img{
      width: 105px;
      height: 157.5px;
  }     
  .product{
    .title-and-wish{
      .ptitle{
        width: 90%;
        padding-right: 10px;
      }
      .pwishlist{
        width: 10%;
        .wish-icon{
          // margin-left:5px;
          // margin-right: 10px;
         top: 36px;
         right: -9px;
        }       
      }   
    }
  }    
}
@media (max-width: 320px) {
  .item-2-6-grid .product-image img{
      width: 140px;
      height: 210px;
  }
  .item-2-6-grid.column2 .product-image img{
      width: 140px;
      height: 210px;   
  }  
  .item-3-12-grid.column3 .product-image img{
      width: 300px;
      height: 450px;    
  }
  .item-3-6-grid.column3 .product-image img{
      width: 140px;
      height: 210px; 
  } 
  .item-4-3-grid.column4 .product-image img{
      width: 105px;
      height: 157.5px;
  }    
}
.product-badge{
    color: #000;
    text-transform: uppercase;
    float: left;
    width: 100%;
    bottom: 0px;
    position: absolute;
    .squre,.rectangle{
        text-align: center;
        .badge{
            display: inline-block;
            min-width: 10px;
            padding: 3px 7px;
            font-size: 16px;
            font-weight: 500;
            color: #000;
            line-height: 1;
            vertical-align: middle;
            white-space: nowrap;
            text-align: center;
            background-color: #777;
            border-radius: 10px;   
            width: 100%;
            float: left;
            background: rgba(255,255,255, 0.3);
            padding-top: 8px;
            padding-bottom: 8px;                   
        }

  }
}

</style>
