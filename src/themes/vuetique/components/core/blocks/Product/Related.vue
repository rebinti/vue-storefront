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
      <div v-if="typeofview == 'carousel'">
        <no-ssr>
          <carousel v-bind="sliderConfig" @pageChange="setMuted">
            <slide 
              v-for="product in product.related[type].slice(0,8)"
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
      <product-listing v-else columns="4" :products="product.related[type].slice(0,8)" />
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
        perPage: 1,
        perPageCustom: [[0, 2], [1024, 4]],
        paginationEnabled: true,
        loop: false,
        paginationSize: 6,
        navigationEnabled: true
      }
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
      let sku = this.productLinks ? this.productLinks
        .filter(pl => pl.link_type === this.type)
        .map(pl => pl.linked_product_sku) : null

      let key = 'sku'
      if (sku === null || (sku.length === 0)) {
        sku = this.product.current.category.map(cat => cat.category_id)
        key = 'category_ids'
      }
      let relatedProductsQuery = prepareRelatedQuery(key, sku)

      this.$store.dispatch('product/list', {
        query: relatedProductsQuery,
        size: 20,
        prefetchGroupProducts: false,
        updateState: false
      }).then((response) => {
        if (response) {
          this.$store.dispatch('product/related', {
            key: this.type,
            items: response.items
          })
          this.$forceUpdate()
        }
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
}
</style>
