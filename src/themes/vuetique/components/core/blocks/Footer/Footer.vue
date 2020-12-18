<template>
  <footer :class="{ 'border-top border-secondary': isCheckoutPage }">
    <div class="container-fluid news-letter" >
              <Newsletter />
    </div> 
    <div
      class="flex pt-8 pb-auto sm:pb-8 lg:pb-10 bg-grey-lighter mt-5"
      v-if="!isCheckoutPage"
    >
      <div class="container">
        <div class="row justify-center md:justify-between">

           <div class="footer-menu sm:flex col-12 md:col-6 lg:col-6 justify-around mt-8 lg:mt-0">
                <!-- <cms-block :identifier="'footer_help_block_new'"  style="margin-top:-40px;"/> -->
                <div>
                    <h3 >
                        Help
                    </h3>
                    <div class="my-3" >
                        <router-link :to="localizedRoute('/my-account')" class="menu-link footer-nav">
                          {{ $t('My Account') }}
                        </router-link>                           
                    </div>
                    <div class="my-3" >
                        <router-link :to="localizedRoute('/help-faq')" class="menu-link footer-nav">
                          {{ $t('FAQ’s') }}
                        </router-link>                        
                    </div>
                    <div class="my-3" >
                        <router-link :to="localizedRoute('/help-faq')" class="menu-link footer-nav">
                          {{ $t('Help Centre') }}
                        </router-link>                        
                    </div>
                    <div class="my-3" >
                        <router-link :to="localizedRoute('/delivery-returns')" class="menu-link footer-nav">
                          {{ $t('Delivery and Returns') }}
                        </router-link>                         
                    </div>
                    <div class="my-3" >
                        <a href="https://www.iclothing.com/privacy-centre/" aria-current="page" class="menu-link router-link-exact-active router-link-active">
                            {{ $t('Privacy Centre') }}
                        </a>                           
                    </div>
                    <div class="my-3" >
                        <router-link :to="localizedRoute('/inspiration/pages/covid-19/')" class="menu-link footer-nav">
                          {{ $t('COVID-19 Updates') }}
                        </router-link>                         
                    </div>                                        
                </div>
                <cms-block :identifier="'footer_quick_links_block_new'" style="margin-top:-40px;" />
          </div>
      
          <!-- <div class="footer-menu sm:flex col-12 lg:col-9 justify-around mt-8 lg:mt-0">
            <div class="hidden md:block">
              <h3>
                {{ $t('Shop') }}
              </h3>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/c/women')" exact>
                  {{ $t('Women fashion') }}
                </router-link>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/c/men')" exact>
                  {{ $t("Men's fashion") }}
                </router-link>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/')" exact>
                  {{ $t('Kidswear') }}
                </router-link>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/')" exact>
                  {{ $t('Home') }}
                </router-link>
              </div>
            </div>
            <Accordion class="md:hidden" :title="$t('Shop')">
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/c/women')" exact>
                  {{ $t('Women fashion') }}
                </router-link>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/c/men-11')" exact>
                  {{ $t("Men's fashion") }}
                </router-link>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/')" exact>
                  {{ $t('Kidswear') }}
                </router-link>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/')" exact>
                  {{ $t('Home') }}
                </router-link>
              </div>
            </Accordion>
            <div class="hidden md:block">
              <h3>
                {{ $t('Orders') }}
              </h3>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/order-tracking')" exact>
                  {{ $t('Track my order') }}
                </router-link>
              </div>
              <div class="my-3">
                <a href="#" class="menu-link" @click.prevent="goToAccount">{{ $t('My account') }}</a>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/delivery')" exact>
                  {{ $t('Delivery') }}
                </router-link>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/returns')" exact>
                  {{ $t('Return policy') }}
                </router-link>
              </div>
            </div>
            <Accordion class="md:hidden" :title="$t('Orders')">
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/order-tracking')" exact>
                  {{ $t('Track my order') }}
                </router-link>
              </div>
              <div class="my-3">
                <a href="#" class="menu-link" @click.prevent="goToAccount">{{ $t('My account') }}</a>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/delivery')" exact>
                  {{ $t('Delivery') }}
                </router-link>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/returns')" exact>
                  {{ $t('Return policy') }}
                </router-link>
              </div>
            </Accordion>
            <div class="hidden md:block">
              <h3>
                {{ $t('Help') }}
              </h3>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/customer-service')" exact>
                  {{ $t('Customer service') }}
                </router-link>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/size-guide')" exact>
                  {{ $t('Size guide') }}
                </router-link>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/contact')" exact>
                  {{ $t('Contact us') }}
                </router-link>
              </div>
            </div>
            <Accordion class="md:hidden" :title="$t('Help')">
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/customer-service')" exact>
                  {{ $t('Customer service') }}
                </router-link>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/size-guide')" exact>
                  {{ $t('Size guide') }}
                </router-link>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/contact')" exact>
                  {{ $t('Contact us') }}
                </router-link>
              </div>
            </Accordion>
            <div class="hidden md:block">
              <h3>
                {{ $t('About us') }}
              </h3>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/i/about-magento-demo-store')" exact>
                  {{ $t('About us (Magento CMS)') }}
                </router-link>
              </div>     
               <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/i/customer-service')" exact>
                  {{ $t('Customer service (Magento CMS)') }}
                </router-link>
              </div>             
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/store-locator')" exact>
                  {{ $t('Store locator') }}
                </router-link>
              </div>
            </div>
            <Accordion class="md:hidden" :title="$t('About us')">
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/about-us')" exact>
                  {{ $t('About us') }}
                </router-link>
              </div>
              <div class="my-3">
                <router-link class="menu-link" :to="localizedRoute('/store-locator')" exact>
                  {{ $t('Store locator') }}
                </router-link>
              </div>
            </Accordion>
          </div> -->

          <div class="col-12 md:col-4  lg:col-3 flex flex-col footer-app-dwld-div">
            <div class="">
              <!-- <Newsletter /> --> 
              <h3> Join in on the chit chat </h3>
            </div>

            <div class="flex justify-start lg:justify-start social-footer mt-6 app-share-div">
              <a
                target="_blank"
                rel="noopener"
                class="social-icon mr-1 rounded-full new_footer_icons"
                href="https://www.facebook.com/iclothingie"
                :aria-label="$t('Go to Facebook')"
              >
                <!-- <img src="/assets/icons/social-f.svg" alt=""> -->
                <i class="fab fa-facebook-f"></i>
              </a>
              <a
                target="_blank"
                rel="noopener"
                class="social-icon mx-1 rounded-full new_footer_icons"
                href="https://www.instagram.com/iclothing"
                :aria-label="$t('Go to Instagram')"
              >
                <!-- <img src="/assets/icons/social-i.svg" alt=""> -->
                <i class="fab fa-instagram"></i>
              </a>
               <a
                target="_blank"
                rel="noopener"
                class="social-icon mx-1 rounded-full new_footer_icons"
                href="https://www.youtube.com/user/iclothingie"
                :aria-label="$t('Go to Youtube')"
              >
                <!-- <img src="/assets/icons/social-y.svg" alt=""> -->
                <i class="fab fa-youtube"></i>
              </a>
              <a
                target="_blank"
                rel="noopener"
                class="social-icon mx-1 rounded-full new_footer_icons"
                href="https://www.pinterest.com/iclothing"
                :aria-label="$t('Go to Pinterest')"
              >
                <!-- <img src="/assets/icons/social-p.svg" alt=""> -->
                <i class="fab fa-pinterest-p"></i>
              </a> 
              <a
                target="_blank"
                rel="noopener"
                class="social-icon mx-1 rounded-full new_footer_icons"
                href="https://twitter.com/iclothing"
                :aria-label="$t('Go to Twitter')"
              >
                <i class="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <div class="col-12 md:col-2  lg:col-3 flex flex-col footer-app-dwld-div">
            <div class="">
              <h3> Download our app</h3>
            </div>

            <div class="flex justify-start lg:justify-start social-footer mt-6 app-share-div">
              <a
                target="_blank"
                rel="noopener"
                class="social-icon mr-1 rounded-full new_footer_icons"
                href="https://www.facebook.com/"
                :aria-label="$t('Go to Facebook')"
              >
                <!-- <img src="/assets/icons/social-f.svg" alt=""> -->
                <i class="fab fa-android"></i>
              </a>

               <a
                target="_blank"
                rel="noopener"
                class="social-icon mr-1 rounded-full new_footer_icons"
                href="https://www.facebook.com/"
                :aria-label="$t('Go to Facebook')"
              >
                <!-- <img src="/assets/icons/social-f.svg" alt=""> -->
                <i class="fab fa-apple"></i>
              </a>
    
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto">
      <div class="row items-center justify-between py-6">
        <div class="col-12 md:col-6 flex mb-8 md:mb-0">
          <span class="menu-link text-sm">© {{ currentYear }} ABJB Ltd. Trading As iCLOTHING All Rights Reserved. Registered with the CRO in Ireland: C482932</span>

          <!-- <router-link class="menu-link ml-8 text-sm text-grey-dark" :to="localizedRoute('/terms')" exact>
            {{ $t('Terms') }}
          </router-link>

          <router-link class="menu-link ml-8 text-sm text-grey-dark" :to="localizedRoute('/privacy')" exact>
            {{ $t('Privacy') }}
          </router-link> -->
        </div>

        <div class="col-12 md:col-6 flex md:justify-end">
          <div class="footer-pay-item">
            <img src="/assets/icons/pay-visa.png" alt="">
          </div>
          <div class="footer-pay-item">
            <img src="/assets/icons/pay-master-card.png" alt="">
          </div>
          <div class="footer-pay-item">
            <img src="/assets/icons/pay-amex.png" alt="">
          </div>
          <div class="footer-pay-item">
            <img src="/assets/icons/pay-disc.png" alt="">
          </div>
          <div class="footer-pay-item">
            <img src="/assets/icons/pay-paypal.png" alt="">
          </div>
        </div>
      </div>
    </div>

    <!--
    <div class="container mx-auto">
      <div class="flex items-center px-4 bottom-links">
        <div class="w-2/5 sm:w-1/4 cl-tertiary">
          <language-switcher v-if="multistoreEnabled" />
        </div>
        <div class="w-auto sm:w-3/4 flex justify-end">
          <ul class="pl-0 links" data-testid="bottomLinks">
            <li class="inline-flex">
              <router-link
                class="cl-tertiary mr-3 underline"
                to="/legal"
                exact
              >
                {{ $t('Legal notice') }}
              </router-link>
            </li>
            <li class="inline-flex">
              <router-link
                class="cl-tertiary underline"
                to="/privacy"
                exact
              >
                {{ $t('Privacy policy') }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    -->
  </footer>
</template>

<script>
import { AccountButton } from '@vue-storefront/core/modules/user/components/AccountButton'

import CurrentPage from 'theme/mixins/currentPage'
import LanguageSwitcher from '../../LanguageSwitcher.vue'
import Newsletter from 'theme/components/core/blocks/Footer/Newsletter'

import CmsBlock from '../Cms/Block'
import Accordion from 'theme/components/theme/Accordion'

export default {
  mixins: [CurrentPage, AccountButton],
  name: 'MainFooter',
  computed: {
    multistoreEnabled () {
      return this.$store.state.config.storeViews.multistore
    },
    currentYear () {
      return (new Date()).getFullYear()
    }
  },
  components: {
    Newsletter,
    LanguageSwitcher,
    Accordion,
    CmsBlock
  }
}
</script>

<style lang="scss" scoped>

.icon {
  transition: 0.3s all;
}

.social-icon {
  width: 40px;
  height: 40px;

}
.footer-pay-item {
  background: #f6f5f5;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 30px;
  text-align: center;
  margin: 0 2.5px;
}

.news-letter {
    color: white; min-height: auto; height: 155px;
    padding-top: 30px;
    padding-bottom: 40px;
    background: #000;
}

.footer-menu {
  .menu-link {
    @apply text-base font-light text-grey-dark;
    -webkit-font-smoothing: antialiased;
  }
}

@media (max-width: 767px) {
    .app-share-div {
        -ms-flex-pack: start;
        justify-content: start;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
 }

 @media screen and (min-width: 728px) and (max-width: 1023px) {
    .footer-app-dwld-div{
          margin-top: 2rem;
    }

}

.new_footer_icons {
      /* width: 25px; */
    /* height: 25px; */
    line-height: 26px;
    margin-right: 5px;
    background-color: #282828;
    color: #FFF;
    border-radius: 25px;
    border: 1px solid;
    border-color: #282828;
    display: inline-block;
    vertical-align: top;
    width: 35px;
    height: 35px;
    line-height: 30px;
    text-align: center;
    float: left;
    margin: 0 10px 5px 0;
    -moz-transition: all 500ms ease;
    -webkit-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
    -moz-backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid;
    padding-top: 1px;
}


</style>
