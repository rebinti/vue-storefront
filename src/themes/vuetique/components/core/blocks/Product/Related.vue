<template>
 <div v-swiper:mySwiper="swiperOptions">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="banner" v-for="banner in banners">
        <img :src="banner">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>  
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import ProductListing from 'theme/components/core/ProductListing'
import ProductTileCarousel from 'theme/components/core/ProductTileCarousel'
import { prepareRelatedQuery } from '@vue-storefront/core/modules/catalog/queries/related'
import i18n from '@vue-storefront/i18n'
import store from '@vue-storefront/core/store'
import 'swiper/css/swiper.css'
export default {
  name: 'Related',
  directives: {
    swiper: directive
  },   
  data () {
    return {  
      banners: [ '/1.jpg', '/2.jpg', '/3.jpg' ],    
      swiperOptions: {
        slidesPerView: 6,
        spaceBetween: 2,
        slidesPerGroup: 3,
        lazy: true,
        loop: false,
        loopFillGroupWithBlank: false,
        direction: 'horizontal',
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          progressbarOpposite: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },          
        breakpoints: {
          2560: {
            slidesPerView: 8,
            spaceBetween: 5
          },              
          1920: {
            slidesPerView: 7,
            spaceBetween: 5
          },              
          1600: {
            slidesPerView: 6,
            spaceBetween: 5
          },              
          1440: {
            slidesPerView: 6,
            spaceBetween: 5
          },              
          1024: {
            slidesPerView: 4,
            spaceBetween: 5
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 5
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 2
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 2
          }
        }          
      },
      loadingNewProdFlag: true,
      refresh: 0,
      renderComponent: false,
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
    'no-ssr': NoSSR,
    Swiper,
    SwiperSlide,
    ProductListing,
    ProductTileCarousel,
  },
  beforeMount () {
    this.$bus.$on('product-after-load', this.refreshList)

    if (store.state.config.usePriceTiers) {
      this.$bus.$on('user-after-loggedin', this.refreshList)
      this.$bus.$on('user-after-logout', this.refreshList)
    }

    this.refreshList()
  },
  mounted() {  
      console.log('Current Swiper instance object', this.mySwiper)
      this.mySwiper.slideTo(3, 1000, false)       
    // console.log("DATAAAAAAAAAAAAAAA",this.$store.state)
    if (typeof window !== 'undefined' && window.document) {
      this.renderComponent = true
    }    
  },  
  beforeDestroy () {
    if (store.state.config.usePriceTiers) {
      this.$bus.$off('user-after-loggedin', this.refreshList)
      this.$bus.$off('user-after-logout', this.refreshList)
    }
    this.renderComponent = false
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
  },
  computed: {
    product () {
      return this.$store.state.product
    },
    productLinks () {
      return this.product.current.product_links
    },
    // swiper() {
    //   return this.$refs.mySwiper.$swiper
    // }    
  }
}
</script>
<style lang="scss">
.new-collection{
  .swiperslider{
    .promotions__stamp-label{
        left:0px;
    }
  }
} 
.swiperslider{
  .swiper-container{
    .collection-product{
      .product-link{
        padding-left: 0rem;
        padding-right: 0rem;
        -ms-touch-action: pan-y;
        touch-action: pan-y;
        @media (min-width: 320px) {
          .prod_list{              
              height: 238.5px;
          }          
        }          
        @media (min-width: 375px) {
          .prod_list{              
              height: 279.75px;
          }          
        }          
        @media (min-width: 425px) {
          .prod_list{              
              height: 317.25px;
          }          
        }          
        @media (min-width: 768px) {
          .prod_list{              
              height: 379px;
          }          
        }          
        @media (min-width: 1024px) {
          .prod_list{              
              height: 378.375px;
          }          
        } 
        @media (min-width: 1440px) {
          .prod_list{              
              height: 353.745px;
          }          
        }                  
        @media (min-width: 1600px) {
          .prod_list{              
              height: 455.75px;
          }          
        }
        @media (min-width: 2000px) {
          .prod_list{              
              height: 473.445px;
          }          
        }
        @media (max-width: 576px){
          .prod_list{
            .wishlist-bx{
              right: 0px;
              bottom: 2px;
            }
          }
        }                        
      }
    }
  }
}
</style>
