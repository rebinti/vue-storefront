<template>
  <div>
    Search with Search Spring
    <div class="flex items-center relative mb-4">
      <base-input
        ref="search"
        name="search"
        type="text"
        id="search_panel_input"
        :placeholder="$t('Type what you are looking for...')"
        class="w-full"
        v-model="squery"
        @input="searchData"
        focus
      />
      <svg viewBox="0 0 25 25" class="vt-icon--sm absolute right-0 mr-2 w-6 h-6 text-grey">
        <use xlink:href="#search" />
      </svg>
    </div>
    <!-- <input type="text" v-model="squery" /> -->
    <!-- <button class="button" @click="searchData(squery)">Search</button>
    <h1>Filters</h1>
    <div class="container py-10 leading-loose static-content customm">
      <div>
        <span
          v-for="filter in searchRes.filterSummary"
          :key="filter.label"
          @click="removeFilterFlag(filter)"
          class="filter-box"
        >{{ filter.label}} &nbsp; x &nbsp;</span>
        <span
          class="filter-box"
          v-if="searchRes.filterSummary && searchRes.filterSummary.length>0"
          @click="clearAllFilter()"
        >Clear All</span>
      </div>

      <div v-for="facetsitem in searchRes.facets" :key="facetsitem.field" class="filterdata">
        <h2>
          <b>{{facetsitem.label}}</b>
        </h2>

        <div
          v-for="valuesitem in facetsitem.values"
          :key="valuesitem.value"
          @click="setFilterData (facetsitem, valuesitem)"
          :class="{ 'active': valuesitem.active }"
        >
        {{valuesitem.label}} ({{valuesitem.count}})
        </div>
      </div>
      
    </div> -->
    <!-- <h2>All Results <sub v-if="searchRes.pagination"> ({{searchRes.pagination.totalResults}} Products) </sub></h2>
    <div class="container py-10 leading-loose static-content customm">
      <product-listing
        :mob-columns="3"
        :columns="6"
        :products="serachedProd"
        v-if="serachedProd.length>0"
      />
      <div v-if="serachedProd.length === 0">
        <h5>NO RESULTS FOUND!.</h5>
        <h6>If you are not seeing any results, try removing some of your selected filters above.</h6>
      </div>
    </div> -->
    <div class="container pb-5" >
       <div class="row gutter-md" v-if="searchRes.filterSummary && searchRes.filterSummary.length>0">
            <span
              v-for="filter in searchRes.filterSummary"
              :key="filter.label"
              @click="removeFilterFlag(filter)"
              class="filter-box"
            >{{ filter.label}} &nbsp; x &nbsp;</span>
            <span
              class="filter-box"
              v-if="searchRes.filterSummary && searchRes.filterSummary.length>0"
              @click="clearAllFilter()"
            >Clear All</span>
       </div>
    </div>
        <div class="container pb-16" >
    <div class="row gutter-md" >
        <div class="col-3 hidden lg:block" >
            <div  class="">
                <div class="sidebar" >
                            <h1>Filters</h1>
    <div class="container leading-loose static-content customm">


      <div v-for="facetsitem in searchRes.facets" :key="facetsitem.field" class="filterdata">
        <h2>
          <b>{{facetsitem.label}}</b>
        </h2>

        <div
          v-for="(valuesitem,index) in facetsitem.values"
          :key="valuesitem.value"
          :class="{ 'active': valuesitem.active }"
        >
          <search-checkbox
            class="col-xs-12 mb15"
            :id="valuesitem.label+index+valuesitem.count"
            v-model="valuesitem.active"
            @click="setFilterData (facetsitem, valuesitem)"
          >
             {{valuesitem.label}} ({{valuesitem.count}})
          </search-checkbox>
        <!-- {{valuesitem.label}} ({{valuesitem.count}}) -->
        </div>

        <price-slider
        v-if="facetsitem.type === 'slider'"
        context="category"
        id="price"
        code="price"
        :price-range="facetsitem.range"
        content="Price "
        label="Price Label"
      />
      </div>
      
    </div>

                </div>
            </div>
        </div>

        <div  class="col-12 lg:col-9 pr_list_sec_main" >
             <div class="row gutter-md justify-center md:justify-start">
               <h2 style="width:100%;padding-bottom:25px;">All Results <sub v-if="searchRes.pagination"> ({{searchRes.pagination.totalResults}} Products) </sub></h2>
                    <product-listing
                        :mob-columns="3"
                        :columns="3"
                        :products="serachedProd"
                        v-if="serachedProd.length>0"
                    />
                  <div v-if="serachedProd.length === 0">
                    <h5>NO RESULTS FOUND!.</h5>
                    <h6>If you are not seeing any results, try removing some of your selected filters above.</h6>
                </div>
             </div>
        </div>
    </div>
    </div>

  </div>
</template>

<script>
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import fetch from 'isomorphic-fetch';
import omit from 'lodash-es/omit';
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery';
import ProductListing from '../components/core/ProductListing.vue';

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonFull from 'theme/components/theme/ButtonFull'
import NoScrollBackground from 'theme/mixins/noScrollBackground'

import SearchCheckbox from 'theme/components/core/blocks/SearchSpringSearch/genericSelectFilterItem'
import PriceSlider from 'theme/components/core/blocks/SearchSpringSearch/PriceSlider'

export default {
  name: 'SplashScreen',
  components: {
    ProductListing,
    BaseInput,
    ButtonFull,
    SearchCheckbox,
    PriceSlider
  },
  // props: {
  //   perPage: {
  //     type: Number,
  //     required: false,
  //     default: 4
  //   },
  //   items: {
  //     type: Array,
  //     required: true
  //   }
  // },
  data () {
    return {
      currentPage: 1,
      squery: '',
      searchRes: '',
      serachedProd: [],
      filterData: [],
      categoryHierarchy: []
    };
  },
  computed: {},
  methods: {
    async getSearchData () {
      let searchUrl =
        'https://api.searchspring.net/api/search/search?siteId=vdwzmz&resultsFormat="native"&' + this.filterData.join('&');
      // rq=' + data
      // let searchUrl = 'https://api.searchspring.net/api/search/search?siteId=akjx6f&rq=jeans&resultsFormat="native"&bgfilter.category="men>shirts"';
      try {
        this.serachedProd = [];
        const resss = await fetch(searchUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
          // body: JSON.stringify()
        }).then(res => {
          return res.json();
        });
        console.log('ress', resss);
        if (resss && resss.results.length > 0) {
          // var object = resss.results.reduce(
          //   (obj, item) => Object.assign(obj, item.sku), []);
          let late = [];
          resss.results.filter(val => {
            late.push(val.sku);
          });
          console.log('last data', late);
          this.getDataFromED(late);
          // resss.facets = resss.facets.filter(
          //   val => val.label !== 'Price'
          // );
          if (resss.facets.some(val => val.field !== 'category_hierarchy')) {
            this.categoryHierarchy.push(resss.facets.find(val => val.field !== 'category_hierarchy'))
          }
          console.log('this.categoryHierarchy' , this.categoryHierarchy);
          // resss.facets = resss.facets.filter(val => val.values.length > 0);
          this.searchRes = resss;
        } else {
          this.serachedProd = [];
        }
        // console.log('this.searchRes', this.searchRes);
      } catch (e) { }
    },

    async getDataFromED (searchedData) {
      let query = new SearchQuery();
      query = query.applyFilter({ key: 'sku', value: { eq: searchedData } });
      console.log('queryyyyy', query);
      const { items } = await this.$store.dispatch(
        'product/list',
        { query, start: 0, size: searchedData.length, updateState: false },
        { root: true }
      );
      console.log('resssssssssssssss', items);
      this.serachedProd = items;
    },
    searchData (squerydata) {
      console.log('squerydata', squerydata , squerydata.length)
      if (squerydata.length > 2) {
        this.filterData = [];
        this.serachedProd = [];
        this.filterData.push('rq=' + squerydata);
        this.getSearchData();
      }
    },
    setFilterData (facetssection, item) {
      console.log('setFilterData', facetssection, item); 
      if (facetssection.field === 'category_hierarchy') {
        if (this.filterData.findIndex(val => val.includes('filter.category_hierarchy')) >= 0) {
          this.filterData.splice(
            this.filterData.findIndex(val => val.includes('filter.category_hierarchy')),
            1
          );
        }
        this.filterData.push('filter.' + facetssection.field + '=' + encodeURIComponent(item.value));
        console.log('setFilterData =>>>', this.filterData)
        // return;
        // if (this.filterData.includes("bgfilter.category=" + item.value)) {
        //   this.filterData.splice(
        //     this.filterData.indexOf("bgfilter.category=" + item.value),
        //     1
        //   );
        // } else {
        //   this.filterData.push("bgfilter.category=" + item.value);
        // }
      } else {
        if (
          this.filterData.includes(
            'filter.' + facetssection.field + '=' + encodeURIComponent(item.value)
          )
        ) {
          this.filterData.splice(
            this.filterData.indexOf(
              'filter.' + facetssection.field + '=' + encodeURIComponent(item.value)
            ),
            1
          );
        } else {
          this.filterData.push(
            'filter.' + facetssection.field + '=' + encodeURIComponent(item.value)
          );
        }
      }
      console.log(' this.filterData', this.filterData);
      this.getSearchData();
    },
    removeFilterFlag (item) {
      if (this.filterData.includes('filter.' + item.field + '=' + encodeURIComponent(item.value))) {
        if (
          this.filterData.indexOf('filter.' + item.field + '=' + encodeURIComponent(item.value)) >=
          0
        ) {
          this.filterData.splice(
            this.filterData.indexOf('filter.' + item.field + '=' + encodeURIComponent(item.value)),
            1
          );
        }
      }
      console.log('this.filterData', this.filterData);
      // else {
      //   this.filterData.push('filter.' + item.field + '=' + item.value)
      // }
      this.getSearchData();
    },
    clearAllFilter () {
      this.filterData = [];
      this.filterData.push('rq=' + this.squery);
      this.getSearchData();
    }
  }
};
</script>

<style>
.customm .item {
  float: left;
  width: 200px;
}

.active {
  font-weight: 800;
}

.filterdata {
  float: left;
  width: 200px;
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
  padding: 3px 10px 3px 10px;
  margin: 0 7px 0 0;
  border-radius: 10px;
}
</style>
