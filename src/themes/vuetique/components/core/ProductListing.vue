<template>
  <div class="row gutter-md justify-center md:justify-start">
    <div
      v-for="(product, index) in products"
      :key="product.id"
      :class="['col-' +  checkGridView(index)  +  ' md:col-' + (12/columns)%10 +' '+'column'+(12/((12/columns)%10))]" 
    >
    <!-- :class="['md:col-' + (12/columns)%10]" -->
      <product-tile :product="product"/>
    </div>
  </div>
</template>

<script>
import ProductTile from 'theme/components/core/ProductTile'
export default {
  name: 'ProductListing',
  components: {
    ProductTile
  },
  data() {
    return {
      arr12: [],
      arr6: []
    }
  },
  props: {
    products: {
      type: null,
      required: true
    },
    columns: {
      type: [Number, String],
      required: true
    },
    mobColumns: {
      type: [Number, String],
      required: false,
      default:3
    }
  },
  methods: {
    checkGridView(index) {
      switch(this.mobColumns) {
        case 2: 
              return '6 item-2-6-grid'
        break;
        case 3: 
              return index%3 == 0 ? '12 item-3-12-grid one-item' : '6 item-3-6-grid';
              break;
        case 4:
              return '3  item-4-3-grid'
              break;
        default:
             return '6'
             break;
      }
    }
  }
}
</script>
