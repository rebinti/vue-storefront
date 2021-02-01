<template>
  <div class="collection w-full main-product-slider">
    <header class="mb-6">
      <h2 class="text-center">
        {{ title }}
      </h2>
    </header>
    <no-ssr>
 <carousel v-bind="config"
    :per-page-custom="[[0, 2.25], [768, 3], [1024, 4],[1440, 6],[1599, 5], [1600, 6], [1920, 7],[2560, 8]]"
    @pageChange="setMuted">
        <slide
          v-for="product in products"
          v-if="!product._dontShowInListingFlag"
          :key="product.id"
        >
          <product-tile-carousel
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

import ProductTileCarousel from 'theme/components/core/ProductTileCarousel'

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
    ProductTileCarousel,
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
            //width: 100%;
            height: 100%;
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
            //width: 100%;
            height: 100%;
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
            //width: 100%;
            height: 100%;
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
            //width: 100%;
            height: 100%;
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
           // width: 100%;
            height: 100%;
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
            //width: 100%;
            height: 100%;
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
@media (max-width: 576px){
        .VueCarousel .VueCarousel-navigation .VueCarousel-navigation-prev{
            display:none;     
        }
        .VueCarousel .VueCarousel-navigation .VueCarousel-navigation-next{
            display:none;        
        }
}
</style>
