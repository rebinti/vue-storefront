<template>
  <div class="collection container">
    <header class="mb-6">
      <h2 class="text-center">
        {{ title }}
      </h2>
    </header>
    <no-ssr>
 <carousel v-bind="config"
    :per-page-custom="[[0, 2], [768, 3], [1024, 4], [1600, 5]]"
    @pageChange="setMuted">
        <slide
          v-for="product in products"
          :key="product.id"
        >
          <product-tile
            class="collection-product"
            :product="product"
            :labels-active="false"
          />
        </slide>
      </carousel>
    </no-ssr>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
// import { Carousel, Slide } from 'vue-carousel'

import ProductTile from 'theme/components/core/ProductTile'

export default {
  name: 'ProductsSlider',
  props: {
    title: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  components: {
    'Carousel': () => import('vue-carousel').then(Slider => Slider.Carousel),
    'Slide': () => import('vue-carousel').then(Slider => Slider.Slide),
    ProductTile,
    'no-ssr': NoSSR
  },
  data () {
    return {
      currentPage: 0
    }
  },
  methods: {
    setMuted (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss">
.product {
  &.collection-product {
    padding: 0;
  }
}

.collection-product {
  .product-link {
    @apply px-sm;
  }

  .product-image {
    height: auto;
    will-change: opacity;

    img {
      max-width: 100%;
      max-height: 100%;
      height: auto;
      vertical-align: bottom;
    }
  }
}

.VueCarousel {
  .VueCarousel-dot {
    line-height: 1;

    &:focus {
      outline: none;
    }
  }
}
@media (min-width: 320px) {   
  .VueCarousel{    
    .collection-product{
      .product-link{
        .prod_list{
            width: 120px;
            height: 180px;
        }
      }
      // .title-and-wish{
        // .ptitle{
        //   width: 61%;
        // }
        // .pwishlist{
        //   width: 38%;     
        // }   
      // }      
    }
  }  
}
@media (min-width: 375px) { 
  .VueCarousel{    
    .collection-product{
      .product-link{
        .prod_list{
            width: 147.5px;
            height: 221.25px;
        }
      }
      // .title-and-wish{
        // .ptitle{
        //   width: 69%;
        // }
        // .pwishlist{
        //   width: 31%;     
        // }   
      // }       
    }
  }  
}
@media (min-width: 425px) {   
  .VueCarousel{    
    .collection-product{
      .product-link{
        .prod_list{
            width: 172.5px;
            height: 258.75px;
        }
      }
      // .title-and-wish{
        // .ptitle{
        //   width: 71%;
        // }
        // .pwishlist{
        //   width: 29%;     
        // }   
      // }        
    }
  }  
}
@media (min-width: 768px) {  
  .VueCarousel{    
    .collection-product{
      .product-link{
        .prod_list{
            width: 222.66px;
            height: 333.99px;
        }
      }
    }
  }  
}
@media (min-width: 1024px) {
  .VueCarousel{    
    .collection-product{
      .product-link{
        .prod_list{
            width: 218px;
            height: 327px;
        }
      }
    }
  }  
}
@media (min-width: 1600px) {
  .VueCarousel{    
    .collection-product{
      .product-link{
        .prod_list{
            width: 292px;
            height: 438px;
        }
      }
      // .title-and-wish{
        // .ptitle{
        //   width: 80%;
        // }
        // .pwishlist{
        //   width: 20%;     
        // }   
      // }      
    }
  }
} 
</style>
