<template>
  <button
    :class="{'active': active}"
    class="mr-3 border border-grey-light font-medium text-xs text-grey-dark generic-selector"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select ' + label)"
  >
    {{ label }}
  </button>
</template>

<script>
import GenericSelector from '@vue-storefront/core/compatibility/components/GenericSelector'
export default {
  mixins: [GenericSelector]
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
  @media (max-width: 2560px) {
    .generic-selector {
      height: 50px;
      min-width: 50px;
    }
  }
  @media (max-width: 1920px) {
    .generic-selector {
      height: 36px;
      min-width: 36px;
    }    
  }    
  @media (max-width: 1440px) {
    .generic-selector {
      height: 28px;
      min-width: 28px;
    }      
  }
</style>
