
export default {
    methods: {
        setFilterData ({facetssection = null , item = null , searchType = this.searchPageType}) {

           item.active = true;
          if (facetssection.field === 'category_hierarchy') {
            if ( this.findIndexInFilterItems ('filter.category_hierarchy') ) {
              this.$store.dispatch(`${searchType}/removeFilterItem`, 'filter.category_hierarchy')
            }
            this.$store.dispatch(`${searchType}/addFilterItems`,'filter.' + facetssection.field + '=' + encodeURIComponent(item.value))
          } else {
            if ( this.filterData.includes('filter.' + facetssection.field + '=' + encodeURIComponent(item.value))) {
              this.$store.dispatch(`${searchType}/removeFilterItem`, 'filter.' + facetssection.field + '=' + encodeURIComponent(item.value));
            } else {
              this.$store.dispatch(`${searchType}/addFilterItems`, 'filter.' + facetssection.field + '=' + encodeURIComponent(item.value))
            }
          }
          this.showNotificationLoader();
          // this.$bus.$emit('notification-progress-start', 'Please wait...');
          this.getSearchData( false, false, searchType);
        },
    
        setCategoryFilterData ({ facetssection = null, item = null , searchType = this.searchPageType }) {
          this.$store.dispatch(`${searchType}/set_categoryHierarchy`, {...item, field: facetssection.field, active: true, serachFrom: this.serachFrom})
          this.$store.dispatch(`${searchType}/resetCategoryFilterData`);
          if (facetssection.field === 'category_hierarchy') {
            if (this.findIndexInFilterItems ('filter.category_hierarchy')) {
              this.$store.dispatch(`${searchType}/removeFilterItem`, 'filter.category_hierarchy')
            }
            this.$store.dispatch(`${searchType}/addFilterItems`, 'filter.' + facetssection.field + '=' + encodeURIComponent(item.value))
            this.showNotificationLoader();
            // this.$bus.$emit('notification-progress-start', 'Please wait...');
            this.getSearchData(false, false, searchType);
          }
        },
    
        setCategoryFilterHistory ({ item=null, index = 0 , searchType = this.searchPageType, serachFrom = this.serachFrom }) {
          if (item.active) { return; }
          this.$store.dispatch(`${searchType}/resetCategoryFilterData`);
          if (item && item.type === 'view all') {
            this.$store.dispatch(`${searchType}/reset_categoryFilterOption`)
          } else {
            let category = [...this.categoryHierarchy]
            this.$store.dispatch(`${searchType}/reset_categoryFilterOption`)
            this.$store.dispatch(`${searchType}/set_categoryHierarchy`, category.filter((val, i) => i < index))
            this.$store.dispatch(`${searchType}/set_categoryHierarchy`, {...item, field: item.field, active: true , serachFrom: this.serachFrom})
          }
    
          if ( this.findIndexInFilterItems ('filter.category_hierarchy')) {
            this.$store.dispatch(`${searchType}/removeFilterItem`, 'filter.category_hierarchy')
            /** Diff checking added */
            if (serachFrom === 'category') {
                 let routeString = this.getCurrentCategoryUrlPath() ;
                if(routeString.includes('&')) {
                  routeString = encodeURIComponent(routeString)
                }
                this.$store.dispatch(`${searchType}/addFilterItems`, 'filter.category_hierarchy=' + routeString)
            }
          }
          if (item && item.type !== 'view all') {
            this.$store.dispatch(`${searchType}/addFilterItems`, 'filter.' + item.field + '=' + encodeURIComponent(item.value))
          }
          this.showNotificationLoader();
          // this.$bus.$emit('notification-progress-start', 'Please wait...');
          this.getSearchData(false, false, searchType);
          // }
        },
        
        removeFilterFlag (item , searchType = this.searchPageType) {
          if (item.field === 'final_price') {
            if ( this.findIndexInFilterItems ('filter.final_price.low')) {
              this.$store.dispatch(`${searchType}/removeFilterItem`, 'filter.final_price.low')
            }
            if ( this.findIndexInFilterItems ('filter.final_price.high')) {
              this.$store.dispatch(`${searchType}/removeFilterItem`, 'filter.final_price.high')
            }
            this.$bus.$emit('reset-price-slider');
            this.showNotificationLoader(true);
            // this.$bus.$emit('notification-progress-start', 'Please wait...');
            this.getSearchData(false, false, searchType);
          } else if (this.filterData.includes('filter.' + item.field + '=' + encodeURIComponent(item.value))) {
            if (this.filterData.indexOf('filter.' + item.field + '=' + encodeURIComponent(item.value)) >= 0) {
              this.$store.dispatch(`${searchType}/removeFilterItem`, 'filter.' + item.field + '=' + encodeURIComponent(item.value))
            }
            this.showNotificationLoader(true);
            // this.$bus.$emit('notification-progress-start', 'Please wait...');
            this.getSearchData();
          }
        },
    
        clearAllFilter (searchType = this.searchPageType , serachFrom = this.serachFrom) {
          this.$store.dispatch(`${searchType}/resetFilterData`);
          this.$store.dispatch(`${searchType}/resetCategoryHierarchy`);
          /** Diff checking added */
          if (serachFrom === 'category') {
              let routeString = this.getCurrentCategoryUrlPath() ;
              this.searchedValue =  routeString
              if(routeString.includes('&')) {
                routeString = encodeURIComponent(routeString)
              }
              this.$store.dispatch(`${searchType}/addFilterItems`, 'filter.category_hierarchy=' + routeString)
          } else if (serachFrom === 'brand') {
            let routeString = this.$route.params.brandName; // this.$route.path.replace('-', ' ');
            routeString = routeString.split('-')
                            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                            .join(' ');
            // console.log('routeString', routeString);
            this.searchedValue =  routeString
            if(routeString.includes('&')) {
              routeString = encodeURIComponent(routeString)
            }
            this.$store.dispatch(`${searchType}/addFilterItems`, 'filter.label=' + routeString)
          } else {
              this.$store.dispatch(`${searchType}/addFilterItems`, 'rq=' + this.searchedValue)
          }
          this.$bus.$emit('reset-price-slider');
          this.showNotificationLoader(true);
          /** Diff checking added */
          if (searchType === 'searchSpringCategory') this.initialSearchFlag = true;
          // this.$bus.$emit('notification-progress-start', 'Please wait...');
          this.getSearchData(false, false, searchType);
        },
    
        priceSliderChanged (range, searchType = this.searchPageType) {
          this.$store.dispatch(`${searchType}/set_priceSliderActiveRange`, range)
          setTimeout(() => {
              this.$bus.$emit('reset-active-price-slider')
          }, 50);  
          if ( this.findIndexInFilterItems ('filter.final_price.low')) {
            this.$store.dispatch(`${searchType}/removeFilterItem`, 'filter.final_price.low')
          }
          if ( this.findIndexInFilterItems ('filter.final_price.high')) {
            this.$store.dispatch(`${searchType}/removeFilterItem`, 'filter.final_price.high')
          }
          this.$store.dispatch(`${searchType}/addFilterItems`, 'filter.final_price.low=' + range.from)
          this.$store.dispatch(`${searchType}/addFilterItems`, 'filter.final_price.high=' + range.to)
          this.showNotificationLoader();
          // this.$bus.$emit('notification-progress-start', 'Please wait...');
          this.getSearchData(false, false, searchType);
        },
    
        sortingFilterChange (value, searchType = this.searchPageType) {
          if (this.findIndexInFilterItems ('sort.')) {
            this.$store.dispatch(`${searchType}/removeFilterItem`, 'sort.')
          }
          this.$store.dispatch(`${searchType}/set_sortingFilterSelected`, value)
          this.$store.dispatch(`${searchType}/addFilterItems`, 'sort.' + value.split('$')[0] + '=' + value.split('$')[1])
          this.showNotificationLoader();
          // this.$bus.$emit('notification-progress-start', 'Please wait...');
          this.getSearchData(false, false, searchType);
        },
    
        resetAllFilterResult (searchType = this.searchPageType) {
          this.$store.dispatch(`${searchType}/resetAllFilterResult`);
          this.$store.dispatch(`${searchType}/resetFilterData`)
          this.squery = '';
          this.$store.dispatch(`${searchType}/resetSearchSpringSearchRes`)
          this.$store.dispatch(`${searchType}/resetSearchedProducts`);
          this.$store.dispatch(`${searchType}/reset_categoryFilterOption`)
          // this.priceSliderData = {};
          this.sortingFilterSelectedValue = '';
          this.searchedValue = null;
          this.paginationLoader = false;
        },
     }
  
  
  }
  