<template>
  <div class="Accordion">
    <h5 class="Accordion__trigger" @click="open=!open">
      {{ title }}
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use :xlink:href="open ? '#up' : '#down'" />
      </svg>
    </h5>
    <div class="Accordion__body" :class="{ open }">
      <div class="pt-2 pb-3">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accordion',
  props: {
    title: {
      type: String,
      default: 'title'
    },
    openType: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      open: this.openType
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";

.Accordion {
  @apply border-t py-2;

  &:last-child {
    @apply border-b;
  }

  .Accordion__trigger {
    @apply py-3 flex justify-between items-center cursor-pointer font-sans text-base;
  }

  .Accordion__body {
    @apply overflow-hidden max-h-0;
    transition: max-height $duration-main $motion-main;

    &.open {
      @apply max-h-screen;
    }
  }
  }

  
  // @media (max-width: 576px) {

    .mob_fltr{
      &.cart_filter_hd{
        border-bottom: 1px solid #ededed;
        .Accordion__trigger{
          font-weight: normal;
          color:#666666;
          font-weight: 500;
        }
      }
      .Accordion__trigger{
        color:#000;
        font-size:13px;
        font-weight: 600;
        text-transform: uppercase;
      }
      .size-selector{
          height:20px;
          line-height: 20px;
      }
    } 



// }
</style>
