import { createModule } from '@vue-storefront/core/lib/module'
// TODO: Move the logic to appropriate modules and deprecate this one
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { Logger } from '@vue-storefront/core/lib/logger'
import config from 'config'

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
    mobileGridData: [{value: 2, image: '../assets/grid2.png', 'index': 0},
                    {'value': 3, 'image': '../assets/grid3.jpg', 'index': 1},
                    {'value': 4, 'image': '../assets/grid4.png', 'index': 2}],
    seletedMobileGrid: {value: 2, image: '../assets/grid2.png', index: 0},
    defaultColumnMobile: 2,
    yoptoProduct: null,
    brandsList: [],
    brandSearchText: '',
    brandSelectedChar: '',
    fbLoggedInfo: null,
    googleLoggedInfo: null,
    selectedSocialLoginType: null,


    allItemsRightSidebar: false,
    allItemsRightSidebarActiveTab: ''

  },
  getter: {
    getSelectedGridView: state => state.seletedMobileGrid,
    getDefaultColumnMobile: state => state.defaultColumnMobile,
    getBrandsList: state => state.brandsList
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
    },
    setBrandList (state, data) {
      state.brandsList = data;
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

   setRightSidebarToAll  (state, data) {
    state.allItemsRightSidebar = data.active;
    state.allItemsRightSidebarActiveTab = data.activeTab
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
    updateYoptoProduct ({commit}, state) {
      commit('setYoptoProduct', state)
    },
    UpdateSeletedMobileGrid ({commit}, state) {
      commit('setSeletedMobileGrid', state)
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
            Logger.error(err, 'ui/brands')()
          })
    },
    setBrandsFiltersAction({commit}, state) {
      commit('setBrandsFilters', state)
    },
  }
}

export const Ui = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] }
})
