<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',
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
    }
  }
}


</script>

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
</style>