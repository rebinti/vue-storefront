<template>
  <section class="main-slider w-full text-white pl-2 pr-2">  <!-- :class="{ desktop: desktop }" -->
   <div @click="stylahandleClicks" class="styla-dynamic-content" id="stylaMagazine" data-language="en_GB" data-pluginversion="1.1.0.0"></div>
  </section>
</template>
​
<script>
export default {
  name: 'StylaHomeMagazine',
  methods: {
    stylahandleClicks (event) {
      event.preventDefault()               
        let { target } = event                
        while (target && target.tagName !== 'A') target = target.parentNode        
        if (target && target.matches(".styla-dynamic-content a") && target.href) {          
          const { altKey, ctrlKey, metaKey, shiftKey, button, defaultPrevented } = event          
          if (metaKey || altKey || ctrlKey || shiftKey) return
          if (button !== undefined && button !== 0) return
          if (target && target.getAttribute) {
            const linkTarget = target.getAttribute('target')
            if (/\b_blank\b/i.test(linkTarget)) return
          }
          const url = new URL(target.href)
          const to = url.pathname
          if (window.location.pathname !== to && event.preventDefault) {
            event.preventDefault()
            //this.$router.push({ path: to, query: { _sgm_campaign: url.searchParams.get('_sgm_campaign') , _sgm_source: url.searchParams.get('_sgm_source') , _sgm_action: url.searchParams.get('_sgm_action') } })
            this.$router.push(to)
          }
        }
    }, 
  },
  beforeMount () {
  },
  mounted () {
     if ('styla' in window) {
    // if (window.styla !== null && window.styla['isReady'] !== undefined) {
      // if (typeof window.styla.init !== "undefined") window.styla.init()
       styla.init !== "undefined"&&styla.init()
    }
  }
}
</script>
<style lang="scss">
.main-slider {
  .VueCarousel-pagination {
    position: absolute;
    bottom: 15px;
  }
  .VueCarousel-dot--active .VueCarousel-dot-inner {
    border: 2px solid #fff;
    margin-top: -2px;
  }
}
</style>
<style scoped>
.main-slider {
  min-height: 640px;
}
.slide {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.slide-content {
  min-height: 640px;
}
@media (max-width: 75em) {
  .main-slider {
    min-height: 400px;
  }
  .slide-content {
    min-height: 400px;
  }
}
@media (max-width: 64em) {
  .main-slider {
    min-height: 359px;
  }
  .slide {
    background-position: left;
  }
  .slide-content {
    min-height: 359px;
  }
}
@media (max-width: 576px) {
  .main-slider {
    min-height: 450px;
  }
  .slide {
    background-position: left;
  }
  .slide-content {
    min-height: 450px;
  }
  
}
</style>

