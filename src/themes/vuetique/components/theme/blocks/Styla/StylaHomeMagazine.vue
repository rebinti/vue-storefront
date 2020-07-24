<template>
  <section class="main-slider w-full text-white pl-2 pr-2">  <!-- :class="{ desktop: desktop }" -->
   <div id="stylaMagazine" data-language="en_GB" data-pluginversion="1.1.0.0"></div>
  </section>
</template>
​
<script>
export default {
  name: 'StylaHomeMagazine',
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

