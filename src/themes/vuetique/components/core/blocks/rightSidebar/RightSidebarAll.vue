<template>
  <div
    class="right-sidebar microcart max-w-full fixed p-8 pt-10 mob_microcart"
   :class="{ active: isRightSidebarOpen }" 
    data-testid="microcart"
  >
  <div class="hd_fix">
    <button
      type="button"
      :aria-label="$t('Close')"
      class="absolute top-0 right-0 m-4 h-4"
      @click="closePopup"
      data-testid="closeMicrocart"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#close" />
      </svg>
    </button>

    <!-- <h2  class="mb-8 h_title">
     <span v-if="productsInCart.length > 0"> {{productsInCart.length}} </span> {{ $t('Items') }}
    </h2> -->
  </div>

  <div>
    <ul class="headtab">
      <li @click="changeActiveTab('wishlist')" class="headtabitem">
       <div :class="{'active-tab': isRightSidebarActiveTab === 'wishlist'}">
          Wishlist
        </div>
        </li>
      <li @click="changeActiveTab('boards')" class="headtabitem border-add">
         <div :class="{'active-tab': isRightSidebarActiveTab === 'boards'}">
            Boards
        </div>
      </li>
      <li @click="changeActiveTab('cart')" class="headtabitem">
         <div :class="{'active-tab': isRightSidebarActiveTab === 'cart'}">
           Cart
        </div>
        </li>
    </ul>

    <div class="active-tab-content">
        <microcart v-if="isRightSidebarActiveTab === 'cart'"  />
        <boards  v-if="isRightSidebarActiveTab === 'boards'"  />
        <wishlist v-if="isRightSidebarActiveTab === 'wishlist'" />
    </div>


  </div>
  
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import VueOfflineMixin from 'vue-offline/mixin'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import NoScrollBackground from 'theme/mixins/noScrollBackground'
import config from 'config'

const Microcart = () => import(/* webpackChunkName: "vsf-microcart" */ 'theme/components/core/blocks/Microcart/Microcart.vue')
const Wishlist = () => import(/* webpackChunkName: "vsf-wishlist" */ 'theme/components/core/blocks/Wishlist/Wishlist.vue')
const Boards = () => import(/* webpackChunkName: "vsf-boards" */ 'theme/components/core/blocks/Boards/Wishlist.vue')

export default {
  name: "rightSidebarAll",
  components: {
    Microcart,
    Wishlist,
    Boards
  },
  mixins: [
    // onEscapePress,
    NoScrollBackground
  ],
  data () {
    return {
        activeTab: '',
        componentLoaded: false
    }
  },
  props: {

  },
  computed: {
     isRightSidebarOpen () {
      return this.$store.state.ui.allItemsRightSidebar && this.componentLoaded
    },
    isRightSidebarActiveTab () {
      return this.$store.state.ui.allItemsRightSidebarActiveTab
    },

  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
  },
  methods: {
    changeActiveTab (tab) {
        this.activeTab = tab;
        this.$store.commit('ui/setRightSidebarToAll', { active: true, activeTab: this.activeTab})
    },
    closePopup () {
      this.$store.commit('ui/setRightSidebarToAll', { active: false, activeTab: '' })
    }
  }
}
</script>

<style lang="scss" scoped>

.active-tab-content .right-sidebar{
    top: 92px!important;
  }

  .headtab {
    list-style: none;
    display: flex;
  }

  .headtabitem {
    width: 100px;
    height: 50px;
    // border: 1px solid;
    margin-right: 10px;
    text-align: center;
    padding-top: 11px;
  }

  .active-tab {
    width: 100%;
    height: 100%;
    border-bottom: 2px solid;
    padding: 0;
  }

 .active-tab-content .hd_fix button.absolute.top-0.right-0.m-4.h-4 {
    display: none !important;
}

.border-add {
  border-left: 1px solid;
  border-right: 1px solid;
}



 .mb_smry_out_wrap{
   background: #ffffff;
   position: fixed;
   bottom:0px;
   right:0px;
   width:100%;
   max-width: 480px;
   padding: 10px 15px;
   z-index: 100;
 }
 .p_crt_list{
   width:100%;
   margin-bottom: 150px;
   margin-top: 15px;
 }

    .mob_microcart .h_title{
      border-bottom: 0px;
      font-size: 17px;
      width: 100%;
      text-align: center;
      margin: 0px;
      margin-bottom: 20px;
      text-transform: uppercase;

    }

    .right-sidebar.microcart{
      padding-left: 15px;
      padding-right: 15px;
    }
    .right-sidebar.microcart .summary{
      padding-top: 0px;
    }

    .mob_summary .mob_d_item{
      border-bottom:1px solid #ededed;
      padding-bottom: 20px;
      display: none;
    }

    .mob_summary .mob_rw_list{
      /*border-bottom:1px solid #ededed;*/
      padding-top: 4px;
      padding-bottom: 15px;
    }

    .mob_summary .mob_rw_list button{
      background: #000;
      color: #ffffff;
      border-color: #000;
    }
    
    .mob_summary .mob_d_price{
      color:#000;
    }

    .mob_rw_price .total-price-label{
        color: #666666;
        font-size:15px;
        font-weight: 500;
    }

    .mob_rw_price .total-price-value{
       color:#000;
       font-size:15px;
        font-weight: 500;
    }

    .back_sec{
      padding-top: 0px;
    }

    .back_sec .ic_l{
      float: left;
      margin-right: 10px;
    }
    .back_sec .back-to-shopping{ display: none; }
    .back_sec .back-to-shopping .icl_span{
      float: left;
      line-height: 12px;
      color: #000;

    }

    .input-number-controls button .vt-icon{
      margin-left:5px;
    }

    .ht_bx{
       background: #000;
      color: #ffffff;
      border-color: #000;
    }

    .right-sidebar{
        top: 0px;
        height: 100vh;
        z-index: 8;
        max-height: calc(100vh - 0px);
    }

 @media (max-width: 576px) {
    .hd_fix{
      position: fixed;
      top:0px;
      left:0px;
      background:#ffffff;
      width:100%;
      z-index: 100;
    }
    .hd_fix .h_title{
      margin-bottom: 3px;
    }
 }

/*** new Swipe to delete css */

.swipeout-action {
  display: flex;
  align-items: center;
  padding: 0 3rem;
  cursor: pointer;
  left: 0;
}
.swipeout-action.blue {
  color: white;
  background-color: rgb(0, 122, 255);
}
.swipeout-action.blue:hover {
  background-color: darken(rgb(0, 122, 255), 5%);
}
.swipeout-action.purple {
  color: white;
  background-color: rgb(88, 86, 214);
}
.swipeout-action.purple:hover {
  background-color: darken(rgb(88, 86, 214), 5%);
}

.swipeout-action.red {
  color: white;
  background-color: rgb(255, 59, 48);
  margin-left: 15px;
  margin-bottom: 10px;
}
.swipeout-action.red:hover {
  background-color: darken(rgb(255, 59, 48), 5%);
}
.swipeout-action.green {
  color: white;
  background-color: rgb(76, 217, 100);
}
.swipeout-action.green:hover {
  background-color: darken(rgb(76, 217, 100), 5%);
}

.swipeout-list-item {
  flex: 1;
  border-bottom: 1px solid lightgray;
}

.swipeout-list-item:last-of-type {
  border-bottom: none;
}

.card {
  width: 100%;
  background-color: white;
  border-radius: 3px;
  box-shadow: none;
  border: 1px solid lightgray;
}
.card-content {
  padding: 10px;
  margin-bottom: 10px;
  padding-top: 0px;
}
.transition-right {
  transform: translate3d(100%, 0, 0) !important;
}
.transition-left {
  transform: translate3d(-100%, 0, 0) !important;
}

.toolbar {
  display: flex;
  align-items: center;
}

.toolbar .toolbar-section {
  flex: 0 0 auto;
}

.toolbar .toolbar-section--center {
  flex: 1000 1 0%;
}

.swipeout-right {
  padding-left: 15px;
}
</style>