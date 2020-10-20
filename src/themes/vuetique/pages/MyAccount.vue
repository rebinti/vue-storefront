<template>
  <div id="my_account" class="my_accnt_page_inner">
    <breadcrumbs
      :routes="[{name: 'Homepage', route_link: '/'}]"
      active-route="My Account"
    />

    <div class="my-account-subnav div-mobile-acc">
      <ul class="my-account-nav">
          <li class="MenuItemNewsletterPrefs">

            <router-link
                class="menu-link"
                :to="localizedRoute('/my-account-menu')"
                exact
              >
               <i class="material-icons">home</i>
             </router-link>

          </li>

          <li class="MenuItemMyAccount">

              <router-link
                class="menu-link"
                :to="localizedRoute('/my-account')"
                exact
              >
                <i class="material-icons">account_circle</i>
              </router-link>

          </li>
      
          <li class="MenuItemYourDetails">
              <router-link
                class="menu-link"
                :to="localizedRoute('/my-account/shipping-details')"
                exact
              >
                 <i class="material-icons">edit</i>
              </router-link>


          </li>
      
          <li class="MenuItemYourOrders">

                       <router-link
                class="menu-link"
                :to="localizedRoute('/my-account/newsletter')"
                exact
              >
                 <!-- <i class="material-icons">subtitles</i> -->
                 <img style="width: 26px;" src="/assets/icons/newsletter.png" alt="">
              </router-link>

          </li>
      
          <li class="MenuItemAddressBook">
                       <router-link
                class="menu-link"
                :to="localizedRoute('/my-account/orders')"
                exact
              >
                <!-- <i class="material-icons">account_box</i> -->
                <img style="width: 26px;" src="/assets/icons/order.png" alt="">
              </router-link>


          </li>
      
          <li class="MenuItemYourCards">

                       <router-link
                class="menu-link"
                :to="localizedRoute('/my-account/recently-viewed')"
                exact
              >
                <i class="material-icons">request_quote</i>
              </router-link>

          </li>
          
        </ul>
    </div>

    <header class="container mt-2 md: mt-10 mob-acc-header">
    <button
      class="inline-flex  px-5 py-4 pr-4 font-medium mob-back lg: hidden"
      type="button"
      style="float:left"
      @click="goBack()"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#left" />
      </svg>
    </button>

      <div >
          <h1 class="mob-head-button">{{ $t('My Account') }}</h1>
      </div>    
    </header>

    <div class="container pt-10 pb-16">
      <div class="row gutter-md justify-between">
        <div class="md:col-3 lg:col-2 mb-8 cn_it_inner">
          <nav class="static-menu serif h4 mb35">
            <ul class="border-t">
              <li class="border-b py-2" v-for="(page, index) in navigation" :key="index" @click="notify(page.title)">
                <router-link :to="localizedRoute(page.link)" class="nav-link">
                  {{ page.title }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-12 md:col-9">
          <component :is="this.$props.activeBlock" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyAccount from '@vue-storefront/core/pages/MyAccount'
import Breadcrumbs from '../components/core/Breadcrumbs'
import MyProfile from '../components/core/blocks/MyAccount/MyProfile'
import MyShippingDetails from '../components/core/blocks/MyAccount/MyShippingDetails'
import MyNewsletter from '../components/core/blocks/MyAccount/MyNewsletter'
import MyOrders from '../components/core/blocks/MyAccount/MyOrders'
import MyOrder from '../components/core/blocks/MyAccount/MyOrder'
import MyRecentlyViewed from '../components/core/blocks/MyAccount/MyRecentlyViewed'
import HamburgerIcon from 'theme/components/core/blocks/Header/HamburgerIcon'
import ReturnIcon from 'theme/components/core/blocks/Header/ReturnIcon'

export default {
  data () {
    return {
      navigation: [
        { title: this.$t('My profile'), link: '/my-account' },
        { title: this.$t('My shipping details'), link: '/my-account/shipping-details' },
        { title: this.$t('My newsletter'), link: '/my-account/newsletter' },
        { title: this.$t('My orders'), link: '/my-account/orders' },
        { title: this.$t('My loyalty card'), link: '#' },
        { title: this.$t('My product reviews'), link: '#' },
        { title: this.$t('My Recently viewed products'), link: '/my-account/recently-viewed' }
      ]
    }
  },
  components: {
    Breadcrumbs,
    MyProfile,
    MyShippingDetails,
    MyNewsletter,
    MyOrders,
    MyOrder,
    MyRecentlyViewed,
    HamburgerIcon,
    ReturnIcon
  },
  mixins: [MyAccount],
  computed: {
    ...mapState({
      submenu: state => state.ui.submenu,
      isUserInAccountsPageFlag: state => state.ui.isUserInAccountsPage

    })
  },
  mounted () {
    // console.log('mountedddd', this.submenu , window.innerWidth)
    if (window.innerWidth <= 1024) this.$store.commit('ui/setUserInAccountsPageFlag', true);
    // this.$store.commit('ui/setSubmenu', {
    //       id: '',
    //       depth: !this.submenu.depth ? ++this.submenu.depth : 1
    //     })
  },
  methods: {
    notify (title) {
      if (title === 'My loyalty card' || title === 'My product reviews') {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: this.$t('This feature is not implemented yet! Please take a look at https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!'),
          action1: { label: this.$t('OK') }
        })
      }
    },
    getaccmenu () {
        this.$store.commit('ui/setSubmenu', {
          id: '',
          depth: !this.submenu.depth ? ++this.submenu.depth : 1
        })
    } ,
    goBack()  {
       this.$router.push('/my-account-menu')
    }  
  },
  destroyed () {
   this.$store.commit('ui/setUserInAccountsPageFlag', false);
   this.$store.commit('ui/setSubmenu', {
          id: '',
          depth: --this.submenu.depth
        })
  }
}
</script>

<style lang="scss">
//@import '~theme/css/base/text';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-tertiary: color(tertiary);

.static-menu {
  .nav-link {
    @apply block text-black font-medium py-1;

    &:hover, &:focus {
      @apply text-primary2;
    }

    &.router-link-exact-active {
      @apply text-primary2;

      &::before {
        content: "\25B8";
        margin-right: 10px;
      }
    }
  }
}
.acc-main-title{
    width: 84%;
    float: left;
}
@media (max-width: 320px) {
  .my-account-nav li a img{
    margin-left: 13px;
  }
}
@media (max-width: 475px) {
  .my-account-nav li a img{
    margin-left: 17px;
  }
}
@media (max-width: 425px) {
  .my-account-nav li a img{
    margin-left: 23px;
  }
}
@media (min-width: 577px) {

  

}

@media (max-width: 576px) {

.my_accnt_page_inner{

    header{ display: none; }
    .bg-grey-lightest{ display: none; }
    .cn_it_inner{ display: none; }

  }
  .mob-acc-header {
    margin-top: 2rem;
  }


}

@media (max-width: 768px) {
  .mob-back {
    display: block !important;
  }
  .mob-head-button{
    margin-left: 2.5rem;
  }
  .mob-acc-header {
    margin-top: 2rem;
  }
  .my-account-nav li a img{
    margin-left: 51px;
  }
}

    .my-account-subnav {
        position: sticky;
        position: -webkit-sticky;
        top: 51px;
        left: 0;
        width: 100%;
        z-index: 11;
        background-color: #252525;
        height: 40px;
    }

    .my-account-nav {
        position: relative;
        max-width: 75em;
        margin-left: auto;
        margin-right: auto;
        list-style: none;
        height: 100%;
    }

    .my-account-nav li {
        display: inline-block;
        color: #D7D7D7;
        float: left;
        text-align: center;
        background-color: #000000;
        height: 100%;
        width: 16.6%;
        border-right: 1px solid #FFF;
    }

    .my-account-nav li a {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #ffffff;
        padding: 2em 0;
        display: block;
        height: 100%;
        position: relative;
        top: -23px;
    }
    .my-account-nav li.active{
      box-shadow: 1px 1px 1px 1px #888888;
    } 
    .my-account-nav li.active a {
      color: #FFFFFF;
      padding: 00;
   }

  .my-account-nav li a.router-link-active {
      color: #81ef93;
   }

   @media (max-width: 768px) {
    .div-mobile-acc{
       display: block;
    }
    .div-web-acc{
       display: none;
    }
}

@media screen and (min-width: 769px) and (max-width: 2560px) {
    .div-mobile-acc{
       display: none;
    }
    .div-web-acc{
       display: block;
    }
}

</style>
