<template>
  <!-- <div class="columns">
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
  </div> -->

   <div class="select-wrapper relative columns">
    <select
      name="column"
      class="cl-secondary"
      v-model="column"
      @change="changeColumn"
    >
      <!-- <option v-if="!selected" /> -->
      <option
        v-for="(option) in productsColumns"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <label> Columns </label>

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
    // .columns {
    //     display: inline-flex;
    //     position: relative;
    //     border-bottom: 1px solid gray;
    //     select {
    //         // @extend .h4;
    //         font-size: 14px;
    //         border: none;
    //         width: 100%;
    //         border-radius: 0;
    //         background-color: transparent;
    //         margin-right: 0;
    //         &:focus {
    //             outline: none;
    //         }
    //     }
    //     &__icon {
    //         position: absolute;
    //         right: 0;
    //         top: 50%;
    //         transform: translateY(-50%);
    //         cursor: pointer;
    //     }
    // }
    // @media (max-width: 770px) {
    //   .columns {
    //     width: 100%;
    //   }
    // }
</style>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  @import '~theme/css/base/text';
  $color-tertiary: color(tertiary);
  $color-black: color(black);
  $color-puerto-rico: color(puerto-rico);
  $color-hover: color(tertiary, $colors-background);

.select-wrapper {
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 18px;
    //transform: translateY(-50%);
    right: 50px;
    //margin-top: -7px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 6px 0 6px;
    border-color: $color-tertiary transparent transparent transparent;
    pointer-events: none;
  }

  select {
    padding: 10px;
    border: 1px solid $color-tertiary;
    width: 30%;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    background-color: transparent;

    &:hover,
    &:focus {
      outline: none;
      border-color: $color-puerto-rico;
    }

    &:disabled,
    &:disabled + label {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
  label {
    color: #999;
    position: absolute;
    pointer-events: none;
    user-select: none;
    left: 22px;
    top: 9px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  select:focus ~ label, select:not(.empty) ~ label {
    top: -10px;
    font-size: 14px;
    color: $color-puerto-rico;
    display: none;
  }
}

@media (max-width: 576px) {

    .txt_blk_select{
            width: 30%;
            float: left;
            padding-left: 0px!important;
            padding-right: 0px!important;
            margin-top: 0px!important;
            margin-bottom: 0px!important;
            &:after{
              top:36px;
            }
            select{
              background:#fafafa;
              border: 0px;
              border-bottom: 1px solid #e0e0e0;
              height: 80px;
              color:#000000;
            }
            label{
              top:25px;
              left:15px;
              color:#8d9baf;
            }
          }

            .search {
                &:after{
                  top:21px !important;
                }
                select{
                  height: auto !important;
                }
                label{
                  top:10px !important;
                }
          }
}
@media screen and (min-width: 769px) and (max-width: 1599px)  {
  .columns {
    &::after {
          right: 50px;
    }
  }
}

@media screen and (min-width: 1600px) and (max-width: 3840px)  {
  .columns {
    &::after {
          right: 25px;
    }
  }

  .search_page_size_div {
    .columns {
        &::after {
              right: 132px;
        }
    }
  }
}
</style>