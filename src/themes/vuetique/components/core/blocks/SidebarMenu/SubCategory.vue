<template>
  <div>
    <ul
      v-if="children"
      class="sidebar-submenu absolute w-full bg-white border-t"
      :style="styles"
    >
      <li
        class="border-b flex"
        v-if="parentSlug"
      >
        <router-link
          class="category-link"
          :to="localizedRoute({ name: 'category', params: { id: id, slug: parentSlug }})"
          data-testid="categoryLink"
        >
          {{ $t('View all') }}
        </router-link>
      </li>
      <li
        class="border-b flex"
        :key="link.slug"
        v-for="link in children"
      >
        <div v-if="isCurrentMenuShowed" class="w-full">
          <sub-btn
            :id="link.id"
            :name="link.name"
            v-if="link.children_count > 0"
          />
          <router-link
            v-else
            class="category-link"
            :to="localizedRoute({ name: 'category', params: { id: link.id, slug: link.slug }})"
          >
            {{ link.name }}
          </router-link>
        </div>
        <sub-category
          :category-links="link.children_data"
          :id="link.id"
          v-if="link.children_count > 0"
          :parent-slug="link.slug"
        />
      </li>
    </ul>
      
    <ul
     v-if="myAccountLinks && !path.length"
      class="sidebar-submenu fixed w-full mn_ul_bg"
      :style="styles"
    >
      <div class="login_profile_pic">
          <img src="/assets/vuetique-small-banners-4.jpg" alt="" />

          <div class="log_text">
            <span class="top_txt">Hi,</span>
            <span class="top_txt mn_hd">{{ currentUser.firstname }} {{ currentUser.lastname }}</span>
          </div>
      </div>
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
import SubBtn from './SubBtn.vue'
import i18n from '@vue-storefront/i18n'
import MyProfile from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyProfile'

export default {
  name: 'SubCategory',
  mixins: [MyProfile],
  components: {
    SubBtn
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    categoryLinks: {
      type: null,
      required: false,
      default: false
    },
    parentSlug: {
      type: String,
      required: false,
      default: ''
    },
    myAccountLinks: {
      type: null,
      required: false,
      default: false
    }
  },
  computed: {
    children () {
      if (!this.$store.state.config.entities.category.categoriesDynamicPrefetch && (this.categoryLinks && this.categoryLinks.length > 0 && this.categoryLinks[0].name)) { // we're using dynamic prefetching and getting just category.children_data.id from 1.7
        return this.categoryLinks
      } else {
        return this.$store.state.category.list.filter(c => { return c.parent_id === this.id }) // return my child categories
      }
    },
    ...mapState({
      submenu: state => state.ui.submenu,
      path: state => state.ui.submenu.path
    }),
    getSubmenu () {
      return this.submenu
    },
    styles () {
      const pos = this.submenu.path.indexOf(this.id)
      return pos !== -1 ? {
        zIndex: pos + 1
      } : false
    },
    isCurrentMenuShowed () {
      return this.getSubmenu && this.getSubmenu.depth && this.getSubmenu.path[this.getSubmenu.depth - 1] === this.id
    }
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
  }




</style>

<style lang="scss" scoped>

// @media (max-width: 576px) {

  .sidebar-menu{

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

  }

  .mn_ul_bg{
    background: #ffffff;
  }

  .login_profile_pic{
    display: inline-block;
    width:100%;
    position: relative;  
    background: #ffffff;
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
  
// }
</style>