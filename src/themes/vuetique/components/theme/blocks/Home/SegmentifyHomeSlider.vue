<template>  
   <div @click="segmentifyhandleClicks" class="segmentify-dynamic-content" id="seg-home-reco"></div>  
</template>
<script>
export default {
  name: 'SegmentifyHomeSlider',
  methods: {
    segmentifyhandleClicks (event) {
      this.$bus.$emit('segmentify-block-router-update',event);
    },
  },
}
</script>
<style lang="scss">
</style>

