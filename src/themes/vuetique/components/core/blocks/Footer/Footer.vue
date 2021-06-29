<template>
  <footer :class="{ 'border-top border-secondary': isCheckoutPage }">
    <div class="container-fluid news-letter" >
              <Newsletter />
    </div> 
    <div
      class="flex pt-8 pb-auto sm:pb-8 lg:pb-10 bg-grey-lighter mt-5 footer-part"
      v-if="!isCheckoutPage"
    >
      <div class="container footer-container device-only">
        <div class="">
            <Accordion class="md:hidden accordion" :openType=false :title="$t('help')">              
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
                            <router-link :to="localizedRoute('/privacy-centre')" class="menu-link footer-nav">
                              {{ $t('Privacy Centre') }}
                            </router-link>                           
                        </div>
                        <div class="my-3" >
                            <router-link :to="localizedRoute('/inspiration/pages/covid-19/')" class="menu-link footer-nav">
                              {{ $t('COVID-19 Updates') }}
                            </router-link>                         
                        </div>                           
            </Accordion>

            <Accordion class="md:hidden accordion" :openType=false :title="$t('Quick Links')">
                <div class="my-3" >
                    <router-link :to="localizedRoute('/i/about-us')" class="menu-link footer-nav">
                      {{ $t('About Us') }}
                    </router-link>                  
                </div>
                <div class="my-3" >
                    <router-link :to="localizedRoute('#')" class="menu-link footer-nav">
                      {{ $t('Partnerships') }}
                    </router-link>                  
                </div>
                <div class="my-3" >
                    <router-link :to="localizedRoute('/gift-card')" class="menu-link footer-nav">
                      {{ $t('Gift Card') }}
                    </router-link>                  
                </div>
                <div class="my-3" >
                    <router-link :to="localizedRoute('/reviews')" class="menu-link footer-nav">
                      {{ $t('Reviews') }}
                    </router-link>                  
                </div>
                <div class="my-3" >
                    <router-link :to="localizedRoute('/students')" class="menu-link footer-nav">
                      {{ $t('Students') }}
                    </router-link>                  
                </div>
            </Accordion>  
            <Accordion class="md:hidden accordion" :openType=false :title="$t('Join in on the chit chat')">
            <div class="flex justify-start lg:justify-start social-footer mt-6 app-share-div">
              <a
                target="_blank"
                rel="nofollow"
                class="social-icon mr-1 rounded-full new_footer_icons"
                href="https://www.facebook.com/iclothingie"
                :aria-label="$t('Go to Facebook')"
              >
                <!-- <img src="/assets/icons/social-f.svg" alt=""> -->
                <!-- <i class="fab fa-facebook-f"></i> -->
            		<i class="sprite sprite-facebookicon"></i>
              </a>
              <a
                target="_blank"
                rel="nofollow"
                class="social-icon mx-1 rounded-full new_footer_icons"
                href="https://www.instagram.com/iclothing"
                :aria-label="$t('Go to Instagram')"
              >
                <!-- <img src="/assets/icons/social-i.svg" alt=""> -->
                <!-- <i class="fab fa-instagram"></i> -->
                <i class="sprite sprite-instaicon"></i>
              </a>
               <a
                target="_blank"
                rel="nofollow"
                class="social-icon mx-1 rounded-full new_footer_icons"
                href="https://www.youtube.com/user/iclothingie"
                :aria-label="$t('Go to Youtube')"
              >
                <!-- <img src="/assets/icons/social-y.svg" alt=""> -->
                <!-- <i class="fab fa-youtube"></i> -->
                <i class="sprite sprite-youtubeicon"></i>
              </a>
              <a
                target="_blank"
                rel="nofollow"
                class="social-icon mx-1 rounded-full new_footer_icons"
                href="https://www.pinterest.com/iclothing"
                :aria-label="$t('Go to Pinterest')"
              >
                <!-- <img src="/assets/icons/social-p.svg" alt=""> -->
                <!-- <i class="fab fa-pinterest-p"></i> -->
                <i class="sprite sprite-pinteresticon"></i>
              </a> 
              <a
                target="_blank"
                rel="nofollow"
                class="social-icon mx-1 rounded-full new_footer_icons"
                href="https://twitter.com/iclothing"
                :aria-label="$t('Go to Twitter')"
              >
                <!-- <i class="fab fa-twitter"></i> -->
                <i class="sprite sprite-twittericon"></i>
              </a>
            </div> 
            </Accordion>   
            <Accordion class="md:hidden accordion" :openType=false :title="$t('Download our app')">
            <div class="flex justify-start lg:justify-start social-footer mt-6 app-share-div">
              <a
                target="_blank"
                rel="nofollow"
                class="social-icon mr-1 rounded-full new_footer_icons"
                href="https://www.facebook.com/"
                :aria-label="$t('Go to Facebook')"
              >
                <!-- <img src="/assets/icons/social-f.svg" alt=""> -->
                <!-- <i class="fab fa-android"></i> -->
                <i class="sprite sprite-androidcon"></i>
              </a>

               <a
                target="_blank"
                rel="nofollow"
                class="social-icon mr-1 rounded-full new_footer_icons"
                href="https://www.facebook.com/"
                :aria-label="$t('Go to Facebook')"
              >
                <!-- <img src="/assets/icons/social-f.svg" alt=""> -->
                <!-- <i class="fab fa-apple"></i> -->
                <i class="sprite sprite-applecon"></i>
              </a>
    
            </div> 
            </Accordion>                                   
        </div>
      </div>  
      <div class="container footer-container web-only">        
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
                        <!-- <a href="https://www.iclothing.com/privacy-centre/" aria-current="page" class="menu-link router-link-exact-active router-link-active">
                            {{ $t('Privacy Centre') }}
                        </a>                            -->                        
                        <router-link :to="localizedRoute('/privacy-centre')" class="menu-link footer-nav">
                          {{ $t('Privacy Centre') }}
                        </router-link>                           
                    </div>
                    <div class="my-3" >
                        <router-link :to="localizedRoute('/inspiration/pages/covid-19/')" class="menu-link footer-nav">
                          {{ $t('COVID-19 Updates') }}
                        </router-link>                         
                    </div>                                        
                </div>
                <cms-block :identifier="'footer_quick_links_block_new'" style="margin-top:-40px;" />
          </div>

          <div class="col-12 md:col-4  lg:col-3 flex flex-col footer-app-dwld-div">
            <div class="">
              <!-- <Newsletter /> --> 
              <h3> Join in on the chit chat </h3>
            </div>

            <div class="flex justify-start lg:justify-start social-footer mt-6 app-share-div">
              <a
                target="_blank"
                rel="nofollow"
                class="social-icon mr-1 rounded-full new_footer_icons"
                href="https://www.facebook.com/iclothingie"
                :aria-label="$t('Go to Facebook')"
              >
                <!-- <img src="/assets/icons/social-f.svg" alt=""> -->
                <!-- <i class="fab fa-facebook-f"></i> -->
		            <i class="sprite sprite-facebookicon"></i>
              </a>
              <a
                target="_blank"
                rel="nofollow"
                class="social-icon mx-1 rounded-full new_footer_icons"
                href="https://www.instagram.com/iclothing"
                :aria-label="$t('Go to Instagram')"
              >
                <!-- <img src="/assets/icons/social-i.svg" alt=""> -->
                <!-- <i class="fab fa-instagram"></i> -->
                <i class="sprite sprite-instaicon"></i>              
              </a>
               <a
                target="_blank"
                rel="nofollow"
                class="social-icon mx-1 rounded-full new_footer_icons"
                href="https://www.youtube.com/user/iclothingie"
                :aria-label="$t('Go to Youtube')"
              >
                <!-- <img src="/assets/icons/social-y.svg" alt=""> -->
                <!-- <i class="fab fa-youtube"></i> -->
                <i class="sprite sprite-youtubeicon"></i>
                 
              </a>
              <a
                target="_blank"
                rel="nofollow"
                class="social-icon mx-1 rounded-full new_footer_icons"
                href="https://www.pinterest.com/iclothing"
                :aria-label="$t('Go to Pinterest')"
              >
                <!-- <img src="/assets/icons/social-p.svg" alt=""> -->
                <!-- <i class="fab fa-pinterest-p"></i> -->
                <i class="sprite sprite-pinteresticon"></i>
            
              </a> 
              <a
                target="_blank"
                rel="nofollow"
                class="social-icon mx-1 rounded-full new_footer_icons"
                href="https://twitter.com/iclothing"
                :aria-label="$t('Go to Twitter')"
              >
                <!-- <i class="fab fa-twitter"></i> -->
                <i class="sprite sprite-twittericon"></i>                
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
                rel="nofollow"
                class="social-icon mr-1 rounded-full new_footer_icons"
                href="https://www.facebook.com/"
                :aria-label="$t('Go to Facebook')"
              >
                <!-- <img src="/assets/icons/social-f.svg" alt=""> -->
                <!-- <i class="fab fa-android"></i> -->
                <i class="sprite sprite-androidcon"></i>                
              </a>

               <a
                target="_blank"
                rel="nofollow"
                class="social-icon mr-1 rounded-full new_footer_icons"
                href="https://www.facebook.com/"
                :aria-label="$t('Go to Facebook')"
              >
                <!-- <img src="/assets/icons/social-f.svg" alt=""> -->
                <!-- <i class="fab fa-apple"></i> -->
                <i class="sprite sprite-applecon"></i>                     
              </a>
    
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="container mx-auto">
        <div class="row items-center justify-between py-6">    
          <!-- TrustBox widget - Micro Star -->
          <div class="trustpilot-widget" data-locale="en-GB" data-template-id="5419b732fbfb950b10de65e5" data-businessunit-id="58adae0b0000ff00059d2b0a" data-style-height="24px" data-style-width="100%" data-theme="light">
            <a href="https://uk.trustpilot.com/review/iclothing.com" target="_blank" rel="nofollow">Trustpilot</a>
          </div>
          <!-- End TrustBox widget -->
        </div>
      </div>
    <div class="container mx-auto">
      <div class="row items-center justify-between py-6">
        <div class="col-12 md:col-6 flex mb-8 md:mb-0">
          <span class="menu-link text-sm">© {{ currentYear }} ABJB Ltd. Trading As iCLOTHING All Rights Reserved. Registered with the CRO in Ireland: C482932</span>
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

.sprite {
    background-image: url(/assets/social_sprite_new.png);
    background-repeat: no-repeat;
    display: block;
    width: 35px;
    height: 35px; 
    background-size: 335px; 
}

.sprite-facebookicon {
    background-position: -7px -3px;
}
.sprite-instaicon{
    background-position: -54px -3px;
}
.sprite-youtubeicon{
    background-position: -101px -3px;
}
.sprite-pinteresticon{
    background-position: -148px -3px;
}
.sprite-twittericon{
    background-position: -195px -3px;
}
.sprite-androidcon{
    background-position: -246px -3px;
}
.sprite-applecon{
    background-position: -293px -3px;
}
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
    margin-top: 125px;
}

.footer-menu {
  .menu-link {
    @apply text-base font-light text-grey-dark;
    -webkit-font-smoothing: antialiased;
  }
}
.new_footer_icons {
      /* width: 25px; */
    /* height: 25px; */
    line-height: 26px;
    margin-right: 5px;
    /* background-color: #282828; */
    color: #FFF;
    border-radius: 25px;
    border: 1px solid;
    /* border-color: #282828; */
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
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 12px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
  border-bottom: 1px solid #d6d6d6;
}

.active, .accordion:hover {
  background-color: #f7f7f7; 
}
.panel {
  padding: 0 18px;
  display: none;
  background-color: white;
  overflow: hidden;
}
.device-only{
  display:none;
}
.web-only{
  display:block;
}
button.accordion:after {
  position: absolute;
  content: ">";
  top: 0;
  right: -36px;
  width: 0;
  height: 0;
  display: inline-block;
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
  border-left: 18px solid #2399e5;
  border-right: 18px solid transparent;
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
@media (max-width: 576px) {
  .device-only{
    display:block;
    padding-right: 0rem;
    padding-left: 0rem;
  }
  .web-only{
    display:none;
  }
  .footer-part{
    padding-top: 0rem !important;
    margin-top: 0rem !important;
  }  
}
@media (max-width: 425px) {
  footer .pb-8{    
    padding-top: 0rem !important;
  }
  footer .pb-8 .container .row .mt-8{
    padding-top: 0rem !important;
  }
}
.Accordion .Accordion__trigger{
  padding-top: 0rem;
  padding-bottom: 0rem;
  font-weight: 500;
  text-transform: capitalize;
}
</style>
<style>
.footer-container.device-only .Accordion .Accordion__trigger{
  padding-top: 0rem;
  padding-bottom: 0rem;
  font-weight: 500;
  text-transform: capitalize;
}
</style>