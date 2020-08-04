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
      <svg viewBox="0 0 25 25" class="vt-icon--sm absolute right-0 mr-2 w-6 h-6 text-grey toogleSearch" >
        <use xlink:href="#search" />
      </svg>
      <i @click="$emit('click')" class="material-icons p15">close</i>
    </div>
      <!-- </router-link> -->
    <div class="absolute z-20 w-full" @mouseenter="resultsHover = true" @mouseleave="resultsHover = false">
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
    </div>
  </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'
import Product from 'theme/components/core/blocks/Search/Product'
import VueOfflineMixin from 'vue-offline/mixin'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'

export default {
  name: 'SearchBoxMobile',
  components: {
    Product,
    BaseInput
  },
  mixins: [SearchPanel, VueOfflineMixin],
  data () {
    return {
      searchFocus: false,
      resultsHover: false,
      showResults: 5
    }
  },
  props: {
    showpanelflag: {
      type: Boolean,
      required: true
    }
  },
  watch : {
    showpanelflag (value) {
      if (value) {
        setTimeout(() => {
          document.querySelector('#searchMobile input[type="text"]').focus()
        }, 300);
      } 
    }
  },
  computed: {
    showDrop () {
      return false // (this.searchFocus && this.search !== '') || this.resultsHover
    },
    results () {
      return this.products.slice(0, this.showResults)
    },
    moreResults () {
      return this.products.length > this.showResults
    },   
  },
  methods: {
   searchDataInSearchSpring () {
      // console.log('searchDataInSearchSpring', this.search, this.searchFocus);
      if (this.searchFocus) {
        Vue.prototype.$bus.$emit('search-in-search-spring', this.search );
      }
    }
  },
  mounted () {
    this.$bus.$on('focusSearchInput', () => {
      if (!this.$store.state.ui.searchpanel) {
        this.$refs.search.focus()
      }
    })
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
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateY(10px);
    opacity: 0;
  }
</style>
