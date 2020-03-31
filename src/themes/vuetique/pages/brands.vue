<template>
  <div class="container">
    <div class="row" style="margin-top: 10px;">
      <div class="col-12 md:col-12 sm:col-12" style="margin:0 auto;">
          <h1> Brands </h1>

          <div class="container col-12" style="margin-top: 30px;">
           <div class="row"> 
                <div class="col-2 brand-box" v-for="brand in brandsList" :key="brand.id">
                    <p> 
                      <router-link
                        class="menu-link"
                        :to="localizedRoute('/brands/' + brand.slug)"
                        exact>
                        {{ brand.slug }}
                      </router-link>
                    </p>
                </div>
          
           </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from 'config'
import { mapState, mapGetters, mapActions } from 'vuex'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery';

export default {
  name: 'brands',
  components: {

  },
  // asyncData ({ store, route }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
  //   return new Promise((resolve, reject) => {
  //     store.dispatch('ui/getBrandList', { // this is just an example how can you modify the search criteria in child components
  //      key: '_type',
  //       value: "brand"
  //     })
  //     resolve()
  //   })
  // },
  mixins: [],
  created () {
      this.getBrandsData();
  },
  computed: {
     ...mapState({
      brandsList: state => state.ui.brandsList,
    }),
    // ...mapGetters('ui', ['getBrandsList']),
    alphabetList() {
      this.brandsList.filter(val => {
          if (!this.alphabetsList.includes(val.slug.charAt(0).toUpperCase())) {
            this.alphabetsList.push(val.slug.charAt(0).toUpperCase())
          }
      })
       return this.alphabetsList.sort();
    }
  },
  data () {
    return {
      alphabetsList : []
    };
  },
  mounted () {

  },
  methods: {
    async getBrandsData() {
      if(this.brandsList.length > 0) { return; }
      this.$store.dispatch('ui/getBrandList', {
          key: '_type',
          value: "brand"
      });
   }
  },
  destroyed () {
   
  }
};
</script>

<style lang="scss" scoped>
  .brand-box {
    min-height: 70px;
    border: 1px solid;
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: center;
  }

</style>
