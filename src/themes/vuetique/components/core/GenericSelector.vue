<template>
  <button
    :class="{'active': active}"
    class="mr-3 border border-grey-light font-medium text-xs text-grey-dark generic-selector"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select ' + label)"
    style="position: relative;"
  >
    {{ label }}
    <span class="x">X</span>
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
      height: 33px;
      min-width: 33px;
    }      
  }
  @media (max-width: 768px) {
    .generic-selector {
      height: 33px;
      min-width: 33px;
    }      
  }
   .no-config .x {
     display: block;
   }
   .no-config.active{
     color: black;
     background: none;
   }
   .no-combination.active{
     border: 1px solid!important;
     --border-opacity: 1!important;
     border-color: #222222!important;
     border-color: rgba(34, 34, 34, var(--border-opacity))!important;
   }
  .x {
    display: none;
    text-indent: -999em;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url(https://cdn.iclothing.com/skin/frontend/codazon_fastest/baby/images/bg_x.png) center no-repeat transparent;
    z-index: 5;
}   
</style>
