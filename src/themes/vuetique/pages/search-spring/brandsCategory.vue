<template>
  <div class="st_brd">
     <!-- <div class="b_crumb">
      <breadcrumbs :routes="breadcrumbs.routes" :active-route="category.name" />     
    </div> -->
    <header class="pb-10 row bg-grey-lightest mb-6 head_category">
      <div class="container d_item">
        <div class="row items-center mt-2">
          <h2 v-if="getBrandPageTitle.name" class="col-8 md:col-8 lg:col-8 xl:col-10">
             {{getBrandPageTitle.name}}
          </h2>
           <div class="col-2 md:col-2 lg:col-2 xl:col-1 hidden lg:block">
                <label class="mr10 columns-label">{{ $t('Columns') }}:</label>
                <columns @change-column="columnChangeWeb" :products-columns="[2, 3, 4]" :dcolumn="defaultColumnWeb" :type="'lg'"/>
          </div>
          <div class="col-2 md:col-2 lg:col-2 xl:col-1 hidden lg:block mt-5">
             <base-select
                v-if="sortingFilterOptions && sortingFilterOptions.length"
                class="col-12 md:col-6 mb-6 txt_blk_select"
                name="sort"
                v-model="sortingFilterSelectedValue"
                :options="sortingFilterOptions"
                :selected="sortingFilterSelectedValue"
                :placeholder="$t('Sorting *')"
                @input="sortingFilterChange"
              />
          </div>
        </div> 
      </div>

    </header>
     <div class="loader loader--style3" style="margin-top: 180px; margin-bottom: 180px;" title="2" v-if="searcingLoaderFlag">
            <img src="/assets/opc-ajax-loader.svg" style="margin: 0 auto;width:75px;">
             <!-- <h3 style="text-align: center;"> loading... </h3>  -->
      </div>
      <div class="container onlymobile col-12 lg:hidden " style="margin-bottom: 5px;" 
       :class="classNameTab"
      v-if="!searcingLoaderFlag && searchRes && searchRes.facets && searchRes.facets.length > 0">

        <div class="col-4  lg:hidden msort">
              <div class="category_filter_bx_sortby filter-top search">
                <base-select
                  v-if="sortingFilterOptions && sortingFilterOptions.length"
                  class="col-12 md:col-6 mb-6 txt_blk_select"
                  name="sort"
                  v-model="sortingFilterSelectedValue"
                  :options="sortingFilterOptions"
                  :selected="sortingFilterSelectedValue"
                  :placeholder="$t('Sorting *')"
                  @input="sortingFilterChange"
                />
              </div>

        </div>        
        <div class="col-4  lg:hidden mgrid">
              <div v-if="seletedMobileGrid" class="category_filter_bx_grid_view filter-top" @click="columnChangeMobile(seletedMobileGrid)"> 
                  <span> view</span> 
                  <div class="filter_bx filter_bx_grid" :style="'background: url(' + seletedMobileGrid.image + ') no-repeat;'"> 
                  </div>                  
              </div>   
         
        </div>
        <div v-if="searchRes" class="lg:hidden d_item col-4 mfilter" style=" margin-bottom: 20px;">
          <div class="row gutter-md mt-6">
            <div class="col-12">
              <!-- <button-full class="w-full" @click.native="openFilters">
                {{ $t('Filters') }}
              </button-full> -->
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

    <div class="container pb-16" v-if="!searcingLoaderFlag">

      <div class="row gutter-md">      
        <!-- Sidebar For web view   -->
        <siderbar-filter :viewfilterflag="'web'" 
            :mobileFilters="mobileFilters"
            :searchRes="searchRes"
            :categoryHierarchy="categoryHierarchy"
            :priceSliderData="priceSliderData"
            :squery="squery"
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
          <product-listing :mob-columns="defaultColumnMobile" :columns="defaultColumnWeb" :products="serachedProd" />

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
            <h3 style="text-align: center;"> Please wait for loading more... </h3>
          </div>
        </div>
      </div>
    </div>
    <div id="seg-brand-reco"></div>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import Vue from 'vue'
import config from 'config'
import onBottomScroll from '@vue-storefront/core/mixins/onBottomScroll'
import { mapState, mapGetters, mapActions } from 'vuex'
import SearchSpringMixin  from 'src/modules/search-spring/mixins/searchSpring.ts'
import  SidebarMixin from 'src/modules/search-spring/mixins/sidebar.ts'
import  SiderbarFilter  from "src/modules/search-spring/components/sidebar";
import  MobileSiderbarFilter  from "src/modules/search-spring/components/MobileSidebar";
import  { handleScroll }  from 'src/modules/search-spring/helpers'

export default {
  name: 'brandsCategory', 
  components: {
    'no-ssr': NoSSR,
     SiderbarFilter,
    MobileSiderbarFilter,
  },
  async asyncData ({ store, route }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
      await store.dispatch('ui/getBrandList', { // this is just an example how can you modify the search criteria in child components
       key: '_type',
        value: "brand"
      })
  },
  mixins: [SearchSpringMixin, SidebarMixin, onBottomScroll],
  computed: {
    ...mapState({
      // specificBrandsList: state => state.ui.specificBrandsList,
      brandsList: state => state.ui.brandsList,
    }),
    ...mapGetters('searchSpringCategory', ['serachedProd', 'filterData', 'searchRes', 'categoryHierarchy', 'priceSliderData', 'priceSliderActiveRange', 'sortingFilterOptions', 'sortingFilterSelected' , 'getStoredCurrentRouterPath']),
    getBrandPageTitle () {
      if (this.$route.params.brandName) {
        return this.$store.getters[`ui/brandPageTitle`](this.$route.params.brandName)
      }
      return null
    }
  },
  data () {
    return {
      searcingLoaderFlag: true,
      searchPageType: 'searchSpringCategory',
      serachFrom: 'brand',
      filterloaderFlag: false,
    };
  },

  beforeMount () {
     if(this.getStoredCurrentRouterPath !== this.$route.path ) {
        this.searchDataInSearchSpring();
      } else {
        this.searcingLoaderFlag = false;
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

  },
  watch: {
    '$route': 'validateRouteCategory'
  },
  mounted () {
    if (this.filterData && this.filterData.length > 0) {
      if (this.sortingFilterSelected) {
          this.sortingFilterSelectedValue = this.sortingFilterSelected;
      }
    }
    this.setSegmentify();    
    console.log('getBrandPageTitle >>>>>>>>>',this.getBrandPageTitle)
    // For Google Tag Manager - brand click    

    Vue.gtm.trackEvent({
      'event': 'brandClick',
      'brand': this.getBrandPageTitle.name,
    });  
  },
  methods: {
    setSegmentify() {      
      // For working Segmentify
      window.segPageInf = {
        "category": "Brand Page",
        "subCategory": this.getBrandPageTitle && this.getBrandPageTitle.name || ''
      }
    },
    validateRouteCategory () {
        this.searcingLoaderFlag = true;
        this.searchDataInSearchSpring();
        this.setSegmentify();
    },
  
    searchDataInSearchSpring (squerydata=null) { // this.$route.params.brandName
      let routeString = this.$route.params.brandName; // this.$route.path.replace('-', ' ');
      routeString = routeString.split('-')
                      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(' ');
      // this.searchedValue =  routeString      
      if(routeString.includes('&')) {
        routeString = encodeURIComponent(routeString)
      }
      this.$store.dispatch('searchSpringCategory/setCurrentRouterPath' ,  this.$route.path);
      this.$store.dispatch('searchSpringCategory/resetFilterData')
      this.$store.dispatch('searchSpringCategory/resetSearchedProducts');
      this.$store.dispatch('searchSpringCategory/addFilterItems', 'filter.label=' + this.getBrandPageTitle.name.replace(/&/g, '%26'))
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
    bottom: 515px;
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
      height: 45px;
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
  // Filter style updates - 21-04-2020
  .selectone-active {     
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
    margin-top: 5px;       
   } 
   .clearall-filter:hover{
    background: #000000;
    color: #FFFFFF;
   }
   .selectedone{
     clear: both;
     overflow: hidden;
   }   
@media screen and (min-width: 768px) and (max-width: 1600px)  {
  .sidebar .filterdata{
    width:225px;
  }
}

@media (max-width: 1440px) {
  .filterdiv{
      width: 228px;
      bottom: 515px;
  }
}
@media (max-width: 768px) {
  .onlymobile .mfilter .nofilterexist{
    background-color: #fff !important;
    color: #000000 !important;
    border: 1px solid #bdbdbd;   
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
   .mob-siderbar-footer{
      position: fixed;
      bottom: 0px;
      width: 100%;
      height: 75px;
      background: #FFFFFF;

   }
   .mob-siderbar-footer button{
     margin-right: 30px;
   }

   @media (max-width: 520px) {
   .sidebar{
      position: relative;
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
     right: 65px;
   }
   .mob-siderbar-footer .reset-button{     
      left: 45px;
   }
   .onlymobile .mfilter .filterexist .filtereditems-count{
     left: 75%;
   }       
} 


  @media (max-width: 380px) {
    .mob-siderbar-footer .reset-button{
        left: -7px;
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
