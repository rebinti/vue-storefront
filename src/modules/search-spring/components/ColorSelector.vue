<template>
  <button
    :class="['border border-transparent opacity-75 hover:opacity-100 rounded-full relative inline-flex pointer color mr-3 mb-3', value ? 'active' : '']"
    @click="$emit('click')"
    :aria-label="$t('Select color ') + label"
    :title="$t(label)"
  >

  <div class="clr_img_out">
		<div class="clr_img_inner">
		 <img :width="'50px'" :height="'50px'" :src="'/assets/colour/' + label.toLowerCase() +'.png'" 
                      @error="imgUrlAlt" alt="" >
		</div>
	</div>
    
  </button>
</template>

<script>

export default {
  name: 'filterColorSelector',
  methods: {
    imgUrlAlt(event) {
       event.target.src = "/assets/colour/multi.png"
    },
  },
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    },
    validation: {
      type: Object,
      required: false,
      default: () => { }
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: () => false
    },
  }
}
</script>

<style lang="scss" scoped>
  .color {
    width: 40px;
    height: 40px;

    &.active {
      @apply border-black opacity-100;
      border: 2px solid #222;
    }

    &.out-of-stock {
       background: #c5c5c5;
    }
  }

  .color-inside {
    width: 30px;
    height: 30px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
  }
  div.clr_img_inner img{
    border-radius: 20px;
  }


@media (max-width: 576px) {

  .mobile_filter h5.Accordion__trigger{
    color:#000;
    font-size:18px;
    font-weight: 600;
  }


}
</style>
