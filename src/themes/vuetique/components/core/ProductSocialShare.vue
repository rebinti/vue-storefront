<template>
  <modal name="modal-productsocialshare" :width="850" :trans-effect="transEffect" class="prd-share-popup fix-bottom-side" > 
    <span slot="header"></span>
    <div class="row quick-view" slot="content" style="margin-top: -55px;"> 
      <product-share :product="product" /> <!-- :imgpath="image.src" -->
    </div>
  </modal>
</template>
<script>
import Modal from 'theme/components/core/Modal'
import ProductShare from 'theme/components/core/blocks/Product/ProductShare.vue'
export default {
  data () {
    return {
      product: {},
      transEffect: 'fade-in-down',
    }
  },
  beforeMount () {
    this.$bus.$on('product-data-for-share', this.forceUpdateData);
    if (window && window.innerWidth <= 1024) this.transEffect= 'fade-in-up'
  },
  beforeDestroy () {
    this.$bus.$off('product-data-for-share');
  },
  methods: {
    closemodel () {
      this.$bus.$emit('modal-hide', 'modal-productwithoptions')
    },
    forceUpdateData (event) {
      if(event) this.setupVariants(event)
    },
    /**
     * Setup product current
     */
    setupVariants ( product) {
      this.product = JSON.parse(JSON.stringify(product));
      this.$forceUpdate()
      
      const el = document.body;
      el.classList.add('set-overlay-on-top');
      document.documentElement.classList.add('set-overlay-on-top')
    },
  },
  components: {
    Modal,
    ProductShare,
  },
  destroyed () {
    const el = document.body;
    el.classList.remove('set-overlay-on-top');
    document.documentElement.classList.remove('set-overlay-on-top')
  }
}
</script>

<style type="text/css">
</style>
<style lang="scss" >
  .prd-share-popup {
    .modal-header {
      border-color: #fff!important;
      background: #Ffff!important;
      h2{
        height: 15px !important;
      }
    }

    .modal-close{
      z-index: 1;
    } 
    .modal-content .share-items{
        font-size: 25px;
    }        
  }
    

</style>