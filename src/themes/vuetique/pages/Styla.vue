<template>
  <div>
    <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" :active-route="$props.title" />
    <!-- <header class="container mt-2">

    </header> -->
    <div class="container-fluid pb-16 pl-2 pr-2">
        <!-- <div class="col-12 md:col-9 leading-loose static-content"> -->

            <div :class="'testing_' + keyRerendeDiv" v-if="changeDiv" :key="keyRerendeDiv" ref="stylaMagazine-inspiration" id="stylaMagazine" ></div>
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
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
// import { vHtmlRouter } from '@vue-storefront/core/modules/url/helpers'

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
  },
  watch: {
    '$route': 'activateHashSection',
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
      //  let elements =  document.getElementById( 'stylaMagazine' )
      //  console.log('elements', elements)
      //  elements.remove()
      //  if (elements.length > 0) {
      //     elements.forEach(el => el.remove())
      //  }
      this.keyRerendeDiv += 1;
      this.changeDiv = false
      console.log('activateHashSection')
      setTimeout(() => {
          this.changeDiv = true
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
         this.keyRerendeDiv += 1;
         if (window.styla !== null && typeof window.styla.init !== "undefined") {
           if (window.styla.isReady) window.styla.init()
         }
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
      }
  },
  data () {
    return {
      changeDiv: true,
      keyRerendeDiv: 0

    }
  },
  mounted() {
     if (window.styla !== null && typeof window.styla.init !== "undefined") {
      if (window.styla.isReady) window.styla.init()
      setTimeout(() => {
        // vHtmlRouter(this.$refs['stylaMagazine-inspiration'])
         if (window.styla.isReady) window.styla.init()
      }, 1000);
    }
    console.log('this.$route.params.slug', this.$route ,this.$route.params);
  }  
}
</script>

<style lang="scss" scoped>

</style>
