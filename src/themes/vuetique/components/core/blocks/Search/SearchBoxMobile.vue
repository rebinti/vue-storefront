<template>
  <transition name="slide-fade">
  <div
    class="relative w-full"
    data-testid="search"
    v-if="showpanelflag"
  >
      <!-- <router-link
      class="block no-underline product-link"
      :to="'/search'"
      data-testid="search"
    > -->
    <div class="flex items-center">
      <base-input
        ref="searchMobile"
        :focus="clickFromHeaderMobileSearch"
        type="text"
        id="searchMobile"
        :aria-label="$t('Type what you are looking for...')"
        :placeholder="$t('Type what you are looking for...')"
        class="w-full"
        v-model="search"
        @input="searchDataInSearchSpring"
        @focus="searchFocus = true;"
        @blur="searchFocus = false"
      />
      <svg viewBox="0 0 25 25" class="vt-icon--sm absolute right-0 mr-2 w-6 h-6 text-grey toogleSearch"  @click="searchTextData(search)">
        <use xlink:href="#search" />
      </svg>
      <i @click="searchFocus = false" class="material-icons p15">close</i>
    </div>
      <!-- </router-link> -->
    <!-- <div class="absolute z-20 w-full" @mouseenter="resultsHover = true" @mouseleave="resultsHover = false">
      <div v-if="showDrop" class="bg-white border border-grey border-t-0">
        <product :key="product.id" v-for="product in results" :product="product" @click.native="resultsHover = false" />
        <transition name="fade">
          <div v-if="moreResults" class="w-full px-3 py-4 border-t border-grey-lighter">
            <div
              class="text-black font-medium flex justify-between items-center"
            >
              {{ $t('Please refine your search to view more results...') }}
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="emptyResults" class="w-full p-4 text-black font-medium">
            {{ $t('No results were found.') }}
          </div>
        </transition>
      </div>
    </div> -->
    <div class="absolute z-20 w-full mobile-autocomplete" @mouseenter="resultsHover = true" @mouseleave="resultsHover = false">
      <div v-show="showDrop" class="bg-white border border-grey border-t-0">
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
  </transition>
</template>

<script>
import Vue from 'vue'
import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'
// import Product from 'theme/components/core/blocks/Search/Product'
import VueOfflineMixin from 'vue-offline/mixin'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'

export default {
  name: 'SearchBoxMobile',
  components: {
    // Product,
    BaseInput
  },
  mixins: [ VueOfflineMixin,SearchPanel],  //SearchPanel,
  data () {
    return {
      searchFocus: false,
      resultsHover: false,
      showResults: 5,
      search: '',
      trendingSearches: [],
      autoCompleteResults: null
    }
  },
  props: {
    showpanelflag: {
      type: Boolean,
      required: true
    },
    clickFromHeaderMobileSearch: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch : {
    // showpanelflag (value) {   // issue with device search back - from product page - same code move in to header
    //   if (value) {
    //     setTimeout(() => {
    //       document.querySelector('#searchMobile input[type="text"]').focus()
    //       document.getElementById("searchMobile").focus();
    //     }, 200);
    //   } 
    // }
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
    searchTextData (text) {
         Vue.prototype.$bus.$emit('search-in-search-spring', text );
         this.resultsHover = false
    }    
  },
  mounted () {
    this.$bus.$on('focusSearchInput', () => {
      if (!this.$store.state.ui.searchpanel && this.clickFromHeaderMobileSearch ) {
        this.$refs.search.focus()
      }
    })
  },
  async beforeMount () {
      const searchResults = await this.$store.dispatch('searchSpringSearch/getTrendingSearchesFrmSearchSpring')
      this.trendingSearches = searchResults.trending ? searchResults.trending.queries : [];
  }  
}
</script>

<style lang="scss" scoped>
  .toogleSearch {
    margin: 0 32px 0 0;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateY(10px);
    opacity: 0;
  }  
  @media (max-width: 768px) {
    .mobile-autocomplete{
      width: 96.8%;
    }
  }
  @media (max-width: 425px) {
    .mobile-autocomplete{
      width: 94%;
    }    
  }
  @media (max-width: 375px) {
    .mobile-autocomplete{
      width: 93.2%;
    }     
  }
  @media (max-width: 320px) {
    .mobile-autocomplete{
      width: 92%;
    }     
  }      
</style>
