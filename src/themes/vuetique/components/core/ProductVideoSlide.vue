<template>
  <div class="product-video absolute w-full h-full flex">
    <div
      v-show="!videoStarted"
      class="gallery-video absolute w-full h-full"
      @click="initVideo"
    >
      <i class="material-icons absolute">play_circle_outline</i>
    </div>
    <div  class="iframe-wrapper absolute w-full" v-if="videoStarted">
      <!-- <LoaderScoped v-if="!iframeLoaded" /> -->
      <div class="iframe-container w-full">
        <!-- <iframe
          :src="embedUrl"
          class="absolute w-full h-full"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          @load="iframeIsLoaded()"
        /> -->
        <video class="video-fluid" ref="videoElement" id="videoElement" loop controls height="720" style="width:100%;margin-top: -313px;height: 720px;}" @canplay="updatePaused" @playing="updatePaused" @pause="updatePaused">
          <source :src="video_id" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import LoaderScoped from 'theme/components/core/LoaderScoped.vue'
// import { ProductVideo } from '@vue-storefront/core/modules/catalog/components/ProductVideo.ts'

export default {
  name: 'ProductVideoSlide',
   data () {
    return {
      videoStarted: false,
      iframeLoaded: false,
      videoElement: null,
    paused: null
    }
  },
  props: {
    video_id: {
      type: String,
      required: true
    },
     type: {
      type: String,
      required: false
    },
  },
  components: {
    LoaderScoped
  },
  computed: {
    embedUrl () {
      switch (this.type) {
        case 'youtube':
          return `https://www.youtube.com/embed/${this.video_id}?autoplay=1`
        case 'vimeo':
          return `https://player.vimeo.com/video/${this.video_id}?autoplay=1`
        default:
          return `${this.video_id} + ?autoplay=1`
      }
    },
    playing () { return !this.paused; }
  },
  methods: {
    initVideo () {
      this.videoStarted = true
      // this.play()
      setTimeout(() => {
        // const player = document.getElementById('videoElement');
        // if (player) {
        //   player.play()
        // }
        // console.log('dddddddddddddddddd', this.$refs.videoElement);
        this.$refs.videoElement.play();
      }, 100);

      // console.log('get element', document.getElementById())
      this.$emit('video-started', this.index)
    },
    iframeIsLoaded () {
      this.iframeLoaded = true
    },
    updatePaused (event) {
      this.videoElement = event.target;
      this.paused = event.target.paused;
    },
    play () {
      this.videoElement.play();
    },
    pause () {
      this.videoElement.pause();
    }
  },
}
</script>

<style lang="scss" scoped>
.product-video {
  align-items: center;
  justify-content: center;

  .gallery-video {
    top: 0;

    > .material-icons {
      left: 0;
      right: 0;
      color: #fff;
      font-size: 120px;
      top: calc( 50% - 60px);
      transition: transform ease 0.3s;
    }

    &:hover {
      cursor: pointer;

      > .material-icons {
        transform: scale(1.1);
      }
    }
  }

  .iframe-wrapper {
    left: 0;

    .iframe-container {
      padding-top: 56.25%;

      iframe {
        top: 0;
        left: 0;
        border: none;
      }
    }
  }
}
</style>
