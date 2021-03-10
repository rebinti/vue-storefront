<template>


  
  <button
    :class="{'active': value}"
     @click="$emit('click')"
    class="border border-grey-light font-medium text-m text-grey-dark generic-selector generic-select mr-3 mb-3"
  >
      <slot />
  </button>  
</template>

<script>
export default {
  name: 'SearchCheckbox',
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
    fieldType: {
      type: String,
      required: false,
      default: ''
    },
  }
}


</script>

<style lang="scss" scoped>
  .generic-selector {
    height: 40px;
    min-width: 40px;
    padding-left: 8px;
    padding-right: 8px;

    &.active {
      @apply border-grey-dark text-black;
    }

    &.out-of-stock {
       background: #c5c5c5;
    }

    &:disabled {
      @apply text-disabled border-disabled cursor-not-allowed;
    }
  }
</style>

