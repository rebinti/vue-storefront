<template>
  <div>
    Mobile Splash Screeen 
  </div>
</template>

<script>
export default {
  name: "SplashScreen",
  props: {
    perPage: {
      type: Number,
      required: false,
      default: 4
    },
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {

  },
  methods: {

  },
  mounted: {
    setdata() {
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
    }
  }
}
</script>

<style lang="scss" scoped>


</style>
