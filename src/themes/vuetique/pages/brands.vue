<template>
  <div class="container">
    <div class="row" style="margin-top: 10px;">
      <div class="col-12 md:col-12 sm:col-12" style="margin:0 auto;">
          <h1> Brands </h1>
          <div class="container col-12" style="margin-top: 5px;" v-if="brandsLoadedFlag">
             <div class="row">
                <div class="col-12" style="margin-top: 30px;">
                  <button type="button" class="all-brand-button" @click="clearSort" >All Brands</button>
                  <input type="text" class="search-text" v-model="search" placeholder="Search" />
                </div>
              </div>
            <div class="row" style="margin-top: 30px;">          
                  <div :class="['char-box', disableBrandsChar(char) ? 'disable-char-box' : '']" v-for="(char,index) in charList" :key="index"
                  @click="sortbrands(char)">
                      <p> 
                          {{char}}
                      </p>
                  </div>
            </div>
           </div>

          <div class="container col-12" style="margin-top: 30px;margin-bottom: 50px;">
           <div class="row" v-if="visibleProducts.length > 0" > 
                <div class="col-2 brand-box" v-for="brand in visibleProducts" :key="brand.id">
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

          <div class="row" v-if="visibleProducts.length ===0 && brandsLoadedFlag" > 
                <div class="col-12 no-brand-box"  >
                    <p> No brands found!. </p>
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
  data () {
    return {
      search: '',
      alphabetsList : [],
      brandsLoadedFlag: false,
      selectedBrandChar: '',
      charList : Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i))
    };
  },
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
    },
    visibleProducts () {
      const brandsList = this.brandsList || []
      if (this.selectedBrandChar.length > 0 && this.search.length > 0 ) {
        return brandsList.filter(brand => 
        brand.slug.charAt(0).toUpperCase() === this.selectedBrandChar && brand.slug.includes(this.search) );
      } else if (this.selectedBrandChar.length > 0) {
        return brandsList.filter(brand => 
        brand.slug.charAt(0).toUpperCase() === this.selectedBrandChar);
      } else if (this.search.length > 0) {
        return brandsList.filter(brand => brand.slug.includes(this.search));
      }
      return brandsList
    },
  },
  mounted () {
      console.log('char', Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)))
  },
  methods: {
    async getBrandsData() {
      if(this.brandsList.length > 0) { 
        this.brandsLoadedFlag = true;
        return; 
      }
      this.$store.dispatch('ui/getBrandList', {
          key: '_type',
          value: "brand"
      }).then(res => {
         this.brandsLoadedFlag = true;
      });
   },
   sortbrands (brandChar) {
     if (this.disableBrandsChar(brandChar)) return;
     this.selectedBrandChar = brandChar;
   },
   clearSort () {
      this.selectedBrandChar = '';
      this.search = '';
   },
   disableBrandsChar (brandChar) {
     return !this.brandsList.some(val => val.slug.charAt(0).toUpperCase() === brandChar);
     
    //  {
    //       if (!this.alphabetsList.includes(val.slug.charAt(0).toUpperCase())) {
    //         this.alphabetsList.push(val.slug.charAt(0).toUpperCase())
    //       }
    //   })
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
    cursor: pointer;
    font-weight: 700;
    padding-top: 20px;
  }

  .char-box {
    border: 1px solid;
    /* border-left: none; */
    margin-right: 4px;
    margin-bottom: 7px;
    text-align: center;
    width: 30px;
    height: 30px;
    font-size: 13px;
    cursor: pointer;
    border: 1px solid #CCC;
  }

  .disable-char-box {
    background-color: #e2e2e2;
    // background-color: red;
    cursor: not-allowed;
  }

  .char-box p {
    padding: 1px 0 0 0;
  }

  .search-text {
    border: 1px solid #CCC;
    float: right;
    width: 177px;
    padding: 5px;
  }

  .all-brand-button {
    float: left;
    width: 120px;
    height: 38px;
    border: 1px solid #CCC;
    font-weight: 500;
  }

  .no-brand-box {
    text-align:center;
    font-size: 16px;
    font-weight: 500;
    margin-top: 15px;
  }

</style>
