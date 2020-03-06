<template>
  <div>
    Search with Search Spring
    <input type="text" v-model="squery" />
    <button class="button" @click="searchData(squery)">Search</button>
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
        >{{valuesitem.label}}</div>
      </div>
    </div>
    <h1>Results</h1>
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
    </div>
  </div>
</template>

<script>
import { TaskQueue } from "@vue-storefront/core/lib/sync";
import fetch from "isomorphic-fetch";
import omit from "lodash-es/omit";
import SearchQuery from "@vue-storefront/core/lib/search/searchQuery";
import ProductListing from "../components/core/ProductListing.vue";

export default {
  name: "SplashScreen",
  components: {
    ProductListing
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
  data() {
    return {
      currentPage: 1,
      squery: "",
      searchRes: "",
      serachedProd: [],
      filterData: []
    };
  },
  computed: {},
  methods: {
    async getSearchData() {
      let searchUrl =
        'https://api.searchspring.net/api/search/search?siteId=vdwzmz&resultsFormat="native"&' +
        this.filterData.join("&");
      // rq=' + data
      // let searchUrl = 'https://api.searchspring.net/api/search/search?siteId=akjx6f&rq=jeans&resultsFormat="native"&bgfilter.category="men>shirts"';
      try {
        this.serachedProd = [];
        const resss = await fetch(searchUrl, {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          }
          // body: JSON.stringify()
        }).then(res => {
          return res.json();
        });
        console.log("ress", resss);
        if (resss && resss.results.length > 0) {
          // var object = resss.results.reduce(
          //   (obj, item) => Object.assign(obj, item.sku), []);
          let late = [];
          resss.results.filter(val => {
            late.push(val.sku);
          });
          console.log("last data", late);
          this.getDataFromED(late);
          resss.facets = resss.facets.filter(
            val => val.label !== "Price" && val.values.length > 0
          );
          // resss.facets = resss.facets.filter(val => val.values.length > 0);
          this.searchRes = resss;
        } else {
          this.serachedProd = [];
        }
        // console.log('this.searchRes', this.searchRes);
      } catch (e) {}
    },

    async getDataFromED(searchedData) {
      let query = new SearchQuery();
      query = query.applyFilter({ key: "sku", value: { eq: searchedData } });
      console.log("queryyyyy", query);
      const { items } = await this.$store.dispatch(
        "product/list",
        { query, start: 0, size: searchedData.length, updateState: false },
        { root: true }
      );
      console.log("resssssssssssssss", items);
      this.serachedProd = items;
    },
    searchData(squerydata) {
      this.filterData = [];
      this.serachedProd = [];
      this.filterData.push("rq=" + squerydata);
      this.getSearchData();
    },
    setFilterData(facetssection, item) {
      if (facetssection.field === "category_hierarchy") {
        if (this.filterData.includes("bgfilter.category=" + item.value)) {
          this.filterData.splice(
            this.filterData.indexOf("bgfilter.category=" + item.value),
            1
          );
        } else {
          this.filterData.push("bgfilter.category=" + item.value);
        }
      } else {
        if (
          this.filterData.includes(
            "filter." + facetssection.field + "=" + item.value
          )
        ) {
          this.filterData.splice(
            this.filterData.indexOf(
              "filter." + facetssection.field + "=" + item.value
            ),
            1
          );
        } else {
          this.filterData.push(
            "filter." + facetssection.field + "=" + item.value
          );
        }
      }
      console.log(" this.filterData", this.filterData);
      this.getSearchData();
    },
    removeFilterFlag(item) {
      if (this.filterData.includes("filter." + item.field + "=" + item.value)) {
        if (
          this.filterData.indexOf("filter." + item.field + "=" + item.value) >=
          0
        ) {
          this.filterData.splice(
            this.filterData.indexOf("filter." + item.field + "=" + item.value),
            1
          );
        }
      }
      console.log("this.filterData", this.filterData);
      // else {
      //   this.filterData.push('filter.' + item.field + '=' + item.value)
      // }
      this.getSearchData();
    },
    clearAllFilter() {
      this.filterData = [];
      this.filterData.push("rq=" + this.squery);
      this.getSearchData();
    }
  },
  mounted: {
    setdata() {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
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
  height: 393px;
  width: 100%;
  overflow: scroll;
}
input {
  border: 1px solid #ccc;
}

.filter-box {
  width: 69px;
  border: 1px solid;
  padding: 3px 10px 3px 10px;
  margin: 0 7px 0 0;
  border-radius: 10px;
}
</style>
