<template>
  <div>
   Search with Search Spring  
    <input type="text" v-model="squery">
    <button @click="searchData(squery)">Search</button>
<h1>Filters</h1>
 <div class="container py-10 leading-loose static-content customm" >
   <div v-for="facetsitem in searchRes.facets" :key="facetsitem.field" class="filterdata"> 
     <h2><b>{{facetsitem.label}}</b></h2>
  
   <div v-for="valuesitem in facetsitem.values" :key="valuesitem.value" @click="setFilterData (facetsitem, valuesitem)"
   :class="{ 'active': valuesitem.active }" 
   >
      {{valuesitem.label}}
   </div>
 </div >


  </div> 
  <h1>Results</h1>
    <div class="container py-10 leading-loose static-content customm" 
    v-if="searchRes" v-html="searchRes.results" />
  </div>
</template>

<script>
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import fetch from 'isomorphic-fetch'
import omit from 'lodash-es/omit'

export default {
  name: "SplashScreen",
  props: {
    perPage: {
      type: Number,
      required: false,
      default: 4
    },
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentPage: 1,
      squery: '',
      searchRes: '',
      filterData: []
    }
  },
  computed: {

  },
  methods: {
  async getSearchData () {
      let searchUrl = 'https://api.searchspring.net/api/search/search?siteId=akjx6f&' + this.filterData.join('&')
      // rq=' + data
      // let searchUrl = 'https://api.searchspring.net/api/search/search?siteId=akjx6f&rq=jeans&filter.size=6' 
      try {
        const resss = await fetch(searchUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
          // body: JSON.stringify()
        }).then(res => {
          return res.json()
        });
        console.log('ress', resss);
        this.searchRes = resss;
        console.log('this.searchRes', this.searchRes);
      } catch (e) {

      };
    },
    searchData (squerydata) {
      this.filterData.push('rq=' + squerydata);
      this.getSearchData();
    },
    setFilterData (facetssection, item) {
      if (facetssection.field === 'category_hierarchy') {
        if (this.filterData.includes('bgfilter.category=' + item.value)) {
          this.filterData.splice(this.filterData.indexOf('bgfilter.category=' + item.value), 1);
        } else {
          this.filterData.push('bgfilter.category=' + item.value)
        }
      } else {
        if (this.filterData.includes('filter.' + facetssection.field + '=' + item.value)) {
          this.filterData.splice(this.filterData.indexOf('filter.' + facetssection.field + '=' + item.value), 1);
        } else {
          this.filterData.push('filter.' + facetssection.field + '=' + item.value)
        }
      }
      console.log(' this.filterData', this.filterData)
      this.getSearchData()
    }

  },
  mounted: {
    setdata () {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  }
}
</script>

<style>
.customm .item{
    float: left;
    width: 200px;
}

.active {
  font-weight: 800;
}

.filterdata{
     float: left;
    width: 200px;
}
.static-content.customm{
    clear: both;
    /* position: absolute; */
    height: 393px;
    width: 100%;
    overflow: scroll;
}
input{
    border: 1px solid #CCC;
}

</style>
