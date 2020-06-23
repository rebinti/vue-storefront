<template>
  <div>
    <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" :active-route="$props.title" />
    <header class="container mt-2">
      <!-- <h1>{{ $props.title }}</h1> -->
    </header>
    <div class="container pb-16">
        <div class="col-12 md:col-9 leading-loose static-content">
          <!-- <component :is="activeComponent" /> -->
          <div id="stylaMagazine" data-area="inspiration-landing"></div>
        </div>
    </div>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'

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
  },
  data () {
    return {
    }
  },
  mounted() {
    if (window.styla !== null) {
       window.styla.init()
    }
  }  
}
</script>

<style lang="scss" scoped>

</style>
