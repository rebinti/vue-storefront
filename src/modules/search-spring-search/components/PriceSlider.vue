<template>
  <div style=" padding: 0px 15px;">
  <div class="price-slider-container">
    <no-ssr placeholder="loading..." placeholader-tag="span">
      <vue-slider
        ref="priceSlider"
        v-model="value"
        v-bind="priceSliderOptions"
        :clickable="false"
        :min="getMin"
        :max="getMax"
        :marks="[getMin, getMax]"
        :interval="interval"
        :tooltip="'always'" 
        :tooltip-placement="'top'"
        :tooltip-formatter="tooltipContent"
        @drag-end="setPrice"
      />
    </no-ssr>
  </div>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import isEqual from 'lodash-es/isEqual'

const PriceSliderComponents = {}

if (process.browser) {
  let VueSlider = require('vue-slider-component')
  PriceSliderComponents['vue-slider'] = VueSlider
}
PriceSliderComponents['no-ssr'] = NoSSR

export default {
  name: 'PriceSlider',
  props: {
    content: {
      type: null,
      default: ''
    },
    id: {
      type: null,
      required: true
    },
    code: {
      type: null,
      required: true
    },
    priceRange: {
      type: Array,
      required: true
    },
    context: {
      type: null,
      default: ''
    },
    interval: {
      type: Number,
      required: false,
      default: 0
    },
    activeRange: {
      type: Array,
      required: true
    }
  },
  beforeMount () {
    this.$bus.$on('filter-reset', this.resetPriceSlider)
    this.$bus.$on('reset-price-slider', this.resetPriceSlider)
    this.$bus.$on('reset-active-price-slider', this.changeActiveValueToSlider)
    this.$bus.$on('category-after-load', this.resetPriceSlider)
  },
  beforeDestroy () {
    this.$bus.$off('filter-reset', this.resetPriceSlider)
    this.$bus.$off('reset-price-slider', this.resetPriceSlider)
    this.$bus.$off('reset-active-price-slider', this.changeActiveValueToSlider)
    this.$bus.$off('category-after-load', this.resetPriceSlider)
  },
  data () {
    return {
      active: false,
      remove: false,
      value: this.activeRange,
      currencySign: this.$store.state.config.i18n.currencySign,
      priceSliderConfig: this.$store.state.config.layeredNavigation.priceSliderOptions
    }
  },
  computed: {
    priceSliderOptions () {
      return {...this.priceSliderConfig, ...this.tooltipContent}
    },
    tooltipContent () {
      return { formatter: this.currencySign + ' {value}' }
    },
    getMin () {
      return this.priceRange[0]
    },
    getMax () {
      return this.priceRange[1]
    }
  },
  // mounted () {
  //   console.log('mounteddd----', this.content, this.id, this.code, this.priceRange, this.context)
  // },
  methods: {
    setPrice: function (e) {
      console.log('this.priceRange', this.priceRange);
      let val = e.val
      let from = val[0]
      let to = val[1]
      let id = val[1]
      this.remove = isEqual(val, this.priceRange)
      console.log('setPrice', id, from, to , this.remove , val, this.priceRange)
      // this.switchFilter(id, from, to)
      // this.$emit('sliderChanged', {from: from, to: to})
    },
    // switchFilter (id, from, to) {
    //   this.$bus.$emit('filter-changed-' + this.context, { attribute_code: this.code, id: id, from: from, to: to, label: this.currencySign + ' ' + from + ' - ' + this.currencySign + ' ' + to, remove: this.remove })
    // },
    resetPriceSlider () {
      if (this.$refs.priceSlider) {
        this.$refs.priceSlider.setValue(this.priceRange)
      }
    },
    changeActiveValueToSlider () {
      if (this.$refs.priceSlider) {
        this.$refs.priceSlider.setValue(this.activeRange)
      }
    }
  },
  components: PriceSliderComponents
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-event: color(tertiary);
  $color-active: color(accent);

.vue-slider-process {
      background-color: rgb(17, 19, 18) !important;
    font-weight: 700;
    transition-duration: 0s;
    width: 151.2px;
    left: 10.8px;
}

  .price-slider-container {
    padding-bottom: 50px;
    position: relative;
    z-index: 1;
  }

  .price-selector {
    width: 20px;
    height: 20px;

    &.active {
      .square {
        background-color: $color-active;
      }
    }
  }

  .square {
    width: 80%;
    height: 80%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>

<style lang="scss">
.vue-slider-component .vue-slider-dot {
  box-shadow: none;
}

.vue-slider-component .vue-slider-process {
      background-color: rgb(17, 19, 18) !important;
    font-weight: 700;
    transition-duration: 0s;
    width: 151.2px;
    left: 10.8px;
}


 .vue-slider-component .vue-slider-process {
    background-color: rgb(14, 14, 14)!important;;
  }

 .vue-slider-component .vue-slider-process {
    background-color: rgb(14, 14, 14)!important;;
  }
.vue-slider-component .vue-slider-dot .vue-slider-dot-handle{
    background-color: #080808!important;;
}

.vue-slider-component .vue-slider-tooltip {
    background-color: #fff0 !important;
    color: rgb(12, 0, 0)!important;
    border-color: rgba(236, 239, 237, 0)!important;
    /* padding: 7px 10px; */
    font-weight: 900;
}

.vue-slider-component .vue-slider {
  height: 1px!important;
  top:45px!important;
  background-color: rgb(14, 14, 14)!important;
}

.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-bottom {
    bottom: 53px!important;
    left: 42%!important;
}

</style>
