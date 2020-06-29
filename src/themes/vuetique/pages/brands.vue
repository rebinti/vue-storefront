<template>
  <div class="container">
    <div class="row" style="margin-top: 10px;">
      <div class="col-12 md:col-12 sm:col-12" style="margin:0 auto;">
          <h1> Brands </h1>
          <div class="container col-12" style="margin-top: 5px;" v-if="brandsLoadedFlag">
             <div class="row">
                <div class="col-12" style="margin-top: 30px;">
                  <button type="button" class="all-brand-button" @click="clearSort" >All Brands</button>
                  <input type="text" @input="inputEvent" class="search-text" v-model="search" placeholder="Search" />
                </div>
              </div>
            <div class="row" style="margin-top: 30px;">          
                  <div :class="['char-box', disableBrandsChar(char) ? 'disable-char-box' : char === brandSelectedChar ? 'active-char' : '']" v-for="(char,index) in charList" :key="index"
                  @click="sortbrands(char)">
                      <p> 
                          {{char}}
                      </p>
                  </div>
            </div>
           </div>

          <div class="container col-12" style="margin-top: 30px;margin-bottom: 50px;">
           <div class="row" v-if="visibleProducts.length > 0" > 
             <router-link
                class="lg:col-2 md:col-3 col-4 brand-box"
                v-for="brand in visibleProducts" :key="brand.id"
                :to="localizedRoute('/brands/' + brand.slug)"
                exact>
                <div>
                  <img v-if="brand.image" :src="imagesPath + brand.image" alt="" 
                      width="150px" height="150px" class="brand-image" />
                  <p class="brand-name" :class="[!brand.image ? 'no-image' : '']">
                    {{ brand.slug }}
                    </p>
                </div>
              </router-link>
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
import { mapGetters } from 'vuex'
// import SearchQuery from '@vue-storefront/core/lib/search/searchQuery';

export default {
  name: 'brands',
  data () {
    return {
      search: '',
      imagesPath: config.brand.imageUrl,
      alphabetsList : [],
      charList : Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i))
    };
  },
  components: { },
  async asyncData ({ store, route }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
      await store.dispatch('ui/getBrandList', { // this is just an example how can you modify the search criteria in child components
       key: '_type',
        value: "brand"
      })
  },
  mixins: [],
  created () {
      // this.getBrandsData();
  },
  computed: {
    ...mapGetters({
        brandsLoadedFlag: 'ui/getBrandsLoadedFlag',
        brandSearchText: 'ui/getBrandSearchText',
        brandSelectedChar: 'ui/getBrandSelectedChar',
        brandsList: 'ui/getBrandsList',
    }),
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
      if (this.brandSelectedChar.length > 0 && this.brandSearchText.length > 0 ) {
        return brandsList.filter(brand => 
        brand.slug.charAt(0).toUpperCase() === this.brandSelectedChar && brand.slug.includes(this.brandSearchText) );
      } else if (this.brandSelectedChar.length > 0) {
        return brandsList.filter(brand => 
        brand.slug.charAt(0).toUpperCase() === this.brandSelectedChar);
      } else if (this.brandSearchText.length > 0) {
        return brandsList.filter(brand => brand.slug.includes(this.brandSearchText));
      }
      return brandsList
    },
  },
  mounted () {
    this.search = this.brandSearchText;
    // console.log('char', Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)))
  },
  methods: {
  //   async getBrandsData() {
  //     if (this.brandsList.length > 0) { 
  //       return; 
  //     }
  //     this.$store.dispatch('ui/getBrandList', {
  //         key: '_type',
  //         value: "brand"
  //     }).then(res => {
  //     });
  //  },
   sortbrands (brandChar) {
     if (this.disableBrandsChar(brandChar)) return;
     this.$store.dispatch('ui/setBrandsFiltersAction',{ selText: this.brandSearchText, selChar: brandChar });
   },
   clearSort () {
     this.search = '';
     this.$store.dispatch('ui/setBrandsFiltersAction',{ selText: '', selChar: '' });
   },
   disableBrandsChar (brandChar) {
     return !this.brandsList.some(val => val.slug.charAt(0).toUpperCase() === brandChar);
   },
   inputEvent ($event) {
      this.$store.dispatch('ui/setBrandsFiltersAction',{ selText: $event.target.value, selChar: this.brandSelectedChar });
    }
  }
};
</script>

<style lang="scss" scoped>
  .brand-box{
    height:auto;
    min-height: 125px;
  }
  .brand-box div{
    min-height: 118px;
    border: 1px solid #CCC;
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
  .active-char {
    border: 1px solid black;
    padding-top: 1px;
  }

  .brand-image {
    margin: 0 auto;
    // border-radius: 50%;
    margin-bottom: 12px;
  }

  .brand-name {
    margin-bottom: 10px;
  }

  .no-image {
    margin-top: 20px;
  }

</style>
