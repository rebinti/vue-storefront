<template>                                                                         
  <div class="wishlist right-sidebar max-w-full fixed p-8 pt-10" :class="{ active: isProductDetailsSidePanelOpen }">
    <div class="right-sidebar max-w-full fixed" style="height: 60px;box-shadow: 0 3px 3px -3px #00000045;">
        <button
          type="button"
          :aria-label="$t('Close')"
          @click="closeSearchpanel"
          class="absolute top-0 right-0 m-4 h-4 "
          style="top: 10px;right: 10px;"
          data-testid="closeMicrocart"
        >
          <svg viewBox="0 0 25 25" class="vt-icon--sm">
            <use xlink:href="#close" />
          </svg>
        </button>
        <h3 style="position: absolute;top: 20px;left: 41px;">Product Details</h3>
    </div>
    <br>          
        <div class="description"
            v-html="product.short_description"
            style="margin-left: 10px; margin-top: 10px;white-space: pre-line;"
        />
                                      
    <br>    
        <div  class="description"
            v-html="product.description" 
            style="margin-left: 10px;white-space: pre-line;"
        />
                                 
    
  <div style="margin-top:10px;">
    <h4>Model Details</h4>
      <p v-if="modelName">Model: {{modelName.label}} </p>
      <div v-if="productModelDetails">
        <img :src="productModelDetails.image" width="100" height="100" />
         <p>Height: {{productModelDetails.height}} </p>
         <p>Hips: {{productModelDetails.hips}} </p>
         <p>Waist {{productModelDetails.waist}} </p>
         <p>Bust: {{productModelDetails.bust}} </p>
         <p>Details: {{productModelDetails.details}} </p>
      </div>

  </div>
          

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import NoScrollBackground from 'theme/mixins/noScrollBackground'
import CmsBlock from 'theme/components/core/blocks/Cms/Block'

export default {
  name: 'ProductDetailsSidePanel',
  props: {
  },
  mixins: [CmsBlock],
  data () {
    return {      
        detailsOpen: false,        
        detailsAccordion: 'details',
        swipeToClosePanelFlag: false
    }
  },  
  components: {
     CmsBlock
  },
  computed: {
    ...mapState({
      isProductDetailsSidePanelOpen: state => state.ui.productDetailsSidePanelFlag
    }),
    ...mapGetters({
      product: 'product/productCurrent',
      modelsList: 'ui/getModelsList',
      attributesByCode: 'attribute/attributeListByCode',
    }),    
    // isProductDetailsSidePanelOpen () {
    //   return this.$store.state.ui.productDetailsSidePanelFlag
    // }
    productModelDetails () {
      return this.modelsList.find(val=> val.name == this.product.model) || null
    },
    modelName () {
      if (this.attributesByCode && this.attributesByCode.model) {
        return this.attributesByCode.model.options.find(val => val.value == this.product.model) || null
      } else {
        return null
      }
    }
  },
  mounted () {
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
            if(end < start - offset ){
              if(this.swipeToClosePanelFlag) return
              this.swipeToClosePanelFlag = true;
              this.closeSearchpanel()
            } 
          }
      }
      document.addEventListener("touchstart", touchStart);
      document.addEventListener("touchend", touchend);
      this.$once('hook:destroyed', () => {
          document.removeEventListener('touchstart', touchStart)
          document.removeEventListener('touchend', touchend)
      })
  },
  mixins: [onEscapePress, NoScrollBackground],
  methods: {
    closeReviewPanel () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.dispatch('ui/toggleProductDetailsSidePanel')
    },
    toggletoggleReviewPanel () {
      this.$store.dispatch('ui/toggleProductDetailsSidePanel', false)
    },
    onEscapePress () {
      this.closeSearchpanel()
    },
    closeSearchpanel () {
     this.$store.dispatch('ui/toggleProductDetailsSidePanel' , false)
    },
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
    }    
  },
  beforeCreate () {
    const el = document.body;
    el.classList.add('menu-high-opacity');
    document.documentElement.classList.add('menu-high-opacity')
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
</style>

<style>

  .description p {
    margin-bottom: -30px;

  }
  .description ul {
      list-style: disc outside;
  }

  .description ul li {
     margin-bottom: 2px;
    width: 300px;
    margin-left: 17px;
    margin-bottom: 0;
    padding: 0;
    margin-bottom: -17px;
 }

</style>
