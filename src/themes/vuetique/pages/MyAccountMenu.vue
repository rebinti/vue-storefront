<template>
  <div class="mb-5">
      <div class="login_profile_pic">
          <img src="/assets/vuetique-small-banners-4.jpg" alt="" />

          <div class="log_text">
            <span class="top_txt">Hi,</span>
            <span class="top_txt mn_hd">{{ currentUser.firstname }} {{ currentUser.lastname }}</span>
          </div>
      </div> 
    <ul class=" sidebar-myacc-mobile w-full mn_ul_bg">
      <!-- <li class="border-b flex" v-if="isUserInAccountsPageFlag">
          <router-link
            class="menu-link"
            :to="localizedRoute('/')"
          >
           <i class="fas fa-box"></i>
            {{ $t('Home Page') }}
          <svg data-v-24315a35="" viewBox="0 0 25 25" class="vt-icon--sm"><use data-v-24315a35="" xlink:href="#right"></use></svg>
        </router-link>
      </li> -->
      <li
        class="border-b flex"
        :key="link.id"
        v-for="link in myAccountLinks"
        @click="notify(link.name)"
      >
        <router-link
          class="menu-link"
          :to="localizedRoute(link.url)"
        >
        <i :class="link.icon"></i>
          {{ link.name }}
        <svg data-v-24315a35="" viewBox="0 0 25 25" class="vt-icon--sm"><use data-v-24315a35="" xlink:href="#right"></use></svg>
        </router-link>
      </li>
      <li class="border-b flex">
        <a href="#" class="menu-link" @click.prevent="logout">
          <i class="fas fa-sign-out-alt"></i>
          {{ $t('Logout') }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import i18n from '@vue-storefront/i18n'
import MyProfile from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyProfile'

import config from 'config'
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'

export default {
  name: 'MyAccountMenu',
  mixins: [MyProfile],
  data () {
    return {
      myAccountLinks: [
        {
          id: 1,
          name: i18n.t('My profile'),
          url: '/my-account',
          icon: 'fas fa-user-alt'
        },
        {
          id: 2,
          name: i18n.t('My shipping details'),
          url: '/my-account/shipping-details',
          icon: 'fas fa-shipping-fast'
        },
        {
          id: 3,
          name: i18n.t('My newsletter'),
          url: '/my-account/newsletter',
          icon: 'fas fa-newspaper'
        },
        {
          id: 4,
          name: i18n.t('My orders'),
          url: '/my-account/orders',
          icon: 'fas fa-box'
        },
        // {
        //   id: 5,
        //   name: i18n.t('My loyalty card'),
        //   url: '#',
        //   icon: 'fas fa-gift'
        // },
        // {
        //   id: 6,
        //   name: i18n.t('My product reviews'),
        //   url: '#',
        //   icon: 'fas fa-star-half-alt'
        // },
        {
          id: 7,
          name: i18n.t('My Recently viewed products'),
          url: '/my-account/recently-viewed',
          icon: 'fas fa-star-half-alt'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      isUserInAccountsPageFlag: state => state.ui.isUserInAccountsPage
    })
  },
  methods: {
    logout () {
      // this.$bus.$emit('user-before-logout')
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        item: {},
        message: i18n.t('Are you sure you want to sign out?'),
        action2: { label: i18n.t('OK'), action: this.logutFromAll},
        action1: { label: i18n.t('Cancel'), action: 'close' },
        hasNoTimeout: true
      })
    },
    logutFromAll () {
      this.$store.dispatch('notification/removeNotification')
      this.$bus.$emit('user-before-logout');
      this.$store.dispatch('wishlist/clear')
      if (this.$store.state.boards) {
        this.$store.dispatch('boards/clear')
      }
      this.$router.push(this.localizedRoute('/'))
    },
    notify (title) {
      if (title === 'My loyalty card' || title === 'My product reviews') {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t('This feature is not implemented yet! Please take a look at https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!'),
          action1: { label: i18n.t('OK') }
        })
      }
    },
    categoryLink (category) {
      return formatCategoryLink(category)
    }
  }
}
</script>
<style scoped>
  .sidebar-submenu {
    left: 0;
    top: 0;
    min-height: 100%;
    transform: translateX(-100%);
    margin-bottom: 100px;
    padding-bottom: 100px;
  }
 /* @media (max-width: 767px) { */
    /* .sidebar-submenu {
      left: 0;
      top: 0;
      min-height: 100%; */
      /* transform: translateX(-100%); */
      /*position:relative;*/
      /*overflow-y:scroll;*/
    /* } */
  /* } */
</style>

<style lang="scss" scoped>

// @media (max-width: 576px) {


    .menu-link{
      font-size: 15px;
      color: #000000;
      text-transform: capitalize;
      padding-top: 25px;
      padding-bottom: 25px;
      .svg-inline--fa{
        margin-right: 10px;
      }
    }


  .mn_ul_bg{
    background: #ffffff;
  }

  .login_profile_pic{
    display: inline-block;
    width:100%;
    position: relative;  
    // background: #ffffff;
    // margin-top:20px;
    img{
      width:100%;
      -webkit-border-radius: 50px 50px 0px 0px;
      -moz-border-radius: 50px 50px 0px 0px;
      border-radius: 50px 50px 0px 0px;
      float: left;
    } 
    .log_text{
      position: absolute;
      left:0px;
      bottom: 20px;
      width:100%;
      font-size:20px;
      color:#fff;
      padding: 0 10px;
      span{
         float: left;
         width:100%;
         font-weight: normal;
         margin-bottom: 5px;
         letter-spacing: 1.5px;
         &.mn_hd{
           font-weight: bold;
         }
      }
    }
  }



.menu-link {
    display: block;
    width: 100%;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
   font-size: 15px;
    font-weight: 500;
    background-color: #fbfbfb;
    color: #000000;
    text-transform: capitalize;
    padding-top: 25px;
    padding-bottom: 25px;
}


@media (min-width: 576px){

  .sidebar-menu__list{
      margin-bottom: 60px;
   }
.ico_main {
    float: left;
    margin-top: 1px;
    margin-right: 15px;
    width: 24px!important;
    height: auto!important;
  }
 .btn-list_menu{
    text-align: left;
    display: inline-block;
  }
.vt-icon--sm{ float: right; margin-top: 3px;  }

}


@media (max-width: 576px) {
  .sidebar-menu__list{
    margin-bottom: 60px;
  }
  .sidebar-menu{
    z-index: 100;
  }
 .menu_li_it{
    position: relative;
    text-transform: uppercase;
  }
.ico_main{
    font-size:35px;
    position: absolute;
    left: 15px;
    top: 28px;
  }
.btn-list_menu{
    text-align: left;
    display: inline-block;
  }
.vt-icon--sm{ float: right; margin-top: 3px;  }

}
  
</style>