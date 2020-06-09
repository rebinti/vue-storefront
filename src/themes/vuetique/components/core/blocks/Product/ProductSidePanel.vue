<template>
  <div class="wishlist right-sidebar max-w-full fixed p-8 pt-10" :class="{ active: isProductSidePanelOpen }">
    <button
      type="button"
      :aria-label="$t('Close')"
      class="absolute top-0 right-0 m-4 h-4"
      @click="closeSearchpanel"
      data-testid="closeMicrocart"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#close" />
      </svg>
    </button>
    
    <h3>Size Guide</h3>

    <!-- <cms-block :identifier="'product-size-guide'" :sync="true"/> -->

      
    <Accordion class="mob_fltr"   
        :title="'Size Guide'"
      >
        <template>
          <div class="row">
            <base-select v-if="getLabelAtrributeList && getLabelAtrributeList.options.length"
              class="col-xs-12 col-sm-6 mb10"
              name="brands"
              :options="getLabelAtrributeList.options"
              :placeholder="$t('Select options *')"
              autocomplete="label"
            />
                  Size Guide Block
                  <cms-block :identifier="'brand-marc-angelo'" :sync="true"/>

                
          </div>
        </template>
      </Accordion>

    <Accordion class="mob_fltr"
        :title="'How To Measure'"
      >
        <template>
            <div>
               <p>
                 Chest: Measure the circumference of your chest. Place one end of the tape measure at the fullest part of your bust, wrap it around (under your armpits, around your shoulder blades, and back to the front) to get the measurement. Waist: Measure the circumference of your waist. Use the tape to circle your waist (sort of like a belt would) at your natural waistline, which is located above your belly button and below your rib cage. (If you bend to the side, the crease that forms is your natural waistline.) Hips: Measure the circumference of your hips. Start at one hip and wrap the tape measure around your rear, around the other hip, and back to where you started. Make sure the tape is over the largest part of your buttocks. Inseam: This is the distance from the uppermost inner part of your thigh to the bottom of your ankle. You can measure your inseam in two ways.
               </p>
            </div>
        </template>
    </Accordion>


  
  </div>
</template>
<script>
import { mapState , mapGetters} from 'vuex'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import NoScrollBackground from 'theme/mixins/noScrollBackground'
import CmsBlock from 'theme/components/core/blocks/Cms/Block'
import Accordion from 'theme/components/theme/Accordion'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'

export default {
  name: 'ProductSidePanel',
  props: {
  },
  mixins: [CmsBlock],
  components: {
     CmsBlock, Accordion, BaseSelect
  },
  computed: {
    // ...mapState({
    //   yoptoProduct: state => state.ui.yoptoProduct
    // }),
    isProductSidePanelOpen () {
      return this.$store.state.ui.productSidePanelFlag
    },
    ...mapGetters({
       attributesByCode: 'attribute/attributeListByCode',
      attributesById: 'attribute/attributeListById',
     }),
     getLabelAtrributeList() {
       if (this.attributesByCode && this.attributesByCode.label) {
         return this.attributesByCode.label
      } else {
         return {}
      }
     },
    getCurrentProductLabelData () {
      if (this.attributesByCode && this.attributesByCode.label) {
         return this.attributesByCode.label.options.find(val => val.value == this.product.label)
      } else {
         return null
      }
    },
  },
  mounted () {
    //  console.log('yoptoProduct' , this.yoptoProduct);
  },
  mixins: [onEscapePress, NoScrollBackground],
  methods: {
    closeReviewPanel () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.dispatch('ui/toggleProductSidePanel')
    },
    toggletoggleReviewPanel () {
      this.$store.dispatch('ui/toggleProductSidePanel', false)
    },
    onEscapePress () {
      this.closeSearchpanel()
    },
    closeSearchpanel () {
     this.$store.dispatch('ui/toggleProductSidePanel' , false)
    }
  },
  beforeCreate () {
    const el = document.body;
    el.classList.add('menu-high-opacity');
    document.documentElement.classList.add('menu-high-opacity')
  },
  destroyed () {
    const el = document.body;
    el.classList.remove('menu-high-opacity');
    document.documentElement.classList.remove('menu-high-opacity')
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";

  i {
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
</style>
