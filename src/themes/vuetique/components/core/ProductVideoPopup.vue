<template>
  <modal name="modal-productvideopopup" :width="850" :trans-effect="transEffect" class="prd-video-popup fix-bottom-side" > 
    <span slot="header"></span>
        <div class="iframe-container w-full">
            <video class="video-fluid video-play-tag"
            style="height: 100%;width: 100%;left: 0;"
            ref="videoElement" id="videoElement" 
            controls controlsList="nodownload" autoPictureInPicture 
            preload autoplay >
              <source :src="productvideo.video" type="video/mp4" />
            </video>
            <!-- src="https://www.iclothing.com/media/iwd_video/video/5aa3c6c788aec.mp4" -->
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
      productVideoData:'https://www.iclothing.com/media/iwd_video/video/5aa3c6c788aec.mp4',
      videoPlayCount: 0
    }
  },
  beforeMount () {
    this.$bus.$on('product-data-for-video', this.forceUpdateData);
    if (window && window.innerWidth <= 1024) this.transEffect= 'fade-in-up'

    const handleFullScreen = (e) => {
       const state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
       const fullScreenFlag = state ? 'FullscreenOn' : 'FullscreenOff';
       if (fullScreenFlag === 'FullscreenOff') {
          this.$bus.$emit('modal-hide', 'modal-productvideopopup')
       }
    }
    document.addEventListener("fullscreenchange", handleFullScreen)
    document.addEventListener("mozfullscreenchange", handleFullScreen)
    document.addEventListener("webkitfullscreenchange", handleFullScreen)
    document.addEventListener("msfullscreenchange", handleFullScreen)
    document.getElementById("videoElement");
    this.$once('hook:destroyed', () => {
      document.removeEventListener('fullscreenchange', handleFullScreen)
      document.removeEventListener('mozfullscreenchange', handleFullScreen)
      document.removeEventListener('webkitfullscreenchange', handleFullScreen)
      document.removeEventListener('msfullscreenchange', handleFullScreen)
      document.getElementById('videoElement').removeEventListener('ended', handleVideoLoop)
    })
  },
  beforeDestroy () {
    this.$bus.$off('product-data-for-video');
  },
  mounted(){
    // setTimeout(() => {
    //   // this.$refs.videoElement.play();
    // }, 400);
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
      this.$forceUpdate()
      
      const el = document.body;
      el.classList.add('set-overlay-on-top');
      document.documentElement.classList.add('set-overlay-on-top')

      setTimeout(() => {
          this.$refs.videoElement.play();
          this.videoPlayCount = 0;
           const handleVideoLoop = (e) => {
              this.videoPlayCount++;
              if (this.videoPlayCount<2) this.$refs.videoElement.play();
              else this.$bus.$emit('modal-hide', 'modal-productvideopopup')
          }
          document.getElementById('videoElement').addEventListener('ended', handleVideoLoop)

          const elem = document.getElementById("videoElement");
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
          }
        }, 300);
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