<template>
<div>
<h1> Brands Category Page</h1>
<h5> {{ getParams}}</h5>
</div>
</template>

<script>
import config from 'config'
import { mapState, mapGetters, mapActions } from 'vuex'
import NoSSR from 'vue-no-ssr'

export default {
  name: 'brandsCategory',
  components: {
     'no-ssr': NoSSR

  },
  mixins: [],   
  computed: {
    //  ...mapState({
    //   seletedMobileGrid: state => state.ui.seletedMobileGrid,
    //   defaultColumnMobile: state => state.ui.defaultColumnMobile,
    //   mobileGridData: state => state.ui.mobileGridData
    // }),
    // ...mapGetters('searchSpringSearch', ['serachedProd', 'filterData', 'searchRes', 'categoryHierarchy', 'priceSliderData', 'priceSliderActiveRange', 'sortingFilterOptions', 'sortingFilterSelected'])

    getParams() {
      console.log('this.$route.params.slug', this.$route ,this.$route.params.brandName);
      return this.$route.params.brandName
    }
  },
  data () {
    return {
    };
  },
  mounted () {
    console.log('brands Page');
  },
  methods: {
   


  },
  destroyed () {
   
  }
};
</script>

<style lang="scss" scoped>

</style>
