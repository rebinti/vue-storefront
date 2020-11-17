<template>
  <div>
    <div class="row" style="margin-top: 10px;">
      <div class="col-12 md:col-12 sm:col-12 lg:hidden devicetitle" style="margin:0 auto">
        <h4 class="col-6 pb-5">
          Search
        </h4>
      </div>
    </div>
     <div class="loader loader--style3" style="margin-top: 180px; margin-bottom: 180px;" title="2" v-if="searcingLoaderFlag">
            <img src="/assets/opc-ajax-loader.gif" style="margin: 0 auto;width: 25px;">
             <h3 style="text-align: center;"> Please wait.finding best results... </h3>
     </div>

    <div class="container lg:hidden onlymobile col-12" style="margin-bottom: 5px;" 
    :class="classNameTab"
    v-if="!searcingLoaderFlag && searchRes && searchRes.facets && searchRes.facets.length > 0">

        <div class="col-4  lg:hidden msort">
              <div class="category_filter_bx_sortby filter-top">
                <base-select
                  v-if="sortingFilterOptions && sortingFilterOptions.length"
                  class="col-12 md:col-6 mb-6 txt_blk_select search"
                  name="sort"
                  v-model="sortingFilterSelectedValue"
                  :options="sortingFilterOptions"
                  :selected="sortingFilterSelected"
                  :placeholder="$t('Sorting *')"
                  @input="sortingFilterChange"
                />
              </div>
        </div>        
        <div v-if="searchRes" class="col-4  lg:hidden mgrid">
              <div v-if="seletedMobileGrid" class="category_filter_bx_grid_view filter-top" @click="columnChangeMobile(seletedMobileGrid)"> 
                  <span> view</span> 
                  <div class="filter_bx filter_bx_grid" :style="'background: url(' + seletedMobileGrid.image + ') no-repeat;'"> 
                  </div>                  
              </div>   
             
        </div>
        <div v-if="searchRes" class="lg:hidden d_item col-4 mfilter" style=" margin-bottom: 20px;">
          <div class="row gutter-md mt-6">
            <div class="col-12">
              <button-full class="w-full" @click.native="openFilters">
                {{ $t('Filters') }}
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
        <div class="col-12 lg:col-9 sm:col-12 pr_list_sec_main">
          <div class="row">
            <div class="col-12 lg:col-8 searchtitle" v-if="searchRes && searchRes.facets && searchRes.facets.length > 0">
              <h2 style="width:100%;padding-bottom:25px;">
                Search results for<span v-if="searchedValue"> "{{searchedValue}}" </span>
                <sub v-if="searchRes && searchRes.pagination">({{ searchRes.pagination.totalResults }} Products)</sub>
              </h2>
            </div>
             <div class="col-2 hidden lg:block xs:col-6">
                 <div v-if="searchRes && searchRes.facets && searchRes.facets.length > 0" class="search_page_size_div">
                    <label class="mr10 columns-label">{{ $t('Columns') }}:</label>
                    <columns @change-column="columnChangeWeb" :products-columns="[2, 3, 4]" :dcolumn="defaultColumnWeb" :type="'lg'"/>
                 </div>   
              </div>
            <div class="col-2 hidden xs:col-6 lg:block" v-if="searchRes && searchRes.facets && searchRes.facets.length > 0">
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
        </div>         
        <div class="col-12" style="margin-bottom: 20px;" v-if="searchRes && searchRes.merchandising.content && searchRes.merchandising.content.banner && searchRes.merchandising.content.banner.length > 0">          
          <span v-html="searchRes.merchandising.content.banner[0]"></span>          
        </div>               
        <div class="col-12" style="margin-bottom: 20px;" v-else-if="searchRes && searchRes.merchandising.content && searchRes.merchandising.content.header && searchRes.merchandising.content.header.length > 0">          
          <span v-html="searchRes.merchandising.content.header[0]"></span>          
        </div>               
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

          <div class="lg:col-6 no-result" v-if="serachedProd.length === 0">
              <h3>NO RESULTS FOUND <span v-if="squery.length>2">FOR {{ squery }} </span>!.</h3>
              <h5>If you are not seeing any results, try removing some of your selected filters above..</h5>
          </div>
          <div class="lg:col-3" v-if="serachedProd.length === 0">
          </div>  
          <!-- <div>{{serachedProd.length}}</div> -->
        <div class="col-12 lg:col-9 pr_list_sec_main locallllll">
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
    <div id="seg-search-reco"></div>
  </div>
</template>

<script>
import config from 'config'
import onBottomScroll from '@vue-storefront/core/mixins/onBottomScroll'
import { mapGetters } from 'vuex'
import SearchSpringMixin  from 'src/modules/search-spring/mixins/searchSpring.ts'
import SiderbarFilter  from "src/modules/search-spring/components/sidebar";
import MobileSiderbarFilter  from "src/modules/search-spring/components/MobileSidebar";
import SidebarMixin from 'src/modules/search-spring/mixins/sidebar.ts'
import { handleScroll } from 'src/modules/search-spring/helpers'

export default {
  name: 'SearchSpringSearch',
  components: {
    SiderbarFilter,
    MobileSiderbarFilter
  },
  mixins: [SearchSpringMixin, SidebarMixin, onBottomScroll],
  data () {
    return {
        searcingLoaderFlag: false,
        searchPageType: 'searchSpringSearch',
        serachFrom: 'search',
        tagquery:'',
    };
  },
  computed: {
    ...mapGetters('searchSpringSearch', ['serachedProd', 'filterData', 'searchRes', 'categoryHierarchy', 'priceSliderData', 'priceSliderActiveRange', 'sortingFilterOptions', 'sortingFilterSelected'])
  },
  created () {
    if (this.$route.query.tag) {
      this.$store.dispatch('searchSpringSearch/addFilterItems', 'tag=' + this.$route.query.tag)
      this.searcingLoaderFlag = true;
      this.getSearchData(false, true, 'searchSpringSearch');
      console.log("AAAAAAAAAAA111",this.serachedProd)
    }
  },
  // watch: {
  //   '$route': 'searchActiveQueryValueResults'
  // },
  beforeMount () {
    //this.searchActiveQueryValueResults()
    this.$bus.$on('search-in-search-spring', this.dataFromHeader);

    document.addEventListener('scroll', () => {
      this.isScrolling = true
      handleScroll('.pr_list_sec_main', '.news-letter')
    }, {passive: true})

    setInterval(() => {
      if (this.isScrolling) {
        this.hasScrolled()
        this.isScrolling = false
      }
    }, 250)
    console.log("BBBBBBBBBBBBBb111",this.serachedProd)
  },
  beforeDestroy () {
     this.$bus.$off('search-in-search-spring');
  },
  mounted () {
    if (this.$route.query.tag) {
      this.$store.dispatch('searchSpringSearch/addFilterItems', 'tag=' + this.$route.query.tag)
      this.searcingLoaderFlag = true;
      this.getSearchData(false, true, 'searchSpringSearch');
      console.log("AAAAAAAAAAA111",this.serachedProd)
    }    
    if (this.filterData && this.filterData.length > 0) {
       this.searchedValue = this.filterData[0].split('=')[1];
      if (this.sortingFilterSelected) {
          this.sortingFilterSelectedValue = this.sortingFilterSelected;
      }
    }
    this.setSegmentify()
  },
  methods: {
    // searchActiveQueryValueResults() {
    //     if (this.$route.query.q && this.$route.query.q !== this.searchedValue) {
    //       this.squery= this.$route.query.q;
    //       this.searchDataInSearchSpring (this.$route.query.q)
    //     }
    // },
    setSegmentify() {
      // For working Segmentify
      window.segPageInf = {
        "category": "Search Page",
        "subCategory": ''
      }
    },
    searchDataInSearchSpring (squerydata) {
      if (this.squery.length > 2) {
        this.$store.dispatch('searchSpringSearch/resetFilterData')
        this.$store.dispatch('searchSpringSearch/resetSearchedProducts');
        this.$store.dispatch('searchSpringSearch/addFilterItems', 'rq=' + this.squery)
        if(this.setTime) { clearTimeout(this.setTime); }
        if ("AbortController" in window) {
          this.getSearchData(false, true , 'searchSpringSearch');
          this.searcingLoaderFlag = true;
        } else {
          this.setTime = setTimeout(() => {
            this.getSearchData(false, true, 'searchSpringSearch');
            this.searcingLoaderFlag = true;
          }, 400);
        }
       
      } else {
        if(this.setTime) clearTimeout(this.setTime);
        this.$store.dispatch('searchSpringSearch/resetAllFilterResult');
        this.searchedValue = null;
        this.$store.dispatch('searchSpringSearch/resetFilterData')
        this.searcingLoaderFlag = false;
        this.$store.dispatch('searchSpringSearch/resetSearchedProducts');
      }
    },
    searchDataInSearchSpringTag (squerydata) {
      if (this.tagquery.length > 2) {
        this.squery = this.tagquery;
        this.$store.dispatch('searchSpringSearch/resetFilterData')
        this.$store.dispatch('searchSpringSearch/resetSearchedProducts');
        this.$store.dispatch('searchSpringSearch/addFilterItems', 'tag=' + this.tagquery)
        if(this.setTime) { clearTimeout(this.setTime); }
        if ("AbortController" in window) {
          console.log("TEEEETT",111111)
          this.getSearchData(false, true , 'searchSpringSearch');
          this.searcingLoaderFlag = true;
        } else {
          this.setTime = setTimeout(() => {
            console.log("fTEEEETT",22222222)
            this.getSearchData(false, true, 'searchSpringSearch');
            this.searcingLoaderFlag = true;
          }, 1000);
        }
       
      } else {
        if(this.setTime) clearTimeout(this.setTime);
        this.$store.dispatch('searchSpringSearch/resetAllFilterResult');
        this.searchedValue = null;
        this.$store.dispatch('searchSpringSearch/resetFilterData')
        this.searcingLoaderFlag = false;
        this.$store.dispatch('searchSpringSearch/resetSearchedProducts');
      }
    },    
    onBottomScroll () {
      if ( this.findIndexInFilterItems ('page=')) {
        this.$store.dispatch('searchSpringSearch/removeFilterItem', 'page=')
      }
      if (this.searchRes && this.searchRes.pagination && this.searchRes.pagination.nextPage > 0 && !this.paginationLoader) {
        this.paginationLoader = true;
        this.$store.dispatch('searchSpringSearch/addFilterItems', 'page=' + this.searchRes.pagination.nextPage)
        this.getSearchData(true, false, 'searchSpringSearch');
      }
    }, 
    dataFromHeader (event) {
      if(Array.isArray(event)){ // data from the header banner click - tag search            
            let tagdata = event[0] 
            this.tagquery = tagdata.tagquerydata; 
            if (this.tagquery && this.tagquery !== this.searchedValue) {                    
              this.searchDataInSearchSpringTag (tagdata.tagquerydata)
            }
      }else{
        if (event && event !== this.searchedValue) {
          this.squery= event;
          this.searchDataInSearchSpring (event)
        }
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
  font-size: 16px;
  font-weight: 500;
  // margin-left: 12px;
}
.sidebar .filterdata .mt-10{
  margin-top: .5rem;
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
    // border: px solid #4e4e4e;
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
</style>
