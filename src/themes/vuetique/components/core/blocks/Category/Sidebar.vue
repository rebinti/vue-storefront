<template>
  <div class="sidebar">
    <div >

      <div class="mob_price_filter Accordion mob_fltr list_">
          <h5 class="Accordion__trigger k_head" >Sort BY</h5>
          <p :class="{'act_df' : sortby == option}" v-for="(option, label) in sortByAttribute" :disabled="sortby === option" :value="option" :key="option" 
          @click="changeSortOrder(option)" href="">
           {{ $t(label) }}
           <span class="fas fa-check"></span>
          </p>
      </div>

      <div class="Accordion mob_fltr list_hd list_">
          <h5 class="Accordion__trigger k_head" >Filter By</h5>
      </div>
  
      <Accordion class="mob_fltr"
        v-for="(filter, filterIndex) in filters"
        :key="filterIndex"
        v-if="filter.length"
        :title="$t(filterIndex + '_filter')"
      >
        <template v-if="filterIndex==='color'">
          <color-selector
            context="category"
            :attribute_code="color"
            code="color"
            v-for="(color, index) in filter"
            :key="index"
            :id="color.id"
            :label="color.label"
          />
        </template>
        <template v-else-if="filterIndex==='size'">
          <size-selector
            context="category"
            :attribute_code="size"
            code="size"
            v-for="(size, index) in sortById(filter)"
            :key="index"
            :id="size.id"
            :label="size.label"
          />
        </template>
        <template v-else-if="filterIndex==='price'">
          <price-selector
            context="category"
            :attribute_code="price"
            class="mb-3"
            code="price"
            v-for="(price, index) in filter"
            :key="index"
            :id="price.id"
            :from="price.from"
            :to="price.to"
            :content="price.label"
            :label="price.label"
          />
        </template>
        <template v-else>
          <generic-selector
            context="category"
            :attribute_code="filter.attribute_code"
            class="generic-select mr-3 mb-3"
            :code="filterIndex"
            v-for="(option, index) in filter"
            :key="index"
            :id="option.id"
            :label="option.label"
          />
        </template>
      </Accordion>
    </div>

    <div class="mt-8 lg:hidden row gutter-md">
      <div class="col-6">
        <button-full
          class="w-full"
          @click.native="resetAllFilters"
          :disabled="Object.keys(activeFilters).length === 0"
        >
          {{ $t('Clear') }}
        </button-full>
      </div>
      <div class="col-6">
        <button-full
          class="w-full btn-primary"
          @click.native="$emit('closeFilters')"
        >
          {{ $t('Apply') }}
        </button-full>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@vue-storefront/core/compatibility/components/blocks/Category/Sidebar'
import SortBy from '@vue-storefront/core/compatibility/components/SortBy'

import ColorSelector from 'theme/components/core/ColorSelector'
import SizeSelector from 'theme/components/core/SizeSelector'
import PriceSelector from 'theme/components/core/PriceSelector'
import GenericSelector from 'theme/components/core/GenericSelector'
import Accordion from 'theme/components/theme/Accordion'

// import SortBy from 'theme/components/core/SortBy.vue'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'

export default {
  components: {
    ColorSelector,
    SizeSelector,
    PriceSelector,
    GenericSelector,
    Accordion,
    ButtonFull,
    // SortBy
  },
  mixins: [Sidebar , SortBy],
  data () {
    return {
      openedFilters: []
    }
  },
  methods: {
    toggleFilters (filterIndex) {
      let index = this.openedFilters.indexOf(filterIndex)
      if (index === -1) {
        this.openedFilters.push(filterIndex)
      } else {
        this.openedFilters.splice(index, 1)
      }
    },
    changeSortOrder(data) {
      this.sortby = data;
      this.changeOrder();
    }
  }
}
</script>

<style lang="scss" scoped>

 @media (min-width: 576px) {
  .mob_price_filter{
    display: none;
  }
  .list_hd{
    display: none; 
  }
}

  @media (max-width: 576px) {

    .mob_fltr{     
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
      .price-select{       
        font-size:13px;
      }
    } 
    .mobile_filter{
      
      .ripple{
        background: #000000;
        border:1px solid #000;
        color:#ffffff;
        &.disabled{
          background: #ffffff;
          border:1px solid #000;
          color:#000;
        }
      }
      .list_hd{
        padding-bottom: 10px;
      }
      .mob_price_filter{
        padding-bottom: 20px;
        p{
          width:100%;
          color:#000;
          font-size:13px;
          display: inline-block;
          margin-bottom: 3px;
          svg{
            display: none;
          }
          &.act_df{
            font-weight: bold;
            svg{
              display: block;
              float: right;
              margin-right: 20%;
              margin-top: 4px;
            }
          }
        }
        .k_head{
          padding-bottom: 10px;
        }
      }

    }

  }


</style>