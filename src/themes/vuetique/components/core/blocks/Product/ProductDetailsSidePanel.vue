<template>
  <div class="wishlist right-sidebar max-w-full fixed p-8 pt-10">
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
    
    <h3>Product Details</h3>
    <br>          
        <div
            v-html="product.short_description"
            style="margin-left: 10px;"
        />
                                      
    <br>    
        <div 
            v-html="product.description" 
            style="margin-left: 10px;"
        />
                                 
    

            <!-- <div class="container accor">  
                 <div class="border-b border-grey-light mt-5" /> 

                <div class="border-b border-grey-light mt-5 pb-5">
                  <h5 @click.prevent="detailsAccordion != 'details' ? detailsAccordion = 'details' : detailsAccordion = null" class="flex justify-between cursor-pointer font-normal">
                    <span>{{ $t('DETAILS') }}</span>
                    <svg viewBox="0 0 25 25" class="vt-icon">
                      <use v-if="detailsAccordion != 'details'" xlink:href="#down" />
                      <use v-else xlink:href="#up" />
                    </svg>
                  </h5>
                  <transition name="fade">
                    <section v-show="detailsAccordion == 'details'" class="details mt-4">
                      <div
                        class="details-wrapper details-accor"
                        :class="{'details-wrapper--open': detailsOpen}"
                      >
                        <div
                          class="text-h5 leading-loose"
                          itemprop="description"
                          v-html="product.description"
                        />
                        <div
                          class="details-overlay"
                          @click="showDetails"
                        />
                      </div>
                    </section>
                  </transition>
                </div>
                <div class="border-b border-grey-light mt-5 pb-5">
                  <h5 @click.prevent="detailsAccordion != 'specs' ? detailsAccordion = 'specs' : detailsAccordion = null" class="flex justify-between cursor-pointer font-normal">
                    <span>{{ $t('ABOUT') }}</span>
                    <svg viewBox="0 0 25 25" class="vt-icon">
                      <use v-if="detailsAccordion != 'specs'" xlink:href="#down" />
                      <use v-else xlink:href="#up" />
                    </svg>
                  </h5>
                  <transition name="fade">
                    <section v-show="detailsAccordion == 'specs'" class="specs mt-4">
                      <div
                        class="details-wrapper details-accor"
                        :class="{'details-wrapper--open': detailsOpen}"
                      >
                        <div
                          class="text-h5 leading-loose"
                          itemprop="description"
                          v-html="product.short_description"
                        />
                        <div
                          class="details-overlay"
                          @click="showDetails"
                        />
                      </div>                      
                    </section>
                  </transition>
                </div>
              </div> -->

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import NoScrollBackground from 'theme/mixins/noScrollBackground'
import CmsBlock from 'theme/components/core/blocks/Cms/Block'

export default {
  name: 'ProductDetailsSidePanel',
  props: {
  },
  mixins: [CmsBlock],
  data () {
    return {      
        detailsOpen: false,        
        detailsAccordion: 'details'
    }
  },  
  components: {
     CmsBlock
  },
  computed: {
    // ...mapState({
    //   yoptoProduct: state => state.ui.yoptoProduct
    // }),
    ...mapGetters({
      product: 'product/productCurrent'
    }),    
    isProductDeatilsSidePanelOpen () {
      return this.$store.state.ui.productDetailsSidePanelFlag
    }
  },
  mounted () {
      console.log('PPPRODUCTTTT' , this.product);
  },
  mixins: [onEscapePress, NoScrollBackground],
  methods: {
    closeReviewPanel () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.dispatch('ui/toggleProductDetailsSidePanel')
    },
    toggletoggleReviewPanel () {
      this.$store.dispatch('ui/toggleProductDetailsSidePanel', false)
    },
    onEscapePress () {
      this.closeSearchpanel()
    },
    closeSearchpanel () {
     this.$store.dispatch('ui/toggleProductDetailsSidePanel' , false)
    },
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
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
