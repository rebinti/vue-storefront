<template>
  <div v-if="!isCheckoutPage" class="hidden lg:block w-full bg-white border-b border-solid">
    <div class="container">
      <ul class="flex menu">

       <li @mouseenter="activeSubMenu = 'new-in-cmsmenu'"
           @mouseleave="activeSubMenu = null">
          <router-link class="menu-link" :class="{active: activeSubMenu == 'new-in-cmsmenu'}"  :to="localizedRoute('/sale')" exact>{{ $t('NEW IN') }}</router-link>
          <div v-show="activeSubMenu === 'new-in-cmsmenu'"
            class="main-item row cms-block-menu"
            style="position: absolute;width: 100%;background: white;z-index: 999; left:0px;">
             <div class="container">
              <div class="menu-list col-6">
                    <cms-block :identifier="'new-in-cmsmenu'" />
              </div>
             </div> 
          </div>
      </li>

       <li @mouseenter="activeSubMenu = 'dresses-cmsmenu'"
           @mouseleave="activeSubMenu = null">
          <router-link class="menu-link" :class="{active: activeSubMenu == 'dresses-cmsmenu'}" :to="localizedRoute('/sale')" exact>{{ $t('DRESSES') }}</router-link>
          <div v-show="activeSubMenu === 'dresses-cmsmenu'"
            class="main-item row cms-block-menu"
            style="position: absolute;width: 100%;background: white;z-index: 999; left:0px;">
             <div class="container">
              <div class="menu-list col-6">
                    <cms-block :identifier="'dresses-cmsmenu'" />
              </div>
             </div> 
          </div>
      </li>

      <li  @mouseenter="activeSubMenu = 'womens-cmsmenu'"
           @mouseleave="activeSubMenu = null">
          <router-link class="menu-link" :class="{active: activeSubMenu == 'womens-cmsmenu'}"  :to="localizedRoute('/sale')" exact>{{ $t('WOMENS') }}</router-link>
          <div v-show="activeSubMenu === 'womens-cmsmenu'"
            class="main-item row cms-block-menu"
            style="position: absolute;width: 100%;background: white;z-index: 999; left:0px;">
             <div class="container">
              <div class="menu-list col-6">
                    <cms-block :identifier="'womens-cmsmenu'" />
              </div>
             </div> 
          </div>
      </li>  




        <li
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
            v-show="activeSubMenu === category.id"
            :category-links="category.children_data"
            :id="category.id"
            :parent-slug="category.slug"
            :parent-path="category.url_path"
            class="left-0"
          />
        </li>
        <!-- <li>
          <router-link
            class="menu-link"
            :to="localizedRoute('/sale')"
            exact
          >
            {{ $t('Sale') }}
          </router-link>
        </li>-->


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
        </li>

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
      activeSubMenu: null
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
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  @apply p-0 m-0;
  list-style: none;

  .menu-link {
    @apply block text-black font-medium;
    padding: 15px;
    line-height: 1.25rem;
    text-decoration: none;

    &:hover,
    &:focus {
      @apply text-primary bg-grey-lighter;
      outline: none;
    }

    &.active,
    &.router-link-active {
      @apply text-primary bg-grey-lighter border-t-2 border-solid border-primary;
      padding-top: 13px;
    }
  }
}

.with-submenu:hover {
  > .menu-link {
    @extend .menu-link.active;
  }

  > .submenu {
    display: block !important;
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
</style>
