<template>                                                                         
  <div class="getthelook right-sidebar max-w-full fixed p-8 pt-10" :class="{ active: isProductGetTheLookSidePanelOpen }">
    <div class="right-sidebar max-w-full fixed" style="height: 60px;box-shadow: 0 3px 3px -3px #00000045;">
        <button
          type="button"
          :aria-label="$t('Close')"
          class="absolute top-0 right-0 m-4 h-4"
          style="top: 10px;right: 10px;"
          @click="closeSidepanel"
          data-testid="closeMicrocart"
        >
          <svg viewBox="0 0 25 25" class="vt-icon--sm">
            <use xlink:href="#close" />
          </svg>
        </button>
        
        <h2 style="position: absolute;top: 20px;left: 41px;text-transform:uppercase;">GET THE LOOK</h2>
      </div>
    <br>          
    <div>
        <div class="outfit-image"><img :src="getOutFitImageUrl" class="model-image" /></div>
        <!-- <div  v-for ="item in upsellitems">
            <product :product="item" @click="removeItem" @parentevent="getupdateclick" />
        </div> -->
        <sidepanel-product-listing columns="1" :products="getupsellitems.related['upsell']" />    
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import SidepanelProductListing from 'theme/components/core/SidepanelProductListing'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import NoScrollBackground from 'theme/mixins/noScrollBackground'
import { prepareRelatedQuery } from '@vue-storefront/core/modules/catalog/queries/related'
import config from 'config'
import store from '@vue-storefront/core/store'

export default {
  name: 'ProductGetTheLookSidePanel',
  data () {
    return {
        loadingNewProdFlag: true,
        refresh: 0,
        type:'upsell',
        detailsOpen: false,                
        swipeToClosePanelFlag: false,
        upsellitems:[]      
    }
  },  
  components: {
    SidepanelProductListing
  },  
  props: {
  },  
  computed: {
    ...mapState({
      isProductGetTheLookSidePanelOpen: state => state.ui.productGetTheLookSidePanelFlag
    }),
    ...mapGetters({
      product: 'product/productCurrent'
    }),   
    getOutFitImageUrl () {
       return this.$store.state.config.images.baseUrl+'300/450/resize'+this.product.outfit_image
      //return store.state.config.images.baseUrl
    },
    // product () {
    //   return this.$store.state.product
    // },    
    productLinks () {
      return this.product.product_links
    }, 
    getupsellitems (){
       return this.$store.state.product 
    }        
    // isProductGetTheLookSidePanelOpen () {
    //   return this.$store.state.ui.productGetTheLookSidePanelFlag
    // }
  },
  mounted () {
      console.log("NEW SIDEEEEEEEEEEEEEEEEE 1111",this.product)
    let start = null;
    const touchStart = (event) => {
        if(event.touches.length === 1) start = event.touches.item(0).clientX;
        else  start = null;
    }
    const touchend = (event) => {
        const offset = 100;
        if(start){
          const end = event.changedTouches.item(0).clientX;
            // if(end > start + offset) console.log('swiped left -> right swipe***')
            // if(end < start - offset)  console.log('swiped right -> left swipe***')
            if(end > start + offset){
            if(this.swipeToClosePanelFlag) return
            this.swipeToClosePanelFlag = true;
            this.closeSidepanel()
          } 
        }
    }
    document.addEventListener("touchstart", touchStart);
    document.addEventListener("touchend", touchend);
    this.$once('hook:destroyed', () => {
        document.removeEventListener('touchstart', touchStart)
        document.removeEventListener('touchend', touchend)
    })
    this.getallupsellproducts();
  },
  mixins: [onEscapePress, NoScrollBackground],
  methods: {
    closeReviewPanel () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.dispatch('ui/toggleProductGetTheLookSidePanel')
    },
    toggletoggleReviewPanel () {
      this.$store.dispatch('ui/toggleProductGetTheLookSidePanel', false)
    },
    onEscapePress () {
      this.closeSidepanel()
    },
    closeSidepanel () {
     this.$store.dispatch('ui/toggleProductGetTheLookSidePanel' , false)
    },
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
    },
    getallupsellproducts() {
      this.loadingNewProdFlag = true;
      let sku = this.productLinks ? this.productLinks
        .filter(pl => pl.link_type === 'upsell')
        .map(pl => pl.linked_product_sku) : null
      let key = 'sku.keyword'
      let upsellProductsQuery = prepareRelatedQuery(key, sku)
      this.$store.dispatch('product/list', {
        query: upsellProductsQuery,
        size: 25,
        prefetchGroupProducts: false,
        updateState: false
      }).then((response) => {
        if (response) {
          this.$store.dispatch('product/related', {
            key: this.type,
            items: response.items.filter(val => val._dontShowInListingFlag == false)
          })
          this.loadingNewProdFlag = false;
          this.$forceUpdate()
          this.refresh++;
        }
      }, err => {
          this.loadingNewProdFlag = false;
      })     
      
        this.upsellitems = this.$store.state.product.related.upsell
        console.log("testtEEEEEEEEEEEEEEEE",sku)
        console.log("testtEEEEEEEEEEEEEEEE111111111111111",this.$store.state.product.related.upsell)        
    },    
  },
  beforeCreate () {
    const el = document.body;
    el.classList.add('menu-high-opacity');
    document.documentElement.classList.add('menu-high-opacity')
  },
  beforeDestroy () {
    window.removeEventListener("touchstart", null);
    window.removeEventListener("touchend", null);
  },
  destroyed () {
    const el = document.body;
    el.classList.remove('menu-high-opacity');
    document.documentElement.classList.remove('menu-high-opacity')
  }
  
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";

  i {
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
  .getthelook{
    .outfit-image{
        img{
            margin: 0px auto; 
        }         
    }
  }
</style>
