<template>
  <div class="st_brd">
     <div class="b_crumb" v-html="getMerchandisingContent.header[0]">
      <breadcrumbs :routes="breadcrumbs.routes" :active-route="category.name" />     
    </div>
    <header class="row bg-grey-lightest mb-6 head_category"> <!-- pb-5 -->
      <div class="container d_item">
        <div class="row items-center mt-2">
          <h1 class="col-8 md:col-8 lg:col-8 xl:col-10 hidden lg:block">
            {{ category.name }}
          </h1>
          <h4 class="col-8 md:col-8 lg:col-8 xl:col-10 lg:hidden">
            {{ category.name }}
          </h4>          
           <div class="col-2 md:col-2 lg:col-2 xl:col-1 hidden lg:block" style="margin-top: -23px;">
                <label class="mr10 columns-label">{{ $t('Columns') }}:</label>
                <columns 
                 @change-column="columnChangeWeb" :products-columns="[2, 3, 4]" :dcolumn="defaultColumnWeb" :type="'lg'"/>
          </div>
          <div class="col-2 md:col-2 lg:col-2 xl:col-1 hidden lg:block">
             <base-select
                v-if="sortingFilterOptions && sortingFilterOptions.length"
                class="col-12 md:col-6 mb-6 txt_blk_select"
                name="sort"
                v-model="sortingFilterSelectedValue"
                :options="sortingFilterOptions"
                :selected="sortingFilterSelected"
                :placeholder="$t('Sorting')"
                @input="sortingFilterChange"
              />
          </div>
          <!-- <div v-html="headerbanner"></div> -->
           <!-- <active-filters :filters="filters.available" /> -->
        </div> 
      </div>

       <!-- New Category filter box section Mobile view -->
      <div class="container d_item lg:hidden onlymobile mob-category "
      v-if="!searcingLoaderFlag && categoryHierarchy && categoryHierarchy.values && categoryHierarchy.values.length > 0">
        <div class="row items-center mt-2">
          <div class="category_filter_out_pop_box_mob">
             <carousel v-bind="sliderConfig" >
                <slide
                v-for="(valuesitem) in categoryHierarchy.values" :key="valuesitem.value"
                >
              <div class="sub-cat-box-mob" 
              @click="categoryFilterChange(categoryHierarchy, valuesitem)"
              :class="{'category-active' : valuesitem.active}"
              >
                    {{ valuesitem.label }} 
                      <div class="topright" id="corner-triangle" :class="{'select-active' : valuesitem.active}">
                      <div class="corner-triangle-text text-capitalize">
                          <span v-if="valuesitem.active">x</span> 
                      </div>
                    </div>  
              </div>
               </slide>
              </carousel>
            </div>  
        </div>
      </div>  

      <!-- New Category filter box section Web view -->
      <div class="container lg-sub-cat sub-category d_item hidden lg:block" v-if="!searcingLoaderFlag">   <!-- hidden lg:block -->
        <div class="row items-center mt-2">
          <div class="category_filter_out_pop_box" v-if="categoryHierarchy && categoryHierarchy.values && categoryHierarchy.values.length > 0">
            
              <div class="sub-cat-box" v-for="(valuesitem) in categoryHierarchy.values" :key="valuesitem.value" 
              @click="categoryFilterChange(categoryHierarchy, valuesitem)"
              :class="{'category-active' : valuesitem.active}"
              >
                        {{ valuesitem.label }}                        
                    <div class="topright" id="corner-triangle" :class="{'select-active' : valuesitem.active}">
                      <div class="corner-triangle-text text-capitalize">
                          <span v-if="valuesitem.active">x</span> 
                      </div>
                    </div>                                               
              </div>

            </div>
              
        </div>
      </div> 
    </header>
     <div class="loader--style3" style="margin-top: 180px; margin-bottom: 180px;" title="2" v-if="searcingLoaderFlag">
            <img src="/assets/opc-ajax-loader.svg" style="margin: 0 auto;width: 75px;">
             <!-- <h3 style="text-align: center;"> loading... </h3>  -->
      </div>
      <div class="container lg:hidden onlymobile col-12" style="margin-bottom: 5px;"
        :class="classNameTab"
       v-if="!searcingLoaderFlag">

        <div class="col-4  lg:hidden msort">
              <div class="category_filter_bx_sortby filter-top search">
                <base-select
                  v-if="sortingFilterOptions && sortingFilterOptions.length"
                  class="col-12 md:col-6 mb-6 txt_blk_select"
                  name="sort"
                  v-model="sortingFilterSelectedValue"
                  :options="sortingFilterOptions"
                  :selected="sortingFilterSelected"
                  :placeholder="$t('Sorting *')"
                  @input="sortingFilterChange"
                />
              </div>
        </div>        
        <div class="col-4  lg:hidden mgrid" @click="columnChangeMobile(seletedMobileGrid)">
              <div v-if="seletedMobileGrid" class="category_filter_bx_grid_view filter-top" > 
                  <span> view</span> 
                  <div class="filter_bx filter_bx_grid" :style="'background: url(' + seletedMobileGrid.image + ') no-repeat;'"> 
                  </div>                  
              </div>   
              <!-- <label class="mr10">{{ $t('Columns') }}:</label>
              <columns @change-column="columnChangeWeb" :products-columns="[2, 3, 4]" :dcolumn="defaultColumn" :type="'lg'"/> -->
        </div>
        <div v-if="searchRes" class="lg:hidden d_item col-4 mfilter" style=" margin-bottom: 20px;">
          <div class="row gutter-md mt-6">
            <div class="col-12">
              <button-full class="w-full" v-bind:class="[(searchRes && searchRes.filterSummary &&  searchRes.filterSummary.length) ? 'filterexist' : 'nofilterexist']"  @click.native="openFilters" style="">
                {{ $t('Filters') }}
                <span data-testid="minicartCount" class="filtereditems-count absolute flex justify-center items-center text-xs font-bold text-white bg-primary">
                      {{searchRes.filterSummary.length}}
                </span>
              </button-full>
            </div>
          </div>
        </div>        

      </div>

    <!-- Side bar for Mobile -->
    <mobile-siderbar-filter :viewfilterflag="'mobile'" 
            :mobileFilters="mobileFilters"
            :searchRes="searchRes"
            :categoryHierarchy="categoryHierarchy"
            :priceSliderData="priceSliderData"
            :squery="squery"
            :accesskey="getMerchandisingContent"
            :fixedOrderPanel="fixedOrderPanel"
            :serachFrom="serachFrom"
            @closeFilters="closeFilters"
            @clearAllFilter="clearAllFilter"
            @removeFilterFlag="removeFilterFlag"
            @setFilterData="setFilterData"
            @priceSliderChanged="priceSliderChanged"
            @setCategoryFilterHistory="setCategoryFilterHistory"
            @setCategoryFilterData="setCategoryFilterData"
    /> 

    <div class="container pb-16" v-if="!searcingLoaderFlag">
      <div class="row gutter-md">      
        <!-- Sidebar For web view   -->
        <siderbar-filter :viewfilterflag="'web'" 
            :mobileFilters="mobileFilters"
            :searchRes="searchRes"
            :categoryHierarchy="categoryHierarchy"
            :priceSliderData="priceSliderData"
            :squery="squery"
            :accesskey="getMerchandisingContent"
            :fixedOrderPanel="fixedOrderPanel"
            :searchPageType="searchPageType"
            :serachFrom="serachFrom"
            @closeFilters="closeFilters"
            @clearAllFilter="clearAllFilter"
            @removeFilterFlag="removeFilterFlag"
            @setFilterData="setFilterData"
            @priceSliderChanged="priceSliderChanged"
            @setCategoryFilterHistory="setCategoryFilterHistory"
            @setCategoryFilterData="setCategoryFilterData"
         /> 

        <div class="lg:col-6 no-result" v-if="filterloaderFlag && serachedProd.length === 0">
            <h3>NO RESULTS FOUND <span v-if="squery.length>2">FOR {{ squery }} </span>!.</h3>
            <h5>If you are not seeing any results, try removing some of your selected filters above..</h5>
        </div>        
        <div class="lg:col-3" v-if="serachedProd.length === 0">
        </div>  
      <div class="col-12 lg:col-9 pr_list_sec_main">    
          <div v-if="getMerchandisingContent && getMerchandisingContent.header"
           v-html="getMerchandisingContent.header[0]" style="margin-bottom: 20px;">
           </div>        
          <div v-if="getMerchandisingContent && getMerchandisingContent.banner"
           v-html="getMerchandisingContent.banner[0]" style="margin-bottom: 20px;">
           </div>             
          <product-listing :mob-columns="defaultColumnMobile" :columns="defaultColumnWeb" :products="serachedProd" />
          <!-- <img src="/assets/svg-loaders/tail-spin.svg" /> -->
          <div class="loader loader--style3" title="2" v-if="paginationLoader">
            <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="50px" height="50px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;margin: 0 auto;" xml:space="preserve">
              <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                <animateTransform attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"/>
              </path>
            </svg>
            <!-- <h3 style="text-align: center;"> Please wait for loading more... </h3> -->
          </div>
          <!-- <div v-html="footerbanner"></div> -->
        </div>
      </div>
       <div @click="segmentifyhandleClicks" class="segmentify-dynamic-content"  id="seg-cat-reco"></div>
    </div>
  </div>
</template>

<script>
import Category from '@vue-storefront/core/pages/Category'
import config from 'config'
import onBottomScroll from '@vue-storefront/core/mixins/onBottomScroll'
import { mapGetters } from 'vuex'
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
import  SearchSpringMixin from 'src/modules/search-spring/mixins/searchSpring.ts'
import  SidebarMixin from 'src/modules/search-spring/mixins/sidebar.ts'
import  { handleScroll } from 'src/modules/search-spring/helpers'

const SiderbarFilter = () => import('src/modules/search-spring/components/sidebar')
const MobileSiderbarFilter = () => import('src/modules/search-spring/components/MobileSidebar')

export default {
  components: {
    SiderbarFilter,
    MobileSiderbarFilter,
    Slide,
    Carousel,
    'no-ssr': NoSSR
  },
  mixins: [SearchSpringMixin, SidebarMixin, onBottomScroll, Category],
  computed: {
    ...mapGetters('searchSpringCategory', ['serachedProd', 'filterData', 'searchRes', 'categoryHierarchy', 'priceSliderData', 'priceSliderActiveRange', 'sortingFilterOptions', 'sortingFilterSelected' , 'getStoredCurrentRouterPath', 'getMerchandisingContent'])
  },
  data () {
    return {
        searcingLoaderFlag: true,
        searchPageType: 'searchSpringCategory',  // which store
        serachFrom: 'category', // where from
        initialSearchFlag: true, // category - filter higherachy value manage category page - other for brand and search
        filterloaderFlag: false,
    };
  },

  // asyncData ({ store, route }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
  //   return new Promise((resolve, reject) => {
  //     store.dispatch('category/mergeSearchOptions', { // this is just an example how can you modify the search criteria in child components
  //       sort: 'updated_at:desc'
  //       // searchProductQuery: builder().query('range', 'price', { 'gt': 0 }).andFilter('range', 'visibility', { 'gte': 2, 'lte': 4 }) // this is an example on how to modify the ES query, please take a look at the @vue-storefront/core/helpers for refernce on how to build valid query
  //     })
  //     resolve()
  //   })
  // },

  beforeMount () {
     if(this.getStoredCurrentRouterPath !== this.$route.path ) {
        this.searchDataInSearchSpring();
        this.$store.dispatch('searchSpringCategory/reset_categoryFilterOption')
      } else {
        this.searcingLoaderFlag = false;
        this.initialSearchFlag = false;
      }

      document.addEventListener('scroll', () => {
        this.isScrolling = true
        handleScroll('.head_category', '.news-letter')
      }, {passive: true})

      setInterval(() => {
        if (this.isScrolling) {
          this.hasScrolled()
          this.isScrolling = false
        }
      }, 250)
  },
  created () {
      // if(this.getStoredCurrentRouterPath !== this.$route.path ) {
      //   this.searchDataInSearchSpring();
      // } else {
      //   this.searcingLoaderFlag = false;
      // }
  },
  watch: {
    '$route': 'validateRouteCategory'
  },
  mounted () {
    if (this.filterData && this.filterData.length > 0) {
       // this.searchedValue = this.filterData[0].split('=')[1];
      if(this.priceSliderData) {
        setTimeout(() => {
            // this.$bus.$emit('reset-price-slider');
            // this.$bus.$emit('reset-active-price-slider');
        }, 50);
      }
      if (this.sortingFilterSelected) {
          this.sortingFilterSelectedValue = this.sortingFilterSelected;
      }
    }
    // document.addEventListener('scroll',  this.handleScroll);
    this.setEmarsysTracker();
   // this.$bus.$emit('send-to-emarsys-tracking', { type: 'Category', categoryData: this.searchedValue.replace("/", " > ") });
  
  // For working Segmentify
    this.setSegmentify();
  },
  methods: {
    setSegmentify() {
      // For working Segmentify
      let subCategorySrt = this.breadcrumbs && this.breadcrumbs.routes.map((v,i)=> { if (i>0 && v.name) { return v.name }}).join('> ') || '' 
      subCategorySrt += this.getCurrentCategory && this.getCurrentCategory.name && `> ${this.getCurrentCategory.name}` || ''
      window.segPageInf = {
        "category": "Category Page",
        "subCategory": subCategorySrt.replace('> ','')
      }
    },

    validateRouteCategory () {
        this.searcingLoaderFlag = true;
        this.initialSearchFlag = true;
        this.setEmarsysTracker();
        this.searchDataInSearchSpring();
        this.$store.dispatch('searchSpringCategory/reset_categoryFilterOption')
        this.setSegmentify();
    },

    searchDataInSearchSpring (squerydata=null) {
      let routeString = this.getCurrentCategoryUrlPath() ;      
      this.searchedValue =  routeString;
      if(routeString.includes('&')) {
        routeString = encodeURIComponent(routeString)
      }      
      this.$store.dispatch('searchSpringCategory/setCurrentRouterPath' ,  this.$route.path);
      this.$store.dispatch('searchSpringCategory/resetFilterData')
      this.$store.dispatch('searchSpringCategory/resetSearchedProducts');
      this.$store.dispatch('searchSpringCategory/addFilterItems', 'filter.category_hierarchy=' + routeString)
      let fullurlpath = this.$route.fullPath;
      let extraurlpath = fullurlpath.split("?");      
      if(extraurlpath[1]){ 
        let i;   
        let paramarray = extraurlpath[1].split("&");
        for(i in paramarray) {   
          this.$store.dispatch('searchSpringCategory/addFilterItems', paramarray[i])
        }                 
      }      
      this.getSearchData(false, true);
    },

    onBottomScroll () {
      if ( this.findIndexInFilterItems ('page=')) {
        this.$store.dispatch('searchSpringCategory/removeFilterItem', 'page=')
      }
      if (this.searchRes && this.searchRes.pagination && this.searchRes.pagination.nextPage > 0 && !this.paginationLoader) {
        this.paginationLoader = true;
        this.$store.dispatch('searchSpringCategory/addFilterItems', 'page=' + this.searchRes.pagination.nextPage)
        this.getSearchData(true, false, 'searchSpringCategory');
      }
    },

    categoryFilterChange(category, valuesitem) {
      if (this.findIndexInFilterItems ('filter.category_hierarchy')) {
         this.$store.dispatch('searchSpringCategory/removeFilterItem', 'filter.category_hierarchy')
      }
      if ( valuesitem.active) {
        category.values = category.values.map(val => { val.active = false;
        return val
        })
        this.$store.dispatch('searchSpringCategory/set_categoryHierarchy', category);
        let routeString = this.getCurrentCategoryUrlPath() ;
        if(routeString.includes('&')) {
          routeString = encodeURIComponent(routeString);
        }
        this.$store.dispatch('searchSpringCategory/addFilterItems', 'filter.category_hierarchy=' + routeString)
        this.setEmarsysTracker ()
      } else {
        this.$store.dispatch('searchSpringCategory/set_categoryHierarchy', valuesitem);
        this.$store.dispatch('searchSpringCategory/addFilterItems', 'filter.' + category.field + '=' + encodeURIComponent(valuesitem.value))
        const routeString = valuesitem.value.split('/').join(' > ');
        this.$bus.$emit('send-to-emarsys-tracking', { type: 'Category', categoryData: routeString });
      }
      this.showNotificationLoader();
      this.getSearchData();
    },
    segmentifyhandleClicks (event) {
      this.$bus.$emit('segmentify-block-router-update',event);
    }, 
  }
  
};
</script>

<style lang="scss" scoped>
.fixed{
  position: fixed;
  top: 20px;  
  width: 380px;
}
.header-visible .fixed{
    top: 73px;  
}
.footerreached{
    position: fixed;
    bottom: 625px;
    width: 380px;
    top: auto;
}

.mobile-filters { 
  @apply fixed overflow-auto bg-white z-modal left-0 w-screen p-4;
  
  overscroll-behavior: none none;
  padding-top: 52px;
  // top: 70px;
  height: 100vh;
  top: 0;
  @screen md {
    // top: 73px;
  }
}

.customm .item {
  float: left;
  width: 200px;
}

.active {
  font-weight: 800;
}
.sidebar .filterdata h2 b{  
  font-size: 16px;
  margin-left: 0px;
  font-weight: 600;
}
.sidebar .filterdata{
  width:350px;
}
.sidebar h2{
  text-transform: uppercase;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: 600;
  // margin-left: 12px;
}
.sidebar .filterhead{
    margin-left: 8px;
    text-transform: uppercase;
    font-family: inherit;
    font-weight: 500;
    font-size: 22px;
}
.filterdata {
  float: left;
  // width: 200px;
}
.searchtitle h2{
    width: 100%;
    padding-bottom: 25px;
    text-transform: uppercase;
    font-size: 16px;
    font-family: sans-serif;
    /* font-weight: 600; */
    margin-left: 15px;
}
.searchtitle h2 sub{
    bottom: 0px;
    font-size: 14px;
}
.searchtitle h2 span{
  font-weight:600;
}
div.no-result{
  text-align: center;
  margin-top: 50px;
}
div.devicetitle{
  margin: 10px;
  padding: 10px;
}
.static-content.customm {
  clear: both;
  /* position: absolute; */
  height: auto;
  width: 100%;
  /* overflow: scroll; */
}
input {
  border: 1px solid #ccc;
}

.filter-box {
  /* width: 69px; */
  border: 1px solid;
  padding: 3px 5px 3px 5px;
  margin: 0px 3px 5px 3px;
  border-radius: 10px;
  font-size: 13px;
}

.active {
  font-weight: 800;
}
.onlymobile{        
    overflow: hidden;
    height: 50px;
    margin-top: -15px;    
}
.onlymobile .col-4{
    float: left;
    width: 33.33%;
    // border: 2px solid #4e4e4e;
}
.onlymobile .col-4.msort .category_filter_bx_sortby .txt_blk_select select{
      height: 42px;
}
.onlymobile .col-4.mgrid{
    line-height: 1;
    margin-top: 0px; 
    height: 46px;
    border: 1px solid #CCC; 
}
.onlymobile .col-4.mgrid div span{
    position: absolute;
    margin-top: 16px;
    margin-left: 11px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
}
.onlymobile .col-4.mfilter .mt-6{    
    margin-top: 0px;
    height: 45px;   
}
.onlymobile .col-4.mfilter .mt-6 button{
    height: 46px;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    color: #000;
}
.onlymobile .txt_blk_select:after{
  top:20px;
}
.filter-top .filter_bx.filter_bx_sort{
    width: 20px;
    height:20px;
    float: left;
    background-color:transparent;
    border:0px;
    background: url("../../assets/sort.png") no-repeat;
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
.lg-sub-cat{
    margin-bottom: 10px;
}
 .category_filter_out_pop_box{
    width:100%;
    float: left;
    padding: 10px 10px;
    background: none;
  }

  .sub-cat-box {
     min-width: 72px;
    height: 35px;
    float: left;
    border: 1px solid #000000;
    text-align: center;
    margin: 0 auto;
    padding: 3px 6px 0 5px;
    margin-right: 5px;
    margin-top: 5px;
    cursor: pointer;
    color: #666666;
    background: #FFFFFF;
   }
  // .option-selected-box {
  //    min-width: 72px;
  //   height: 35px;
  //   float: left;
  //   border: 1px solid #ededed;
  //   text-align: center;    
  //   padding: 3px 6px 0 5px;
  //   margin-right: 5px;
  //   margin-top: 5px;
  //   cursor: pointer;
  //   color: #666666;
  //   border-radius: 0px;
  //  }   

  .category-active,.selectone-active {     
    font-weight: 400;
    border-color: #666666;
    color: #222222; 
    position: relative;  
    border-radius: 0px; 
    .topright {
        position: absolute;
        top: 0px;
        right: 0px;
        font-size: 18px;
    } 
    div#corner-triangle {
        display: block;
        width: 15px;
        height: 15px;
        border-style: solid;
        border-width: 0 15px 15px 0;
        border-color: transparent #000000 transparent transparent;
        /* position: fixed; */
        /* top: 0; */
        /* right: 0; */
        z-index: 1;
        color: white;
        text-shadow: 0 0 25px 9px #fff;
        // -webkit-filter: drop-shadow(0 1px 9px #000000);
        // filter: drop-shadow(0 1px 9px #000000);
    }
    div#corner-triangle .corner-triangle-text {
      position: relative;
      font-size: 8px;
      top: -9px;
      right: -9px;
      font-family: sans-serif, "Helvetica Neue", Helvetica, Arial;
      font-weight: 200;
      color: #FFFFFF;
      // line-height: 1.1;
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);      
    }
    div#corner-triangle{
      display: none;
    }
    div#corner-triangle.select-active{
      display: block;
    }
    div#corner-triangle .corner-triangle-text span.corner-triangle-firstline {
      margin-left: 29px;
    }
    div#corner-triangle .corner-triangle-text a {
      color: white;
    }
    div#corner-triangle .corner-triangle-text a:hover,
    div#corner-triangle .corner-triangle-text a:link,
    div#corner-triangle .corner-triangle-text a:visited,
    div#corner-triangle .corner-triangle-text a:active,
    div#corner-triangle .corner-triangle-text a:focus {
      text-decoration: none;
    }
   }
   .clearall-filter{
     float:right;
     border-radius:0px;
    border-radius: 0px;
    margin-bottom: 15px;
    width: 100px;
    text-align: center;   
    margin-right: 8px;  
   } 
   .clearall-filter:hover{
    background: #000000;
    color: #FFFFFF;
   }
   .selectedone{
     clear: both;
     overflow: hidden;
   }
   .mob-category {
    height: 62px !important;
    margin-top: 0 !important;
    // overflow-x: scroll !important;
    // scroll-behavior: smooth !important;
   }

   .sub-cat-box-width {
     min-width: 115px !important;
   }  
@media screen and (min-width: 768px) and (max-width: 1600px)  {
  .sidebar .filterdata{
    width:225px;
  }
}

@media (max-width: 1440px) {
  .filterdiv{
      width: 228px;
      bottom: 625px;
  }
}
@media (min-width: 769px) and (max-width: 991x){
  .onlymobile .col-4.mfilter .mt-6 button{
    height: 46px;
    background: #FFFFFF !important;
    border: 1px solid #CCCCCC;
    color: #000;
  }
  .mfilter .nofilterexist{
    background-color: #fff !important;
    color: #000000 !important;
    border: 1px solid #bdbdbd;   
  }
  .mfilter .nofilterexist .filtereditems-count{
    display:none;  
  }  
  .mfilter .filterexist{
    background-color: #000000 !important;
    color: #FFFFFF !important;
  }
  .mfilter .filterexist .filtereditems-count{
        top: 3px;
    left: 61%;
    min-width: 11px;
    min-height: 11px;
    border-radius: 100%;
    float: right;
    height: 18px;
    width: 18px;
    font-size: 9px;
    background: #fffdfd;
    color: #000;
    border: 1px solid #000;
  }  
   .mfilter .filterexist .filtereditems-count{
     left: 75%;
   }  
}
@media (max-width: 768px) {
  .onlymobile .mfilter .nofilterexist{
    background-color: #fff !important;
  }
  .onlymobile .mfilter .nofilterexist .filtereditems-count{
    display:none;  
  }
  .onlymobile .mfilter .filterexist{
    background-color: #000000 !important;
    color: #FFFFFF !important;
  }
  .onlymobile .mfilter .filterexist .filtereditems-count{
        top: 3px;
    left: 61%;
    min-width: 11px;
    min-height: 11px;
    border-radius: 100%;
    float: right;
    height: 18px;
    width: 18px;
    font-size: 9px;
    background: #fffdfd;
    color: #000;
    border: 1px solid #000;
  }
}
@media (max-width: 520px) {
   .sub-category {
    height: 75px !important;
    overflow-x: scroll !important;
    scroll-behavior: smooth !important;
   }

   .sub-cat-box {
     min-width: 115px !important;
   }
   .sidebar{
      position: relative;
      padding-bottom: 90px;
   }
   .mobile-filters{
     padding-bottom: 70px;
     width: 85%;
     right:0;
     left: inherit;
   }
   .mob-siderbar-footer{
      position: fixed;
      bottom: 0px;
      width: 100%;
      height: 75px;
      background: #FFFFFF;
      z-index:10;
   }
   .mob-siderbar-footer .done-button{     
     right: 73px;
     
     border: 1px solid;
     width: 105px;
     height: 44px;
     background: black;
     color: white;
     font-size: 18px;
   }
   .mob-siderbar-footer .reset-button{     
      left: auto;
      right: auto;

      border: 1px solid;
      width: 105px;
      height: 44px;
      font-size: 16px;
   } 
   .onlymobile .mfilter .filterexist .filtereditems-count{
     left: 75%;
   }  
} 



   .sub-cat-box-mob {
    min-width: 130px;
    height: 35px;
    float: left;
    border: 1px solid #000000;
    text-align: center;
    margin: 0 auto;
    padding: 3px 6px 0 5px;
    margin-right: 5px;
    margin-top: 5px;
    cursor: pointer;
    color: #666666;
    background: #FFFFFF;
   }

  .category_filter_out_pop_box_mob{
    width:100%;
    float: left;
    // padding: 10px 10px;
    background: none;
  }


  @media (max-width: 320px) { 

    .sidebar{
      position: relative;
        padding-bottom: 90px;
    }

   .mob-siderbar-footer .done-button{     
     right: 65px;

    border: 1px solid;
    width: 100px;
    height: 31px;
    background: black;
    color: white;
    font-size: 16px;
   }

   .mob-siderbar-footer .reset-button{     
      left: auto;
      right: auto;

      border: 1px solid;
      width: 100px;
      height: 31px;
      font-size: 13px;
   }   

  }

@media screen and (min-width: 520px) and (max-width: 992px)  {
  // @media (max-width: 768px) { 
   .sidebar{
      position: relative;
      padding-bottom: 90px;
   }
   .mobile-filters{
     padding-bottom: 70px;
     width: 85%;
     right:0;
     left: inherit;
   }
   .mob-siderbar-footer{
      // position: fixed;
      bottom: 0px;
      width: 100%;
      // height: 75px;
      background: #FFFFFF;
      z-index:10;
      text-align: right;
   }
   .mob-siderbar-footer .done-button{     
      right: 65px;

      border: 1px solid;
      width: 105px;
      height: 44px;
      background: black;
      color: white;
      font-size: 18px;
   }
   .mob-siderbar-footer .reset-button{     
      left: auto;
      right: auto;

      border: 1px solid;
      width: 105px;
      height: 44px;
      font-size: 16px;
   }   
   .mob-siderbar-footer-inner {
    position: absolute;
    right: 0px;
    bottom: 0px;
}
} 

  
.mobile-filters_new h2{
      line-height: 1.5rem;
}

  .columns-label {
    float: left;
    margin-top: 10px;
    padding-right: 9px;
  }

  .filtertab_pos-fixed-top-on-bottom{
    margin-bottom: 5px;
    position: fixed;
    top: 129px;
    -webkit-transform: translate3d(0,-200%,8px);
    transform: translate3d(0,-200%,8px);
    z-index: 4;
    padding: 7px 5px 5px 5px;
    background: #fff;
    width: 100%;
    height: 57px;
    max-width: 100%;
}

  .filtertab_pos-fixed-top-on-top {
    margin-bottom: 5px;
    position: fixed;
    top: 178px;
    -webkit-transform: translate3d(0,-200%,8px);
    transform: translate3d(0,-200%,8px);
    z-index: 4;
    padding: 7px 5px 5px 5px;
    background: #fff;
    width: 100%;
    height: 57px;
    max-width: 100%;
}

.filtertab_pos-fixed{
    margin-bottom: 5px;
    position: fixed;
    top: 178px;
    -webkit-transform: translate3d(0,-200%,8px);
    transform: translate3d(0,-200%,8px);
    z-index: 4;
    padding: 7px 5px 5px 5px;
    background: #fff;
    width: 100%;
    height: 57px;
    max-width: 100%;  
}

</style>
