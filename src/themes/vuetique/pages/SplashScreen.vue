<template>
  <div>
    <div class="row" style="margin-top: 10px;">
      <div class="col-6" style="margin:0 auto">
        <h4 class="col-6" @click="getSearchData">
          Search with Search Spring
        </h4>
        <div class="col-6 flex items-center relative mb-4" style="margin-top: 10px;">
          <base-input
            ref="search"
            name="search"
            type="text"
            id="search_panel_input"
            :placeholder="$t('Type what you are looking for...')"
            class="w-full"
            v-model="squery"
            @input="searchDataInSearchSpring"
            focus
          />
          <svg viewBox="0 0 25 25" class="vt-icon--sm absolute right-0 mr-2 w-6 h-6 text-grey">
            <use xlink:href="#search" />
          </svg>
        </div>
      </div>
    </div>
    <div class="container pb-5">
      <div class="row gutter-md" v-if="searchRes.filterSummary && searchRes.filterSummary.length>0">
        <span
          v-for="filter in searchRes.filterSummary"
          :key="filter.label"
          @click="removeFilterFlag(filter)"
          class="filter-box"
        >
          {{ filter.label }}
          <span
            v-if="filter.field === 'final_price'"
          >{{ $store.state.config.i18n.currencySign }} {{ filter.value.rangeLow }}- {{ $store.state.config.i18n.currencySign }} {{ filter.value.rangeHigh }}</span>&nbsp; x &nbsp;
        </span>
        <span
          class="filter-box"
          v-if="searchRes.filterSummary && searchRes.filterSummary.length>0"
          @click="clearAllFilter()"
        >Clear All</span>
      </div>
    </div>

    <div class="container pb-16">
      <div class="row gutter-md">
        <div class="col-3">
          <div class>
            <div class="sidebar">
              <h1>Filters</h1>
              <div class="container leading-loose static-content customm">
                <div
                  v-for="facetsitem in searchRes.facets"
                  :key="facetsitem.field"
                  class="filterdata"
                >
                  <h2><b>{{ facetsitem.label }}</b></h2>

                  <div v-if="facetsitem && facetsitem.type && facetsitem.type === 'hierarchy'" style="min-height: 20px;">
                    <p @click="setCategoryFilterHistory({type: 'view all'})"
                       v-if="(facetsitem.facet_active > 0 && categoryHierarchy.length >= 0 && facetsitem.values.length > 0) || categoryHierarchy.length > 0"
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
                  </div>

                  <div v-else>
                    <search-checkbox
                      v-for="(valuesitem,index) in facetsitem.values" :key="valuesitem.value"
                      class="col-xs-12 mb15"
                      :id="valuesitem.label+index+valuesitem.count"
                      v-model="valuesitem.active"
                      @click="setFilterData (facetsitem, valuesitem)"
                    >
                      {{ valuesitem.label }} ({{ valuesitem.count }})
                    </search-checkbox>

                    <price-slider
                      v-if="priceSliderData && priceSliderData.type && priceSliderData.type === 'slider' && facetsitem.type === 'slider'"
                      context="category"
                      id="price"
                      code="price"
                      :price-range="priceSliderData.range"
                      content="Price"
                      label="Price Label"
                      :interval="priceSliderData.step"
                      @sliderChanged="sliderChanged"
                    />
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 lg:col-9 pr_list_sec_main">
          <div class="row">
            <div class="col-9">
            <h2 style="width:100%;padding-bottom:25px;">
              Results
              <sub v-if="searchRes.pagination">({{ searchRes.pagination.totalResults }} Products)</sub>
            </h2>
            </div>
            <div class="col-3">
              <base-select
                v-if="sortingFilterOptions && sortingFilterOptions.length"
                class="col-12 md:col-6 mb-6 txt_blk_select"
                name="sort"
                v-model="sortingFilterSelcted"
                :options="sortingFilterOptions"
                :selected="sortingFilterSelcted"
                :placeholder="$t('Sorting *')"
                @input="sortingFilterChange"
              />
            </div>
          </div>
          <product-listing :columns="3" :products="serachedProd" />
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
            <h3 style="text-align: center;"> Please wait for loading more... </h3>
          </div>
          <div v-if="serachedProd.length === 0">
            <h5>NO RESULTS FOUND <span v-if="squery">FOR {{ squery }} </span>!.</h5>
            <h6>If you are not seeing any results, try removing some of your selected filters above.</h6>
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

import BaseInput from 'theme/components/core/blocks/Form/BaseInput';
// import ButtonFull from 'theme/components/theme/ButtonFull';
// import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'
import NoScrollBackground from 'theme/mixins/noScrollBackground';

import SearchCheckbox from 'theme/components/core/blocks/SearchSpringSearch/genericSelectFilterItem';
import PriceSlider from 'theme/components/core/blocks/SearchSpringSearch/PriceSlider';
import BaseSelect from 'theme/components/core/blocks/SearchSpringSearch/BaseSelect';
import config from 'config'

import onBottomScroll from '@vue-storefront/core/mixins/onBottomScroll'

export default {
  name: 'SplashScreen',
  components: {
    ProductListing,
    BaseInput,
    // ButtonFull,
    BaseSelect,
    SearchCheckbox,
    PriceSlider
  },
  mixins: [onBottomScroll],
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
      categoryHierarchy: [],
      priceSliderData: {},
      sortingFilterSelcted: '',
      sortingFilterOptions: [],
      paginationLoader: false,
      setTime: Object
    };
  },
  computed: {},
  methods: {
    async getSearchData (onScroll = false) {
      // this.$bus.$emit('notification-progress-start', 'Please wait...');
      let searchUrl = config.searchspring.url + config.searchspring.paginationResPerPage + this.filterData.join('&');
      try {
        if (!onScroll) { this.serachedProd = []; }
        const searchResults = await fetch(searchUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        }).then(res => {
          return res.json();
        });
        console.log('Search Spring Results', searchResults);
        if (searchResults && searchResults.results.length > 0) {
          // var object = searchResults.results.reduce(
          //   (obj, item) => Object.assign(obj, item.sku), []);
          let prodSku = [];
          searchResults.results.filter(val => {
            prodSku.push(val.sku);
          });
          console.log('last data', prodSku);
          await this.getDataFromElastic(prodSku, onScroll);
          this.paginationLoader = false;
          if (this.filterData.length === 1) {
            this.priceSliderData = searchResults.facets.find(
              val => val.field === 'final_price'
            );
            this.sortingFilterOptions = searchResults.sorting.options;
            console.log('this.priceSliderData', this.priceSliderData);
          }
          // searchResults.facets = searchResults.facets.filter(
          //   val => val.label !== 'Price'
          // );
          // if (searchResults.facets.some(val => val.field === 'category_hierarchy')) {  
          //   const category = searchResults.facets.find(val => val.field === 'category_hierarchy');
          //   this.categoryHierarchy.push(category);

          //   // if (category.facet_active === 0 && category.values.length === 0) {
          //   //     this.categoryHierarchy = [];
          //   // } else {
          //   //   this.categoryHierarchy.push(category);
          //   // }
          // }
          // console.log('this.categoryHierarchy', this.categoryHierarchy);
          // searchResults.facets = searchResults.facets.filter(val => val.values.length > 0);
          this.searchRes = searchResults;
          this.$bus.$emit('notification-progress-stop')
        } else {
          this.serachedProd = [];
          this.searchRes = searchResults;
          this.$bus.$emit('notification-progress-stop')
        }
        // console.log('this.searchRes', this.searchRes);
      } catch (e) { this.$bus.$emit('notification-progress-stop') }
    },

    async getDataFromElastic (searchedData, onScroll = false) {
      let query = new SearchQuery();
      query = query.applyFilter({ key: 'sku', value: { eq: searchedData } });
      const { items } = await this.$store.dispatch(
        'product/list',
        { query, start: 0, size: searchedData.length, updateState: false },
        { root: true }
      );
      console.log('Es results', items);
      const sortedData = items.sort((a, b) =>
        searchedData.indexOf(a.sku) - searchedData.indexOf(b.sku)
      );
      if (!onScroll) {
        this.serachedProd = sortedData
      } else {
        this.serachedProd.push(...sortedData);
      }
      return this.serachedProd;
    },

    searchDataInSearchSpring (squerydata) {
      console.log('squerydata', this.squery, squerydata, squerydata.length);
      if (this.squery.length > 2) {
        this.filterData = [];
        this.serachedProd = [];
        this.filterData.push('rq=' + this.squery);
        clearTimeout(this.setTime);
        this.setTime = setTimeout(() => {
          this.getSearchData();
        }, 400);
      } else {
        this.filterData = [];
        this.serachedProd = [];
      }
    },

    setFilterData (facetssection, item) {
      console.log('setFilterData', facetssection, item);
      if (facetssection.field === 'category_hierarchy') {
        if (
          this.filterData.findIndex(val =>
            val.includes('filter.category_hierarchy')
          ) >= 0
        ) {
          this.filterData.splice(
            this.filterData.findIndex(val =>
              val.includes('filter.category_hierarchy')
            ),
            1
          );
        }
        this.filterData.push(
          'filter.' + facetssection.field + '=' + encodeURIComponent(item.value)
        );
        console.log('setFilterData =>>>', this.filterData);
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
            'filter.' +
              facetssection.field +
              '=' +
              encodeURIComponent(item.value)
          )
        ) {
          this.filterData.splice(
            this.filterData.indexOf(
              'filter.' +
                facetssection.field +
                '=' +
                encodeURIComponent(item.value)
            ),
            1
          );
        } else {
          this.filterData.push(
            'filter.' +
              facetssection.field +
              '=' +
              encodeURIComponent(item.value)
          );
        }
      }
      console.log(' this.filterData', this.filterData);
      this.$bus.$emit('notification-progress-start', 'Please wait...');
      this.getSearchData();
    },

    setCategoryFilterData (facetssection, item) {
      this.categoryHierarchy.map(val => { if (val.active) val.active = false; })
      this.categoryHierarchy.push({...item, field: facetssection.field, active: true})
      if (facetssection.field === 'category_hierarchy') {
        if (
          this.filterData.findIndex(val =>
            val.includes('filter.category_hierarchy')
          ) >= 0
        ) {
          this.filterData.splice(
            this.filterData.findIndex(val =>
              val.includes('filter.category_hierarchy')
            ),
            1
          );
        }
        this.filterData.push(
          'filter.' + facetssection.field + '=' + encodeURIComponent(item.value)
        );
        console.log('setFilterData =>>>', this.filterData);
        this.$bus.$emit('notification-progress-start', 'Please wait...');
        this.getSearchData();
      }
    },

    setCategoryFilterHistory (item, index = 0) {
      console.log('this.categoryHierarchy', this.categoryHierarchy, index);
      if (item.active) { return; }
      if (item && item.type === 'view all') {
        this.categoryHierarchy = [];
      } else {
        this.categoryHierarchy = this.categoryHierarchy.filter((val, i) => i < index);
        this.categoryHierarchy.map(val => { if (val.active) val.active = false; });
        this.categoryHierarchy.push({...item, field: item.field, active: true});
        console.log('this.categoryHierarchy pushed', this.categoryHierarchy);
      }

      // if (item.field === 'category_hierarchy') {
      if (
        this.filterData.findIndex(val =>
          val.includes('filter.category_hierarchy')
        ) >= 0
      ) {
        this.filterData.splice(
          this.filterData.findIndex(val =>
            val.includes('filter.category_hierarchy')
          ),
          1
        );
      }
      if (item && item.type !== 'view all') {
        this.filterData.push(
          'filter.' + item.field + '=' + encodeURIComponent(item.value)
        );
      }
      console.log('setFilterData =>>>', this.filterData);
      this.$bus.$emit('notification-progress-start', 'Please wait...');
      this.getSearchData();
      // }
    },

    removeFilterFlag (item) {
      console.log('removeFilterFlag', item);
      if (item.field === 'final_price') {
        if (
          this.filterData.findIndex(val =>
            val.includes('filter.final_price.low')
          ) >= 0
        ) {
          this.filterData.splice(
            this.filterData.findIndex(val =>
              val.includes('filter.final_price.low')
            ),
            1
          );
        }
        if (
          this.filterData.findIndex(val =>
            val.includes('filter.final_price.high')
          ) >= 0
        ) {
          this.filterData.splice(
            this.filterData.findIndex(val =>
              val.includes('filter.final_price.high')
            ),
            1
          );
        }
        this.$bus.$emit('reset-price-slider');
        this.$bus.$emit('notification-progress-start', 'Please wait...');
        this.getSearchData();
      } else if (
        this.filterData.includes(
          'filter.' + item.field + '=' + encodeURIComponent(item.value)
        )
      ) {
        if (
          this.filterData.indexOf(
            'filter.' + item.field + '=' + encodeURIComponent(item.value)
          ) >= 0
        ) {
          this.filterData.splice(
            this.filterData.indexOf(
              'filter.' + item.field + '=' + encodeURIComponent(item.value)
            ),
            1
          );
        }
        this.$bus.$emit('notification-progress-start', 'Please wait...');
        this.getSearchData();
      }
      console.log('this.filterData', this.filterData);
      // else {
      //   this.filterData.push('filter.' + item.field + '=' + item.value)
      // }
    },

    clearAllFilter () {
      this.filterData = [];
      this.filterData.push('rq=' + this.squery);
      this.$bus.$emit('reset-price-slider');
      this.$bus.$emit('notification-progress-start', 'Please wait...');
      this.getSearchData();
    },

    sliderChanged (range) {
      console.log('sliderChanged', range);

      // filter.final_price.low=12.5&filter.final_price.high=47.5

      if (
        this.filterData.findIndex(val =>
          val.includes('filter.final_price.low')
        ) >= 0
      ) {
        this.filterData.splice(
          this.filterData.findIndex(val =>
            val.includes('filter.final_price.low')
          ),
          1
        );
      }
      if (
        this.filterData.findIndex(val =>
          val.includes('filter.final_price.high')
        ) >= 0
      ) {
        this.filterData.splice(
          this.filterData.findIndex(val =>
            val.includes('filter.final_price.high')
          ),
          1
        );
      }
      this.filterData.push('filter.final_price.low=' + range.from);
      this.filterData.push('filter.final_price.high=' + range.to);
      console.log('this.filterData', this.filterData);
      this.$bus.$emit('notification-progress-start', 'Please wait...');
      this.getSearchData();
    },

    sortingFilterChange (value) {
      if (this.filterData.findIndex(val => val.includes('sort.')) >= 0) {
        this.filterData.splice(
          this.filterData.findIndex(val =>
            val.includes('sort.')
          ),
          1
        );
      }
      this.filterData.push('sort.' + value.split('$')[0] + '=' + value.split('$')[1]);
      console.log('sortingFilterChange', this.filterData)
      this.$bus.$emit('notification-progress-start', 'Please wait...');
      this.getSearchData();
    },

    onBottomScroll () {
      if (this.filterData.findIndex(val => val.includes('page=')) >= 0) {
        this.filterData.splice(this.filterData.findIndex(val => val.includes('page=')), 1);
      }
      if (this.searchRes && this.searchRes.pagination && this.searchRes.pagination.nextPage > 0 && !this.paginationLoader) {
        this.paginationLoader = true;
        this.filterData.push('page=' + this.searchRes.pagination.nextPage)
        this.getSearchData(true);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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

.active {
  font-weight: 800;
}
</style>
