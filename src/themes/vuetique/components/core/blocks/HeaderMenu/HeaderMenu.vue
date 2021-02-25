<template>
  <div v-if="!isCheckoutPage" class="hidden lg:block w-full border-b border-solid" style="background:#525050">
    <div class="container" style="padding-right: 0rem; padding-left: 0rem;">
      <ul class="flex menu">

      <li v-for="menu in headerMenuList" :key="menu.id" @mouseenter="activeSubMenu = menu.identifier"
           @mouseleave="activeSubMenu = null" v-if="headerMenuList.length && menu.active" :class="menu.className">
          <router-link class="menu-link"  @click.native="onMenuSubCategoryClick($event)" :class="{active: activeSubMenu == menu.identifier}"  :to="localizedRoute('/'+menu.className)" exact>{{ menu.title }}</router-link>
          <div v-if="activeSubMenu === menu.identifier"
            class="main-item row cms-block-menu container"
            @click="onMenuSubCategoryClick($event)"
            style="position: absolute;width: 100%;background: white;z-index: 999; left:0px; right:0px; padding-right: 0rem; padding-left: 0rem;">
             <div class="container">
              <div class="menu-list col-6">
                    <cms-block :identifier="menu.identifier" />
              </div>
             </div> 
          </div>
      </li> 

      <!-- <li
          class="relative"
          :key="category.slug"
          v-for="category in visibleCategories"
          :class="{'with-submenu': (category.children_data && category.children_data.length)}"
          @mouseenter="activeSubMenu = category.id"
          @mouseleave="activeSubMenu = null"
        >
          <button
            v-if="category.children_count > 0"
            class="menu-link"
            :class="{active: activeSubMenu == category.id}"
            type="button"
            :aria-label="$t('Show subcategories')"
            data-testid="categoryButton"
            @click="toggleSubMenu(category.id)"
          >{{ category.name }}</button>
          <router-link
            v-else
            class="menu-link"
            :to="localizedRoute({ name: 'category', params: { id: category.id, slug: category.slug }})"
          >{{ category.name }}</router-link>

          <sub-category
            v-if="activeSubMenu === category.id"
            :category-links="category.children_data"
            :id="category.id"
            :parent-slug="category.slug"
            :parent-path="category.url_path"
            class="left-0"
          />
        </li> -->

        <!-- <li>
          <router-link
            class="menu-link"
            :to="localizedRoute('/sale')"
            exact
          >
            {{ $t('Sale') }}
          </router-link>
        </li>

        <li>
          <router-link
            class="menu-link"
            :to="localizedRoute('/magazine')"
            exact
          >{{ $t('Magazine') }}</router-link>
        </li>

         <li>
          <router-link
            class="menu-link"
            :to="localizedRoute('/brands')"
            exact
          >{{ $t('Brands') }}
          </router-link>
        </li> -->

        <li>
          <router-link
            class="menu-link"
            :to="localizedRoute('/inspiration-landing')"
            exact
          >{{ $t('Inspiration') }}</router-link>
        </li>        
      </ul>
    </div>
  </div>
</template>

<script>
import config from 'config'
import { mapGetters, mapState } from "vuex";
import onEscapePress from "@vue-storefront/core/mixins/onEscapePress";
import SubCategory from "theme/components/core/blocks/HeaderMenu/SubCategory";
import CurrentPage from "theme/mixins/currentPage";
import CmsBlock from '../Cms/Block'
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'

export default {
  name: "HeaderMenu",
  components: {
    SubCategory,
    CmsBlock

  },
  mixins: [CurrentPage, onEscapePress, CmsBlock],
  data() {
    return {
      allCategories: [],
      activeSubMenu: null,
      headerMenuList:  config.cmsBlocksDataFetchConfig.headerMenuList || [],
      hideMenuOptions: false
    };
  },
  computed: {
    ...mapGetters("category", ["getCategories"]),
    categories() {
      return this.allCategories.filter(op => {
        return (
          op.level ===
          (this.$store.state.config.entities.category
            .categoriesDynamicPrefetchLevel
            ? this.$store.state.config.entities.category
                .categoriesDynamicPrefetchLevel
            : 2)
        ); // display only the root level (level =1 => Default Category), categoriesDynamicPrefetchLevel = 2 by default
      });
    },
    ...mapState({
      currentUser: state => state.user.current
    }),
    visibleCategories() {
      return this.categories.filter(category => {
        return category.product_count > 0 || category.children_count > 0;
      });
    }
  },
  created() {
    this.allCategories = this.getCategories;
  },
  async mounted() {
    let categories = await this.$store.dispatch("category/list", {
      skipCache: true,
      includeFields: this.$store.state.config.entities.optimize
        ? this.$store.state.config.entities.category.includeFields
        : null
    });

    this.allCategories = categories.items;
  },
  methods: {
    onEscapePress() {
      this.closeMenu();
    },
    openMenu(id) {
      this.activeSubMenu = id;
      // this.$store.commit('ui/setOverlay', true)
    },
    closeMenu() {
      this.activeSubMenu = null;
      // this.$store.commit('ui/setOverlay', false)
    },
    toggleSubMenu(id) {
      if (this.activeSubMenu === id) {
        this.closeMenu();
      } else {
        this.openMenu(id);
      }
    },
    categoryLink (category) {
      return formatCategoryLink(category)
    },
    onMenuSubCategoryClick (event) {
      if (event.path[0] && event.path[0].attributes && event.path[0].attributes[0].name === 'href') {
       setTimeout(() => {
          this.activeSubMenu= null;
       }, 300);
      } 
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  @apply p-0 m-0;
  list-style: none;

  .menu-link {
    // @apply block text-black font-medium;
    display: block;
    color: #f5f5f5;
    font-weight: 500;
    padding: 15px;
    line-height: 1.25rem;
    text-decoration: none;
    text-transform: uppercase;

    &:hover,
    &:focus {
      // @apply text-primary bg-grey-lighter;
      display: block;
      color: #525050;
      font-weight: 500;      
      outline: none;
      background: #f5f5f5;
      outline: none;
    }

    &.active,
    &.router-link-active {
      // @apply text-primary bg-grey-lighter border-t-2 border-solid border-primary;
      display: block;
      color: #525050;
      font-weight: 500;       
      padding-top: 15px;
      background: #f5f5f5;
      outline: none;
    }
  }
  .cms-block-menu{
    box-shadow: 0 5px 5px rgba(0,0,0,.19);
  }  
}

.with-submenu:hover {
  > .menu-link {
    @extend .menu-link.active;
  }

  > .submenu {
    display: block !important;
    transition-delay: 2s;
  }
}
.groupdrop-banner.img_bg{
  padding: 10px !important;
}
div.groupmenu-drop-content p.groupdrop-title{
	font-weight: 500 !important;
}

div.groupmenu-drop-content p.groupdrop-title ul.groupdrop-link li a{
	font-size: 14px;
	color: #666666;
}
@media (min-width: 1200px) and (max-width: 1599px){
  .container {
      max-width: 1200px;
  }
}
@media (max-width: 1200px){
  .menu {
    .menu-link {
      padding: 10px;
      &.active,
      &.router-link-active {
        padding-top: 10px;
      }
    }
  }
}
</style>
<style>
.groupmenu-drop-content p.groupdrop-title{
      font-weight: 500;
}
@media (min-width: 992px) and (max-width: 1400px){
  .cms-block-menu .menu-list ul li .groupmenu-drop-content div.row div{
    font-size: 12px;
  }
}

</style>
