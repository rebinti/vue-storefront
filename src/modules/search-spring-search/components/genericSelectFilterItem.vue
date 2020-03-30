<template>
  <!-- <div>
    <div class="checkbox-wrap">
      <input
        class="outline-none"
        type="checkbox"
        :id="id"
        :checked="value"
        @keyup.enter="$emit('click')"
        @click="$emit('click')"
        @blur="$emit('blur')"
        @change="$emit('change')"
        :disabled="disabled"
      >
      <label :for="id" :class="{'cursor-pointer': !disabled }">
        <slot />
      </label>
    </div>
    <template v-if="validation">
      <span
        class="block text-error text-h6"
        v-if="validation.condition"
        data-testid="errorMessage"
      >
        {{ validation.text }}
      </span>
    </template>
  </div> -->

  
  <button
    :class="{'active': value}"
     @click="$emit('click')"
    class="border border-grey-light font-medium text-xs text-grey-dark generic-selector generic-select mr-3 mb-3"
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

<!--
<style lang="scss" scoped>

@media (max-width: 576px) {

  .checkbox-wrap{

    input[type="checkbox"]:checked{
      
      + label:before{
        border-color: #000000;
        background-color: #000000;
      }
    }

  } 
  
}
</style> -->