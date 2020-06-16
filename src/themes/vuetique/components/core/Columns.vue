<template>
  <div class="columns">
    <select
      name="column"
      class="cl-secondary"
      v-model="column"
      @change="changeColumn"
    >
      <option v-for="(option) in productsColumns" :value="option" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
   props: {
    dcolumn: {
      type: [Number],
      required: false,
      default: 2
    },
    productsColumns: {
      type: [Array],
      required: false,
      default: [2, 3, 4]
    },
    type: {
      type: [String],
      required: false,
      default: 'lg'
    },
  },
  created() {
    this.column = this.dcolumn;
  },
  data () {
    return {
      column: 2,
      // productsColumns: [2, 3, 4, 6]
    }
  },
  watch: {
    dcolumn (value) {
      this.column = this.dcolumn;
    },
  },
  methods: {
    changeColumn () {
      this.$emit('change-column', { 'selected': this.column, 'type': this.type } )
    }
  }
}
</script>
<style lang="scss" scoped>
    .columns {
        display: inline-flex;
        position: relative;
        border-bottom: 1px solid gray;
        select {
            // @extend .h4;
            font-size: 14px;
            border: none;
            width: 100%;
            border-radius: 0;
            background-color: transparent;
            margin-right: 0;
            &:focus {
                outline: none;
            }
        }
        &__icon {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        }
    }
    @media (max-width: 770px) {
      .columns {
        width: 100%;
      }
    }
</style>
