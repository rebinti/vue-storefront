<template>
  <section
    class="container py-8 px-6 new-collection"
  >
    <div>
      <header>
        <h2 class="text-center py-8">
          {{ heading }}
        </h2>
      </header>
    </div>
    <div class="text-center"  v-if="product.related[type] && product.related[type].length > 0">
      <div v-if="typeofview == 'carousel' && !loadingNewProdFlag" class="recent-caroasul">
        <no-ssr>
          <carousel v-bind="sliderConfig" @pageChange="setMuted" :key="refresh">
            <slide 
              v-for="product in product.related[type].slice(0,20)"
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
      <product-listing v-else columns="4" :products="product.related[type].slice(0,20)" />
    </div>
  </section>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
import ProductListing from 'theme/components/core/ProductListing'
import ProductTile from 'theme/components/core/ProductTile'
import { prepareRelatedQuery } from '@vue-storefront/core/modules/catalog/queries/related'
import i18n from '@vue-storefront/i18n'
import store from '@vue-storefront/core/store'

export default {
  name: 'Related',
  data () {
    return {
      currentPage: 0,
      sliderConfig: {
        // perPage: 1,
        perPageCustom: [[0, 2], [768, 3], [1024, 4], [1600, 5]],
        paginationEnabled: false,
        loop: false,
        paginationSize: 5,
        navigationEnabled: true,
        navigationNextLabel: `<button type="button" class="carousel-nav-nxt"><svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 22"><path d="M.75 11h22.5m-10.5 10.5L23.25 11 12.75.5" stroke="#0C1214" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`,
        navigationPrevLabel: `<button type="button" class="carousel-nav-pre"><svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 22"><path d="M23.25 11H.75M11.25.5L.75 11l10.5 10.5" stroke="#0C1214" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`
      },
      loadingNewProdFlag: true,
      refresh: 0
    }
  },
  props: {
    typeofview: {
      type: String,
      required: false,
      default: 'normal'
    },
    type: {
      type: String,
      required: true
    },
    heading: {
      type: String,
      required: false,
      default: i18n.t('Similar products')
    },
    fetchRelatedProdctsFlag: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  components: {
    ProductListing, Carousel, Slide, 'no-ssr': NoSSR, ProductTile
  },
  beforeMount () {
    this.$bus.$on('product-after-load', this.refreshList)

    if (store.state.config.usePriceTiers) {
      this.$bus.$on('user-after-loggedin', this.refreshList)
      this.$bus.$on('user-after-logout', this.refreshList)
    }

    this.refreshList()
  },
  beforeDestroy () {
    if (store.state.config.usePriceTiers) {
      this.$bus.$off('user-after-loggedin', this.refreshList)
      this.$bus.$off('user-after-logout', this.refreshList)
    }
  },
  destroyed () {
    this.$bus.$off('product-after-load', this.refreshList)
  },
  methods: {
    refreshList () {
      if (this.fetchRelatedProdctsFlag) return
      this.loadingNewProdFlag = true;
      let sku = this.productLinks ? this.productLinks
        .filter(pl => pl.link_type === this.type)
        .map(pl => pl.linked_product_sku) : null

      let key = 'sku.keyword'
      if ((sku === null || (sku.length === 0)) && this.type != 'related') {
        sku = this.product.current.category.map(cat => cat.category_id)
        key = 'category_ids'
      }
      let relatedProductsQuery = prepareRelatedQuery(key, sku)

      this.$store.dispatch('product/list', {
        query: relatedProductsQuery,
        size: 25,
        prefetchGroupProducts: false,
        updateState: false
      }).then((response) => {
        if (response) {
          this.$store.dispatch('product/related', {
            key: this.type,
            items: response.items.filter(val => val._dontShowInListingFlag == false)
          })
          this.loadingNewProdFlag = false;
          this.$forceUpdate()
          this.refresh++;
        }
      }, err => {
          this.loadingNewProdFlag = false;
      })
    },
    setMuted (currentPage) {
      this.currentPage = currentPage
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    },
    productLinks () {
      return this.product.current.product_links
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

  .VueCarousel-navigation--disabled {
    display: none;
  }


  .carousel-nav-nxt { 
    position: absolute;
    left: -75px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ffffff;
    bottom: 15px;
    border: 1px solid #e2dddd;
  }
  .carousel-nav-nxt svg {
    margin: 0 auto;
  }
  .carousel-nav-pre svg {
    margin: 0 auto;
  }
  .carousel-nav-pre {
    position: absolute;
    right: -75px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ffffff;
    bottom: 15px;
    border: 1px solid #e2dddd;
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
      //   .ptitle{
      //     width: 61%;
      //   }
      //   .pwishlist{
      //     width: 38%;     
      //   }   
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
      //   .ptitle{
      //     width: 69%;
      //   }
      //   .pwishlist{
      //     width: 31%;     
      //   }   
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
      //   .ptitle{
      //     width: 71%;
      //   }
      //   .pwishlist{
      //     width: 29%;     
      //   }   
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
      //   .ptitle{
      //     width: 80%;
      //   }
      //   .pwishlist{
      //     width: 20%;     
      //   }   
      // }      
    }
  }
} 
</style>
