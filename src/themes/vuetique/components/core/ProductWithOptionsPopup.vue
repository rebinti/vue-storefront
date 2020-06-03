<template>
  <modal name="modal-productwithoptions" :width="450">
    <span slot="header">Select options</span>
    <div slot="content" style="margin-top: -46px;">
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
                          />
                        </div>
                      </div>
                    </div>

                <add-to-cart :product="product" :disabled="disableAddToCartButtonFlag"  class="py-3 text-sm mt-10"/>
    </div>
  </modal>
</template>
<script>
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

export default {
  data () {
    return {
      configuration: {},
      options: {},
      product: {},
      disableAddToCartButtonFlag: false
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
      this.setupVariants(event)
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
      this.product = product;
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
    }
  },
  components: {
    ButtonFull,
    Modal,
    BaseInput,
     GenericSelector,
 ColorSelector , SizeSelector , AddToCart
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
</style>
