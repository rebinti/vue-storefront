import config from 'config'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery';
import { mapState } from 'vuex'

// Components
import ProductListing from 'theme/components/core/ProductListing.vue';
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import Columns from 'theme/components/core/Columns.vue'
import BaseSelect from '../components/BaseSelect.vue';

export default {
  data () {
    return {
      currentPage: 1,
      squery: '',
      sortingFilterSelectedValue: '',
      paginationLoader: false,
      setTime: Object,
      mobileFilters: false,
      searchedValue: '',
      // searcingLoaderFlag: true,
      controller: null,
      signal: null,  
      // defaultColumn: 3,
      fixedOrderPanel: false,
      sliderConfig: {
            perPageCustom: [[0, 3], [425, 4], [768, 6], [1024, 6]],
            perPage: 3,
            paginationEnabled: false,
            // loop: true,
            // paginationSize: 6
      },

      navVisible: true,
      isScrolling: false,
      scrollTop: 0,
      lastScrollTop: 0,
      navbarHeight: 70,
      classNameTab: '',

      detailsAccordion: null,
    };
  },
  components: {
    ProductListing,
    BaseInput,
    ButtonFull,
    BaseSelect,
    Breadcrumbs,
    Columns,
  },
  computed: {
    ...mapState({
      seletedMobileGrid: (state: any) => state.ui.seletedMobileGrid,
      defaultColumnMobile: (state: any) => state.ui.defaultColumnMobile,
      defaultColumnWeb: (state: any) => state.ui.defaultColumnWeb,
      mobileGridData: (state: any) => state.ui.mobileGridData
    })
  },
  beforeMount () {
      this.$bus.$on('close-sidebar-panel', this.closeFilters);
 },
  // mounted () {
  //   // this.$store.dispatch('boards/load')
  // },
  methods: {
    hasScrolled () {
      this.scrollTop = window.scrollY
      if (this.scrollTop <= 150) {
          this.classNameTab = ''
          this.lastScrollTop = this.scrollTop
          return
      }
      if (this.scrollTop > this.lastScrollTop && this.scrollTop > this.navbarHeight) {
        this.navVisible = true
        this.classNameTab = 'filtertab_pos-fixed-top-on-bottom' 
      } else {
        this.navVisible = false
        this.classNameTab = 'filtertab_pos-fixed-top-on-top'
      }
      this.lastScrollTop = this.scrollTop
    },

    setEmarsysTracker (type =  'Category') {
      this.$bus.$emit('send-to-emarsys-tracking', { type: type, categoryData: this.getCurrentCategoryUrlPath(' > ')});
    },


    async getSearchData (onScroll = false, abortApiCallFlag = false , searchType = 'searchSpringCategory') {      
      // this.$bus.$emit('notification-progress-start', 'Please wait...');
      let searchUrl = config.searchspring.url + config.searchspring.paginationResPerPage + this.filterData.join('&');
      try {
        if (!onScroll) {
          this.$store.dispatch(`${searchType}/resetSearchedProducts`);
        }

         if (this.controller !== null && abortApiCallFlag) {
            // Cancel the previous request
            this.controller.abort(); //default one - to break other apis
        }

        if ("AbortController" in window) {
          this.controller = new AbortController();
          this.signal = this.controller.signal; 
        }
        const searchResults = await this.$store.dispatch(`${searchType}/searchInSearchSpringPlatform`, {filterData: this.filterData, signal: this.signal })

        if (searchResults && searchResults.results && searchResults.results.length > 0) {
          let prodSku = [];
          searchResults.results.filter(val => {
            prodSku.push(val.uid);
          });
          
          await this.getDataFromElastic(prodSku, onScroll , searchType); // Here the IM point - prodSku used here before - now the variable is id (prodSku) - value
          this.paginationLoader = false;
          this.searcingLoaderFlag = false;
          if (this.filterData.length === 1) {
// price slider once set - not need change
            const priceSliderData = searchResults.facets.find(
              val => val.field === 'final_price'
            );
            this.$store.dispatch(`${searchType}/set_priceSliderData`, {sliderData: priceSliderData, sliderActiveRange: priceSliderData.range , sortingFilterOptions: searchResults.sorting.options })
            setTimeout(() => {
              this.$bus.$emit('reset-price-slider');
            }, 100);
            
          }

          if ((searchType === 'searchSpringCategory' && this.getStoredCurrentRouterPath !== this.$route.path) || this.initialSearchFlag) { 
              this.initialSearchFlag = false;
              this.$store.dispatch(`${searchType}/set_categoryHierarchy`, searchResults.facets.find(
                val => val.field === 'category_hierarchy'));
          }

          this.$store.dispatch(`${searchType}/addSearchSpringSearchResult`, searchResults).then(res => {
            if (searchType === 'searchSpringSearch') this.searchedValue = this.filterData[0].split('=')[1];
          });
          this.$bus.$emit('notification-progress-stop')
        } else {
          if (searchResults.pagination.totalResults === 0 ) {
            this.searcingLoaderFlag = false;
          }
          this.$store.dispatch(`${searchType}/addSearchSpringSearchResult`, searchResults).then(res => {
            if (searchType === 'searchSpringSearch') this.searchedValue = this.filterData[0].split('=')[1];
          });
          this.$store.dispatch(`${searchType}/resetSearchedProducts`);
          this.paginationLoader = false;

          if (!abortApiCallFlag || searchResults.includes('Failed to fetch')) {
            this.searcingLoaderFlag = false;
          }
          this.$bus.$emit('notification-progress-stop')
        }
      } catch (e) { 
        this.$bus.$emit('notification-progress-stop') 
        this.paginationLoader = false;
        this.searcingLoaderFlag = false;
        }
    },

    async getDataFromElastic (searchedData, onScroll = false ,  searchType) {
      let query = new SearchQuery();
      query = query.applyFilter({ key: 'id', value: { eq: searchedData } });
      const { items } = await this.$store.dispatch(
        'product/list',
        { query, start: 0, size: searchedData.length, updateState: false },
        { root: true }
      );
      const sortedData = items.sort((a, b) =>
        searchedData.indexOf(a.id.toString()) - searchedData.indexOf(b.id.toString())
      );
      this.$store.dispatch(`${searchType}/addProdcutsItems`, {onScroll: onScroll, products: sortedData})
      return this.serachedProd;
    },

    openFilters () {
      this.mobileFilters = true;
      this.$store.commit('ui/setOverlay', true);
      const el = document.body; // to fix background scroll issue when the filter opened
      el.classList.add('openfilter');
      el.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    },
    
    closeFilters (closeFlag) {
      this.mobileFilters = false
      this.$store.commit('ui/setOverlay', false);
      const el = document.body;
      el.classList.remove('openfilter');
      el.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    },

    findIndexInFilterItems (searchText) {
      return this.filterData.findIndex(val => val.includes(searchText)) >= 0
    },

    columnChangeWeb (column) {
      if (column.type === 'lg') {
        this.$store.dispatch('ui/UpdateSeletedWebViewGrid',  column.selected);
      }
    },

    columnChangeMobile (gridData) {
      let tdata;
      if (gridData.index === 2) {
        tdata = this.mobileGridData[0];
      } else {
        tdata = this.mobileGridData[gridData.index + 1];
      }
      // this.defaultColumnMobile = tdata.value;
      this.$store.dispatch('ui/UpdateSeletedMobileGrid', tdata);
    },

    getCurrentCategoryUrlPath (joiningString = '/') {            
      let routeUrl= this.breadcrumbs.routes.filter((val , index) => {
        if ( index > 0) {
          return val.name
        }
      });
      routeUrl= routeUrl.map(val => val.name).join(joiningString);    
      let routeString = routeUrl ? routeUrl + joiningString +  this.category.name : this.category.name;
      return routeString  
    },

    notify () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('Please select the field which You like to sort by'),
        action1: { label: this.$t('OK') }
      })
    },

    showNotificationLoader (showNotificationFlag = false) {
      if (!this.mobileFilters || showNotificationFlag) {
        this.$bus.$emit('notification-progress-start', 'Please wait...');
        }
    },
    
  },
  beforeDestroy () {
    this.$bus.$off('close-sidebar-panel');
  },
  destroyed () {
    document.removeEventListener('scroll', null);
  },

}
