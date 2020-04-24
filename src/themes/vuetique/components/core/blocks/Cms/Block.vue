<template>
  <div
    :class="['cms-content py-10', { 'container': sync }]"
    v-if="data"
    v-html="data.content"
  />
</template>

<script>
export default {
  name: 'CmsBlock',
  props: {
    id: {
      type: Number,
      default: null,
      required: false
    },
    identifier: {
      type: String,
      default: null,
      required: false
    },
    sync: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  // asyncData ({ store, route, context }) {
  // @TODO to cover SSR need find a way to pass props identifier/id to the asyncData()
  // for now it is not possible but assuming from some info it could be available later
  // we try to dispatch 'single' action which actually dispatch list to prefetch data anyway

  /* return new Promise((resolve, reject) => {
    store.dispatch('cmsBlock/single', {
      value: this.identifier
    }).then(res => {
      return resolve(res)
    })
  }) */
  // },
  created () {
    let queryKey = ''
    let queryValue = ''
    if (this.id) {
      queryKey = 'id'
      queryValue = this.id
    } else if (this.identifier) {
      queryKey = 'identifier'
      queryValue = this.identifier
    }
    if (queryKey && queryValue) {
      this.$store.dispatch('cmsBlock/single', {
        key: queryKey,
        value: queryValue,
        skipCache: this.sync
      })
    }
  },
  computed: {
    data () {
      if (this.id) {
        return this.$store.getters[`cmsBlock/cmsBlockId`](this.id)
      } else if (this.identifier) {
        return this.$store.getters[`cmsBlock/cmsBlockIdentifier`](this.identifier)
      }
    }
  }
}
</script>


<style >
/* @import '~theme/css/animations/transitions';
/*  vue-cms-home-block1 */
.vue-cms-home-block1 .card {
    padding: 0px 5px;
    position: relative;
}
.vue-cms-home-block1 .card button.p_btn{
    position: absolute;
    left: 20%;
    width: 60%;
    bottom: 5px;
}
.vue-cms-home-block1 .card.h-100.img-alnleft{ left:-15px; }
.vue-cms-home-block1 .card.h-100.img-alnright{ right:-15px; }

/*  vue-cms-home-offer-banner */
.offer-line {
    width: 100%;
    height: 1px;
    background: #e5e5e5;
    margin-bottom: 75px;
}
.vue-cms-home-offer-banner .offer-border {
    border-right: 1px solid #a0a0a0;
}
.vue-cms-home-offer-banner{
    width: 100%;
    color: #414142;
    font-size: 22px;
    text-align: center;
    text-transform: uppercase;
    font-family: 'brandon_grotesque', sans-serif;
    letter-spacing: 1px;
    font-weight: bold;
}
.vue-cms-home-offer-banner span {
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: none;
    margin-top: 10px;
    display: inline-block;
    width: 100%;
    font-weight: normal;
}
.vue-cms-home-offer-banner .offer-active {
    color: #dc3939;
}


/* 6 banner block */ 
.tile {
  display: flex;
  overflow: hidden;
}
.tile-image {
  width: 100%;
  height: 100%;
}

/*  vue-home-2banner  */

.vue-home-2banner .im_bx{
  position: relative;
}

.vue-home-2banner .img-bx-title{
  position: absolute;
  width:100%;
  text-align: center;
  font-size: 2rem;
  color: #ffffff;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width:100%;
  font-family: Noto Serif SC, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
}

.vue-home-2banner .btn-main{
  background-color: #4fce76;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: #ffffff;
  -webkit-transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.vue-home-2banner .img-bx-btn{
  position: absolute;
  width: 100%;
  text-align: center;
  bottom:3.5rem;
}

.vue-home-2banner .col-6.pb-5.im_bx {
    max-height: 420px;
    overflow: hidden;
}


</style>
