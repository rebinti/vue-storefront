<template>
  <div class="relative">
    <div class="relative">
      <textarea
        class="w-full border border-solid border-grey w-full text-grey px-3 py-3 h-10 bg-transparent outline-none focus:text-grey-dark"
        :class="{empty: value === ''}"
        :type="type"
        :name="name"
        :autocomplete="autocomplete"
        :value="value"
        :autofocus="autofocus"
        :ref="focus ? name : false"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur')"
        @keyup.enter="$emit('keyup.enter', $event.target.value)"
        @keyup="$emit('keyup', $event)"
        :placeholder="placeholder"
      />
    </div>

    <template v-if="validation">
      <span
        class="block cl-error h6 mt5"
        v-if="validation.condition"
      >
        {{ validation.text }}
      </span>
    </template>

    <template v-else-if="validations">
      <span
        v-for="(validation, index) in validations"
        :key="index"
        v-if="validation.condition"
        class="block text-error text-h6 mt-1"
      >
        {{ validation.text }}
      </span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BaseTextarea',
  data () {
    return {
      iconActive: false,
      icon: 'visibility'
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    autocomplete: {
      type: String,
      required: false,
      default: ''
    },
    focus: {
      type: Boolean,
      required: false,
      default: false
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false
    },
    validation: {
      type: Object,
      required: false,
      default: () => {}
    },
    validations: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  mounted () {
    if (this.focus) {
      this.$refs[this.name].focus()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';

  $color-tertiary: color(tertiary);
  $color-black: color(black);
  $color-puerto-rico: color(puerto-rico);
  $color-hover: color(tertiary, $colors-background);

  textarea {
    background: inherit;
    min-height: 100px;

    &:focus {
      @apply outline-none border-grey-dark;
    }

    &:disabled {
      @apply opacity-50 cursor-not-allowed pointer-events-none;
    }

    &.has-error {
      @apply border-error;
    }
  }

  label {
    color: #999;
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 10px;
    transition: 0.2s ease all;
  }

  textarea:focus ~ label,
  textarea:not(.empty) ~ label {
    top: -10px;
    font-size: 14px;
    color: $color-puerto-rico;
  }

  .icon {
    right: 6px;
    top: 10px;
    &:hover,
    &:focus {
      color: $color-hover;
    }
  }


  
  .mob_summary .mob_rw_list .mob_t_bx input[type="text"]{
      border:1px solid #000;
    }


@media (max-width: 576px) {
    .txt_blk_out{
      width:100%!important;
      position: relative;
      padding-left: 0px!important;
      padding-right: 0px!important;
      margin-bottom: 0px!important;
      margin-top: 0px!important;
      .text-sm{
        background:#fafafa;
        border: 0px;
        border-bottom: 1px solid #e0e0e0;
        height: 80px;
        color:#000000;
        button{
          &.icon{
            top:25px;
          }
        }
      }
      .text-error{
        position: absolute;
        left:0px;
        bottom: 0px;
        width:100%;
        padding: 0 10px;
      }
      button{
          &.icon{
            top:25px;
          }
        }
    }

    .modal .login_out_bx .modal-content .tx_bx_out.board_input_box .text-sm {
        background: #f2f2f2;
        border: 0px;
        border-bottom: 0px;
        height: 40px;
        color: #000000;
        margin: 0 3%;
        border-radius: 4px;
        width: 94%;
    }

    .modal .login_out_bx .modal-content.board_input_outer .text-error {
        padding-left: 13px;
        position: absolute;
        width: 100%;
        bottom: -25px;
        left: 0px;
    }
    .modal .login_out_bx .modal-content.board_input_outer .vt-icon--sm{ right:20px; }

}

.txt_blk_out {
  .text-grey-dark {
    right: 13px;
  }
} 

.cl-error {
    --text-opacity: 1;
    color: #eb415c;
    color: rgba(235, 65, 92, var(--text-opacity));
    font-size: 0.75rem;
}
</style>
