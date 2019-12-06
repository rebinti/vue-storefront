<template>
  <div class="row gutter-md justify-center md:justify-start">
    <div
      v-for="(product, index) in products"
      :key="product.id"
      :class="['col-' +  checkGridView(index)  +  ' md:col-' + (12/columns)%10]" 
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
              return '6'
        break;
        case 3: 
              return index%3 == 0 ? '12' : '6';
              break;
        case 4:
              return '3  4-grid-view'
              break;
        default:
             return '6'
             break;
      }
    }
  }
}
</script>
