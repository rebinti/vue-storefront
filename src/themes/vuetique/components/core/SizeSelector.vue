<template>
  <button
    class="mr-3 size-selector"
    :class="{ active: active }"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select size ') + label"
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
  .size-selector {
    @apply bg-white border border-grey-light font-medium text-xs text-grey-dark;
    height: 40px;
    min-width: 40px;

    &.active {
      @apply border-black text-white;
      background: #000000;
    }
    
    &.out-of-stock {
       background: #c5c5c5;
       opacity: .75;
    }

    &:disabled {
      @apply text-disabled border-disabled cursor-not-allowed;
    }
  }
  @media (max-width: 2560px) {
    .size-selector {
      height: 50px;
      min-width: 50px;
    }
  }
  @media (max-width: 1920px) {
    .size-selector {
      height: 36px;
      min-width: 36px;
    }    
  } 
  @media (max-width: 1440px) {
    .size-selector {
      height: 33px;
      min-width: 33px;
    }      
  }   
  @media (max-width: 768px) {
    .size-selector {
      height: 33px;
      min-width: 33px;
    }      
  }   
</style>
