<template>
  <!-- <div class="wishlist wishlist_out right-sidebar max-w-full fixed p-8 pt-10" :class="{ active: isWishlistOpen }" style="text-align: center;">
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
  </button>-->

  <div class="wish_wrap_box" :class="{'item-in-it': boardsListItems.length>0}">
    <div v-if="!boardsListItems.length" class="wish_ico_box">
      <img src="/assets/wishlisticon.png" alt />
    </div>

    <!-- <h2 v-if="!isBoardsItemsOpen" class="mb-8 upper-letter" >
        {{ $t('Boards') }}
    </h2>-->

    <!-- Boards Listing -->
    <h4 v-if="!boardsListItems.length" class="mb-2">{{ $t('Your Board is empty.') }}</h4>

    <div class="wish_cnt" v-if="!boardsListItems.length">
      <p>Tap plus button to start saving your favorite items</p>
      <!-- <button  @click="$bus.$emit('modal-show', 'modal-create-boards')" 
          lass="add-now-button block border-none rounded-none bg-grey-dark px-4 py-2 ripple tracking-md text-sm text-white font-medium leading-base mb-2 w-full"
      >Add to board</button>-->
    </div>

    <!-- <ul class="products 11 p-0 m-0" v-if="boardsListItems.length > 0 & !isBoardsItemsOpen"> -->
    <swipe-list
      class="products p-0 m-0"
      ref="list"
      :items="boardsListItems"
      item-key="id"
      v-if="boardsListItems.length > 0 & !isBoardsItemsOpen"
    >
      <template v-slot="{ item, index, revealLeft, revealRight, close, revealed }" class="mb-3">
        <boards-item @click="selectedBoard(item, index);$emit('chagesInView')" :product="item" />
      </template>
      <template v-slot:right="{ item }">
        <div class="swipeout-action red button_bx_link_lrg" @click="removeFromBoards(item)">
          <remove-button class="cl-accent" />
        </div>
      </template>
      <!-- <boards-item  @click="selectedBoard(product);$emit('chagesInView')" v-for="product in boardsListItems" :key="product.id" :product="product"/>   -->
    </swipe-list>

    <!-- Boards products Listing -->
    <h2
      v-if="isBoardsItemsOpen"
      class="mb-8 upper-letter"
      style="height: 60px;background: #f5f2f1;padding-top: 8px;"
    >
      <span
        @click="changeBoardView();$emit('chagesInView')"
        style="float: left;padding-left: 17px;"
      >
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </span>
      &nbsp; &nbsp; &nbsp;
      {{ selectedBoardItem.name }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span
        v-if="selectedBoardItem && selectedBoardItem.items && selectedBoardItem.items.length > 0"
        style="font-size: 14px;"
      >{{ selectedBoardItem.items.length }}</span>
      <span style="font-size: 14px;" v-else>0</span>
      <span style="font-size: 11px;text-transform: lowercase;">Items</span>
    </h2>
    <!-- <ul class="products 11 p-0 m-0" v-if="isBoardsItemsOpen"> -->
    <swipe-list
      class="products p-0 m-0"
      ref="list"
      :items="selectedBoardItem.items"
      item-key="id"
      v-if="isBoardsItemsOpen"
    >
      <template v-slot="{ item, index, revealLeft, revealRight, close, revealed }" class="mb-3">
        <product :product="item" :index-value="selectedBoardItemIndex" />
      </template>
      <template v-slot:right="{ item, index }">
        <div
          class="swipeout-action red button_bx_link_lrg"
          @click="removeFromBoardsProduct({product: item , index: selectedBoardItemIndex })"
        >
          <remove-button class="cl-accent" />
        </div>
      </template>
      <!-- <product v-for="(product, index) in this.selectedBoardItem.items" :key="product.id" :product="product" :index-value="index"/>  -->
      <!-- </ul> -->
    </swipe-list>

    <!-- Boards products Listing Empty screen -->
    <p
      v-if="selectedBoardItem && selectedBoardItem.items && selectedBoardItem.items.length == 0
        && isBoardsItemsOpen"
      class="mb-2"
    >{{ $t('Boards is empty.') }}</p>
  </div>
  <!-- </div> -->
</template>

<script>
import { Wishlist } from "@vue-storefront/core/modules/boards/components/Wishlist";
import Product from "theme/components/core/blocks/Boards/Product";
import BoardsItem from "theme/components/core/blocks/Boards/BoardsItem";
import { SwipeList, SwipeOut } from "vue-swipe-actions";
import RemoveButton from "./RemoveButton";

export default {
  name: "Boards",
  props: {
    product: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      isBoardsItemsOpen: false,
      swipedValue: 0,
      selectedBoardItem: {},
      selectedBoardItemIndex: 0,
      isBoardItemIsLoading: false
    };
  },
  components: {
    Product,
    BoardsItem,
    SwipeList,
    RemoveButton
  },
  mixins: [Wishlist], // Wishlist
  methods: {
    closeWishlist () {
      this.$store.dispatch('ui/closeWishlist');
    },
    movingHandler () {
      if (
        !this.swipedLeft &&
        (this.swipedValue > -80 && this.swipedValue <= 0) &&
        this.windowWidth <= 760
      ) {
        this.swipedValue = this.swipedValue - 10;
      }
    },
    swipeLeftHandler () {
      if (this.windowWidth <= 760) this.swipedValue = -80;
    },
    swipeRightHandler () {
      if (this.windowWidth <= 760) this.swipedValue = 0;
    },
    changeBoardView () {
      this.isBoardsItemsOpen = !this.isBoardsItemsOpen;
    },
    async selectedBoard (item, index) {
      this.isBoardsItemsOpen = !this.isBoardsItemsOpen;
      this.selectedBoardItem = item;
      this.selectedBoardItemIndex = index;
      // if (item.items_count > 0 && item.items.length === 0) {
      //   this.isBoardItemIsLoading = true;
      //   try {
      //     const res = await this.$store.dispatch('boards/getBoardProducts', { board: item, boardIndex: index })
      //     console.log('sucesss data', res)
      //     if (res) {
      //       console.log('sucesss data', res)
      //       this.isBoardItemIsLoading = false;
      //     }
      //   } catch (err) {
      //     console.log('Api error data', err)
      //     this.isBoardItemIsLoading = false;
      //   } finally {
      //     this.isBoardItemIsLoading = false;
      //   }
      // }
    },
    removeFromBoards (product) {
      this.$store.state["boards"]
        ? this.$store.dispatch("boards/removeBoard", product)
        : false;
      this.swipedValue = 0;
    },
    removeFromBoardsProduct (product) {
      console.log('remove From Boards-->', product);
      return this.$store.state['boards'] ? this.$store.dispatch('boards/removeItem', {...product, board: this.selectedBoardItem}) : false;
    }
  },
  mounted () {
    this.windowWidth = window.innerWidth;
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
