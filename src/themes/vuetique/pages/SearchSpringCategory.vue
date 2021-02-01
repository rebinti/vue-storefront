<template>
  <div class="st_brd">
     <div class="b_crumb">
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
                    <!-- ({{ valuesitem.count }}) -->                         
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
     <div class="loader loader--style3" style="margin-top: 180px; margin-bottom: 180px;" title="2" v-if="searcingLoaderFlag">
            <img src="/assets/opc-ajax-loader.gif" style="margin: 0 auto;width: 25px;">
             <h3 style="text-align: center;"> Please wait.finding best results... </h3>
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
              <button-full class="w-full" @click.native="openFilters">
                {{ $t('Filters') }}
              </button-full>
            </div>
          </div>
        </div>        

      </div>



    <!-- Side bar for Mobile -->
    <div class="mobile-filters lg:hidden mobile_filter" v-if="mobileFilters">
      <div class="mobile-filters_new">
       <h2 class="absolute top-0 left-0 m-4 h-4" > Filters </h2>
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
        <div class="">
          <div class="sidebar">
            <!-- <h1>Filters</h1> -->

         <!-- New applied filter list Div -->
           <div class="container pb-5 md: ml-2 lg:hidden" style="margin-top: 10px;">
                <!-- <h1 class="filterhead" v-if="searchRes" >Filters</h1> -->
                <span
                  class="filter-box clearall-filter"
                  v-if="searchRes && searchRes.filterSummary && searchRes.filterSummary.length>0"
                  @click="clearAllFilter()"
                >Clear All</span>              
                <div class="container pb-5 md: ml-2 selectedone">
                  <div class="row gutter-md" v-if="searchRes && searchRes.filterSummary && searchRes.filterSummary.length>0">
                    <span
                      v-for="filter in searchRes.filterSummary"
                      :key="filter.label"
                      @click="removeFilterFlag(filter)"
                      class="filter-box option-selected-box selectone-active"
                    >
                      {{ filter.label }}
                      <div class="topright select-active" id="corner-triangle">
                        <div class="corner-triangle-text text-capitalize">
                            <span>x</span> 
                        </div>
                      </div>                       
                      <span
                        v-if="filter.field === 'final_price'"
                      >{{ $store.state.config.i18n.currencySign }} {{ filter.value.rangeLow }}- {{ $store.state.config.i18n.currencySign }} {{ filter.value.rangeHigh }}</span>
                    </span>
                  </div>
                </div>       
              </div>
            <!-- New applied filter list Div End -->
            <div class="container leading-loose static-content customm" v-if="searchRes && searchRes.facets && searchRes.facets.length > 0">
              <!-- <div
                v-for="facetsitem in searchRes.facets"
                :key="facetsitem.field"
                class="filterdata"
              > -->
                <Accordion class="mob_fltr"
                    v-for="(facetsitem) in searchRes.facets"
                    :key="facetsitem.field"
                    :openType= "facetsitem.facet_active === 0 ? false : true"
                    :title="$t(facetsitem.label)"
                    v-if="facetsitem.type !== 'hierarchy' && (facetsitem.values && facetsitem.values.length > 0 ) || (facetsitem.type === 'slider') || (categoryHierarchy.length > 0)"
                  >
                <!-- <div v-if="facetsitem && facetsitem.type && facetsitem.type === 'hierarchy'" style="min-height: 20px;">
                  <p @click="setCategoryFilterHistory({type: 'view all'})"
                     v-if="(facetsitem.facet_active > 0 && categoryHierarchy.length > 0 && facetsitem.values.length > 0) || categoryHierarchy.length > 0"
                  > View all </p>
                  <p v-for="(categ, index) in categoryHierarchy" :key="categ.value + index"
                     @click="setCategoryFilterHistory(categ, index)"
                     :class="{'active': categ.active}">
                    {{ categ.label }}
                  </p>
                  <p v-for="(valuesitem) in facetsitem.values" :key="valuesitem.value"
                     @click="setCategoryFilterData (facetsitem, valuesitem)">
                    {{ valuesitem.label }} ({{ valuesitem.count }})
                  </p>
                </div> -->

                <div >
                  <search-checkbox
                   v-if="facetsitem.field !== 'color' && facetsitem.type !== 'hierarchy'"
                    v-for="(valuesitem,index) in facetsitem.values" :key="valuesitem.value"
                    class="col-xs-12 mb15"
                    :id="valuesitem.label+index+valuesitem.count"
                    v-model="valuesitem.active"
                    :field-type="valuesitem.field"
                    @click.native="setFilterData (facetsitem, valuesitem)"
                  >
                    {{ valuesitem.label }}
                  </search-checkbox>

                  <filter-color-selector
                      v-if="facetsitem.field === 'color'"
                      v-for="(valuesitem,index) in facetsitem.values" :key="valuesitem.value"
                      :id="valuesitem.label+index+valuesitem.count"
                      :field-type="facetsitem.field"
                      v-model="valuesitem.active"
                      :label="valuesitem.label"
                      @click="setFilterData (facetsitem, valuesitem)"
                    >
                    </filter-color-selector>

                  <price-slider
                    v-if="priceSliderData && priceSliderData.type && priceSliderData.type === 'slider' && facetsitem.type === 'slider'"
                    context="categoryMob"
                    id="priceMob"
                    code="priceMob"
                    :price-range="priceSliderData.active"
                    :active-range="priceSliderData.range"
                    content="PriceMob"
                    label="Price Label"
                    :interval="priceSliderData.step"
                    @sliderChanged="priceSliderChanged"
                  />
                </div>
              <!-- </div> -->
              </Accordion>
            </div>

            <div v-else>
              <h5>NO RESULTS FOUND <span v-if="squery">FOR {{ squery }} </span>!.</h5>
              <h6>If you are not seeing any results, try removing some of your selected filters above.</h6>
            </div>

            <div class="mob-siderbar-footer">
              <div class="mob-siderbar-footer-inner">
                    <button
                      type="button"
                      class=" m-4 h-4 done-button"
                      @click="closeFilters"
                    > Done </button>
                      <button
                      type="button"
                      :disabled="!(searchRes && searchRes.filterSummary && searchRes.filterSummary.length>0)"
                      class=" m-4 h-4 reset-button"
                      @click="clearAllFilter()" > Reset </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container pb-16" v-if="!searcingLoaderFlag">
        <!-- <div class="col-12 lg:col-9 pr_list_sec_main">
          <div class="row">
            <div class="col-9 xs:col-12 searchtitle" v-if="searchRes">
              <h2 style="width:100%;padding-bottom:25px;">
                 {{searchedValue.replace('/', '>')}}
                <sub v-if="searchRes && searchRes.pagination">({{ searchRes.pagination.totalResults }} Products)</sub>
              </h2>
            </div>
            <div class="col-3 xs:col-12">
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
        </div>        -->
      <div class="row gutter-md">      
        <!-- Sidebar For web view   -->
        <div class="col-3 hidden lg:block">
          <div class="">
            <div class="sidebar filterdiv"  :class="{ fixed: fixedOrderPanel }">
              <!-- <h1 class="filterhead" v-if="searchRes" >Filters</h1> -->
              <span
                class="filter-box clearall-filter"
                v-if="searchRes && searchRes.filterSummary && searchRes.filterSummary.length>0"
                @click="clearAllFilter()"
              >Clear All</span>              
              <div class="container pb-5 md: ml-2 selectedone">
                <div class="row gutter-md" v-if="searchRes && searchRes.filterSummary && searchRes.filterSummary.length>0">
                  <span
                    v-for="filter in searchRes.filterSummary"
                    :key="filter.label"
                    @click="removeFilterFlag(filter)"
                    class="filter-box option-selected-box selectone-active"
                  >
                    {{ filter.label }}
                    <div class="topright select-active" id="corner-triangle">
                      <div class="corner-triangle-text text-capitalize">
                          <span>x</span> 
                      </div>
                    </div>                       
                    <span
                      v-if="filter.field === 'final_price'"
                    >{{ $store.state.config.i18n.currencySign }} {{ filter.value.rangeLow }}- {{ $store.state.config.i18n.currencySign }} {{ filter.value.rangeHigh }}</span>
                  </span>
                </div>
              </div>
              <div class="container leading-loose static-content customm" v-if="searchRes && searchRes.facets && searchRes.facets.length > 0">
                <!-- <div
                  v-for="facetsitem in searchRes.facets"
                  :key="facetsitem.field"
                  class="filterdata"
                > -->
                 <Accordion class="mob_fltr"
                    v-for="(facetsitem) in searchRes.facets"
                    :key="facetsitem.field"
                    :openType= "facetsitem.facet_active === 0 ? false : true"
                    :title="$t(facetsitem.label)"
                    v-if="facetsitem.type !== 'hierarchy' && (facetsitem.values && facetsitem.values.length > 0 ) || (facetsitem.type === 'slider') || (categoryHierarchy.length > 0)"
                  >
                  <!-- <h2><b>{{ facetsitem.label }}</b></h2> -->

                  <!-- <div v-if="facetsitem && facetsitem.type && facetsitem.type === 'hierarchy'" style="min-height: 20px;">
                    <p @click="setCategoryFilterHistory({type: 'view all'})"
                       v-if="(facetsitem.facet_active > 0 && categoryHierarchy.length > 0 && facetsitem.values.length > 0) || categoryHierarchy.length > 0"
                    > View all </p>
                    <p v-for="(categ, index) in categoryHierarchy" :key="categ.value + index"
                       @click="setCategoryFilterHistory(categ, index)"
                       :class="{'active': categ.active}"
                       :style="'margin-left:' + 5 * (index) + 'px;'"
                       >
                      {{ categ.label }}
                    </p>
                    <p v-for="(valuesitem) in facetsitem.values" :key="valuesitem.value"
                       @click="setCategoryFilterData (facetsitem, valuesitem)"
                       :style="facetsitem.facet_active === 1 ? 'margin-left:' + 5 * categoryHierarchy.length + 'px;' : 'margin-left:0px;'"
                       >
                      {{ valuesitem.label }} ({{ valuesitem.count }})
                    </p>
                  </div> -->

                  <div>
                    <search-checkbox
                      v-for="(valuesitem,index) in facetsitem.values" :key="valuesitem.value"
                      v-if="facetsitem.field !== 'color' && facetsitem.type !== 'hierarchy'"
                      class="col-xs-12 mb15"
                      :id="valuesitem.label+index+valuesitem.count"
                      :field-type="facetsitem.field"
                      v-model="valuesitem.active"
                      @click="setFilterData (facetsitem, valuesitem)"
                    >
                      <!-- <img :width="'40px'" :height="'40px'" :src="'/assets/colour/' + valuesitem.label.toLowerCase() +'.png'" 
                      @error="imgUrlAlt" alt="" v-if="facetsitem.field === 'color'" > -->
                      <span>
                        {{ valuesitem.label }} 
                        <!-- ({{ valuesitem.count }}) -->
                      </span>
                    </search-checkbox>

                    <filter-color-selector
                      v-if="facetsitem.field === 'color'"
                      v-for="(valuesitem,index) in facetsitem.values" :key="valuesitem.value"
                      :id="valuesitem.label+index+valuesitem.count"
                      :field-type="facetsitem.field"
                      v-model="valuesitem.active"
                      :label="valuesitem.label"
                      @click="setFilterData (facetsitem, valuesitem)"
                    >
                    </filter-color-selector>

                    <price-slider
                      v-if="priceSliderData && priceSliderData.type && priceSliderData.type === 'slider' && facetsitem.type === 'slider'"
                      context="category"
                      id="priceWeb"
                      code="price"
                      :price-range="priceSliderData.active"
                      :active-range="priceSliderData.range"
                      content="Price"
                      label="Price Label"
                      :interval="priceSliderData.step"
                      @sliderChanged="priceSliderChanged"
                    />
                  </div>
                <!-- </div> -->
                </Accordion>
              </div>
              <div v-if="getMerchandisingContent && getMerchandisingContent.left"
              v-html="getMerchandisingContent.left[0]"></div>
            </div>
          </div>
        </div>
        <div class="lg:col-6 no-result" v-if="serachedProd.length === 0">
            <h3>NO RESULTS FOUND <span v-if="squery.length>2">FOR {{ squery }} </span>!.</h3>
            <h5>If you are not seeing any results, try removing some of your selected filters above..</h5>
        </div>        
        <div class="lg:col-3" v-if="serachedProd.length === 0">
        </div>  
      <div class="col-12 lg:col-9 pr_list_sec_main">    
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
    </div>
  </div>
</template>

<script>
import Category from '@vue-storefront/core/pages/Category'
// import { TaskQueue } from '@vue-storefront/core/lib/sync';
import fetch from 'isomorphic-fetch';
// import omit from 'lodash-es/omit';
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery';
import ProductListing from '../components/core/ProductListing.vue';
import BaseInput from 'theme/components/core/blocks/Form/BaseInput';
import ButtonFull from 'theme/components/theme/ButtonFull';
import NoScrollBackground from 'theme/mixins/noScrollBackground';
import SearchCheckbox from 'src/modules/search-spring-search/components/genericSelectFilterItem';
import PriceSlider from 'src/modules/search-spring-search/components/PriceSlider';
import BaseSelect from 'src/modules/search-spring-search/components/BaseSelect';
import filterColorSelector from 'src/modules/search-spring-search/components/ColorSelector';
import config from 'config'
import onBottomScroll from '@vue-storefront/core/mixins/onBottomScroll'
import { mapState, mapGetters, mapActions } from 'vuex'
import Accordion from 'theme/components/theme/Accordion'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
// import SortBy from '../components/core/SortBy.vue'
import Columns from '../components/core/Columns.vue'

import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    ProductListing,
    BaseInput,
    ButtonFull,
    BaseSelect,
    SearchCheckbox,
    filterColorSelector,
    PriceSlider,
    Accordion,
    Breadcrumbs,
    // SortBy,
    Columns,
    Slide,
    Carousel,
    'no-ssr': NoSSR
  },
  mixins: [onBottomScroll, Category],
  computed: {
    ...mapState({
      seletedMobileGrid: state => state.ui.seletedMobileGrid,
      defaultColumnMobile: state => state.ui.defaultColumnMobile,
      defaultColumnWeb: state => state.ui.defaultColumnWeb,
      mobileGridData: state => state.ui.mobileGridData
    }),
    ...mapGetters('searchSpringCategory', ['serachedProd', 'filterData', 'searchRes', 'categoryHierarchy', 'priceSliderData', 'priceSliderActiveRange', 'sortingFilterOptions', 'sortingFilterSelected' , 'getStoredCurrentRouterPath', 'getMerchandisingContent'])
  },
  data () {
    return {
      currentPage: 1,
      squery: '',
      sortingFilterSelectedValue: '',
      paginationLoader: false,
      setTime: Object,
      mobileFilters: false,
      searchedValue: '',
      searcingLoaderFlag: true,
      controller: null,
      signal: null,  
      // defaultColumn: 3,
      fixedOrderPanel: false,
      initialSearchFlag: true,
      sliderConfig: {
            perPageCustom: [[0, 3], [425, 4], [768, 6], [1024, 6]],
            perPage: 3,
            paginationEnabled: false,
            // loop: true,
            // paginationSize: 6
      },
      navVisible: true,
      isScrolling: false,
      scrollTop: 0,
      lastScrollTop: 0,
      navbarHeight: 70,
      classNameTab: ''
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
    // console.log('beforeMount storee', this.$store.state.searchSpringCategory)
     if(this.getStoredCurrentRouterPath !== this.$route.path ) {
        this.searchDataInSearchSpring();
        this.$store.dispatch('searchSpringCategory/reset_categoryFilterOption')
      } else {
        this.searcingLoaderFlag = false;
        this.initialSearchFlag = false;
      }
    this.$bus.$on('close-sidebar-panel', this.closeFilters);

    document.addEventListener('scroll', () => {
      this.isScrolling = true
      this.handleScroll()
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
    // console.log('searchSpringCategory storee', this.$store.state.searchSpringCategory)
    // this.searchDataInSearchSpring();
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
  },
  methods: {
    hasScrolled () {
      this.scrollTop = window.scrollY
      if (this.scrollTop <= 150) {
          this.classNameTab = ''
          this.lastScrollTop = this.scrollTop
          return
      }
      if (this.scrollTop > this.lastScrollTop && this.scrollTop > this.navbarHeight) {
        this.navVisible = true
        this.classNameTab = 'filtertab_pos-fixed-top-on-bottom' 
      } else {
        this.navVisible = false
        this.classNameTab = 'filtertab_pos-fixed-top-on-top'
      }
      this.lastScrollTop = this.scrollTop
    },
   setEmarsysTracker () {
      this.$bus.$emit('send-to-emarsys-tracking', { type: 'Category', categoryData: this.getCurrentCategoryUrlPath(' > ')});
    },

    imgUrlAlt(event) {
       event.target.src = "/assets/colour/multi.png"
    }, 
    validateRouteCategory () {
        // console.log('validateRouteCategory',this.$route.path)
        this.searcingLoaderFlag = true;
        this.initialSearchFlag = true;
        this.setEmarsysTracker();
        this.searchDataInSearchSpring();
        this.$store.dispatch('searchSpringCategory/reset_categoryFilterOption')
    },
    async getSearchData (onScroll = false, abortApiCallFlag = false) {
      // this.$bus.$emit('notification-progress-start', 'Please wait...');
      let searchUrl = config.searchspring.url + config.searchspring.paginationResPerPage + this.filterData.join('&');
      try {
        if (!onScroll) {
          this.$store.dispatch('searchSpringCategory/resetSearchedProducts');
        }

         if (this.controller !== null && abortApiCallFlag) {
            // Cancel the previous request
            this.controller.abort();
        }

        if ("AbortController" in window) {
          this.controller = new AbortController();
          this.signal = this.controller.signal; 
        }
        // console.log("22222222222222",this.filterData); 
             
        // this.filterData.push("filter.size=8");
        // this.filterData.push("filter.size=XS");
        const searchResults = await this.$store.dispatch('searchSpringCategory/searchInSearchSpringPlatform', {filterData: this.filterData, signal: this.signal })
        // console.log('Search Spring Results', searchResults);
        // if (this.squery.length < 2) {
        //     if (this.searchedValue.length < 2) {
        //       this.$store.dispatch('searchSpringCategory/resetSearchedProducts');
        //       return;
        //     }
        // }
        if (searchResults && searchResults.results && searchResults.results.length > 0) {
          let prodSku = [];
          searchResults.results.filter(val => {
            prodSku.push(val.uid);
          });
          // console.log('last data', prodSku);
          await this.getDataFromElastic(prodSku, onScroll);
          this.paginationLoader = false;
          this.searcingLoaderFlag = false;
          if (this.filterData.length === 1) {

            const priceSliderData = searchResults.facets.find(
              val => val.field === 'final_price'
            );
            this.$store.dispatch('searchSpringCategory/set_priceSliderData', {sliderData: priceSliderData, sliderActiveRange: priceSliderData.range , sortingFilterOptions: searchResults.sorting.options })
            setTimeout(() => {
              this.$bus.$emit('reset-price-slider');
            }, 100);
            
            // this.sortingFilterOptions = searchResults.sorting.options;
            // console.log('this.priceSliderData', this.priceSliderData);
          }
          if (this.getStoredCurrentRouterPath !== this.$route.path || this.initialSearchFlag) { 
              this.initialSearchFlag = false;
              this.$store.dispatch('searchSpringCategory/set_categoryHierarchy', searchResults.facets.find(
                val => val.field === 'category_hierarchy'));
          }
          this.$store.dispatch('searchSpringCategory/addSearchSpringSearchResult', searchResults).then(res => {
              // this.searchedValue = this.filterData[0].split('=')[1];
          });
          // setTimeout(() => {
          //   this.searchedValue = this.filterData[0].split('=')[1];
          // }, 100);
          this.$bus.$emit('notification-progress-stop')
        } else {
          if (searchResults.pagination.totalResults === 0 ) {
            this.searcingLoaderFlag = false;
          }
          this.$store.dispatch('searchSpringCategory/addSearchSpringSearchResult', searchResults).then(res => {
              // this.searchedValue = this.filterData[0].split('=')[1];
          });
          this.$store.dispatch('searchSpringCategory/resetSearchedProducts');
          this.paginationLoader = false;
          // console.log('else  erorrrrrr')

          if (!abortApiCallFlag || searchResults.includes('Failed to fetch')) {
            this.searcingLoaderFlag = false;
          }
          this.$bus.$emit('notification-progress-stop')
        }
        // console.log('this.searchRes', this.searchRes);
      } catch (e) { 
        this.$bus.$emit('notification-progress-stop') 
        // console.log('sec erorrrrrr', e)
        // this.searcingLoaderFlag = false;
        this.paginationLoader = false;
        }
    },

    async getDataFromElastic (searchedData, onScroll = false) {
      let query = new SearchQuery();
      query = query.applyFilter({ key: 'id', value: { eq: searchedData } });
      const { items } = await this.$store.dispatch(
        'product/list',
        { query, start: 0, size: searchedData.length, updateState: false },
        { root: true }
      );
      // console.log('Es results', items);
      const sortedData = items.sort((a, b) =>
        searchedData.indexOf(a.id.toString()) - searchedData.indexOf(b.id.toString())
      );
      this.$store.dispatch('searchSpringCategory/addProdcutsItems', {onScroll: onScroll, products: sortedData})
      return this.serachedProd;
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

    setFilterData (facetssection, item) {
      // console.log('setFilterData', facetssection, item);
      item.active = true;
      if (facetssection.field === 'category_hierarchy') {
        if ( this.findIndexInFilterItems ('filter.category_hierarchy') ) {
          this.$store.dispatch('searchSpringCategory/removeFilterItem', 'filter.category_hierarchy')
        }
        this.$store.dispatch('searchSpringCategory/addFilterItems','filter.' + facetssection.field + '=' + encodeURIComponent(item.value))
        // console.log('setFilterData =>>>', this.filterData);
      } else {
        if ( this.filterData.includes('filter.' + facetssection.field + '=' + encodeURIComponent(item.value))) {
          this.$store.dispatch('searchSpringCategory/removeFilterItem', 'filter.' + facetssection.field + '=' + encodeURIComponent(item.value));
        } else {
          this.$store.dispatch('searchSpringCategory/addFilterItems', 'filter.' + facetssection.field + '=' + encodeURIComponent(item.value));
        }
      }
      // console.log(' this.filterData', this.filterData);
      this.showNotificationLoader();
      // this.$bus.$emit('notification-progress-start', 'Please wait...');
      this.getSearchData();
    },

    setCategoryFilterData (facetssection, item) {
      this.$store.dispatch('searchSpringCategory/set_categoryHierarchy', {...item, field: facetssection.field, active: true})
      if (facetssection.field === 'category_hierarchy') {
        if (this.findIndexInFilterItems ('filter.category_hierarchy')) {
          this.$store.dispatch('searchSpringCategory/removeFilterItem', 'filter.category_hierarchy')
        }
        this.$store.dispatch('searchSpringCategory/addFilterItems', 'filter.' + facetssection.field + '=' + encodeURIComponent(item.value))
        // console.log('setFilterData =>>>', this.filterData);
        this.showNotificationLoader();
        // this.$bus.$emit('notification-progress-start', 'Please wait...');
        this.getSearchData();
      }
    },

    setCategoryFilterHistory (item, index = 0) {
      // console.log('this.categoryHierarchy', this.categoryHierarchy, index);
      if (item.active) { return; }
      if (item && item.type === 'view all') {
        this.$store.dispatch('searchSpringCategory/reset_categoryFilterOption')
      } else {
        this.$store.dispatch('searchSpringCategory/reset_categoryFilterOption')
        this.$store.dispatch('searchSpringCategory/set_categoryHierarchy', this.categoryHierarchy.filter((val, i) => i < index))
        this.$store.dispatch('searchSpringCategory/set_categoryHierarchy', {...item, field: item.field, active: true})
        // console.log('this.categoryHierarchy pushed', this.categoryHierarchy);
      }

      if ( this.findIndexInFilterItems ('filter.category_hierarchy')) {
        this.$store.dispatch('searchSpringCategory/removeFilterItem', 'filter.category_hierarchy');
        let routeString = this.getCurrentCategoryUrlPath() ;
        if(routeString.includes('&')) {
          routeString = encodeURIComponent(routeString)
        }
        this.$store.dispatch('searchSpringCategory/addFilterItems', 'filter.category_hierarchy=' + routeString)
      }
      if (item && item.type !== 'view all') {
        this.$store.dispatch('searchSpringCategory/addFilterItems', 'filter.' + item.field + '=' + encodeURIComponent(item.value))
      }
      // console.log('setFilterData =>>>', this.filterData);
      this.showNotificationLoader();
      // this.$bus.$emit('notification-progress-start', 'Please wait...');
      this.getSearchData();
      // }
    },

    removeFilterFlag (item) {
      // console.log('removeFilterFlag', item);
      if (item.field === 'final_price') {
        if ( this.findIndexInFilterItems ('filter.final_price.low')) {
          this.$store.dispatch('searchSpringCategory/removeFilterItem', 'filter.final_price.low')
        }
        if ( this.findIndexInFilterItems ('filter.final_price.high')) {
          this.$store.dispatch('searchSpringCategory/removeFilterItem', 'filter.final_price.high')
        }
        this.$bus.$emit('reset-price-slider');
        this.showNotificationLoader(true);
        // this.$bus.$emit('notification-progress-start', 'Please wait...');
        this.getSearchData();
      } else if (this.filterData.includes('filter.' + item.field + '=' + encodeURIComponent(item.value))) {
        if (this.filterData.indexOf('filter.' + item.field + '=' + encodeURIComponent(item.value)) >= 0) {
          this.$store.dispatch('searchSpringCategory/removeFilterItem', 'filter.' + item.field + '=' + encodeURIComponent(item.value))
        }
        this.showNotificationLoader(true);
        // this.$bus.$emit('notification-progress-start', 'Please wait...');
        this.getSearchData();
      }
      // console.log('this.filterData', this.filterData);
    },

    clearAllFilter () {
      this.$store.dispatch('searchSpringCategory/resetFilterData');
      this.$store.dispatch('searchSpringCategory/resetCategoryHierarchy');
      let routeString = this.getCurrentCategoryUrlPath() ;
      this.searchedValue =  routeString
      if(routeString.includes('&')) {
        routeString = encodeURIComponent(routeString)
      }
      this.$store.dispatch('searchSpringCategory/addFilterItems', 'filter.category_hierarchy=' + routeString)
      this.$bus.$emit('reset-price-slider');
      this.showNotificationLoader(true);
      this.initialSearchFlag = true;
      // this.$bus.$emit('notification-progress-start', 'Please wait...');
      this.getSearchData();
    },

    priceSliderChanged (range) {
      // console.log('priceSliderChanged', range);
      this.$store.dispatch('searchSpringCategory/set_priceSliderActiveRange', range)
      setTimeout(() => {
          this.$bus.$emit('reset-active-price-slider')
      }, 50);  
      if ( this.findIndexInFilterItems ('filter.final_price.low')) {
        this.$store.dispatch('searchSpringCategory/removeFilterItem', 'filter.final_price.low')
      }
      if ( this.findIndexInFilterItems ('filter.final_price.high')) {
        this.$store.dispatch('searchSpringCategory/removeFilterItem', 'filter.final_price.high')
      }
      this.$store.dispatch('searchSpringCategory/addFilterItems', 'filter.final_price.low=' + range.from)
      this.$store.dispatch('searchSpringCategory/addFilterItems', 'filter.final_price.high=' + range.to)
      // console.log('this.filterData', this.filterData);
      this.showNotificationLoader();
      // this.$bus.$emit('notification-progress-start', 'Please wait...');
      this.getSearchData();
    },

    sortingFilterChange (value) {
      if (this.findIndexInFilterItems ('sort.')) {
        this.$store.dispatch('searchSpringCategory/removeFilterItem', 'sort.')
      }
      this.$store.dispatch('searchSpringCategory/set_sortingFilterSelected', value)
      this.$store.dispatch('searchSpringCategory/addFilterItems', 'sort.' + value.split('$')[0] + '=' + value.split('$')[1])
      // console.log('sortingFilterChange', this.filterData)
      this.showNotificationLoader();
      // this.$bus.$emit('notification-progress-start', 'Please wait...');
      this.getSearchData();
    },

    onBottomScroll () {
      if ( this.findIndexInFilterItems ('page=')) {
        this.$store.dispatch('searchSpringCategory/removeFilterItem', 'page=')
      }
      if (this.searchRes && this.searchRes.pagination && this.searchRes.pagination.nextPage > 0 && !this.paginationLoader) {
        this.paginationLoader = true;
        this.$store.dispatch('searchSpringCategory/addFilterItems', 'page=' + this.searchRes.pagination.nextPage)
        this.getSearchData(true);
      }
    },

    resetAllFilterResult () {
      // console.log('resetAllFilterResult')
      this.$store.dispatch('searchSpringCategory/resetAllFilterResult');
      this.$store.dispatch('searchSpringCategory/resetFilterData')
      this.squery = '';
      this.$store.dispatch('searchSpringCategory/resetSearchSpringSearchRes')
      this.$store.dispatch('searchSpringCategory/resetSearchedProducts');
      this.$store.dispatch('searchSpringCategory/reset_categoryFilterOption')
      // this.priceSliderData = {};
      this.sortingFilterSelectedValue = '';
      this.searchedValue = null;
      this.paginationLoader = false;
    },
    openFilters () {
      this.mobileFilters = true;
      this.$store.commit('ui/setOverlay', true);
      const el = document.body; // to fix background scroll issue when the filter opened
      el.classList.add('openfilter');
      el.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    },
    closeFilters (closeFlag) {
      this.mobileFilters = false
      this.$store.commit('ui/setOverlay', false);
      const el = document.body;
      el.classList.remove('openfilter');
      el.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    },
    showNotificationLoader (showNotificationFlag = false) {
        if (!this.mobileFilters || showNotificationFlag) {
          this.$bus.$emit('notification-progress-start', 'Please wait...');
        }
    },
    findIndexInFilterItems (searchText) {
      return this.filterData.findIndex(val => val.includes(searchText)) >= 0
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
      if (column.type === 'lg') {
        this.$store.dispatch('ui/UpdateSeletedWebViewGrid',  column.selected);
      }
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
     handleScroll (){
          //   const checkWindow = window !== undefined && window.scrollY;
          //   let offsety = window.pageYOffset;
          //   if (checkWindow && window.scrollY > 280) {
          //     if (offsety > 10000) {
          //         this.fixedOrderPanel = false
          //     } else {
          //         this.fixedOrderPanel = true
          //     }
          //   } else {
          //     this.fixedOrderPanel = false
          // }
          const viewFooterReachedflag = this.checkElemetReachedInViewPort('.news-letter')
          const isHeaderCategoryShow = this.checkElemetReachedInViewPort('.head_category')
          let filterdiv = document.querySelector('.filterdiv') 
          if (isHeaderCategoryShow && viewFooterReachedflag ) {
            if(filterdiv) {
                filterdiv.classList.remove("fixed");
                filterdiv.classList.remove("footerreached");
            } 
            return
          }
          if (!isHeaderCategoryShow) {
            if(!viewFooterReachedflag) {
              // this.fixedOrderPanel = true
              if(filterdiv) filterdiv.classList.add("fixed");
            }
          } else {
            // this.fixedOrderPanel = false
             if(filterdiv) filterdiv.classList.remove("fixed");
          }
          // const footerheight = this.getdivheight('footer .bg-grey-lighter')
          // const newsletterheight = this.getdivheight('footer .news-letter')
          // const paydivheight = this.getdivheight('footer .mx-auto')
          // let filterdiv = null;
          if (viewFooterReachedflag) {
            // filterdiv = document.querySelector( '.filterdiv' ) // .classList.add("footerreached");
            if (filterdiv) {
              filterdiv.classList.add("footerreached");
              filterdiv.classList.remove("fixed");
            }
          } else {
            filterdiv = document.querySelector( '.filterdiv' ) // .classList.remove("footerreached");
             if (filterdiv) {
              filterdiv.classList.remove("footerreached");
            }
          }
          
    },
    checkElemetReachedInViewPort (className) {
          const el = document.querySelector(className) // '.news-letter'
          if (!el) return false
          const scroll = window.scrollY || window.pageYOffset
          const boundsTop = el.getBoundingClientRect().top + scroll
          // console.log('boundsTop', boundsTop)	
          const viewport = {
            top: scroll,
            bottom: scroll + window.innerHeight,
            }
          const bounds = {
            top: boundsTop,
            bottom: boundsTop + el.clientHeight,
            }
          // console.log('bounds', bounds)
          // console.log('viewport', viewport)
          return ( bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom )
            || ( bounds.top <= viewport.bottom && bounds.top >= viewport.top );
    },
    getdivheight(divclass){
          const el = document.querySelector(divclass).getBoundingClientRect().height
          return el;
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

    getCurrentCategoryUrlPath (joiningString = '/') {            
      let routeUrl= this.breadcrumbs.routes.filter((val , index) => {
        if ( index > 0) {
          return val.name
        }
      });
      routeUrl= routeUrl.map(val => val.name).join(joiningString);    
      let routeString = routeUrl ? routeUrl + joiningString +  this.category.name : this.category.name;
      // console.log('routeString', routeString);
      return routeString  
    }


  },
  beforeDestroy () {
    this.$bus.$off('close-sidebar-panel');
  },
  destroyed () {
    document.removeEventListener('scroll', this.handleScroll);
  },
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
      bottom: 515px;
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
    top: 198px;
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
