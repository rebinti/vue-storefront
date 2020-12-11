<template>
  <div>
    <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" :active-route="$props.title" />
    <!-- <header class="container mt-2">

    </header> -->
    <div class="loader--style3 mainhomestylaloader" style="" title="2" v-if="stylaloaderflag" >
          <img src="/assets/opc-ajax-loader.svg" style="margin: 0 auto;width:75px;">                  
    </div>      
    <div class="container-fluid pb-16 pl-2 pr-2" style="min-height: 100vh;" id="stylaOuter">
        <!-- <div class="col-12 md:col-9 leading-loose static-content"> -->
            <div :class="'testing_' + keyRerendeDiv" id="stylaMagazine"></div> 
            <!-- <div id="stylaMagazine" 
            v-if="changeDiv" ref="stylaMagazine-inspiration" 
            :data-area="this.$route.params.childSlug"> </div>-->
  
        <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { router } from '@vue-storefront/core/app'
import { LocalizedRoute } from '@vue-storefront/core/lib/types'
import { localizedRoute, currentStoreView } from '@vue-storefront/core/lib/multistore'
import i18n from '@vue-storefront/i18n'
import Vue from 'vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import { vHtmlRouter } from '@vue-storefront/core/modules/url/helpers'

export default {
  components: {
    Breadcrumbs
  },
  metaInfo () {
    return {
       title: this.$route.meta.title || this.$props.title,
    }
  },
  created () {
    this.stylaloaderflag = true    
  },
  watch: {
    '$route': 'activateHashSection',
  },
  data () {
    return {
      changeDiv: true,
      keyRerendeDiv: 0,
      stylaloaderflag: false,
    }
  },  
  props: {
    title: {
      type: String,
      required: true
    },      
    page: {
      type: String,
      required: true
    }      
  },
  methods: {
    activateHashSection () {
      this.keyRerendeDiv += 1;
      // this.changeDiv = false      
      this.stylaloaderflag = true
      console.log('activateHashSection')
      setTimeout(() => {
          // this.changeDiv = true
          const stylaDiv = document.getElementById("stylaMagazine")
          if(stylaDiv) stylaDiv.remove();
          setTimeout(() => {
              const stylaId = 'stylaMagazine';
              let node = document.createElement('div');
              node.id= stylaId;
              document.getElementById("stylaOuter").appendChild(node);
          }, 100);
      }, 100);
      setTimeout(() => {
       if (window.styla !== null && typeof window.styla.init !== "undefined") {
          if (window.styla.isReady) window.styla.init()
        }
      }, 500);
      setTimeout(() => {
          // this.vHtmlRouterNew(this.$refs['stylaMagazine-inspiration'])
          // this.vHtmlRouterNew(document.getElementById('stylaMagazine'))
        // vHtmlRouter(this.$refs['stylaMagazine-inspiration'])
        //  this.keyRerendeDiv += 1;
         if (window.styla !== null && typeof window.styla.init !== "undefined") {
           if (window.styla.isReady) window.styla.init()
         }
         this.stylaloaderflag = false
      }, 4000);
    },
    vHtmlRouterNew (refs) {
      console.log('reffff', refs)
      console
        if(!refs) return
        let links = refs.querySelectorAll('a')
        console.log('links links', links);
        if (!links) return
        for (let i = 0; i < links.length; i++) {
          links[i].addEventListener('click', (event) => {
            event.preventDefault()
            let target = event.target
            while (target) {
              if (target instanceof HTMLAnchorElement) {
                let link = target.getAttribute('href')
                if (link.substr(0, 4) === 'http') {
                  window.location.href = link
                } else {
                  router.push(localizedRoute(target.getAttribute('href'), currentStoreView().storeCode))
                }
                break
              }
              target = target.parentNode
            }
            event.preventDefault()
          })
        }
      },
      reRenderStylaContent() {
        setTimeout(() => {
          if (window.styla !== null && typeof window.styla.init !== "undefined") {
            if (window.styla.isReady) window.styla.init()
          }
        }, 1000);
      },
      showhidestylaloader (message) {
        console.log("Stylaaaaaaaaaaaaa",message)
        this.stylaloaderflag = message        
      },      
  },
  mounted() {
    //  if (window.styla !== null && typeof window.styla.init !== "undefined") {
    //   if (window.styla.isReady) window.styla.init()
      setTimeout(() => {
        // vHtmlRouter(this.$refs['stylaMagazine-inspiration'])
         if (window.styla) window.styla.init()
      }, 1000);  
      setTimeout(() => {        
         if (window.styla){        // if (typeof window.styla.init !== "undefined")   
           this.stylaloaderflag = false
         } 
      }, 2000);            
    // }
    // console.log('this.$route.params.slug', this.$route ,this.$route.params);
    // this.activateHashSection ()   
  },
  beforeMount () {
    this.$bus.$on('styla-loader-check', this.showhidestylaloader)
    //this.$bus.$on('notification-progress-stop', this.hide)
  },
  beforeDestroy () {
    this.$bus.$off('styla-loader-check', this.showhidestylaloader)
   // this.$bus.$off('notification-progress-stop', this.hide)
  }    
}
</script>

<style lang="scss" scoped>
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
