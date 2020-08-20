<template>
  <!-- Side bar for Mobile -->
  <div
    v-if="viewfilterflag === 'mobile' && mobileFilters"
    class="mobile-filters lg:hidden mobile_filter"
  >
    <div class="mobile-filters_new">
      <h2 class="absolute top-0 left-0 m-4 h-4">Filters</h2>
      <button
        type="button"
        :aria-label="$t('Close')"
        class="absolute top-0 right-0 m-4 h-4"
        @click="$emit('closeFilters')"
      >
        <svg viewBox="0 0 25 25" class="vt-icon--sm">
          <use xlink:href="#close" />
        </svg>
      </button>
      <div class>
        <div class="sidebar">
          <!-- <h1>Filters</h1> -->

          <!-- New applied filter list Div -->
          <div class="container pb-5 md: ml-2 lg:hidden" style="margin-top: 10px;">
            <!-- <h1 class="filterhead" v-if="searchRes" >Filters</h1> -->
            <span
              class="filter-box clearall-filter"
              v-if="filteredSearchRes && filteredSearchRes.filterSummary && filteredSearchRes.filterSummary.length>0"
              @click="$emit('clearAllFilter')"
            >Clear All</span>
            <div class="container pb-5 md: ml-2 selectedone">
              <div
                class="row gutter-md"
                v-if="filteredSearchRes && filteredSearchRes.filterSummary && filteredSearchRes.filterSummary.length>0"
              >
                <span
                  v-for="filter in filteredSearchRes.filterSummary"
                  :key="filter.label"
                  @click="$emit('removeFilterFlag', filter)"
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
          <div
            class="container leading-loose static-content customm"
            v-if="filteredSearchRes && filteredSearchRes.facets && filteredSearchRes.facets.length > 0"
          >
            <Accordion
              class="mob_fltr"
              v-for="(facetsitem) in filteredSearchRes.facets"
              :key="facetsitem.field"
              :openType="facetsitem.facet_active === 0 ? false : true"
              :title="$t(facetsitem.label)"
              v-if="facetsitem.type !== 'hierarchy' && (facetsitem.values && facetsitem.values.length > 0 ) || (facetsitem.type === 'slider') || (categoryHierarchy.length > 0)"
            >
              <div
                v-if="facetsitem && facetsitem.type && facetsitem.type === 'hierarchy'"
                style="min-height: 20px;"
              >
                <p
                  @click="$emit('setCategoryFilterHistory' , { item : { type: 'view all' }})"
                  v-if="(facetsitem.facet_active > 0 && categoryHierarchy.length > 0 && facetsitem.values.length > 0) || categoryHierarchy.length > 0"
                >View all</p>
                <p
                  v-for="(categ, index) in categoryHierarchy"
                  :key="categ.value + index"
                  @click="$emit('setCategoryFilterHistory' , { item: categ, index: index })"
                  :class="{'active': categ.active}"
                >{{ categ.label }}</p>
                <p
                  v-for="(valuesitem) in facetsitem.values"
                  :key="valuesitem.value"
                  @click="$emit('setCategoryFilterData', { facetssection: facetsitem, item: valuesitem })"
                >{{ valuesitem.label }}</p>
              </div>

              <div v-else>
                <search-checkbox
                  v-if="facetsitem.field !== 'color' && facetsitem.type !== 'hierarchy'"
                  v-for="(valuesitem,index) in facetsitem.values"
                  :key="valuesitem.value"
                  class="col-xs-12 mb15"
                  :id="valuesitem.label+index+valuesitem.count"
                  v-model="valuesitem.active"
                  :field-type="valuesitem.field"
                  @click.native="$emit('setFilterData', {facetssection: facetsitem, item: valuesitem })"
                >{{ valuesitem.label }}</search-checkbox>

                <filter-color-selector
                  v-if="facetsitem.field === 'color'"
                  v-for="(valuesitem,index) in facetsitem.values"
                  :key="valuesitem.value"
                  :id="valuesitem.label+index+valuesitem.count"
                  :field-type="facetsitem.field"
                  v-model="valuesitem.active"
                  :label="valuesitem.label"
                  @click.native="$emit('setFilterData', {facetssection: facetsitem, item: valuesitem })"
                ></filter-color-selector>

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
                  @sliderChanged="$emit('priceSliderChanged', $event)"
                />
              </div>
            </Accordion>
          </div>

          <div v-else>
            <h5>
              NO RESULTS FOUND
              <span v-if="squery">FOR {{ squery }}</span>!.
            </h5>
            <h6>If you are not seeing any results, try removing some of your selected filters above.</h6>
          </div>

          <div class="mob-siderbar-footer">
            <div class="mob-siderbar-footer-inner">
              <button type="button" class="m-4 h-4 done-button" @click="$emit('closeFilters')">Done</button>
              <button
                type="button"
                :disabled="!(filteredSearchRes && filteredSearchRes.filterSummary && filteredSearchRes.filterSummary.length>0)"
                class="m-4 h-4 reset-button"
                @click="$emit('clearAllFilter')"
              >Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from "theme/components/theme/Accordion.vue";
import PriceSlider from "../components/PriceSlider.vue";
import filterColorSelector from "../components/ColorSelector.vue";
import SearchCheckbox from "../components/genericSelectFilterItem.vue";

export default {
  name: "MobileSiderbarFilter",
  components: {
    filterColorSelector,
    PriceSlider,
    Accordion,
    SearchCheckbox,
  },
  props: {
    viewfilterflag: {
      type: String,
      default: "web",
    },
    searchType: {
      type: String,
      default: "searchSpringCategory",
    },
    mobileFilters: {
      type: Boolean,
      requried: false,
      default: false,
    },
    searchRes: {
      type: null,
      requried: false,
      default: null,
    },
    categoryHierarchy: {
      type: null,
      requried: false,
      default: null,
    },
    priceSliderData: {
      type: null,
      requried: false,
      default: null,
    },
    squery: {
      type: String,
      requried: false,
      default: "",
    },
    getMerchandisingContent: {
      type: null,
      requried: false,
      default: null,
    },
    fixedOrderPanel: {
      type: null,
      requried: false,
      default: null,
    },
    serachFrom: {
      type: String,
      requried: true,
    },
  },
  computed: {
    filteredSearchRes() {
      if (
        this.searchRes &&
        this.searchRes.facets &&
        this.searchRes.facets.length
      ) {
        let filterData = Object.assign({}, this.searchRes || {});
        if (this.serachFrom === "category") {
          filterData.facets = filterData.facets.filter(
            (val) => val.type !== "hierarchy"
          );
          return filterData;
        } else if (this.serachFrom === "brand") {
          filterData.facets = filterData.facets.filter(
            (val) => val.label !== "Brand"
          );
          filterData.filterSummary = filterData.filterSummary.filter(
            (val) => val.filterLabel !== "Brand"
          );
          return filterData;
        } else if (this.serachFrom === "search") {
          return filterData;
        }
      } else {
        return [];
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.fixed {
  position: fixed;
  top: 20px;
  width: 380px;
}
.header-visible .fixed {
  top: 73px;
}
.footerreached {
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
.sidebar .filterdata h2 b {
  font-size: 16px;
  margin-left: 0px;
  font-weight: 600;
}
.sidebar .filterdata {
  width: 350px;
}
.sidebar h2 {
  text-transform: uppercase;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: 600;
  // margin-left: 12px;
}
.sidebar .filterhead {
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
.searchtitle h2 {
  width: 100%;
  padding-bottom: 25px;
  text-transform: uppercase;
  font-size: 16px;
  font-family: sans-serif;
  /* font-weight: 600; */
  margin-left: 15px;
}
.searchtitle h2 sub {
  bottom: 0px;
  font-size: 14px;
}
.searchtitle h2 span {
  font-weight: 600;
}
div.no-result {
  text-align: center;
  margin-top: 50px;
}
div.devicetitle {
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
.onlymobile {
  overflow: hidden;
  height: 50px;
  margin-top: -15px;
}
.onlymobile .col-4 {
  float: left;
  width: 33.33%;
  // border: 2px solid #4e4e4e;
}
.onlymobile .col-4.msort .category_filter_bx_sortby .txt_blk_select select {
  height: 42px;
}
.onlymobile .col-4.mgrid {
  line-height: 1;
  margin-top: 0px;
  height: 46px;
  border: 1px solid #ccc;
}
.onlymobile .col-4.mgrid div span {
  position: absolute;
  margin-top: 16px;
  margin-left: 11px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
}
.onlymobile .col-4.mfilter .mt-6 {
  margin-top: 0px;
  height: 45px;
}
.onlymobile .col-4.mfilter .mt-6 button {
  height: 46px;
  background: #ffffff;
  border: 1px solid #cccccc;
  color: #000;
}
.onlymobile .txt_blk_select:after {
  top: 20px;
}
.filter-top .filter_bx.filter_bx_sort {
  width: 20px;
  height: 20px;
  float: left;
  background-color: transparent;
  border: 0px;
  background: url("../image/sort.png") no-repeat;
}
.filter-top .sort-by .w-full {
  height: 43px !important;
  font-size: 13px !important;
}
.filter-top .filter_bx_grid {
  width: 32px;
  height: 32px;
  float: right;
  background-color: transparent;
  background-size: 32px 32px;
  border: 0px;
  // background: url("../assets/gridview.jpg") no-repeat;
  margin-top: 8px;
}
.lg-sub-cat {
  margin-bottom: 10px;
}
.category_filter_out_pop_box {
  width: 100%;
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
  background: #ffffff;
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

.category-active,
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
    color: #ffffff;
    // line-height: 1.1;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  div#corner-triangle {
    display: none;
  }
  div#corner-triangle.select-active {
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
.clearall-filter {
  float: right;
  border-radius: 0px;
  border-radius: 0px;
  margin-bottom: 15px;
  width: 100px;
  text-align: center;
  margin-right: 8px;
}
.clearall-filter:hover {
  background: #000000;
  color: #ffffff;
}
.selectedone {
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
@media screen and (min-width: 768px) and (max-width: 1600px) {
  .sidebar .filterdata {
    width: 225px;
  }
}

@media (max-width: 1440px) {
  .filterdiv {
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
  .sidebar {
    position: relative;
    padding-bottom: 90px;
  }
  .mobile-filters {
    padding-bottom: 70px;
    width: 85%;
    right: 0;
    left: inherit;
  }
  .mob-siderbar-footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 75px;
    background: #ffffff;
    z-index: 10;
  }
  .mob-siderbar-footer .done-button {
    right: 73px;

    border: 1px solid;
    width: 105px;
    height: 44px;
    background: black;
    color: white;
    font-size: 18px;
  }
  .mob-siderbar-footer .reset-button {
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
  background: #ffffff;
}

.category_filter_out_pop_box_mob {
  width: 100%;
  float: left;
  // padding: 10px 10px;
  background: none;
}

@media (max-width: 320px) {
  .sidebar {
    position: relative;
    padding-bottom: 90px;
  }

  .mob-siderbar-footer .done-button {
    right: 65px;

    border: 1px solid;
    width: 100px;
    height: 31px;
    background: black;
    color: white;
    font-size: 16px;
  }

  .mob-siderbar-footer .reset-button {
    left: auto;
    right: auto;

    border: 1px solid;
    width: 100px;
    height: 31px;
    font-size: 13px;
  }
}

@media screen and (min-width: 520px) and (max-width: 992px) {
  // @media (max-width: 768px) {
  .sidebar {
    position: relative;
    padding-bottom: 90px;
  }
  .mobile-filters {
    padding-bottom: 70px;
    width: 85%;
    right: 0;
    left: inherit;
  }
  .mob-siderbar-footer {
    // position: fixed;
    bottom: 0px;
    width: 100%;
    // height: 75px;
    background: #ffffff;
    z-index: 10;
    text-align: right;
  }
  .mob-siderbar-footer .done-button {
    right: 65px;

    border: 1px solid;
    width: 105px;
    height: 44px;
    background: black;
    color: white;
    font-size: 18px;
  }
  .mob-siderbar-footer .reset-button {
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

.mobile-filters_new h2 {
  line-height: 1.5rem;
}

.columns-label {
  float: left;
  margin-top: 10px;
  padding-right: 9px;
}

.filtertab_pos-fixed-top-on-bottom {
  margin-bottom: 5px;
  position: fixed;
  top: 129px;
  -webkit-transform: translate3d(0, -200%, 8px);
  transform: translate3d(0, -200%, 8px);
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
  -webkit-transform: translate3d(0, -200%, 8px);
  transform: translate3d(0, -200%, 8px);
  z-index: 4;
  padding: 7px 5px 5px 5px;
  background: #fff;
  width: 100%;
  height: 57px;
  max-width: 100%;
}
</style>

