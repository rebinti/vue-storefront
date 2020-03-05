<template>
  <div id="category" class="st_brd"> 
    <div class="b_crumb">
      <breadcrumbs :routes="breadcrumbs.routes" :active-route="category.name" />     
    </div>

    <header class="pb-16 row bg-grey-lightest mb-6 head_category">

      <!-- <div class="search_out_pop_box">
          <div class="search_out_pop_inner">
              <svg viewBox="0 0 25 25" class="vt-icon">
                <use xlink:href="#search" />
              </svg>
              <input type="text" class="icon_bg" @click="toggleSearchpanel" placeholder="Search for Products">       
          </div>

          <div class="search_bx_it">

              <div class="search_bx_filter" >                  
                  <button-full class="w-full" @click.native="openFilters">
                    {{ $t('Filters') }}
                  </button-full>

              </div>
              <div class="search_bx_sortby">

                  <sort-by />

              </div>

          </div>

      </div> -->

      <div class="category_filter_out_pop_box">

          <div class="category_filter_bx_it">
              <div class="category_filter_bx_sortby filter-top">
                  <!-- <span>sort</span>
                  <div class="filter_bx filter_bx_sort">
                    <sort-by />  
                  </div>  -->
                  <sort-by />  
              </div>

              <div v-if="seletedMobileGrid" class="category_filter_bx_grid_view filter-top" @click="columnChangeMobile(seletedMobileGrid)"> 
                  <span> view</span> 
                  <div class="filter_bx filter_bx_grid" :style="'background: url(' + seletedMobileGrid.image + ') no-repeat;'"> 
                  </div>                  
              </div>              
              <div class="category_filter_bx_filter filter-top" @click="openFilters"> 
                 <span>filter</span>

                   <div class="filter_bx">               
                  <button-full class="w-full">  <!-- @click.native="openFilters" -->
                    {{ $t('Filters') }}
                  </button-full>
                  </div>   

              </div>

          </div>

      </div>   

      <div class="category_filter_out_pop_box" v-if="firstTimeflag.length>0">
        <div v-for="link in firstTimeflag" class="sub-cat-box" :key="link.slug"  @click="toggleCategory(link)"
        :style="colorFrom(link)">
        <!-- <router-link class="menu-link"
          :to="localizedRoute({ name: 'category', params: { id: link.id, slug: link.slug }})"
        >
        {{ link.name }}
      </router-link> -->
            {{ link.name }}
        </div>
        <!-- <div class="sub-cat-box">
        test 2
      </div>
         <div class="sub-cat-box">
        test 3
      </div> -->
      </div>   
<!-- 
      <div v-if="visibleProducts.length && categories1.length > 1" class="categories mb-4">
        <category-panel :categories="categories1" v-model="selectedCategoryIds" />
    </div> -->

      <div class="container d_item">
        <div class="row items-center mt-2">
          <h1 class="col-8">
            {{ category.name }}
          </h1>
           <div class="col-2 hidden lg:block">
                <label class="mr10">{{ $t('Columns') }}:</label>
                <columns @change-column="columnChangeWeb" :products-columns="[2, 3, 4, 6]" :dcolumn="defaultColumn" :type="'lg'"/>
          </div>
          <div class="col-2 hidden lg:block">
            <sort-by />
          </div>
           <!-- <active-filters :filters="filters.available" /> -->
        </div>

        <div class="category_filter_out_pop_box" v-if="firstTimeflag.length>0" style="display:block;margin: 10px 0 0 0;" >
          <div v-for="link in firstTimeflag" class="sub-cat-box" :key="link.slug"  @click="toggleCategory(link)"
          :style="colorFrom(link)">
              {{ link.name }}
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
      <div class="mobile-filters_new">
      <!-- <button
        type="button"
        :aria-label="$t('Close')"
        class="absolute top-0 right-0 m-4 h-4"
        @click="closeFilters"
      >
        <svg viewBox="0 0 25 25" class="vt-icon--sm">
          <use xlink:href="#close" />
        </svg>
      </button> -->
      <sidebar :filters="filters.available" @closeFilters="closeFilters" />
      </div>
    </div>
    <div class="container pb-16">
      <div class="row gutter-md">
        <div class="col-3 hidden lg:block">
          <div :class="{ fixed: fixedOrderPanel }">
            <sidebar :filters="filters.available" />
          </div>
        </div>
        <div class="col-12 lg:col-9 pr_list_sec_main">
          <div v-if="isCategoryEmpty" class="hidden-xs">
            <h3 data-testid="noProductsInfo" class="mb-2">
              {{ $t('No products found!') }}
            </h3>
            <p class="text-grey-dark">
              {{ $t('Please change Your search criteria and try again. If you still can\'t find what you\'re looking for, try visiting our homepage to check out our bestsellers!') }}
            </p>
          </div>
          <product-listing :mob-columns="defaultColumnMobile" :columns="defaultColumn" :products="visibleProducts" />
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
import Columns from '../components/core/Columns.vue'

import ButtonFull from '../components/theme/ButtonFull.vue'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import config from 'config'

// import CategoryPanel from 'theme/components/core/blocks/Category/CategoryPanel'

// import Sidebar from 'src/modules/vsf-layered-navigation/components/Sidebar'
// import ActiveFilters from 'src/modules/vsf-layered-navigation/components/ActiveFilters'

export default {
  components: {
    ProductListing,
    Breadcrumbs,
    Sidebar,
    SortBy,
    ButtonFull,
    Columns
    // CategoryPanel
    // ActiveFilters
  },
  data () {
    return {
      mobileFilters: false,
      defaultColumn: 3,
      allCategories: [],
      selectedCategoryIds: [],
      firstTimeflag: [],
      fixedOrderPanel: false
      // defaultColumnMobile: 2,
      // mobileGridData: config.mobileGridData
      // [{value: 2, image: '../assets/grid2.png', index: 0}, {value: 3, image: '../assets/grid3.jpg', index: 1}, {value: 4, image: '../assets/grid4.png', index: 2}],
      // seletedMobileGrid: {value: 2, image: '../assets/grid2.png', index: 0}
    }
  },

  props: {
    value: {
      type: Array,
      default: () => []
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
  created () {
    this.allCategories = this.getCategories;
  },

  computed: {
    ...mapState({
      seletedMobileGrid: state => state.ui.seletedMobileGrid,
      defaultColumnMobile: state => state.ui.defaultColumnMobile,
      mobileGridData: state => state.ui.mobileGridData
    }),
    ...mapGetters("category", ["getCategories" , "getCurrentCategory"]),
    // ...mapGetters({
    //   mobileGrid: 'ui/getSelectedGridView',
    //   defaultGrid: 'ui/getDefaultColumnMobile'
    // }),
    // seletedMobileGrid () {
    //   return this.$store.state.ui.seletedMobileGrid
    // },
    // defaultColumnMobile () {
    //   return this.$store.state.ui.defaultColumnMobile
    // },
    // mobileGridData () {
    //   return this.$store.state.ui.mobileGridData
    // }
    categories () {
      return this.allCategories.filter(op => {
        return (
          op.level ===
          (this.$store.state.config.entities.category
            .categoriesDynamicPrefetchLevel
            ? this.$store.state.config.entities.category
              .categoriesDynamicPrefetchLevel
            : 2)
        ); // display only the root level (level =1 => Default Category), categoriesDynamicPrefetchLevel = 2 by default
      });
    },

    categories1 () {
      const categoriesMap = {}
      this.products.forEach(product => {
        if (product.category) {
          [...product.category].forEach(category => {
            categoriesMap[category.category_id] = category
          })
        }
      })
      return Object.keys(categoriesMap).map(categoryId => categoriesMap[categoryId])
    },

    category () {
      return this.getCurrentCategory
    },

    getCurrentSubCategory () {
      // console.log('getCurrentSubCategory', this.category, this.allCategories);
      if (this.category.children_count > 0 && this.category.children_data) {
        return this.$store.state.category.list.filter(c => { return this.category.children_data.some(({id}) => id === c.id) })
      } else {
        return []
      }
    },

    visibleProducts () {
      const productList = this.products || []
      if (this.selectedCategoryIds.length) {
        return productList.filter(product => product.category_ids.some(categoryId => {
          const catId = parseInt(categoryId)
          return this.selectedCategoryIds.includes(catId)
        }))
      }
      return productList
    }
  },

  watch: {
    '$route': 'validateRouteCategory'
  },

  mounted () {
    this.firstTimeflag = Object.assign([], this.categories1);
    document.addEventListener('scroll',  this.handleScroll);
  },
  methods: {
    validateRouteCategory () {
      this.selectedCategoryIds = [];
      setTimeout(() => {
        this.firstTimeflag = Object.assign([], this.categories1);
      }, 100);
    },
    openFilters () {
      this.mobileFilters = true;
      const el = document.body; // to fix background scroll issue when the filter opened
      el.classList.add('openfilter');
      el.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    },
    closeFilters () {
      this.mobileFilters = false
      const el = document.body;
      el.classList.remove('openfilter');
      el.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    },
    notify () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('Please select the field which You like to sort by'),
        action1: { label: this.$t('OK') }
      })
    },
    toggleSearchpanel () {
      this.$store.commit('ui/setSearchpanel', true)
      this.$bus.$emit('HomefocusSearchInput') 
    },
    columnChangeWeb (column) {
      if (column.type === 'lg') this.defaultColumn = column.selected
    },
    columnChangeMobile (gridData) {
      // console.log('this.mobileGridData', this.mobileGridData)
      let tdata;
      if (gridData.index === 2) {
        tdata = this.mobileGridData[0];
      } else {
        tdata = this.mobileGridData[gridData.index + 1];
      }
      // this.defaultColumnMobile = tdata.value;
      this.$store.dispatch('ui/UpdateSeletedMobileGrid', tdata);
    },
    toggleCategory (category) {
      // console.log('toggleCategory --->  ', category)
      const isSelected = this.selectedCategoryIds.includes(category.category_id)
      if (isSelected) {
        this.selectedCategoryIds = this.selectedCategoryIds.filter(categoryId => categoryId !== category.category_id)
        this.visibleProductsfilter()
      } else {
        this.selectedCategoryIds = []
        this.selectedCategoryIds.push(category.category_id)
        this.visibleProductsfilter() // this.$emit('input', [...this.value, category.id])
      }
    },

    visibleProductsfilter () {
      // console.log('selectedCategoryIds', this.selectedCategoryIds)
      const productList = this.products || []
      if (this.selectedCategoryIds.length) {
        productList.filter(product => product.category_ids.some(categoryId => {
          const catId = parseInt(categoryId)
          return this.selectedCategoryIds.includes(catId)
        }))
      }
      // console.log('visible prod', this.products)
      // this.visibleProducts = productList
    },
    colorFrom (label) {
      if (this.selectedCategoryIds.includes(label.category_id)) {
        return 'background: #d2caca;min-width: 72px;height: 35px;float: left;border: 2px solid #919191;text-align: center;margin: 0 auto;padding: 3px 6px 0 5px;margin-right: 5px;margin-top: 5px;'
      } else {
        return 'background: #ffff;display:block;float: left;min-width: 72px;height: 35px;float: left;border: 2px solid #919191;text-align: center;margin: 0 auto;padding: 3px 6px 0 5px;margin-right: 5px;margin-top: 5px;'
      }
    },
    handleScroll: function(){
            const checkWindow = window !== undefined && window.scrollY;

            if (checkWindow && window.scrollY > 280) {
              this.fixedOrderPanel = true
            } else {
              this.fixedOrderPanel = false
          }

        const scrollFix = (scrolled) => {
            if (scrolled > 280) {

              this.fixedOrderPanel = true
            } else {
              this.fixedOrderPanel = false
            }
        }

        }
  },
  destroyed: function () {
    document.removeEventListener('scroll', this.handleScroll);

  },
  mixins: [Category]
}
</script>

<style lang="scss" scoped>
.mobile-filters {
  @apply fixed overflow-auto bg-white z-modal left-0 w-screen p-4;
  
  overscroll-behavior: none none;
  padding-top: 52px;
  top: 70px;
  height: calc(100vh - 70px);

  @screen md {
    top: 73px;
  }
}
.fixed{
  position: fixed;
  top: 0px;
  padding: 1%;
 }


</style>

<style lang="scss" scoped>


@media (min-width: 576px){
  // .search_out_pop_box{    
  //     display: none; 
  // }
  .category_filter_out_pop_box{    
       display: none; 
   }
}


@media (max-width: 576px) {

  .mobile_filter{
   width: 100vw;
    /* left: auto; */
    /* right: 0px; */
    padding-bottom: 50px;
    top: 0px;
    overflow: none !important;
    height: 100vh;
    z-index: 1000;
    max-height: calc(100vh - 0px);
    background: #2d292994;
    -webkit-overflow-scrolling:touch;
    -ms-scroll-chaining: none none;
    overscroll-behavior: none none;
  }

  .mobile-filters_new {
    width: 75vw;
    left: auto;
    right: 0px;
    padding-bottom: 50px;
    top: 0px;
    height: 100vh;
    z-index: 1500;
    max-height: calc(100vh - 0px);
    position: fixed;
    overflow: auto;
    background-color: #ffffff;
    z-index: 1500;
    padding: 1rem;
    padding-top: 52px;
    height: calc(100vh - 0px);
    -ms-scroll-chaining: none none;
    overscroll-behavior: none none;
    -webkit-overflow-scrolling:touch;
  }
  
  .mobile_filter .sidebar .Accordion{
    background: #000;
  }
  body.openfilter{
    overflow-y: hidden;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    max-height: 100vh;
    overflow: hidden;
    padding-bottom: 1px;
  } 
  .b_crumb{ display: none; }

  // .search_out_pop_bx{
  //      display: block;
  // }

  .d_item{
    display: none;
  }

  // .search_out_pop_box{
  //   width:100%;
  //   float: left;
  //   padding: 10px 10px;
  //   background: #fafafa;
  // }
  // .search_out_pop_inner{
  //   width:80%;
  //   float: left;
  //   background: #f2f2f2;
  //   padding: 10px 10px;
  // }
  // .search_bx_it{
  //   width:20%;
  //   float: left;
  //   padding-left: 20px;
  // }
  // .search_out_pop_inner .vt-icon{
  //    float: left;
  //    width: 20px;
  //    margin-right: 5px;
  // }
  //  .search_out_pop_inner .icon_bg{
  //     float: left;
  //     width:85%;
  //     font-size:15px;
  //     background: #f2f2f2;
  //  }
  //  .search_out_pop_box .search_bx_filter{
  //    float: left;
  //    width:100%;
  //  }
  //  .search_out_pop_box .search_bx_filter button{
  //    padding: 10px;
  //    font-size:9px;
  //    border:0px;
  //    background: url("../assets/filter_ico.png") no-repeat;
  //    font-size: 1px;
  //    text-indent: -200px;
  //    overflow: hidden;
  //    background-position: center;
  //    cursor: pointer;
  //  }
  //  .search_out_pop_box .search_bx_sortby{
  //    float: left;
  //    width:50%;
  //  }
  //  .search_out_pop_box .search_bx_sortby .select{
  //    padding:2px;
  //    height:40px;
  //    overflow: hidden;
  //    font-size: 10px;
  //    position: relative;
  //    top: -4px;
  //  }

   .head_category{
     padding-bottom: 0px;
   }

  //  .search_out_pop_box .search_bx_sortby{
  //    display: none;
  //  }


   .category_filter_out_pop_bx{
        display: block;
   }
   
  .category_filter_out_pop_box{
    width:100%;
    float: left;
    padding: 10px 10px;
    background: #fafafa;
  }
  .category_filter_out_pop_inner{
    width:80%;
    float: left;
    background: #f2f2f2;
    padding: 10px 10px;
  }
  .category_filter_bx_it{
    width:100%;
    float: left;
    padding-left: 0px;
  }
  .filter-top{
    width: 33.33%;
    border: 1px solid #000;
    float: left;
    height: 45px;
  }

  .filter-top span{
    float: left;
    color:#000;
    padding-left:10px;
    padding-top:10px;
    font-size:14px;
  }

  .filter-top .filter_bx{
     float: right;
     width: 20px;
     height:20px;
     margin-right: 5px;
  }
  .filter-top .filter_bx.filter_bx_sort{
    width: 20px;
    height:20px;
    float: left;
    background-color:transparent;
    border:0px;
    background: url("../assets/sort.png") no-repeat;
  }
  .filter-top .sort-by .w-full{
    height: 43px !important;
    font-size: 13px !important;
  }
  .filter-top .filter_bx_grid{
    width: 32px;
    height:32px;
    float: right;
    background-color:transparent;
    background-size: 32px 32px;
    border:0px;
    // background: url("../assets/gridview.jpg") no-repeat;
    margin-top:8px;
  }
  // .category_filter_out_pop_inner .vt-icon{
  //    float: left;
  //    width: 20px;
  //    margin-right: 5px;
  // }
  //  .category_filter_out_pop_inner .icon_bg{
  //     float: left;
  //     width:85%;
  //     font-size:15px;
  //     background: #f2f2f2;
  //  }
  //  .category_filter_out_pop_box .category_filter_bx_filter{
  //    float: left;
  //    width:100%;
  //  }
   .category_filter_out_pop_box .category_filter_bx_filter button{
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
  //  .category_filter_out_pop_box .category_filter_bx_sortby{
  //    float: left;
  //    width:50%;
  //  }
   /*.category_filter_out_pop_box .category_filter_bx_sortby .select{
     padding:2px;
     height:40px;
     overflow: hidden;
     font-size: 10px;
     position: relative;
     top: -4px;
   }*/
  // .category_filter_out_pop_box .category_filter_bx_sortby{
  //    display: block;
  //  }

   .head_category{
     padding-bottom: 0px;
   }

   .search_out_pop_box .search_bx_sortby{
     display: none;
   }
   .category_filter_bx_sortby .select{
         background-color: #f9f9f9;
   }
  .sub-cat-box {
     min-width: 72px;
    height: 35px;
    float: left;
    border: 2px solid #919191;
    text-align: center;
    margin: 0 auto;
    padding: 3px 6px 0 5px;
    margin-right: 5px;
    margin-top: 5px;
   }
}
</style>
