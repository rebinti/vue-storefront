<template>
<div>
<h1> Brands </h1>
</div>
</template>

<script>
import config from 'config'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'brands',
  components: {

  },
  mixins: [],
  computed: {
    //  ...mapState({
    //   seletedMobileGrid: state => state.ui.seletedMobileGrid,
    //   defaultColumnMobile: state => state.ui.defaultColumnMobile,
    //   mobileGridData: state => state.ui.mobileGridData
    // }),
    // ...mapGetters('searchSpringSearch', ['serachedProd', 'filterData', 'searchRes', 'categoryHierarchy', 'priceSliderData', 'priceSliderActiveRange', 'sortingFilterOptions', 'sortingFilterSelected'])
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
