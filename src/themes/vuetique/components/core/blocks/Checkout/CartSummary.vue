<template>
  <div class="order_out_bx">
    <div class="brdr-bottom-1 brdr-cl-primary pb60">
      <h3 class="cl-accent mb-6 summary-title">
        {{ $t('Order Summary') }}
      </h3>
      <product v-for="product in productsInCart" :key="product.sku" :product="product" />

      <div v-if="productsInCart && productsInCart.length" class="checkout mt-8 price_tox_box">
        <div v-for="(segment, index) in totals" :key="index" class="flex flex-wrap justify-between mb-3 text-grey-dark" v-if="segment.code !== 'grand_total'">
          <div class="w-3/4 price_text">
            {{ segment.title }}:
          </div>
          <div v-if="segment.value != null" class="w-1/4 text-right price_text" :class="({ 'text-primary': (segment.code == 'discount') })">
            {{ segment.value | price }}
          </div>
        </div>

        <div class="flex flex-wrap justify-between mb-3" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
          <div class="w-3/4 text-h2 font-serif font-medium price_text">
            {{ segment.title }}:
          </div>
          <div class="w-1/4 text-right text-h2 font-serif font-medium price_text" >
            {{ segment.value | price }}
          </div>
        </div>
      </div>
    </div>
    <!--Toggler row-->
    <div class="pt-5 mt-5 border-t order_smry_main">
      <h2 class="mb-3 text-h2 ordr_hd">
        {{ $t('Safety') }}
      </h2>
      <div class="mb-3 ordr_cnt">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
      </div>
      <h2 class="mb-3 text-h2 ordr_hd">
        {{ $t('Shipping') }}
      </h2>
      <div class="mb-3 ordr_cnt">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
      </div>
      <h2 class="mb-3 text-h2 ordr_hd">
        {{ $t('Returns') }}
      </h2>
      <div class="mb-3 ordr_cnt">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
      </div>
    </div>
  </div>
</template>

<script>
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary'
import Product from './Product'

export default {
  components: {
    Product
  },
  mixins: [CartSummary]
}
</script>

<style lang="scss" scoped>
  .summary-title {
    @media (max-width: 767px) {
      margin-left: 0;
    }
  }

  @media (max-width: 567px) {
    .order_out_bx {      
      position: relative;
      top: -55px;
      .summary-title {
          font-size:15px;
          line-height: 20px;
          color:#000;
      }
      .price_tox_box{
        .price_text{
          font-size:14px;
        }
      }
      .order_smry_main{
        .ordr_hd{
          font-size:15px;
          line-height: 20px;
          color:#000;
        }
        .ordr_cnt{
          font-size:12px;
          line-height: 16px;
          color:#000;
        }
      }
    }
  }
</style>
