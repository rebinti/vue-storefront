<template>
  <div class="size-guide-panel right-sidebar max-w-full fixed p-8 pt-10" :class="{ active: isProductSidePanelOpen }">
    
    <div class="right-sidebar max-w-full fixed" style="height: 60px;box-shadow: 0 3px 3px -3px #00000045;">
        <button
          type="button"
          :aria-label="$t('Close')"
          class="absolute top-0 right-0 m-4 h-4"
          style="top: 10px;right: 10px;"
          @click="closeSizeGuidepanel"
          data-testid="closeSizeGuide"
        >
          <svg viewBox="0 0 25 25" class="vt-icon--sm">
            <use xlink:href="#close" />
          </svg>
        </button>
        
        <h3 style="position: absolute;top: 20px;left: 41px;" >Size Guide</h3>

    </div>
    <!-- <cms-block :identifier="'product-size-guide'" :sync="true"/> -->

   <div class="row mt-5">  
    <Accordion class="mob_fltr"   
        :title="'Size Guide'"
        :openType= opensizeguide
      >
        <template>
          <div class="row">
            <base-select v-if="getAllBrandsList && getAllBrandsList.length"
              class="col-xs-12 col-sm-6 mb10"
              name="brands"
              :options="getAllBrandsList"
              :placeholder="$t('Select Brand *')"
              autocomplete="label"
              :selected="selectedBrandID"
              v-model="selectedBrandID"
              @input="brandChanged"
            />
              <div class="row" style="width: 100%;margin: 15px 0 0 0;" v-if="isCmsDataLoaded && showTabButtons">
                <button id="cm-btn"  @click="centimetresClick($event)" class="tab-btn active-btn">Centimetres</button>
                <button id="inch-btn" @click="inchesClick($event)" class="tab-btn">Inches</button>
              </div>
               <cms-block v-if="!isLoading && selectedBrandSearchTxt.length>0" @cmsDataChangedNew="cmsDataChangedEvent" :identifier="selectedBrandSearchTxt" :sync="true"/>
               <p class="no-data" v-if="isLoading"> <img src="/assets/opc-ajax-loader.svg" style="margin: 0 auto;width:75px;"> </p>
              <!-- <p class="no-data" v-if="!isCmsDataLoaded && !isLoading"> No data found </p> -->
          </div>
        </template>
      </Accordion>

    <Accordion class="mob_fltr"
        :title="'How To Measure'"
        :openType= "false"
      >
        <template>
            <div>
               <!-- <cms-block :identifier="'brand-how-to-measure'"/> -->
               <div data-styla-slot="3b8a4bf0-cec5-406a-a489-ee6dabf066dd"></div>
            </div>
        </template>
    </Accordion>
  </div>
  </div>
</template>
<script>
import { mapState , mapGetters} from 'vuex'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import NoScrollBackground from 'theme/mixins/noScrollBackground'
import CmsBlock from 'theme/components/core/blocks/Cms/Block'
import Accordion from 'theme/components/theme/Accordion'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'

export default {
  name: 'ProductSidePanel',
  props: {
  },
  data () {
    return {
      selectedBrandID: '',
      selectedBrandSearchTxt: 'brand-default-clothing',  //`brand-marc-angelo`,   // 'brand-marc-angelo'
      isLoading: false,
      isCmsDataLoaded: false,
      showTabButtons: false,
      opensizeguide: true,
      swipeToClosePanelFlag: false
    }
  },
  mixins: [onEscapePress, NoScrollBackground],
  components: {
     CmsBlock, Accordion, BaseSelect
  },
  computed: {
    ...mapState({
      isProductSidePanelOpen: state => state.ui.productSidePanelFlag
    }),
    ...mapGetters({
       product: 'product/productCurrent',
       attributesByCode: 'attribute/attributeListByCode',
       attributesById: 'attribute/attributeListById',
       brandsList: 'ui/getBrandsList',
      //  getsizeguideblockdata: 'cmsBlock/cmsBlockIdentifier',
     }),
     getAllBrandsList () {
       return this.brandsList.map((val ) => { return {...val,
         label: val.name, sort_order: 0, value: val.option_id.toString()} })
     },
     getLabelAtrributeList() {
       if (this.attributesByCode && this.attributesByCode.label) {
         return this.attributesByCode.label
      } else {
         return {}
      }
     },
    getCurrentProductLabelData () {
      if (this.getAllBrandsList && this.getAllBrandsList.length) {
         return this.getAllBrandsList.find(val => val.value == this.product.label)
      } else {         
         return null
      }
    },
  },
  beforeMount () {
    if(!this.getCurrentProductLabelData){
        this.opensizeguide = false        
    }else{
        this.opensizeguide = true
    }
  },
  mounted () { 
    if (this.getAllBrandsList) {
        this.selectedBrandID  =  this.getCurrentProductLabelData&&this.getCurrentProductLabelData.value.toString()
        this.brandChanged();
    }   
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
              this.closeSizeGuidepanel()
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
  methods: {
    onEscapePress () {
      this.closeSizeGuidepanel()
    },
    closeSizeGuidepanel () {
     this.$store.dispatch('ui/toggleProductSidePanel' , false)
    },      
    inchesClick (event) {
         event.target.classList.add('active-btn');
         document.getElementById("cm-btn").classList.remove( "active-btn" );
         document.getElementById("inches").classList.add( "active" );
      	 document.getElementById("centimetres").classList.remove( "active" );
    },
    centimetresClick (event) {
           event.target.classList.add('active-btn');
           document.getElementById("inch-btn").classList.remove( "active-btn" );
           document.getElementById("centimetres").classList.add( "active" );
           document.getElementById("inches").classList.remove( "active" );
    },
    cmsDataChangedEvent (event){       
      if (event && event.value) {
          if(event.value.content.includes('bs-example-tabs')) this.showTabButtons = true;
          this.isCmsDataLoaded = true;

        var tr = document.querySelectorAll('#product-attribute-specs-table tr')
        for(var i = 1; i < tr.length; i++) {
          tr[i].style.background = i % 2 ? '#ECECEC' : '#FFFFFF';
        }          
      }else{
          this.selectedBrandSearchTxt =  'brand-default-clothing';          
      }
    },
    brandChanged () {
      this.isLoading = true;
      this.isCmsDataLoaded = false;
      this.showTabButtons = false;
      let selectedData = null;
      if (this.attributesByCode && this.attributesByCode.label && this.attributesByCode.label.options) {
         selectedData =  this.attributesByCode.label.options.find(val => val.value == this.selectedBrandID)
      }
      if (selectedData) {
        let serachString = 'brand-' + selectedData.label.toLowerCase().split(' ').join('-');
        this.selectedBrandSearchTxt =  serachString;
      }
      setTimeout(() => {
         this.isLoading = false;
      }, 250);
    },
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

<style >

.tab-pane {
  display: none;
}

.tab-pane.active {
  display: block;
}

.tab-btn {
   float: left;
    width: 49%;
    border: 1px solid #c5b1b1;
    padding: 10px;
    text-align: center;
    font-size: 16px;
    margin-left: 4px;
}

.bs-example-tabs {
  display: none!important;
}

.tab-btn.active-btn{
  text-decoration: underline;
}

.data-table tr th {
    border-right: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    padding: 14px 10px;
    background: #000;
    border: 1px solid #000;
    color: #fff;
    font-size: 14px;
}

.data-table tr td {
    border-color: #e1e1e1;
    padding: 7px 5px;
    border-width: 1px;
    border-style: solid;
    font-size: 13px;
}

.product-details-size #product-attribute-specs-table {
    max-width: 100em;
    margin-top: 10px;
    float: left;
}
.no-data {
      margin: 0 auto;
    padding-top: 21px;
    font-weight: 500;
}

  .size-guide-panel .cms-content.py-10{
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-right: 0rem;
    padding-left: 0rem;    
  }
  .size-guide-panel #cm-btn{
    margin-left: 0px;
  }
  .size-guide-panel #inch-btn{
    margin-left: 7px;
  }


@media screen and (max-width: 480px) {
  .data-table tr th {
        border-right: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
        padding: 7px 0px;
        background: #000;
        border: 1px solid #000;
        color: #fff;
        font-size: 10px;
    }

    .data-table tr td {
        border-color: #e1e1e1;
        padding: 5px 3px;
        border-width: 1px;
        border-style: solid;
        font-size: 9px;
    }

    .tab-btn {
      width: 48%;
    }
}

</style>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";

  i {
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }

  .mob_fltr {
    width: 100%;
  }
</style>