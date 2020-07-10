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
    brandsLoadedFlag: false,
    brandSearchText: '',
    brandSelectedChar: '',
    fbLoggedInfo: null,
    googleLoggedInfo: null,
    selectedSocialLoginType: null,
    mainSliderData: [],
    productSidePanelFlag: false,
    productDetailsSidePanelFlag: false,
    checkoutWithoutLogin: false
  },
  getters: {
    getSelectedGridView: state => state.seletedMobileGrid,
    getDefaultColumnMobile: state => state.defaultColumnMobile,
    getDefaultColumnWeb: state => state.defaultColumnWeb,
    getBrandsList: state => state.brandsList,
    getMainSliderData: state => state.mainSliderData,
    getBrandsLoadedFlag: state => state.brandsLoadedFlag,
    getBrandSearchText: state => state.brandSearchText,
    getBrandSelectedChar:  state => state.brandSelectedChar
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
    updateYoptoProduct ({commit}, state) {
      commit('setYoptoProduct', state)
    },
    UpdateSeletedMobileGrid ({commit}, state) {
      commit('setSeletedMobileGrid', state)
    },
    UpdateSeletedWebViewGrid ({commit}, state) {
      commit('setSeletedWebViewGrid', state)
    },
    getBrandList ({commit}, { key = 'type', value, excludeFields = null, includeFields = null, skipCache = false }) {
        let query = new SearchQuery()
        if (value) {
          query = query.applyFilter({key: key, value: {'eq': value}})
        }
        if (includeFields === null) {
          // includeFields = config.brand.includeFields;
        }
        return quickSearchByQuery({ query, entityType: 'brand', excludeFields, includeFields })
          .then((resp) => {
            commit('setBrandList', resp.items);
            return resp.items
          })
          .catch(err => {
            commit('setBrandList', []);
            Logger.error(err, 'ui/brands')()
          })
    },
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
            fetch( 'https://vue.iclothing.com/api/urlorderdetails/urlorderdetails', {
              method: 'POST',
              mode: 'cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(orderId)
            }).then(res => resolve(res.json())).catch(() => reject())
        })
    },
    async getOrderedProducts ({commit}, orderId) {
      console.log('getOrderedProducts',  orderId)
          const task = await TaskQueue.execute({ url: '/api/urlorderdetails/urlorderdetails', 
          payload: {  
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({"orderid": orderId}) 
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
    }
  }
}

export const Ui = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] }
})
