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
    <div class="fit" v-if="getFitAttributeValue"><span class="fit-attribute">Fit :</span> {{getFitAttributeValue.label}}</div>                                   
    <div class="mt-10">
      <!-- <h4>Model Details</h4> -->  
        <div v-if="productModelDetails" class="model flex model-div">
            <div>
              <img :src="modelImage" class="model-image" />
            </div>
            <div>
                <p v-if="modelName" class="mb-8 name_sec">Model:&nbsp;  {{modelName.label}} </p>
                  <ul class="modeldata">
                    <li>Height:&nbsp;  {{productModelDetails.height}} </li>
                    <li>Hips:&nbsp;  {{productModelDetails.hips}} </li>
                    <li>Waist:&nbsp;  {{productModelDetails.waist}} </li>
                    <li>Bust:&nbsp;  {{productModelDetails.bust}} </li>
                    <li class="mt-8 detail_sec" >Details:&nbsp;  {{productModelDetails.details}} </li>
                </ul>
            </div>
        </div>
    </div>
          

  </div>
</template>

<script>
import config from 'config'
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
        swipeToClosePanelFlag: false,
        //mediaimageurl: config.cdnimage.mediaurl,
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
    modelImage () {
      return this.productModelDetails && this.productModelDetails.image ? config.models_Image_Base_Url + this.productModelDetails.image : null
    },
    modelName () {
      if (this.attributesByCode && this.attributesByCode.model) {
        return this.attributesByCode.model.options.find(val => val.value == this.product.model) || null
      } else {
        return null
      }
    },
    getFitAttributeValue () {
      if (this.attributesByCode && this.attributesByCode.fit) {
        return this.attributesByCode.fit.options.find(val => val.value == this.product.fit) || null
      } else {
        return null
      }
    }    
  },
  mounted () {
      console.log("FFFFFFFF",this.attributesByCode)
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
 
 .model .ul.modeldata li{
   line-height: 2.5rem;
    margin-bottom: 2px;
    width: 300px;
    margin-left: 17px;
    margin-bottom: 0;
    padding: 0;
    margin-bottom: -17px;   
 }

.model-image { width: 85%;}
.model-div div {
  width: 50%;  
}
.model-div ul li, .model-div p {
  font-size: 16px;
  font-weight: 400;
}
.fit{
  margin-top: 15px;
  margin-left: 10px;  
}
.fit .fit-attribute{
  font-weight: 500;
  text-transform: uppercase;  
}

@media (max-width: 375px) {
  .model-div ul li, .model-div p {
    font-size: 14px;
  }
  .name_sec {
    margin-bottom: 1rem;  }
  .detail_sec {
    margin-top: 1rem;
  }
}

@media screen and (min-width: 375px) and (max-width: 768px) {
  .model-div ul li, .model-div p {
    font-size: 16px;
  }
}
</style>
