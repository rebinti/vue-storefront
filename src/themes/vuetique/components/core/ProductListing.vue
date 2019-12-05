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
  // mounted() {
  //     this.createProductArrayPattern();
  // },
  // watch:{
  //    products: {
  //     handler () {
  //        this.createProductArrayPattern();
  //     }
  //   },

  // },
  methods: {
  //  createProductArrayPattern() {
  //      for(let i=1;i<=this.products.length;i=i+3){
  //         if(!this.arr12.some(val => val === i)){this.arr12.push(i)} 
  //         for(let j=i+1;j<=i+2;j++) {
  //           if(!this.arr6.some(val => val === j)){ this.arr6.push(j)}
  //         }
  //      }
  //   },
    checkGridView(index) {
      switch(this.mobColumns) {
        case 2: 
              return '6'
        break;
        case 3: 
              return index%3 == 0 ? '12' : '6';
              // if(this.arr12.some(val => val === index)){
              //   return '12';
              // } else if(this.arr6.some(val => val === index)){
              //   return '6';
              // } else {
              //   return '6';
              // }
              break;
        case 4:
              return '3'
              break;
        default:
             return '6'
             break;
      }
    }
  }
}
</script>
