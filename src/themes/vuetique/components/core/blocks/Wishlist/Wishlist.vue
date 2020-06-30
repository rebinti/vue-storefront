<template>
  <div
    class="wishlist wishlist_out right-sidebar max-w-full fixed p-8 pt-10"
    :class="{ active: isWishlistOpen }"
    style="text-align: center;"
  >
    <button
      type="button"
      :aria-label="$t('Close')"
      class="absolute top-0 right-0 m-4 h-4"
      @click="closeWishlist"
      data-testid="closeWishlist"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#close" />
      </svg>
    </button>

    <h2 v-show="viewType === 'wishlist'"      
      class="mb-8 upper-letter"
      style="margin-bottom: 1rem !important;"
    >
      {{ $t('Wishlist') }}
    </h2>

    <h2 v-show="viewType === 'boards'" class="mb-8 upper-letter" style="margin-bottom: 1rem !important;">
      {{ $t('Boards') }}
    </h2>

    <div class="wishlist-top-button-row clearfix" v-show="!hideWishListForBoardFlag">
      <span class="button-blck">
        <button
          class="button-type1"
          :class="{'active' : viewType === 'wishlist'}"
          @click="viewType = 'wishlist';reRendBoards=false"
        >All items</button>
      </span>
      <span class="button-blck">
        <button
          class="button-type1"
          :class="{'active' : viewType === 'boards'}"
          @click="viewType = 'boards';reRendBoards=true"
        >Boards</button>
      </span>
    </div>


    <div
      class="wish_wrap_box"
      :class="{'item-in-it': productsInWishlist.length>0}"
      v-show="viewType === 'wishlist'"
    >
      <div v-if="!productsInWishlist.length " class="wish_ico_box">
        <img src="/assets/wishlisticon.png" alt>
      </div>



      <h4 v-if="!productsInWishlist.length" class="mb-2">
        {{ $t('Your wishlist is empty.') }}
      </h4>

      <div class="wish_cnt" v-if="!productsInWishlist.length">
        <p>Tap heart button to start saving your favorite items</p>
        <router-link
          class="add-now-button block border-none rounded-none bg-grey-dark px-4 py-2 ripple tracking-md text-sm text-white font-medium leading-base mb-2 w-full"
          :to="localizedRoute('/')"
        >
          Add now
        </router-link>
      </div>
      <template v-if="productsInWishlist.length > 0">
      <swipe-list class="products p-0 m-0" ref="list" :items="productsInWishlist[0]" item-key="id" :key="componentKey">
        <template v-slot="{ item, index, revealLeft, revealRight, close, revealed }" class="mb-3">
          <product :product="item" @click="removeFromWishlist"/>
        </template>
 
        <template v-slot:right="{ item }">
          <div class="swipeout-action red button_bx_link_lrg" @click="removeFromWishlist(item)">
         
            <remove-button class="cl-accent" />
          </div>
        </template>
      </swipe-list>
      </template>
    </div>

    <boards v-show="viewType === 'boards'" @chagesInView="chagesInView" :rerender="reRendBoards" @chageRenderFlag="chageRenderFlag" />
    <div
      class="add_more_btn"
      v-show="viewType === 'boards'"
      @click="openCreateBoardPopup"
    >
      <a href="#" class="add_more_pls">
        <i class="fas fa-plus" />
      </a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Wishlist from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Wishlist';
import Product from 'theme/components/core/blocks/Wishlist/Product';
// const Boards = () => import(/* webpackChunkName: "vsf-boards" */ 'theme/components/core/blocks/Boards/Wishlist.vue')
import Boards from 'theme/components/core/blocks/Boards/Wishlist.vue';
import NoScrollBackground from 'theme/mixins/noScrollBackground';
import { SwipeList, SwipeOut } from 'vue-swipe-actions';
import RemoveButton from './RemoveButton';

export default {
  props: {
    product: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      valueUp: 106,
      viewType: 'wishlist',
      hideWishListForBoardFlag: false,
      page: 0,
      componentKey: 0,
      reRendBoards: false
    };
  },
  components: {
    Product,
    Boards,
    SwipeList,
    RemoveButton
  },
  mixins: [Wishlist, NoScrollBackground],
  methods: {
    closeWishlist () {
      this.$store.dispatch('ui/closeWishlist');
    },
    swipeAction (param) {
      return function (dir) {
        if (dir == 'left') {
          param.swipedElement = true;
        }
        if (dir == 'right') {
          param.swipedElement = false;
        }
      };
    },
    movingHandler () {
      // this.valueUp--;
      console.log('movingHandler movingHandler', this.valueUp);
    },
    startHandler () {
      // this.valueUp = 110
      console.log('startHandler startHandler');
    },
    endHandler () {
      //  this.valueUp = 110
      console.log('endHandler endHandler');
    },
    chagesInView () {
      console.log('Changes in view page Wishlist');
      this.hideWishListForBoardFlag = !this.hideWishListForBoardFlag;
    },
    async removeFromWishlist (product) {
      // this.$set(this.productsInWishlist, this.page, this.productsInWishlist[this.page].filter(p => p.parentSku !== product.parentSku));
      try {
        const result = await this.$store.dispatch('wishlist/removeItem', {...product })
        console.log('result after delete', result)
        if ((this.productsInWishlist.length > 0) && this.productsInWishlist[this.page].length > 1) {
          this.$set(this.productsInWishlist, this.page, this.productsInWishlist[this.page].filter(p => p.parentSku !== product.parentSku));
        } else {
          this.$store.dispatch('wishlist/syncWishlist', []);
          return
        }

        this.$store.dispatch('wishlist/syncWishlist', this.productsInWishlist);
        this.forceRerender()
        // if (result) {
        // setTimeout(() => {
        // Vue.forceUpdate()
        this.$forceUpdate()
        // }, 250);
        // }
      } catch (err) {
        console.log('errrorr', err);
      } finally {
        console.log('finally');
      }

      // return this.$store.state['wishlist']
      //   ? this.$store.dispatch('wishlist/removeItem', {...product, prodIndex: index})
      //   : false;
    },
    forceRerender () {
      this.componentKey += 1
    },
    chageRenderFlag () {
      this.reRendBoards = false
    },
    openCreateBoardPopup () {
        if(this.$store.state.user && this.$store.state.user.current === null) {
          this.closeWishlist();
          this.$store.dispatch('notification/spawnNotification', {
            type: 'success',
            message: 'Please sign-in for create boards!'
          })
          this.$store.commit('ui/setAuthElem', 'login')
          Vue.prototype.$bus.$emit('modal-show', 'modal-signup')
          return
        }
        this.$store.commit('ui/setBoardsElem', 'create-board');
        this.$bus.$emit('modal-show', 'modal-create-boards');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";

i {
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
}

.add-now-button {
  width: 100px;
}

.wish_wrap_box {
  text-align: center;
}

.wish_ico_box {
  text-align: center;
}
.wish_ico_box img {
  display: inline-block;
}
.wish_wrap_box h4 {
  font-size: 25px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 15px;
}
.wish_cnt {
  text-align: center;
}
.wish_cnt p {
  font-size: 12px;
  margin-bottom: 15px;
}
.wish_cnt a {
  border: 1px solid #000;
  color: #000;
  font-weight: bold;
  display: inline-block;
  background: transparent !important;
  font-size: 15px;
  width: auto;
}

.wish_wrap_box {
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  position: absolute;
  width: 100%;
  left: 0px;
}

.wish_wrap_box.item-in-it {
  top: 0px;
  position: relative;
  -webkit-transform: translateY(0%);
  -ms-transform: translateY(0%);
  transform: translateY(0%);
  left: 0px;
}

.wishlist.wishlist_out {
  padding-left: 20px;
  padding-right: 20px;
}

.upper-letter {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 20px;
}

/* New style */

.wishlist-top-button-row {
  max-width: 314px;
  margin: auto;
  margin-bottom: 25px;
}
.wishlist-top-button-row .button-blck {
  display: block;
  float: left;
}
.wishlist-top-button-row .button-blck .button-type1 {
  border: 1px solid #000000;
  padding: 4px 48px;
  color: #000000;
  width: 157px;
}
.wishlist-top-button-row .button-blck .button-type1.active {
  background: #000000;
  color: #ffffff;
}

.add_more_btn {
  width: 50px;
  height: 50px;
  background: #000;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  position: fixed;
  bottom: 40px;
  z-index: 100;
  right: 20px;
}
.add_more_btn a {
  width: 100%;
  height: 100%;
  font-size: 20px;
  color: #fff;
  padding-top: 13px;
  display: inline-block;
}

.right-sidebar {
  top: 0px;
  height: 100vh;
  z-index: 8;
  max-height: calc(100vh - 0px);
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
.wishlist.wishlist_out.pt-10 {
        padding-top: 0.50rem;
}
</style>
