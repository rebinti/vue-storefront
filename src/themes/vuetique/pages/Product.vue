<template>
  <div id="product" itemscope itemtype="http://schema.org/Product">
    <breadcrumbs class="brd_out"
      :routes="breadcrumbs.routes"
      :active-route="breadcrumbs.name"
    />
    <section class="bg-grey-lightest">
          <div class="w-full md:w-12/12">
            <product-gallery
              ref="gallery"
              :gallery="gallery"
              :offline="offlineImage"
              :configuration="configuration"
              :product="product"
              @page-change="(page) => currentGalleryPage = page"
            />
          </div>       
      <div class="container">            
        <section class="md:flex">     
          <div class="w-full md:w-3/5">
            <div class="flex">
              <!-- <div v-if="gallery.length > 1" class="product-thumbnails w-1/12 hidden md:block">
                <ul>
                  <li
                    v-for="(images, key) in gallery"
                    :key="images.src"
                    class="mb-1 bg-grey-lighter"
                  >
                    <img
                      :src="images.src"
                      ref="images"
                      @click="$refs.gallery.$refs.carousel.navigate(key)"
                      :alt="product.name"
                      class="block border cursor-pointer"
                      :class="currentGalleryPage === key ? 'border-black' : 'border-grey-light'"
                    >
                  </li>
                </ul>
              </div> -->

              <!-- <div class="w-full md:w-11/12">
                <product-gallery
                  ref="gallery"
                  :gallery="gallery"
                  :offline="offlineImage"
                  :configuration="configuration"
                  :product="product"
                  @page-change="(page) => currentGalleryPage = page"
                />
              </div> -->
            </div>
          </div>

          <!-- mobile product details sec -->
          <div class="w-full m_item p_detail_box">

              <div class="mob_headline_out">
                  <div class="mob_headline">
                    <p v-if="getBrandLabelDetails && getBrandLabelDetails.label" style="font-size: 18px;font-weight: 600;text-decoration: underline;margin-top: 15px;">   
                      <router-link
                          class="menu-link"
                          :to="localizedRoute('/brands/' + getBrandLabelDetails.label)"
                          exact
                        >{{ getBrandLabelDetails.label }}
                        </router-link>
                   </p>
                    <h1 data-testid="productName" itemprop="name" class="product-title-d">
                      {{ product.name | htmlDecode }}
                    </h1>
                    <div class="text-grey text-sm sku_txt">
                      sku: {{ product.sku }}
                    </div>
                    <span id="stamped-badge-mobile"  @click="toggleReviewPanel" class="stamped-product-reviews-badge stamped-main-badge"  :data-id="getProductId" v-if="getProductId"></span>
                  </div>

                  <div class="mob_price">
                        <div
                          class="font-serif font-bold text-h1 pb-5 price"
                          v-if="product.type_id !== 'grouped'"
                        >
                          <div
                            class="text-h1 gg mob_p"
                            v-if="product.special_price && product.priceInclTax && product.originalPriceInclTax"
                          >
                            <span class="font-bold">
                              {{ product.priceInclTax * product.qty | price }}
                            </span>
                            <span class="text-h2 text-grey line-through">
                              {{ product.originalPriceInclTax * product.qty | price }}
                            </span>
                          </div>
                          <div
                            v-if="!product.special_price && product.priceInclTax"
                          >
                            {{ product.priceInclTax * product.qty | price }}
                          </div>
                        </div>
                  </div>      
              </div>    

              <div class="mob_pro_varients">

                    <div class="variants" v-if="product.type_id =='configurable' && !loading">
                    <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
                      {{ product.errors | formatProductMessages }}
                    </div>

                  <!--Mobile View Color swatch products Links -->
                  <div v-if="colorSwatchRelateProduct.length > 0">
                    <p class="font-bold mb-4">Color: </p>
                      <router-link
                          class="border border-transparent hover:opacity-100 rounded-full relative inline-flex pointer color mr-3 mb-3"
                          :to="productLink(prod)"
                          data-testid="productLink"
                          v-for="prod in colorSwatchRelateProduct" :key="prod.id"
                          v-if=" prod.colorSwatch"
                        >
                          <button 
                              :aria-label="$t('Select color ') + prod.colorSwatch.label"
                            >
                            <div class="clr_img_out">
                              <div class="clr_img_inner">
                              <img :width="'32px'" :height="'32px'" :src="'/assets/colour/' + prod.colorSwatch.label.toLowerCase() +'.png'" 
                                                @error="imgUrlAlt" alt="" >
                              </div>
                            </div>
                          </button>
                        </router-link>
                    </div>

                    <div
                      class="relative mob_size_box" :class="{'only-single-item':product.configurable_options.length==1}"
                      v-for="(option, index) in product.configurable_options"
                      v-if="(!product.errors || Object.keys(product.errors).length === 0) && Object.keys(configuration).length > 0"
                      :key="index"
                    >
                      <div class="pt-4 pb-2 mob_size_box_label" data-testid="variantsLabel">
                        <span class="font-bold">{{ option.label }}</span>:
                        <span>
                          {{ configuration[option.attribute_code ? option.attribute_code : option.label.toLowerCase()] ? configuration[option.attribute_code ? option.attribute_code : option.label.toLowerCase()].label : null }}
                        </span>
                      </div>
                      <div class="variants-wrapper">
                        <div v-if="option.label == 'Color'">
                          <color-selector
                            v-for="(c, i) in options[option.attribute_code]"
                            v-if="isOptionAvailable(c)"
                            :key="i"
                            :id="c.id"
                            :label="c.label"
                            context="product"
                            :code="option.attribute_code"
                            :class="{ active: c.id == configuration[option.attribute_code].id }"
                          />
                        </div>
                        <div class="sizes" v-else-if="option.label == 'Size'">
                          <router-link
                            to="/size-guide"
                            target="_blank"
                            v-if="option.label == 'Size'"
                            class="text-sm font-medium text-black pt-4 absolute top-0 right-0 size_link"
                          >
                            {{ $t('Size guide') }}
                          </router-link>
                          <size-selector
                            v-for="(s, i) in options[option.attribute_code]"
                            v-if="isOptionAvailable(s)"
                            :key="i"
                            :id="s.id"
                            :label="s.label"
                            context="product"
                            :code="option.attribute_code"

                            :class="{ active: s.id == configuration[option.attribute_code].id }"
                            v-focus-clean
                          />
          
                        </div>
                        <div :class="option.attribute_code" v-else>
                          <generic-selector
                            v-for="(s, i) in options[option.attribute_code]"
                            v-if="isOptionAvailable(s)"
                            :key="i"
                            :id="s.id"
                            :label="s.label"
                            context="product"
                            :code="option.attribute_code"

                            :class="{ active: s.id == configuration[option.attribute_code].id }"
                            v-focus-clean
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                
              </div>

              <div class="mob_crt_button_out">

                  <div class="mob_add_cart_btn">

                    <add-to-cart :product="product" class="py-3 text-sm"/>

                  </div>
                  <div class="mob_add_wish_btn">
                      <wishlist-button :product="product" />
                  </div>

                 
                
                
              </div> 

          </div>
          <!-- mobile product details sec ends -->



          <div class="w-full md:w-2/5 md:px-10 ds_item details-section">
          <p v-if="getBrandLabelDetails && getBrandLabelDetails.label" style="font-size: 18px;font-weight: 600;text-decoration: underline;margin-top: 15px;">   
            <router-link
                class="menu-link"
                :to="localizedRoute('/brands/' + getBrandUrlPath(getBrandLabelDetails.label))"
                exact
              >{{ getBrandLabelDetails.label }}
              </router-link>
            </p>
            <h1 data-testid="productName" itemprop="name">
              {{ product.name | htmlDecode }}
            </h1>
            <!-- <div class="text-grey text-sm mb-3 uppercase">
              sku: {{ product.sku }}
            </div> -->
            <span id="stamped-badge-web"  @click="toggleReviewPanel" class="stamped-product-reviews-badge stamped-main-badge"  :data-id="getProductId" v-if="getProductId"></span>
	
            <div class="tfc-fitrec-product" id="DS20" data-userid=""
             data-colorid="navy" data-locale="en_GB"></div>
  <!-- <div
         class="yotpo yotpo-main-widget"
         data-product-id="product.id"
         data-price="product.price"
         data-currency="product.currency"
         data-name="product.name"
         data-url="product.url_path"
         data-image-url="product.image">
</div> -->

            <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
              <meta itemprop="priceCurrency" :content="currentStore.i18n.currencyCode">
              <meta itemprop="price" :content="parseFloat(product.priceInclTax).toFixed(2)">
              <div
                class="font-serif font-bold text-h1 pb-5 price ds_item"
                v-if="product.type_id !== 'grouped'"
              >
                <div
                  class="text-h1 gg"
                  v-if="product.special_price && product.priceInclTax && product.originalPriceInclTax"
                >
                  <span class="font-bold">
                    {{ product.priceInclTax * product.qty | price }}
                  </span>&nbsp;
                  <span class="text-h2 text-grey line-through">
                    {{ product.originalPriceInclTax * product.qty | price }}
                  </span>
                </div>
                <div
                  v-if="!product.special_price && product.priceInclTax"
                >
                  {{ product.priceInclTax * product.qty | price }}
                </div>
              </div>
              <div
                class="variants"
                v-if="product.type_id =='configurable' && !loading"
              >
                <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
                  {{ product.errors | formatProductMessages }}
                </div>
                <!-- Color swatch products Links -->
                <div v-if="colorSwatchRelateProduct.length > 0">
                  <p class="font-bold">Color: </p> <!-- mb-4 -->
                    <router-link
                        class="border border-transparent hover:opacity-100 rounded-full relative inline-flex pointer color mr-3 mb-3"
                        :to="productLink(prod)"
                        data-testid="productLink"
                        v-for="prod in colorSwatchRelateProduct" :key="prod.id"
                        v-if=" prod.colorSwatch"
                      >
                        <button 
                            :aria-label="$t('Select color ') + prod.colorSwatch.label"
                          >
                          <div class="clr_img_out">
                            <div class="clr_img_inner">
                            <img :width="'32px'" :height="'32px'" :src="'/assets/colour/' + prod.colorSwatch.label.toLowerCase() +'.png'" 
                                              @error="imgUrlAlt" alt="" >
                            </div>
                          </div>
                        </button>
                      </router-link>
                  </div>
                <div
                  class="relative"
                  v-for="(option, index) in product.configurable_options"
                  v-if="(!product.errors || Object.keys(product.errors).length === 0) && Object.keys(configuration).length > 0"
                  :key="index"
                >
                  <div class=" pb-2" data-testid="variantsLabel">
                    <span class="font-bold">{{ option.label }}</span>:
                    <span>
                      {{ configuration[option.attribute_code ? option.attribute_code : option.label.toLowerCase()] ? configuration[option.attribute_code ? option.attribute_code : option.label.toLowerCase()].label : null }}
                    </span>
                  </div>
                  <div class="variants-wrapper">
                    <div v-if="option.label == 'Color'">
                      <color-selector
                        v-for="(c, i) in options[option.attribute_code]"
                        v-if="isOptionAvailable(c)"
                        :key="i"
                        :id="c.id"
                        :label="c.label"
                        context="product"
                        :code="option.attribute_code"
                        :class="{ active: c.id == configuration[option.attribute_code].id }"
                      />
                    </div>
                    <div class="sizes" v-else-if="option.label == 'Size'">
                      <router-link
                        to="/size-guide"
                        target="_blank"
                        v-if="option.label == 'Size'"
                        class="text-sm font-medium text-black pt-4 absolute top-0 right-0"
                      >
                        {{ $t('Size guide') }}
                      </router-link>
                      <size-selector
                        v-for="(s, i) in options[option.attribute_code]"
                      
                        :key="i"
                        :id="s.id"
                        :label="s.label"
                        context="product"
                        :code="option.attribute_code"
                        :class="!isOptionAvailable(s) ? 'out-of-stock' : checkOutOfstock(s.id === configuration[option.attribute_code].id , s ,index , product.configurable_options ) "
                       
                        v-focus-clean
                      />

                       <!-- :class="{ active: s.id == configuration[option.attribute_code].id }" -->
                    </div>
                    <div :class="option.attribute_code" v-else>
                       <generic-selector
                        v-for="(s, i) in options[option.attribute_code]"
                        
                        :key="i"
                        :id="s.id"
                        :label="s.label"
                        context="product"
                        :code="option.attribute_code"

                        
                        :class="!isOptionAvailable(s) ? 'out-of-stock' : checkOutOfstock(s.id === configuration[option.attribute_code].id , s ,index , product.configurable_options ) "
                        v-focus-clean
                      />
                      <!-- :class="{ active: s.id == configuration[option.attribute_code].id }" -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <product-links
              v-if="product.type_id =='grouped' && !loading"
              :products="product.product_links"
            />
            <product-bundle-options
              v-if="product.bundle_options && product.bundle_options.length > 0 && !loading"
              :product="product"
            />
            <product-custom-options
              v-else-if="product.custom_options && product.custom_options.length > 0 && !loading"
              :product="product"
            />
            <div class="flex mt-6 pb-5 border-b">
              <qty-input
                v-if="product.type_id !== 'grouped' && product.type_id !== 'bundle'"
                v-model.number="product.qty"
                class="mr-5"
                size="lg"
              />

              <div class="flex-grow flex">
                <add-to-cart
                  :product="product"
                  class="py-3 text-sm"
                />
              </div>

               <div class="col-6 wishlist-button">
                <wishlist-button :product="product" />
              </div>
            </div>

            <!-- <div class="row text-sm md:py-5 text-center add-to-buttons">
              <div class="col-6">
                <wishlist-button :product="product" />
              </div>

              <div class="col-6">
                <button
                  @click="isOnCompare ? removeFromList('compare') : addToList('compare')"
                  class="inline-flex items-center text-grey-dark"
                  type="button"
                  data-testid="addToCompare"
                >
                  <svg viewBox="0 0 25 25" class="vt-icon pr-1">
                    <use xlink:href="#compare" />
                  </svg>
                  <template v-if="!isOnCompare">
                    {{ $t('Add to compare') }}
                  </template>
                  <template v-else>
                    {{ $t('Remove from compare') }}
                  </template>
                </button>
              </div>
            </div> -->

            <!-- <div class="row text-sm md:py-5 text-center add-to-buttons">
               <div class="col-6">
                <button
                  @click="toggleReviewPanel"
                  class="inline-flex items-center text-grey-dark"
                  type="button"
                  data-testid="showReviews"
                  style="border: 1px solid;
                  padding: 5px;
                  border-radius: 5px;"
                >
                    {{ $t('Show Reviews') }}
                </button>
              </div>
            </div> -->

            <div class="container">  <!-- my-4 -->
                 <div class="border-b border-grey-light mt-5" /> <!-- pb-5 -->

                <div class="border-b border-grey-light mt-5 pb-5">
                  <h5 @click.prevent="detailsAccordion != 'details' ? detailsAccordion = 'details' : detailsAccordion = null" class="flex justify-between cursor-pointer font-normal">
                    <span>{{ $t('Product details') }}</span>
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
                    <span>{{ $t('Specifications') }}</span>
                    <svg viewBox="0 0 25 25" class="vt-icon">
                      <use v-if="detailsAccordion != 'specs'" xlink:href="#down" />
                      <use v-else xlink:href="#up" />
                    </svg>
                  </h5>
                  <transition name="fade">
                    <section v-show="detailsAccordion == 'specs'" class="specs mt-4">
                      <!-- <ul class="p-0 m-0 my-2 md:my-0 leading-normal attributes">
                        <product-attribute
                          :key="attr.attribute_code"
                          v-for="attr in customAttributes"
                          :product="product"
                          :attribute="attr"
                          empty-placeholder="N/A"
                        />
                      </ul> -->
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
              </div>

          </div>
        </section>
      </div>
    </section>

    <!-- <section>
       <div class="container my-4" style="margin-top:50px;margin-bottom:50px;display:none;" v-if="getProductId">
                <div id="stamped-main-widget" 
                  :data-product-id="getProductId" 
                  :data-name="product.name" 
                  :data-url="product.url_path" 
                  :data-image-url="product.image" 
                  :data-description="'Testing prduct'" 
                  :data-product-sku="product.sku"> 
                </div>
      </div>
    </section> -->

    <!-- <div class="container my-4">
      <div class="border-b border-grey-light mt-5 pb-5" />

      <div class="border-b border-grey-light mt-5 pb-5">
        <h3 @click.prevent="detailsAccordion != 'details' ? detailsAccordion = 'details' : detailsAccordion = null" class="flex justify-between cursor-pointer font-normal">
          <span>{{ $t('Product details') }}</span>
          <svg viewBox="0 0 25 25" class="vt-icon">
            <use v-if="detailsAccordion != 'details'" xlink:href="#down" />
            <use v-else xlink:href="#up" />
          </svg>
        </h3>
        <transition name="fade">
          <section v-show="detailsAccordion == 'details'" class="details mt-10">
            <div
              class="details-wrapper"
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
        <h3 @click.prevent="detailsAccordion != 'specs' ? detailsAccordion = 'specs' : detailsAccordion = null" class="flex justify-between cursor-pointer font-normal">
          <span>{{ $t('Specifications') }}</span>
          <svg viewBox="0 0 25 25" class="vt-icon">
            <use v-if="detailsAccordion != 'specs'" xlink:href="#down" />
            <use v-else xlink:href="#up" />
          </svg>
        </h3>
        <transition name="fade">
          <section v-show="detailsAccordion == 'specs'" class="specs mt-10">
            <ul class="p-0 m-0 my-2 md:my-0 leading-normal attributes">
              <product-attribute
                :key="attr.attribute_code"
                v-for="attr in customAttributes"
                :product="product"
                :attribute="attr"
                empty-placeholder="N/A"
              />
            </ul>
          </section>
        </transition>
      </div>

      <div class="border-b border-grey-light mt-5 pb-5">
        <h3 @click.prevent="detailsAccordion != 'reviews' ? detailsAccordion = 'reviews' : detailsAccordion = null" class="flex justify-between cursor-pointer font-normal">
          <span>{{ $t('Reviews') }}</span>
          <svg viewBox="0 0 25 25" class="vt-icon">
            <use v-if="detailsAccordion != 'reviews'" xlink:href="#down" />
            <use v-else xlink:href="#up" />
          </svg>
        </h3>
        <transition name="fade">
          <section v-show="detailsAccordion == 'reviews'" class="mt-10">
            <reviews v-show="OnlineOnly" />
          </section>
        </transition>
      </div>
    </div> -->

    <related-products
      type="upsell"
      :heading="$t('We found other products you might like')"
    />
    <promoted-offers collection="productBanners" class="my-8 px-6" />
    <related-products type="related" />

    <div class="container my-4">
      <no-ssr>
        <recently-viewed />
      </no-ssr>
    </div>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import Product from '@vue-storefront/core/pages/Product'
import VueOfflineMixin from 'vue-offline/mixin'
import RelatedProducts from 'theme/components/core/blocks/Product/Related.vue'
import Reviews from 'theme/components/core/blocks/Reviews/Reviews.vue'
import AddToCart from 'theme/components/core/AddToCart.vue'
import GenericSelector from 'theme/components/core/GenericSelector'
import ColorSelector from 'theme/components/core/ColorSelector.vue'
import SizeSelector from 'theme/components/core/SizeSelector.vue'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import ProductAttribute from 'theme/components/core/ProductAttribute.vue'
import ProductTile from 'theme/components/core/ProductTile.vue'
import ProductLinks from 'theme/components/core/ProductLinks.vue'
import ProductCustomOptions from 'theme/components/core/ProductCustomOptions.vue'
import ProductBundleOptions from 'theme/components/core/ProductBundleOptions.vue'
import ProductGallery from 'theme/components/core/ProductGallery'
import RecentlyViewed from 'theme/components/core/blocks/MyAccount/RecentlyViewed'

import focusClean from 'theme/components/theme/directives/focusClean'
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import QtyInput from 'theme/components/theme/QtyInput'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  components: {
    'no-ssr': NoSSR,
    'WishlistButton': () => import(/* webpackChunkName: "wishlist" */'theme/components/core/blocks/Wishlist/AddToWishlist'),
    AddToCart,
    Breadcrumbs,
    ColorSelector,
    GenericSelector,
    ProductAttribute,
    ProductBundleOptions,
    ProductCustomOptions,
    ProductGallery,
    ProductLinks,
    ProductTile,
    PromotedOffers,
    RelatedProducts,
    Reviews,
    SizeSelector,
    RecentlyViewed,
    QtyInput
  },
  mixins: [Product, VueOfflineMixin],
  data () {
    return {
      detailsOpen: false,
      detailsAccordion: null,
      currentGalleryPage: 0,
      colorSwatchRelateProduct: [],
      getProductId: null
    }
  },
  directives: { focusClean },
  computed: {
    getBrandLabelDetails () {
      if (this.attributesByCode && this.attributesByCode.label) {
         return this.attributesByCode.label.options.find(val => val.value == this.product.label)
      } else {
         return null
      }
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-related', this.getRelatedProduct)

    this.$bus.$on('product-before-load', this.changeProd)

    //  this.$bus.$on('product-after-load', this.refreshStampedReview)
    document.addEventListener( 'stamped:reviews:loaded', function(e) {
      console.log('Stampled addEventListener', e);

      // document.getElementById("stamped-main-widget").contentWindow.location.reload(true);
// id="stamped-badge-mobile"  stamped-main-widget
      // document.getElementById("stamped-badge-mobile").contentWindow.location.reload(true);
      // document.getElementById("stamped-badge-web").contentWindow.location.reload(true);

      //  let stampedBadge = document.querySelectorAll(".stamped-badge");
      //     if (stampedBadge.length > 0) {
      //       stampedBadge.forEach(el => el.remove())
      //     }

      //     let elements = document.querySelectorAll(".stamped-container");
      //     if (elements.length > 0) {
      //       elements.forEach(el => el.remove())
      //     }

          // window.StampedFn.loadWidget()
          // window.StampedFn.loadBadges()
          // window.StampedFn.loadDisplayWidgets()
    })
   },  
  mounted () {
    // console.log('window.StampedFn', window.StampedFn)
      // setTimeout(() => {
      //   window.StampedFn.reloadUGC()
      //   window.StampedFn.loadWidget()
      //   window.StampedFn.loadBadges()
      //   window.StampedFn.loadDisplayWidgets()
      // }, 100);

    // addEventListenerStamped(document, 'stamped:reviews:loaded', function(e) {
    //       console.log('stamped:reviews:loaded', e);
    //   });
    // this.refreshStampedReview();
  },
  methods: {
    getBrandUrlPath (brandName) {
      return brandName.toLowerCase().split(' ').join('-');
    },
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
    },
    notifyOutStock () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('The product is out of stock and cannot be added to the cart!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyWrongAttributes () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('No such configuration for the product. Please do choose another combination of attributes.'),
        action1: { label: this.$t('OK') }
      })
    },
    toggleReviewPanel () {
      // this.$store.dispatch('ui/updateYoptoProduct' , this.product)
      this.$store.dispatch('ui/toggleReviewPanel')
    },
    checkOutOfstock (activeFlag, loopItem, optionIndex, fullConfigOption) { // loopItem fullConfigOption optionIndex
       if (optionIndex > 0) {
          let data = this.product.configurable_children.find(val => {
          return (val[loopItem.attribute_code] == loopItem.id) &&
            (val[fullConfigOption[0].attribute_code] == this.options[fullConfigOption[0].attribute_code].find(val1 => val1.id === this.configuration[fullConfigOption[0].attribute_code].id).id)
          });
          if (data) {
            if (data.stock.is_in_stock === false) {
              if (activeFlag) {
               return 'active out-of-stock'
              } else {
                return 'out-of-stock'
              }
            } else if (activeFlag) {
              return 'active'
            }
            else {
              return ''
            }
          } else {
            return ''
          }
       }
    },
    imgUrlAlt(event) {
       event.target.src = "/assets/colour/multi.png"
    },
    getRelatedProduct (relatedData) { 
    // Vue.prototype.$bus.$emit('product-after-related', { key: key, items: items })
    if (relatedData && relatedData.key !== 'related') return;
    // this.getProductId =  null
    const prod_ids = ['145954' , '145961' ,'161420', '145965', '148392' ,'159645'] 
    this.getProductId = prod_ids[Math.floor((Math.random() * 6))];
    console.log('Stamped getProductId value', this.getProductId)
    this.$store.dispatch('ui/updateYoptoProduct' , this.getProductId)

    // this.$forceUpdate();
    let stampedContainer = document.querySelectorAll(".stamped-container");
    if (stampedContainer.length > 0) {
      stampedContainer.forEach(el => el.remove())
    }

    let stampedBadge = document.querySelectorAll(".stamped-badge");  // .stamped-badge
    if (stampedBadge.length > 0) {
      stampedBadge.forEach(el => el.remove())
    }

    window.StampedFn.reloadUGC()
    // this.$forceUpdate();

     setTimeout(() => {
          //  let stampedBadge = document.querySelectorAll(".stamped-badge");
          // if (stampedBadge.length > 0) {
          //   stampedBadge.forEach(el => el.remove())
          // }

          // let elements = document.querySelectorAll(".stamped-container");
          // if (elements.length > 0) {
          //   elements.forEach(el => el.remove())
          // }

          // window.StampedFn.reloadUGC()

          // window.StampedFn.reloadUGC()
          
          window.StampedFn.loadWidget()
          window.StampedFn.loadBadges()
          window.StampedFn.loadDisplayWidgets()
          this.$forceUpdate();

     }, 800);

    let relatedProd = this.$store.state.product.related && this.$store.state.product.related.related ? this.$store.state.product.related.related : []
      if (relatedProd.length > 0 && this.attributesByCode.color) {
          this.colorSwatchRelateProduct = relatedProd.filter(val => val.color)
          .map(val => { 
              val.colorSwatch = this.attributesByCode.color.options.find(code => parseInt(code.value) === val.color)
              return val
            });
      } else {
         this.colorSwatchRelateProduct = [];
      }
    },
    productLink (product) {
      return formatProductLink(product, currentStoreView().storeCode)
    },

    refreshStampedReview () {
     const prod_ids = ['145954' , '145961' ,'161420', '145965', '148392' ,'159645'] 
     this.getProductId = prod_ids[Math.floor((Math.random() * 5))];
     console.log('Stamped getProductId value', this.getProductId)

    let stampedContainer = document.querySelectorAll(".stamped-container");
    if (stampedContainer.length > 0) {
      stampedContainer.forEach(el => el.remove())
    }

    let stampedBadge = document.querySelectorAll(".stamped-badge");  // .stamped-badge
    if (stampedBadge.length > 0) {
      stampedBadge.forEach(el => el.remove())
    }

    window.StampedFn.reloadUGC()
    // this.$forceUpdate();

     setTimeout(() => {
           let stampedBadge = document.querySelectorAll(".stamped-badge");
          if (stampedBadge.length > 0) {
            stampedBadge.forEach(el => el.remove())
          }

          let elements = document.querySelectorAll(".stamped-container");
          if (elements.length > 0) {
            elements.forEach(el => el.remove())
          }

          window.StampedFn.reloadUGC()
          
          window.StampedFn.loadWidget()
          window.StampedFn.loadBadges()
          window.StampedFn.loadDisplayWidgets()
          this.$forceUpdate();

     }, 1500);

    },
    changeProd (val) {
      console.log('changeProd changeProd changeProd', val)
      if (val.route !== null) {
        this.getProductId = null;
      }
    },

  },
  destroyed () {
    this.$bus.$off('product-after-related')
    this.$bus.$off('product-before-load')
    // this.$bus.$off('product-after-load')
  }
}
</script>

<style lang="scss" scoped>
.error {
  @apply text-error font-bold pb-4;
}

.price {
  @apply border-solid border-b;
  -webkit-font-smoothing: antialiased;
}

.variants-wrapper {
 .sizes {
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  .size-guide {
    height: 40px;
    @media (max-width: 767px) {
      width: 100%;
      margin-left: 0;
    }
  }
}

.add-to-buttons {
  @media (max-width: 767px) {
    padding-top: 30px;
    margin-bottom: 40px;
  }
}

.details-wrapper {
  @media (max-width: 767px) {
    position: relative;
    max-height: 140px;
    overflow: hidden;
    transition: all 0.3s ease;
    font-size: 14px;
  }
  p {
    @apply mb-3 text-error;
  }

  &--open {
    max-height: none;
  }
}
.wishlist-button div{
      margin: 7px;
}
.details-accor{
    height: 80px;
    overflow: auto;
}
.product-title-d{
  margin-bottom: 10px;
}
.details-overlay {
  @media (max-width: 767px) {
    position: absolute;
    height: 75%;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0;
    cursor: pointer;
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    &.hidden {
      display: none;
    }
  }
}

.attributes {
  list-style-type: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.product-thumbnails {
  ul {
    li {
      img {
        mix-blend-mode: multiply;
        opacity: .9;
      }
    }
  }
}
@media (max-width: 2560px) {
  #product{
    .container{
      .details-section{
        width: 640px;
        height: 960px;
        margin-right: 271px!important;
        padding-left: 1.5rem;
        padding-right: 1.5rem;        
        h1{
          font-size: 1.85rem;
          line-height: 2.5rem;
          text-transform: uppercase;
        }
        div.price{
          .text-h1{
            font-size: 24px; 
          }          
          font-size: 24px;
          div{
            span{
              font-size: 24px;
            }
          }            
        }            
      }
    }
  }      
}
@media (max-width: 1920px) {
  #product{
    .container{
      .details-section{
        width: 461px;
        height: 691px;
        margin-right: 232px!important;
        padding-left: 1.5rem;
        padding-right: 1.5rem;        
        h1{
          font-size: 1.2rem;
          line-height: 1.5rem;
          text-transform: uppercase;
        }
        div.price{
          .text-h1{
            font-size: 18px; 
          }          
          font-size: 18px;
          div{
            span{
              font-size: 18px;
            }
          }            
        }            
      }
    }
  }    
}
@media (max-width: 1440px) {
  #product{
    .container{
      .details-section{
        width: 360px;
        height: 540px;
        margin-right: 180px!important;
        padding-left: 1.5rem;
        padding-right: 1.5rem;        
        h1{
          font-size: 1rem;
          line-height: 1.5rem;
          text-transform: uppercase;
        }
        div.price{
          .text-h1{
            font-size: 12px; 
          }          
          font-size: 12px;
          div{
            span{
              font-size: 12px;
            }
          }            
        }           
      }
    }
  }  
}
@media (max-width: 1024px) {
  #product{
    .container{
      .details-section{
        width: 341px;
        height: 511.5px;
        margin-right: 40px!important;
        padding-left: 1.5rem;
        padding-right: 1.5rem;        
        h1{
          font-size: 1rem;
          line-height: 1.5rem;
          text-transform: uppercase;
        }
        div.price{
          .text-h1{
            font-size: 12px; 
          }          
          font-size: 12px;
          div{
            span{
              font-size: 12px;
            }
          }            
        }           
      }
    }
  }      
}
@media (max-width: 768px) {
 .details-section  h1 {
    font-size: 1rem;
    line-height: 2rem;
  }   
  .details-section.md\:px-10{
    padding-left: 1.5rem;
    padding-right: 1.5rem;    
  }
  .details-section.md\:w-2\/5 {
    width: 42%;
  }
  .details-section .text-h1 {
    font-size: 1rem;
  }
  .details-section .pb-5 {
    padding-bottom: .25rem;
  }
}
@media (min-width: 576px) {

  .m_item{
    display: none;
  }
  .ds_item{
    display: block;
  }
  .details-section{
      position: absolute;
      top: 0px;
      right: 0px;
      background: #FFF;
      /* margin: 64px; */
      margin-top: 0px;
      margin-right: 64px;
      height: 100%;
  }
  .bg-grey-lightest{
      position: relative;
  }

}

@media (max-width: 576px) {
  
  .ds_item{
    display: none;
  }
  
  .brd_out{
    display: none!important;
  }

  .mob_headline{
    width:80%;
    float:left;
    padding-top: 15px;
   
  }
  .mob_headline h1{
    font-size:14px;
    color:#000;
    line-height: 16px;
    font-weight: bold;
    padding-bottom: 5px;
    font-family: sans-serif;
  }
  div.mob_size_box_label span.font-bold{
     font-weight: 300;
  }
  .mob_headline .sku_txt{
    font-size:12px;
    color:#7c7c7c;
    line-height: 14px;
  }
  .mob_price{
    width:20%;
    float:left;
    padding-top: 15px;
    text-align: right;
  }
  .mob_price .text-h1{ border:0px; }

  .mob_price .mob_p, .mob_price div{
    font-size:14px;
    line-height: 18px;
  }
  .mob_price .mob_p span{
    width:100%;
    float: left;
  }
  .mob_p .text-h2{
    font-size:14px;
    line-height: 18px;
  }
  .mob_pro_varients{
    display: inline-block;
    width:100%;
  }
  .mob_headline_out{
    display: inline-block;
    width:100%;
  }
  
  .mob_size_box .mob_size_box_label{
    padding: 5px 0px;
    margin: 0px;
    font-size: 12px;
  }
  .mob_size_box .size_link{
    width:100%;
    display: none;

  }

  .mob_size_box {
        float: right;
        width: 50%;
  }

  .mob_crt_button_out{
    display: inline-block;
    width: 108%;
    background: #fff;
    padding: 10px 0px;
    position: relative;
    left: -5%;
  } 
  .mob_add_cart_btn{
    float: left;
    width: 80%;
    padding: 0 5% 0px 10%;
  }

  .mob_add_wish_btn{
     float: left;
    width: 20%;
    text-align: left;
  }

  .mob_add_cart_btn button{
    background: #000;
    color: #ffffff;

  }
  .mob_add_wish_btn .wishlist-bx{
    background: #ffffff;
    border:1px solid #bfbfbf;
    width: 48px;
    height:48px;
    display: inline-block;
    text-align: center;
  }
  .mob_add_wish_btn .wishlist-bx span{
    display: none;
  }
  
  .mob_pro_varients .mob_size_box .size-selector{
    height: 20px;
    min-width: 40px;
    line-height: 20px;
    float: left;
    border: 1px solid #909090;
  }
  .mob_pro_varients .mob_size_box .size-selector.active{
    background: #000000;
    color: #FFFFFF;
  }
  .mob_pro_varients .mob_size_box .leg_length .generic-selector{
    height: 20px;
    min-width: 40px;
    line-height: 20px;
    float: left;
    border: 1px solid #909090;
    margin-right: 0.75rem;
  }
  .mob_pro_varients .mob_size_box .leg_length .generic-selector.active{
    background: #000000;
    color: #FFFFFF;
  }
  .mob_pro_varients .mob_size_box .color{ 
    width:30px;
    height:30px;
  }

  .mob_size_box.only-single-item{
      float: left;
      width:100%;
  }

  .mob_p_cart_list{
    padding-top: 20px;
  }


/* Colour swatch css */
  .color {
    width: 40px;
    height: 40px;

    &.active {
      @apply border-black opacity-100;
      border: 2px solid #222;
    }

    &.out-of-stock {
       background: #c5c5c5;
    }
  }

  .color-inside {
    width: 30px;
    height: 30px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
  }
  div.clr_img_inner img{
    border-radius: 20px;
  }


@media (max-width: 576px) {

  .mobile_filter h5.Accordion__trigger{
    color:#000;
    font-size:18px;
    font-weight: 600;
  }


}

}

</style>
