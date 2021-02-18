<template>
  <div id="home">
    <div class="loader--style3 mainhomestylaloader" style="" title="2" v-if="stylaloaderflag" >
          <img src="/assets/opc-ajax-loader.svg" style="margin: 0 auto;width:55px;">                  
    </div>    
    <!-- For loading the styla magazine content -->
    <Styla-home-magazine  />     
    <div @click="segmentifyhandleClicks" class="segmentify-dynamic-content" id="seg-home-reco"></div>      
  </div>
</template>

<script>
// import { isServer } from '@vue-storefront/core/helpers'
import Home from '@vue-storefront/core/pages/Home'
import { Logger } from '@vue-storefront/core/lib/logger'
import config from 'config'
import StylaHomeMagazine from 'theme/components/theme/blocks/Styla/StylaHomeMagazine'
import { htmlDecode } from '@vue-storefront/core/filters/html-decode'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'

export default {
  mixins: [Home ],
  components: {
      StylaHomeMagazine,      
  },
  data () {
    return {
      loading: true,
      cmspageidentifier:'amphomepage',      
      stylaloaderflag: false,      
    }
  },
  watch: {
    '$route': 'fromhomerouterwatch'
  },  
  methods: {
    setSegmentify() {
      // For working Segmentify
      window.segPageInf = {
        "category": "Home Page",
        "subCategory": ""
      }
      window.sgfLayer = {
          'page': {
              category: 'Home Page',
              subCategory: ''
          }
      };      
    },
    segmentifyhandleClicks (event) {
      this.$bus.$emit('segmentify-block-router-update',event);
    },
    fromhomerouterwatch () {       
      this.setSegmentify()
    },       
  },
  computed: {
    cmspageseodata () {        
            return this.$store.getters[`cmsPage/cmsPageIdentifier`]('amphomepage')        
    },
  },
  created () {
    // Load personal and shipping details for Checkout page from IndexedDB
    // this.$store.dispatch('checkout/load')
    this.stylaloaderflag = true
  },
  async beforeMount () {
    if (this.$store.state.__DEMO_MODE__) {
      const onboardingClaim  = await this.$store.dispatch('claims/check', { claimCode: 'onboardingAccepted' });
      if (!onboardingClaim) { // show onboarding info
        this.$bus.$emit('modal-toggle', 'modal-onboard')
        this.$store.dispatch('claims/set', { claimCode: 'onboardingAccepted', value: true })
      }
    }
  },
  async asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    Logger.info('Calling asyncData in Home (theme)')()
    await Promise.all([
      // store.dispatch('category/list', { includeFields: config.entities.optimize ? config.entities.category.includeFields : null }),
      // store.dispatch('attribute/list', { // load filter attributes for this specific category
      //     filterValues: config.products.defaultFilters, // TODO: assign specific filters/ attribute codes dynamicaly to specific categories
      //     includeFields: config.entities.optimize && isServer ? config.entities.attribute.includeFields : null
      // }),
      store.dispatch('cmsPage/single', {key: 'identifier.keyword',
        value: 'amphomepage',
        skipCache: true }),
    ])
  },
  mounted() {       
    this.$bus.$emit('send-to-emarsys-tracking');    
    if ('styla' in window) {
       styla.init !== "undefined"&&styla.init()
       this.stylaloaderflag = false
    }
    this.setSegmentify() 
  },
  metaInfo () {
    const storeView = currentStoreView()
    return {
      link: [
        { rel: 'amphomepage',
          href: this.$router.resolve(localizedRoute({
            name: 'home-amp',
            params: {
              slug: '/'
            }
          }, storeView.storeCode)).href
        }
      ],
      title: htmlDecode(this.cmspageseodata.meta_title || 'Iclothing Home'),
      meta: this.cmspageseodata.meta_description ? [{ vmid: 'description', name: 'description', content: htmlDecode(this.cmspageseodata.meta_description) }] : []
    }
  }  
}
</script>
<style>

menu-list button.btn.btn-primary.p_btn{
 color: red !important;
 font-size: 26px;
}
@media screen and (max-width: 480px) {
    menu-list button.btn.btn-primary.p_btn{
        color: green !important;
        font-size: 42px;
       }
  } 
</style>
<style lang="scss">
.mainhomestylaloader{
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    top: 500px;
}
@media screen and (max-width: 1024px) {
  .mainhomestylaloader{
      position: absolute;
      left: 0;
      right: 0;
      z-index: 1;
      top: 350px;
  }
}
@media screen and (max-width: 480px) {
  .mainhomestylaloader{
      position: absolute;
      left: 0;
      right: 0;
      z-index: 1;
      top: 150px;
  }
}
</style>