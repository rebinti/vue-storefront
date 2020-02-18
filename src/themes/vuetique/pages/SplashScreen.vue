<template>
  <div>
    Mobile Splash Screeen 
    <input type="text" v-model="search">
    <button @click="getSearchData(search)">Search</button>

    <h1>Results</h1>
    <div class="container py-10 leading-loose static-content"
    v-if="searchRes" v-html="searchRes.results" />
  </div>
</template>

<script>
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
      try {
        await fetch(searchUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
          // body: JSON.stringify()
        }).then(res => {
          console.log('ress', res);
          this.searchRes = res;
                    console.log('this.searchRes', this.searchRes);

        });
      } catch (e) {

      };
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

<style lang="scss" scoped>


</style>
