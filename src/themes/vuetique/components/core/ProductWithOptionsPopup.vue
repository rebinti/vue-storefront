<template>
  <modal name="modal-productwithoptions" :width="850" :trans-effect="transEffect" class="prd-option-popup fix-bottom-side" > 
    <span slot="header"></span>
    <div class="row" slot="content" style="margin-top: -55px;"> 
      <div class="sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 hide-div-mob">
              <!-- <product-gallery
              ref="gallery"
              :gallery="gallery"
              :offline="offlineImage"
              :configuration="configuration"
              :product="product"
            /> -->

            <div class="media-gallery-carousel">
              <carousel
                :per-page="1"
                :mouse-drag="false"
                :navigation-enabled="true"
                pagination-active-color="#828282"
                pagination-color="transparent"
                navigation-next-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_right</i>"
                navigation-prev-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_left</i>"
                ref="carousel"
                :speed="carouselTransitionSpeed"
              >
                <slide
                  v-for="(images) in gallery"
                  :key="images.src"
                >
                  <div
                    class="product-image-container bg-cl-secondary"
                    :class="{'video-container w-100 flex relative': images.video}"
                  >
                    <product-image
                      class="product-image pointer"
                      :class="{'product-image--video': images.video}"
                      :image="images"
                    />
                  </div>
                </slide>
              </carousel>
            </div>
      </div>

      <div class="sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 content-section" style="padding-left: 50px;"> 
            <!-- <div class="hide-div-mob" >
                <h1 class="mb20 mt0 cl-mine-shaft product-name " data-testid="productName" itemprop="name">
                    {{ product.name | htmlDecode }}
                  </h1>

                <div class="mt-1 text-grey-dark font-medium price_bx_it mb-10">
                  <span
                    class="text-primary mr-2"
                    v-if="product.special_price && parseFloat(product.special_price) > 0"
                  >
                    {{ product.priceInclTax | price }}
                  </span>

                  <span
                    class="line-through"
                    v-if="product.special_price && parseFloat(product.originalPriceInclTax) > 0"
                  >
                    {{ product.originalPriceInclTax | price }}
                  </span>

                  <span
                    v-if="!product.special_price && parseFloat(product.priceInclTax) > 0 "
                  >
                    {{ product.priceInclTax | price }}
                  </span> 
                  
                </div>

            </div> -->
            <div 
                class="relative mob_size_box"
                v-for="(option, index) in product.configurable_options"
                :key="index"
                v-if="product && product.configurable_options"
              >
                      <div class="pt-4 pb-2 mob_size_box_label" data-testid="variantsLabel">
                        <span class="font-bold">{{ option.label }}</span>:
                        <span>
                          {{ configuration[option.attribute_code ? option.attribute_code : option.label.toLowerCase()] ? configuration[option.attribute_code ? option.attribute_code : option.label.toLowerCase()].label : null }}
                        </span>
                      </div>
                      <div class="variants-wrapper">
                        <div v-if="option.label == 'Color'">
                          <color-selector
                            v-for="(c, i) in options[option.attribute_code]"
                           
                            :key="i"
                            :id="c.id"
                            :label="c.label"
                            context="product"
                            :code="option.attribute_code"
                            :class="{ active: c.id == configuration[option.attribute_code].id }"
                            @click.native="changeEditModeFilter(c)"
                            :click-from-add-to-cart-popup-options="true"
                          />
                        </div>
                        <div class="sizes" v-else-if="option.label == 'Size'">
                          <size-selector
                            v-for="(s, i) in options[option.attribute_code]"
                            
                            :key="i"
                            :id="s.id"
                            :label="s.label"
                            context="product"
                            :code="option.attribute_code"
                           
                            :class="!isOptionAvailable(s) ? s.id == configuration[option.attribute_code].id ? 'no-config active' : 'no-config': checkOutOfstock(s.id === configuration[option.attribute_code].id , s ,index , product.configurable_options ) "
                        
                            v-focus-clean
                            @click.native="changeEditModeFilter(s)"
                            :click-from-add-to-cart-popup-options="true"
                          />
          
                        </div>
                        <div :class="option.attribute_code" v-else>
                          <generic-selector
                            v-for="(s, i) in options[option.attribute_code]"
                  
                            :key="i"
                            :id="s.id"
                            :label="s.label"
                            context="product"
                            :code="option.attribute_code"
                            
                            :class="!isOptionAvailable(s) ? s.id == configuration[option.attribute_code].id ? 'no-config active' : 'no-config': checkOutOfstock(s.id === configuration[option.attribute_code].id , s ,index , product.configurable_options ) "
                        
                           
                            v-focus-clean
                            @click.native="changeEditModeFilter(s)"
                            :click-from-add-to-cart-popup-options="true"
                          />
                        </div>
                      </div>
                                  
                    </div>
             <add-to-cart :product="product" :disabled="disableAddToCartButtonFlag"  
                :current-configration="configuration"
                class="py-3 text-sm mt-10"/>
          </div>
    </div>
  </modal>
</template>
<script>
import config from 'config'
import i18n from '@vue-storefront/i18n'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Modal from 'theme/components/core/Modal'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters, mapState } from 'vuex'
import { optionLabel } from '@vue-storefront/core/modules/catalog/helpers/optionLabel'
import trim from 'lodash-es/trim'
import GenericSelector from 'theme/components/core/GenericSelector'
import ColorSelector from 'theme/components/core/ColorSelector.vue'
import SizeSelector from 'theme/components/core/SizeSelector.vue'
import AddToCart from 'theme/components/core/AddToCart.vue'
import { setConfigurableProductOptionsAsync, findConfigurableChildAsync, isOptionAvailableAsync } from '@vue-storefront/core/modules/catalog/helpers/index'
import {  getMediaGallery,
  configurableChildrenImages,
  attributeImages } from '@vue-storefront/core/modules/catalog/helpers'
import uniqBy from 'lodash-es/uniqBy'
// import ProductGallery from 'theme/components/theme/blocks/ProductQuickView/ProductGallery'
// import ProductGallery from 'theme/components/core/ProductGallery'

import { Carousel, Slide } from 'vue-carousel'
import ProductImage from 'theme/components/theme/blocks/ProductQuickView/ProductImage'
// import ProductVideo from 'theme/components/theme/blocks/ProductQuickView/ProductVideo'

export default {
  data () {
    return {
      configuration: {},
      options: {},
      product: {},
      disableAddToCartButtonFlag: false,
      transEffect: 'fade-in-down',
      gallery: [],
      offlineImage: {},
          carouselTransition: true,
      carouselTransitionSpeed: 0,
      currentColor: 0,
      currentPage: 0,
      hideImageAtIndex: null
    }
  },
  computed: {
    // ...mapState({
    //    product1121: state => state.product.current,
    //    attributesByCode: state => state.attribute.list_by_code,
    //    configuration1111: state => state.product.current_configuration,
    // }),
  },
  beforeMount () {
    this.$bus.$on('update-product-with-options-data', this.forceUpdateData);
    if (window && window.innerWidth <= 1024) this.transEffect= 'fade-in-up'
  },
  beforeDestroy () {
    this.$bus.$off('update-product-with-options-data');
  },
  methods: {
    closemodel () {
      this.$bus.$emit('modal-hide', 'modal-productwithoptions')
    },
    forceUpdateData (event) {
      console.log('producttt', event)
      // this.$forceUpdate()
      this.configuration = {};
      this.gallery = [];
      this.offlineImage  = {}
      if(event) this.setupVariants(event)
    },
      /**
   * Setup product current variants
   */
  setupVariants ( product) {
    let current_options = {};
    console.log('this.$store.state.attribute', this.$store.state.attribute)
    if (product && product.type_id === 'configurable' && product.hasOwnProperty('configurable_options')) {
        for (let option of product.configurable_options) {
          for (let ov of option.values) {
            let lb = ov.label ? ov.label : optionLabel(this.$store.state.attribute, { attributeKey: option.attribute_id, searchBy: 'id', optionId: ov.value_index })
            if (trim(lb) !== '') {
              let optionKey = option.attribute_code ? option.attribute_code : option.label.toLowerCase()
              if (!current_options[optionKey]) {
                current_options[optionKey] = []
              }
              current_options[optionKey].push({
                label: lb,
                id: ov.value_index,
                attribute_code: option.attribute_code
              })
            }
          }
        }
      }
      console.log('current_options current_options', current_options)
      this.options = current_options;
      product.configurable_options.filter(val => {
        this.configuration[val.attribute_code] = current_options[val.attribute_code][0]
      });
      this.product = JSON.parse(JSON.stringify(product));
      this.setProductGallery( this.product )
      this.$forceUpdate()
    },
    isOptionAvailable (option) { // check if the option is available
      let currentConfig = Object.assign({}, this.configuration)
      currentConfig[option.attribute_code] = option
      return isOptionAvailableAsync(this.$store, { product: this.product, configuration: currentConfig })
    },
    isOptionAvailableWithData (option) { // check if the option is available
      let currentConfig = Object.assign({}, this.configuration)
      currentConfig[option.attribute_code] = option
      console.log('isOptionAvailableWithData', currentConfig, this.product)
      const variant = findConfigurableChildAsync({ product:  this.product, configuration: currentConfig, availabilityCheck: true })
      console.log('isOptionAvailableWithData', variant)
      
      return typeof variant !== 'undefined' && variant !== null ? variant : null
    },
    checkOutOfstock (activeFlag, loopItem, optionIndex, fullConfigOption) { // loopItem fullConfigOption optionIndex
       if (optionIndex > 0) {
          let data = this.product.configurable_children.find(val => {
          return (val[loopItem.attribute_code] == loopItem.id) &&
            (val[fullConfigOption[0].attribute_code] == this.options[fullConfigOption[0].attribute_code].find(val1 => val1.id === this.configuration[fullConfigOption[0].attribute_code].id).id)
          });
          if (data) {
            if (data.stock.is_in_stock === false) {
              if (activeFlag) {
               return 'active out-of-stock'
              } else {
                return 'out-of-stock'
              }
            } else if (activeFlag) {
              return 'active'
            }
            else {
              return ''
            }
          } else {
            return 'no-config'
          }
       } 
       else if (optionIndex == 0) {
          let data = this.product.configurable_children.find(val => val[loopItem.attribute_code] == loopItem.id);
          if (data && fullConfigOption.length == 1) {
            if (data.stock.is_in_stock === false) {
              if (activeFlag) {
               return 'active out-of-stock'
              } else {
                return 'out-of-stock'
              }
            } else if (activeFlag) {
              return 'active'
            }
            else {
              return ''
            }
          } else {
            return ''
          }
       }
    },
    changeEditModeFilter (option) {
      this.disableAddToCartButtonFlag = false;
      const res= this.isOptionAvailableWithData(option)
      console.log('finedddd', res)
      if(res) {
        this.disableAddToCartButtonFlag = false;
        this.product = Object.assign(this.product, res);
      } else {
         this.disableAddToCartButtonFlag = true;
      }
      console.log('this.product', this.product)
      let currentConfig = Object.assign({}, this.configuration)      
      currentConfig[option.attribute_code] = option
      this.configuration = currentConfig;
      const product_option = setConfigurableProductOptionsAsync(this.$store, { product: this.product, configuration: currentConfig })
      this.product['product_option'] = product_option
      // this.$forceUpdate()
    },
    /**
   * Set product gallery depending on product type
   */
   setProductGallery (  product ) {
    let productGalleryData;
    if (product.type_id === 'configurable' && product.hasOwnProperty('configurable_children')) {
      if (!config.products.gallery.mergeConfigurableChildren && product.is_configured) {
        // context.commit(types.CATALOG_UPD_GALLERY, attributeImages(context.state.current))
        productGalleryData =  attributeImages(context.state.current);
      } else {
        let productGallery = uniqBy(configurableChildrenImages(product).concat(getMediaGallery(product)), 'src').filter(f => { return f.src && f.src !== config.images.productPlaceholder })
        // context.commit(types.CATALOG_UPD_GALLERY, productGallery)
        productGalleryData =  productGallery;
      }
    } else {
      let productGallery = uniqBy(configurableChildrenImages(product).concat(getMediaGallery(product)), 'src').filter(f => { return f.src && f.src !== config.images.productPlaceholder })
      // context.commit(types.CATALOG_UPD_GALLERY, productGallery)
        productGalleryData =  productGallery;
    }
    console.log('productGalleryData , productGalleryData', productGalleryData)
     this.gallery = productGalleryData
     this.offlineImage = this.gallery.length ? this.gallery[0] : false
  },
  },
  components: {
    ButtonFull,
    Modal,
    BaseInput,
    GenericSelector,
    ColorSelector , 
    SizeSelector ,
    AddToCart,
  // ProductGallery,
    Carousel,
    Slide,
    ProductImage,
    // ProductVideo
  }
}
</script>

<style type="text/css">
  
  .sel-item {
    width: 39px;
    height: 33px;
    border-color: #222222;
    color: #ffffff;
    background: #000000;
    padding-left: 10px;
    padding-right: 15px;
    padding-top: 3px;
    float: left;
  }

  .sel-box {
    margin-bottom: 45px;
    margin-top: 30px;
    margin-left: 10px;
    text-align: center;
  }
    @media (max-width: 576px) {
      .product-name {
        font-size: 12px;;
      }

      /* .slider-section {
        max-width: 100%!important;
        width: 100%!important;
        flex-basis: 100%!important;
        height: 320px!important
      }
      .content-section {
        max-width: 100%!important;
         width: 100%!important;
         flex-basis: 100%!important;
      } */
  }

   @media (max-width: 767px) {
      .hide-div-mob {
         display: none;
      }
   }

    .modal .modal-content {
          padding: 9px 40px!important;
      }
</style>
<style lang="scss" scoped>
  .prd-option-popup {
    .modal-header {
      border-color: #FFFFFF !important;
      h2{
        height: 25px;
      }
    }
  }
</style>