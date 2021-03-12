import { createModule } from '@vue-storefront/core/lib/module'
// TODO: Move the logic to appropriate modules and deprecate this one
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { Logger } from '@vue-storefront/core/lib/logger'
import config from 'config'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import fetch from 'isomorphic-fetch'

const KEY = 'ui'
const store = {
  namespaced: true,
  state: {
    sidebar: false,
    microcart: false,
    wishlist: false,
    reviewPanel: false,
    searchpanel: false,
    newsletterPopup: false,
    overlay: false,
    loader: false,
    authElem: 'login',
    boardsElem: 'add-to-board',
    selectedBoardItem: null,
    checkoutMode: false,
    openMyAccount: false,
    submenu: {
      depth: false,
      path: []
    },
    isUserInAccountsPage: false,
    mobileGridData: [{value: 2, image: '../assets/grid2.png', 'index': 0},
                    {'value': 3, 'image': '../assets/grid3.jpg', 'index': 1},
                    {'value': 4, 'image': '../assets/grid4.png', 'index': 2}],
    seletedMobileGrid: {value: 2, image: '../assets/grid2.png', index: 0},
    defaultColumnMobile: 2,
    defaultColumnWeb: 3,
    yoptoProduct: null,
    brandsList: [],
    // specificBrandsList: [],
    brandsLoadedFlag: false,
    modelsList: [],
    modelsLoadedFlag: false,
    brandSearchText: '',
    brandSelectedChar: '',
    fbLoggedInfo: null,
    googleLoggedInfo: null,
    selectedSocialLoginType: null,
    mainSliderData: [],
    productSidePanelFlag: false,
    productDetailsSidePanelFlag: false,
    productDeliveyReturnSidePanelFlag: false,
    productGetTheLookSidePanelFlag: false,
    checkoutWithoutLogin: false
  },
  getters: {
    getSelectedGridView: state => state.seletedMobileGrid,
    getDefaultColumnMobile: state => state.defaultColumnMobile,
    getDefaultColumnWeb: state => state.defaultColumnWeb,
    getBrandsList: state => state.brandsList,
    getModelsList: state => state.modelsList,
    // getSpecificBrandsList: state => state.specificBrandsList,
    getMainSliderData: state => state.mainSliderData,
    getBrandsLoadedFlag: state => state.brandsLoadedFlag,
    getBrandSearchText: state => state.brandSearchText,
    getBrandSelectedChar:  state => state.brandSelectedChar,
    brandPageTitle: (state) => (url_key) => {
      return state.brandsList.find(item => item.url_key === url_key)
    },
    checkBrandActiveFlag: (state) => ( { url_key = null ,brandId = null , name= null , brandAttributeId = null, rtnBrandDataFlag= false} ) => {
      // console.log(`url_key: ${url_key} ,brandId: ${brandId} , name: ${name} , brandAttributeId ${brandAttributeId} , rtnBrandDataFlag ${rtnBrandDataFlag}`)
      if (rtnBrandDataFlag) {
        console.log('brand', state.brandsList.find(item => (item.url_key === url_key || item.id === brandId || item.name === name || item.option_id === brandAttributeId)))
        return state.brandsList.find(item => (item.url_key === url_key || item.id === brandId || item.name === name || item.option_id === brandAttributeId)) || null 
      }
      if (state.brandsList.some(item => (item.url_key === url_key || item.id === brandId || item.name === name || item.option_id === brandAttributeId))) {
        return true
       } else {
         return false
       }
    }     
  },
  mutations: {
    setCheckoutMode (state, action) {
      state.checkoutMode = action === true
    },
    setMicrocart (state, action) {
      state.microcart = action === true
      state.overlay = action === true
    },
    setSidebar (state, action) {
      state.sidebar = action === true
      state.overlay = action === true
    },
    setSubmenu (state, { id, depth }) {
      if (id) {
        state.submenu.path.push(id)
      } else if (state.submenu.path.length) {
        setTimeout(() => {
          state.submenu.path.pop()
        }, 300)
      }
      state.submenu.depth = state.submenu.depth > 0 && depth
    },
    resetSubmenu (state) { 
      state.submenu.path = [] 
      state.submenu.depth = false 
    },
    setUserInAccountsPageFlag (state, action) {
        state.isUserInAccountsPage = action === true
        state.submenu.path = [];
    },
    setSearchpanel (state, action) {
      state.searchpanel = action === true
      state.overlay = action === true
    },
    setWishlist (state, action) {
      state.wishlist = action === true
      state.overlay = action === true
    },
    setReviewPanel (state, action) {
      state.reviewPanel = action === true
      state.overlay = action === true
    },
    setOverlay (state, action) {
      state.overlay = action === true
    },
    setLoader (state, action) {
      state.loader = action === true
    },
    setAuthElem (state, action) {
      state.authElem = action
    },
    setBoardsElem (state, action) {
      state.boardsElem = action
    },
    setYoptoProduct (state, data) {
      state.yoptoProduct = data
    },
    setSelectedBoardItem (state, data) {
      state.selectedBoardItem = data
    },
    setSeletedMobileGrid (state, data) {
      state.seletedMobileGrid = data
      state.defaultColumnMobile = data.value
      // if (data.value === 4) state.defaultColumnWeb = 4;
      state.defaultColumnWeb = data.value
    },
    setSeletedWebViewGrid (state, data) {
      state.seletedMobileGrid = state.mobileGridData.find(val => val.value === data);
      state.defaultColumnMobile = data
      state.defaultColumnWeb = data
    },
    setBrandList (state, data) {
      state.brandsList = data;
      state.brandsLoadedFlag = true
    },
    setModelsList (state, data) {
      state.modelsList = data;
      state.modelsLoadedFlag = true
    },  
    // setSpecificBrandList (state, data) {
    //   state.specificBrandsList = data;      
    // },    
    setBrandsFilters (state, data) {
      state.brandSearchText = data.selText;
      state.brandSelectedChar = data.selChar;
    },
    setSocialLoginInfo (state, data) {
       state.selectedSocialLoginType = data.type;
       if ( data.type === 'facebook') {
          state.fbLoggedInfo = data.social_data;
       } else if ( data.type === 'google') {
          state.googleLoggedInfo = data.social_data;
       }
    },
    clearSocialLoginInfo (state, data) {
      if ( data.type === 'facebook') {
         state.fbLoggedInfo = null;
      } else if ( data.type === 'google') {
         state.googleLoggedInfo = null;
      }
   },
   setHomePageMainSliderData (state, data) {
      state.mainSliderData = data;
   },
   setProductSidePanelFlag (state, action) {
    state.productSidePanelFlag = action === true
    state.overlay = action === true
  },
  setProductDetailsSidePanelFlag (state, action) {
    state.productDetailsSidePanelFlag = action === true
    state.overlay = action === true
  },
  setProductDeliveyReturnSidePanelFlag (state, action) {
    state.productDeliveyReturnSidePanelFlag = action === true
    state.overlay = action === true
  },    
  setProductGetTheLookSidePanelFlag (state, action) {
    state.productGetTheLookSidePanelFlag = action === true
    state.overlay = action === true
  },  
  setCheckoutWithoutLoginFlag (state, payload) {
    state.checkoutWithoutLogin = payload === true
  }
  },
  actions: {
    toggleMicrocart ({ commit, state }) {
      commit('setMicrocart', !state.microcart)
    },
    toggleWishlist ({ commit, state }) {
      commit('setWishlist', !state.wishlist)
    },
    toggleReviewPanel ({ commit, state }) {
      commit('setReviewPanel', !state.reviewPanel)
    },
    toggleProductSidePanel ({ commit, state }) {
      commit('setProductSidePanelFlag', !state.productSidePanelFlag)
    },
    toggleProductDetailsSidePanel ({ commit, state }) {
      commit('setProductDetailsSidePanelFlag', !state.productDetailsSidePanelFlag)
    },
    toggleProductDeliveyReturnSidePanel ({ commit, state }) {
      commit('setProductDeliveyReturnSidePanelFlag', !state.productDeliveyReturnSidePanelFlag)
    },     
    toggleProductGetTheLookSidePanel ({ commit, state }) {
      commit('setProductGetTheLookSidePanelFlag', !state.productGetTheLookSidePanelFlag)
    },            
    updateYoptoProduct ({commit}, state) {
      commit('setYoptoProduct', state)
    },
    UpdateSeletedMobileGrid ({commit}, state) {
      commit('setSeletedMobileGrid', state)
    },
    UpdateSeletedWebViewGrid ({commit}, state) {
      commit('setSeletedWebViewGrid', state)
    },
    getBrandList ({commit, state}, { key = 'type', value, excludeFields = null, includeFields = null, skipCache = false }) {
        if (state.brandsList.length > 0) { 
          return state.brandsList; 
        }
        let query = new SearchQuery()
        if (value) {
          query = query.applyFilter({key: key, value: {'eq': value}})
        }
        if (includeFields === null) {
          // includeFields = config.brand.includeFields;
        }
        return quickSearchByQuery({ query, size: 500 ,entityType: 'brand', excludeFields, includeFields })
          .then((resp) => {
            if (Array.isArray(resp.items) && resp.items.length){ 
              const brandsList = resp.items.sort((a, b)=> a.url_key.localeCompare(b.url_key));
              //commit('setBrandList', brandsList); // brandsList.filter(v => v.status == 1));
              commit('setBrandList', brandsList.filter(v => v.is_active == 1)); 
              return brandsList
            } else {
              commit('setBrandList', []);
            }
          }).catch(err => {
            commit('setBrandList', []);
            Logger.error(err, 'ui/brands')()
          })
    },
    getModelsList ({commit, state}, { key = 'type', value, excludeFields = null, includeFields = null, skipCache = false }) {
      if (state.modelsList.length > 0) { 
        return state.modelsList; 
      }
      let query = new SearchQuery()
      if (value) {
        query = query.applyFilter({key: key, value: {'eq': value}})
      }
      if (includeFields === null) {
        // includeFields = config.brand.includeFields;
      }
      return quickSearchByQuery({ query, size: 500 ,entityType: 'iclothingmodel', excludeFields, includeFields })
        .then((resp) => {
          console.log('Response Models List', resp)
          if (Array.isArray(resp.items) && resp.items.length){ 
            commit('setModelsList', resp.items); 
            return resp.items
          } else {
            commit('setModelsList', []);
          }
        }).catch(err => {
          commit('setModelsList', []);
          Logger.error(err, 'ui/ModelsList')()
        })
  },
  //   getSpecificBrandList({commit}, { key = 'type', value, routeString = null, excludeFields = null, includeFields = null, skipCache = false }) {
  //     let query = new SearchQuery()
  //     if (value) {
  //       query = query.applyFilter({key: key, value: {'eq': value}})
  //     }
  //     if (includeFields === null) {
  //       // includeFields = config.brand.includeFields;
  //     }
  //     console.log(">>>>>>>>>>>>>>>>",this.$route)
  //     return quickSearchByQuery({ query, size: 500 ,entityType: 'brand', excludeFields, includeFields })
  //       .then((resp) => {
  //         if (Array.isArray(resp.items) && resp.items.length){ 
  //           const specificBrandsList = resp.items.sort((a, b)=> a.url_key.localeCompare(b.url_key));
  //           //commit('setBrandList', brandsList); // brandsList.filter(v => v.status == 1));
  //           commit('setSpecificBrandList', specificBrandsList.filter(v => v.is_active == 1)); 
  //           return specificBrandsList
  //         } else {
  //           commit('setSpecificBrandList', []);
  //         }
  //       }).catch(err => {
  //         commit('setSpecificBrandList', []);
  //         Logger.error(err, 'ui/brands')()
  //       })
  // },
    getSliderData ({commit}, { key = '_type', value, excludeFields = null, includeFields = null, skipCache = false }) {
      let query = new SearchQuery()
      if (value) {
        query = query.applyFilter({key: key, value: {'eq': value}})
      }
      return quickSearchByQuery({ query, entityType: 'banner', excludeFields, includeFields })
        .then((resp) => {
          commit('setHomePageMainSliderData', resp.items);
          return resp.items
        })
        .catch(err => {
          Logger.error(err, 'ui/brands')()
          })
    },
    setBrandsFiltersAction({commit}, state) {
      commit('setBrandsFilters', state)
    },
    getOrderDeatilsById ({commit}, orderId) {
        return new Promise((resolve, reject) => {
            fetch( 'https://www.iclothing.com/api/urlorderdetails/urlorderdetails', {
              method: 'POST',
              mode: 'cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(orderId)
            }).then(res => resolve(res.json())).catch(() => reject())
        })
    },
    async getOrderedDetails ({commit}, orderId) {
      console.log('getOrderedDetails',  orderId)
          const task = await TaskQueue.execute({ url: '/api/urlorderdetails/urlorderdetails', 
          payload: {  
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({"orderid": orderId, "tid":"segmentify"}) 
          },
          silent: false
        });
        if (task && task.resultCode === 200) {
          console.log('api dataaaa Sucesss' , task.result)
          return task.result
        } else {
          return task
        }
    },    
    async submitOutOfStockNotification ({commit}, data) {
        console.log('submitOutOfStockNotification',  data)
        const task = await TaskQueue.execute({ url: '/api/urlstocknotification/urlnotification', 
        payload: {  
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(data) 
        },
        silent: false
      });
      if (task && task.resultCode === 200) {
        console.log('api dataaaa Sucesss' , task.result)
        return task.result
      } else {
        return task
      }
    },
    async sentContactUs ({commit}, data) {
        console.log('sentContactUs>>>>>>>>>>>>>>>>>>',  data)
        const task = await TaskQueue.execute({ url: '/api/urlcontactus/urlcontactsent', 
        payload: {  
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(data) 
        },
        silent: false
      });
      if (task && task.resultCode === 200) {
        console.log('api dataaaa Sucesss' , task.result)
        return task.result
      } else {
        return task
      }
    },    
  }
}

export const Ui = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] }
})
