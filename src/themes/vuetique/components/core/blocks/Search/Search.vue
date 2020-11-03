<template>
  <div
    class="relative w-full"
    data-testid="search"
  >
      <router-link
      class="block no-underline product-link"
      :to="'/search'"
      data-testid="search"
    >
    <div class="flex items-center">
      <base-input
        ref="search"
        type="text"
        id="search_input"
        :aria-label="$t('Type what you are looking for...')"
        :placeholder="$t('Type what you are looking for...')"
        class="w-full"
        v-model="search"
        @input="searchDataInSearchSpring"
        @focus="searchFocus = true;"
        @blur="searchFocus = false"
        @keyup.enter="searchTextData(search)"
        @click.native="searchFocus = true;"
      />
      <svg viewBox="0 0 25 25" class="vt-icon--sm absolute right-0 mr-2 w-6 h-6 text-grey" @click="searchTextData(search)">
        <use xlink:href="#search" />
      </svg>
    </div>
      </router-link>


    <div class="absolute z-20 w-full" @mouseenter="resultsHover = true" @mouseleave="resultsHover = false">
      <div v-show="showDrop" class="bg-white border border-grey border-t-0">
        <!-- <product :key="product.id" v-for="product in results" :product="product" @click.native="resultsHover = false" /> -->
        <!-- <transition name="fade">
          <div v-if="moreResults" class="w-full px-3 py-4 border-t border-grey-lighter">
            <div
              class="text-black font-medium flex justify-between items-center"
            >
              {{ $t('Please refine your search to view more results...') }}
            </div>
          </div>
        </transition> -->
        <transition name="fade">
          <div v-if="emptyResults" class="w-full p-4 text-black font-medium">
            {{ $t('No results were found.') }}
          </div>
        </transition>

         <transition name="fade">
          <div class="w-full p-4 text-black font-medium" v-if="autoCompleteResults" >
            <h3>Search suggestions</h3>
            <p v-for="trend in autoCompleteResults.alternatives" :key="trend.popularity"
            @click="searchTextData(trend.text)"
            > {{trend.text}} </p>
          </div>
        </transition>

         <transition name="fade">
          <div class="w-full p-4 text-black font-medium"  v-if="trendingSearches.length">
            <h3>Trending Searches</h3>
            <p v-for="trend in trendingSearches" :key="trend.popularity"
            @click="searchTextData(trend.searchQuery)"
            > {{trend.searchQuery}} </p>
          </div>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'
// import Product from 'theme/components/core/blocks/Search/Product'
import VueOfflineMixin from 'vue-offline/mixin'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'

export default {
  components: {
    // Product,
    BaseInput
  },
  mixins: [ VueOfflineMixin , SearchPanel],  //SearchPanel,
  data () {
    return {
      searchFocus: false,
      resultsHover: false,
      showResults: 5,
      search: '',
      searchparam: '',
      trendingSearches: [],
      autoCompleteResults: null
    }
  },
  computed: {
    showDrop () {
      return this.searchFocus || this.resultsHover
      //(this.searchFocus && this.search !== '') || this.resultsHover
    },
    results () {
      return this.products.slice(0, this.showResults)
    },
    moreResults () {
      return this.products.length > this.showResults
    },   
  },
  methods: {
    async searchDataInSearchSpring () {
      // console.log('searchDataInSearchSpring', this.search, this.searchFocus);
      // if (this.searchFocus) {
      //   Vue.prototype.$bus.$emit('search-in-search-spring', this.search );
      // }

       if (this.searchFocus && this.search.length >1) {
          const searchResults = await this.$store.dispatch('searchSpringSearch/getAutoSuggectionsFromSearchSpring', this.search)
         this.autoCompleteResults = searchResults
       } else {
          this.autoCompleteResults = null
       }
    },
    // handleKeyDown(e) { //method to handle the keypress
    //   if (e.code === 'Enter') {
    //     this.searchTextData(this.search);
    //   }
    // },        
    searchTextData (text) {        
        if((text!="") && (text.length >= 2)){
          let searchparam = text;
          this.$router.push({ path: 'search', query: { q: searchparam }})
        }else{
          let searchparam = this.$route.query.q;
        }
         Vue.prototype.$bus.$emit('search-in-search-spring', searchparam );
         this.resultsHover = false
         this.searchFocus = false
    }    
  },
  mounted () {
    this.$bus.$on('focusSearchInput', () => {
      if (!this.$store.state.ui.searchpanel) {
        this.$refs.search.focus()
      }
    })
    // window.addEventListener('keydown', this.handleKeyDown); //will attach the event listener to the whole window when the component is created
  },
  async beforeMount () {
      const searchResults = await this.$store.dispatch('searchSpringSearch/getTrendingSearchesFrmSearchSpring')
      this.trendingSearches = searchResults.trending ? searchResults.trending.queries : [];
  },
  // destroyed() {
    // window.removeEventListener('keydown', this.handleKeyDown); //will detach the event listener once the component is destroyed
  // }  
}
</script>

<style lang="scss" scoped>
</style>
