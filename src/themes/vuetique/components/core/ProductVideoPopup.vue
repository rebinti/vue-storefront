<template>
  <modal name="modal-productvideopopup" :width="850" :trans-effect="transEffect" class="prd-video-popup fix-bottom-side" > 
    <span slot="header"></span>
        <div class="iframe-container w-full">
            <video class="video-fluid video-play-tag"
            style="height: 100%;width: 100%;left: 0;"
            ref="videoElement" id="videoElement" 
            loop controls autoPictureInPicture preload autoplay >
              <source :src="productvideo.video" type="video/mp4" />
            </video>
            <!-- src="http://m2.iclothing.com/media/iwd_video/video/5aa3c6c788aec.mp4" -->
        </div>
  </modal>
</template>
<script>
import Modal from 'theme/components/core/Modal'
import ProductShare from 'theme/components/core/blocks/Product/ProductShare.vue'
export default {
  data () {
    return {
      productvideo: {},
      transEffect: 'fade-in-down',
      productVideoData:'http://m2.iclothing.com/media/iwd_video/video/5aa3c6c788aec.mp4',
    }
  },
  beforeMount () {
    this.$bus.$on('product-data-for-video', this.forceUpdateData);
    if (window && window.innerWidth <= 1024) this.transEffect= 'fade-in-up'
  },
  beforeDestroy () {
    this.$bus.$off('product-data-for-video');
  },
  mounted(){
    setTimeout(() => {
      this.$refs.videoElement.play();
    }, 200);
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
    setupVariants ( videodata) {
      this.productvideo = JSON.parse(JSON.stringify(videodata));
      console.log("VIDEOOOOOOOOOO",this.productvideo)
      console.log("VIDEOOOOOOOOOO111",this.productvideo.video)
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
  .prd-video-popup {
    top:0px !important;
    margin: 10px 10px 10px 10px;    
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
  @media (max-width: 768px) {	
    width: 500px !important;
    height: 750px !important; 
  }
  @media (max-width: 425px) {	
    width: 400px !important;
    height: 600px !important;  
    top:0px !important;          
  } 
  @media (max-width: 375px) {	
    width: 350px !important;
    height: 525px !important;     
  }
  @media (max-width: 320px) {	
    width: 145px !important;
    height: 435px !important;     
  }       
</style>