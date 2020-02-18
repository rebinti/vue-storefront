<template>
  <div>
   Search with Search Spring  
    <input type="text" v-model="search">
    <button @click="getSearchData(search)">Search</button>
<h1>Filters</h1>
 <div class="container py-10 leading-loose static-content customm" >
   <div v-for="filter in searchRes.facets" :key="filter.field"> 
     <h2><b>{{filter.label}}</b></h2>
  
   <div v-for="values in filter.values" :key="values.value">
      {{values.label}}
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
      search: '',
      searchRes: ''
    }
  },
  computed: {

  },
  methods: {
  async getSearchData (data) {
      let searchUrl = 'https://api.searchspring.net/api/search/search?siteId=akjx6f&rq=' + data
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
    filterData (data) {

    }

  },
  mounted: {
    setdata() {
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

</style>
