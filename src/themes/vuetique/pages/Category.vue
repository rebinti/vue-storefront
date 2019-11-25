<template>
  <div id="category" class="st_brd"> 
    <div class="b_crumb">
        <breadcrumbs :routes="breadcrumbs.routes" :active-route="category.name" />     
    </div>  
    
    <header class="pb-16 row bg-grey-lightest mb-6 head_category">

      <div class="search_out_pop_box">
          <div class="search_out_pop_inner">
              <svg viewBox="0 0 25 25" class="vt-icon">
                <use xlink:href="#search" />
              </svg>
              <input type="text" class="icon_bg"  placeholder="Search for Products">       
          </div>

          <div class="search_bx_it">

              <div class="search_bx_filter">                  
                  <button-full class="w-full" @click.native="openFilters">
                    {{ $t('Filters') }}
                  </button-full>

              </div>
              <div class="search_bx_sortby">

                  <sort-by />

              </div>

          </div>

      </div>

      <div class="container d_item">
        <div class="row items-center mt-2">
          <h1 class="col-10">
            {{ category.name }}
          </h1>
          <div class="col-2 hidden lg:block">
            <sort-by />
          </div>
        </div>
      </div>
      <div class="container lg:hidden d_item">
        <div class="row gutter-md mt-6">
          <div class="col-6">
           <button-full class="w-full" @click.native="openFilters">
              {{ $t('Filters') }}
            </button-full>
          </div>
          <div class="col-6">
            <sort-by />
          </div>
        </div>
      </div>
    </header>
    <div class="mobile-filters lg:hidden mobile_filter" v-show="mobileFilters">
      <button
        type="button"
        :aria-label="$t('Close')"
        class="absolute top-0 right-0 m-4 h-4"
        @click="closeFilters"
      >
        <svg viewBox="0 0 25 25" class="vt-icon--sm">
          <use xlink:href="#close" />
        </svg>
      </button>
      <sidebar :filters="filters.available" @closeFilters="closeFilters" />
    </div>
    <div class="container pb-16">
      <div class="row gutter-md">
        <div class="col-3 hidden lg:block">
          <sidebar :filters="filters.available" />
        </div>
        <div class="col-12 lg:col-9">
          <div v-if="isCategoryEmpty" class="hidden-xs">
            <h3 data-testid="noProductsInfo" class="mb-2">
              {{ $t('No products found!') }}
            </h3>
            <p class="text-grey-dark">
              {{ $t('Please change Your search criteria and try again. If you still can\'t find what you\'re looking for, try visiting our homepage to check out our bestsellers!') }}
            </p>
          </div>
          <product-listing columns="3" :products="products" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Category from '@vue-storefront/core/pages/Category'
import Sidebar from '../components/core/blocks/Category/Sidebar.vue'
import ProductListing from '../components/core/ProductListing.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import SortBy from '../components/core/SortBy.vue'
// import builder from 'bodybuilder'

import ButtonFull from '../components/theme/ButtonFull.vue'

export default {
  components: {
    ProductListing,
    Breadcrumbs,
    Sidebar,
    SortBy,
    ButtonFull
  },
  data () {
    return {
      mobileFilters: false
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
    return new Promise((resolve, reject) => {
      store.dispatch('category/mergeSearchOptions', { // this is just an example how can you modify the search criteria in child components
        sort: 'updated_at:desc'
        // searchProductQuery: builder().query('range', 'price', { 'gt': 0 }).andFilter('range', 'visibility', { 'gte': 2, 'lte': 4 }) // this is an example on how to modify the ES query, please take a look at the @vue-storefront/core/helpers for refernce on how to build valid query
      })
      resolve()
    })
  },
  methods: {
    openFilters () {
      this.mobileFilters = true
    },
    closeFilters () {
      this.mobileFilters = false
    },
    notify () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('Please select the field which You like to sort by'),
        action1: { label: this.$t('OK') }
      })
    }
  },
  mixins: [Category]
}
</script>

<style lang="scss" scoped>
.mobile-filters {
  @apply fixed overflow-auto bg-white z-modal left-0 w-screen p-4;

  padding-top: 52px;
  top: 70px;
  height: calc(100vh - 70px);

  @screen md {
    top: 73px;
  }
}



</style>

<style lang="scss" scoped>


@media (min-width: 576px){
  .search_out_pop_box{    
      display: none; 
  }
  
 
    
}


@media (max-width: 576px) {

  .mobile_filter{
    width: 75vw;
    left:auto;
    right:0px;
  }
  
  .mobile_filter .sidebar .Accordion{
    background: #000;
  }

  .b_crumb{ display: none; }

  .search_out_pop_bx{
       display: block;
  }

  .d_item{
    display: none;
  }

  .search_out_pop_box{
    width:100%;
    float: left;
    padding: 10px 10px;
    background: #fafafa;
  }
  .search_out_pop_inner{
    width:80%;
    float: left;
    background: #f2f2f2;
    padding: 10px 10px;
  }
  .search_bx_it{
    width:20%;
    float: left;
    padding-left: 20px;
  }
  .search_out_pop_inner .vt-icon{
     float: left;
     width: 20px;
     margin-right: 5px;
  }
   .search_out_pop_inner .icon_bg{
      float: left;
      width:85%;
      font-size:15px;
      background: #f2f2f2;
   }
   .search_out_pop_box .search_bx_filter{
     float: left;
     width:100%;
   }
   .search_out_pop_box .search_bx_filter button{
     padding: 10px;
     font-size:9px;
     border:0px;
     background: url("../assets/filter_ico.png") no-repeat;
     font-size: 1px;
     text-indent: -200px;
     overflow: hidden;
     background-position: center;
     cursor: pointer;
   }
   .search_out_pop_box .search_bx_sortby{
     float: left;
     width:50%;
   }
   .search_out_pop_box .search_bx_sortby .select{
     padding:2px;
     height:40px;
     overflow: hidden;
     font-size: 10px;
     position: relative;
     top: -4px;
   }

   .head_category{
     padding-bottom: 0px;
   }

   .search_out_pop_box .search_bx_sortby{
     display: none;
   }

}
  

</style>
