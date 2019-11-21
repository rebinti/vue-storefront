<template>
  <transition name="fade" appear>
    <li class="row mb-3 pb-3 border-b border-grey-light relative p_list_block" :class="{'swipe-left': product.swipedElement}">
      <router-link
        class="col-4 bg-grey-lightest"
        :to="localizedRoute({
          name: product.type_id + '-product',
          params: {
            parentSku: product.parentSku ? product.parentSku : product.sku,
            slug: product.slug,
            childSku: product.sku
          }
        })"
        data-testid="productLink"
      >
        <img class="image" v-lazy="thumbnail" alt="">
      </router-link>
      <div class="col-8 flex-col justify-start sm:justify-between prdct_cnt">
        <div>
          <router-link
            class="text-black product-title"
            :to="localizedRoute({
              name: product.type_id + '-product',
              params: {
                parentSku: product.parentSku ? product.parentSku : product.sku,
                slug: product.slug,
                childSku: product.sku
              }
            })"
            data-testid="productLink"
          >
            {{ product.name | htmlDecode }}
          </router-link>
          <div class="text-sm text-grey leading-normal mb-2" data-testid="productSku">
            {{ product.sku }}
          </div>
          <div class="text-sm leading-normal" v-if="product.totals && product.totals.options">
            <div v-for="opt in product.totals.options" :key="opt.label">
              <span class="text-grey">{{ opt.label }}: </span>
              <span class="text-grey-dark font-medium" v-html="opt.value" />
            </div>
          </div>
          <div class="text-sm leading-normal" v-else-if="product.options">
            <div v-for="opt in product.options" :key="opt.label">
              <span class="text-grey">{{ opt.label }}: </span>
              <span class="text-grey-dark font-medium" v-html="opt.value" />
            </div>
          </div>
          <div class="text-sm text-error font-medium" v-if="product.errors && Object.keys(product.errors).length > 0">
            {{ product.errors | formatProductMessages }}
          </div>
        </div>

        <div class="mob_p_cart_list">

            <div class="text-sm qty">
              <span class="text-grey">
                {{ $t('Qty') }}:
              </span>
              <span class="text-grey-dark font-medium" :class="{ hidden: isEditing }" data-testid="productQty">
                {{ product.qty }}
              </span>
              <div v-show="isEditing" class="inline-flex">
                <qty-input
                  :value="product.qty"
                  @input="val => product.qty = val"
                  :id="'qty-' + product.sku"
                  data-testid="productQtyInput"
                  size="sm"
                />
                <apply-button @click.native="applyQuantity" class="ml-1 ht_bx" />
              </div>
              <edit-button v-show="!isEditing" @click.native="switchEdit" class="align-text-bottom ml-1" />
            </div>

            <div class="col-auto font-bold text-right leading-6 price_left_out pb_b_text">
            <div v-if="!product.totals">
              <div class="text-error" v-if="product.special_price">
                {{ product.priceInclTax * product.qty | price }}
              </div>
              <div class="line-through text-sm text-grey-dark" v-if="product.special_price">
                {{ product.originalPriceInclTax * product.qty | price }}
              </div>
              <div class="text-grey-dark" v-if="!product.special_price" data-testid="productPrice">
                {{ product.priceInclTax * product.qty | price }}
              </div>
            </div>
            <div v-if="product.totals">
              <div class="text-error" v-if="product.totals.discount_amount">
                {{ product.totals.row_total_incl_tax - product.totals.discount_amount | price }}
              </div>
              <div class="line-through text-sm text-grey-dark" v-if="product.totals.discount_amount">
                {{ product.totals.row_total_incl_tax | price }}
              </div>
              <div class="text-grey-dark" v-if="!product.totals.discount_amount">
                {{ product.totals.row_total_incl_tax | price }}
              </div>
            </div>
          </div>

      </div>

      <div class="absolute top-0 right-0 mb-3 cl-accent button_bx_link_lrg" >
        <div @click="removeItem" class="ic_dlt_bx">
          <remove-button />
        </div>
      </div>

      </div>
      
      
    </li>
  </transition>
</template>

<script>
import Product from '@vue-storefront/core/compatibility/components/blocks/Microcart/Product'

import EditButton from './EditButton'
import RemoveButton from './RemoveButton'
import ApplyButton from './ApplyButton'

import QtyInput from 'theme/components/theme/QtyInput'

export default {
  components: {
    EditButton,
    RemoveButton,
    ApplyButton,
    QtyInput
  },
  mixins: [Product],
  data () {
    return {
      isEditing: false
    }
  },
  methods: {
    switchEdit () {
      this.isEditing = !this.isEditing
    },
    applyQuantity () {
      this.updateQuantity(this.product.qty)
      this.isEditing = false
    }
  }
}
</script>

<style scoped>
.col-xs {
  flex-direction: column;
}
input {
  width: 30px;
}
.prdct_cnt{
  text-align: left;
  padding-left: 15px;
}
.prdct_cnt .price_left_out{
  text-align: left;
  position: absolute;
  bottom: 10px;
  z-index: 1;
}
.button_bx_link{
  z-index: 10;
}
.button_bx_link .btn_box_lnk{
  border:1px solid #000;
  color:#fff;
  font-weight: normal;
  display: inline-block;
  background: #000!important;
  font-size: 12px;
  width:auto;
  padding: 2px 10px;
  display: inline-block;
}
.p_list_block .product-title{
  color: #000;
  padding-right: 18px;
  line-height: 20px;
  display: inline-block;
  margin-bottom: 10px;
}
.price_left_out .text-grey-dark{
  color:#000;
  font-size:13px;
}
.p_list_block .text-grey{
  color: #7c7c7c;
  font-size: 12px;
}
.p_list_block .cl-accent .text-grey{
  color:#000;
}

.right-sidebar .p_list_block .image{
  width:100%;
}
.mob_p_cart_list{
  float: left;
  width: 100%;
  padding-top: 10px;
}

.mob_p_cart_list .text-sm.qty{
    width: 50%;
    float: left;
}
.mob_p_cart_list .pb_b_text{
  width:50%;
  text-align: right;
  position: relative;
  top:auto;
  bottom: auto;
  float: left;
}

.ht_bx{
       background: #000;
      color: #ffffff;
      border-color: #000;
    }

/************** */

.p_list_block{
  transition: all 0.5s ease;
}
.swipe-left{
  transform: translate(-105px, 0px);
 /* right:105px; */
 
}

.p_list_block .text-grey.cl-accent { color: #000;}

@media (max-width: 576px) {


.button_bx_link_lrg{
  width: 85px;
  height: 100%;
  background: #ff3a31;
  text-align: center;
  border: 0px;
  right: -106px;
}
.ic_dlt_bx{
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  color:#fff;
}


}
</style>
