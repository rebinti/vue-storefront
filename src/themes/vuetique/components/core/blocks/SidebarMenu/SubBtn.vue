<template>
  <button
    class="inline-flex justify-between w-full px-5 py-4 pr-4 font-medium btn-list_menu"
    :class="{'no-img-thumb': thumbnail===''}"
    v-if="type === 'next'"
    type="button"
    @click.stop="next()"
    :aria-label="$t('Show subcategories')"
    data-testid="categoryButton"
  >
   <img v-if="thumbnail" class="ico_main" :src="getThumbnailBaseUrl+thumbnail" alt="" style="width: 30px;height: 30px;"/>
   <!-- <span class="ico_main fab fa-bandcamp"></span> -->
    {{ name }}
    <svg viewBox="0 0 25 25" class="vt-icon--sm">
      <use xlink:href="#right" />
    </svg>
  </button>
  <button
    class="inline-flex w-full px-5 py-4 pr-4 font-medium"
    v-else
    type="button"
    @click.stop="back()"
    :aria-label="$t('Back')"
  >
    <svg viewBox="0 0 25 25" class="vt-icon--sm">
      <use xlink:href="#left" />
    </svg>
    {{ name }}
  </button>
</template>
<script>
import config from 'config'
import { mapState } from 'vuex'
export default {
  name: 'SubBtn',
  props: {
    id: {
      type: null,
      default: ''
    },
    type: {
      type: String,
      default: 'next'
    },
    name: {
      type: String,
      default: ''
    },
    thumbnail: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      submenu: state => state.ui.submenu
    }),
    getThumbnailBaseUrl() {
      return config.category_url.img_url
    }
  },
  methods: {
    next () {
      if (this.$store.state.config.entities.category.categoriesDynamicPrefetch) this.$store.dispatch('category/list', { parent: this.id })
      this.$store.commit('ui/setSubmenu', {
        id: this.id,
        depth: ++this.submenu.depth
      })
    },
    back () {
      this.$store.commit('ui/setSubmenu', {
        depth: --this.submenu.depth
      })
    }
  }
}
</script>
<style lang="scss" scoped>
button {
  i {
    @apply text-grey;
    font-size: 25px;
    line-height: 17px;
  }
  &:hover,
  &:focus {
    i {
      @apply text-black;
    }
  }
}

@media (max-width: 576px) {


  .sidebar-menu__list{

   .menu_li_it .btn-list_menu{
      padding-left: 65px;
      font-size: 18px;
      padding-top: 25px;
      padding-bottom: 25px;
      text-transform: uppercase;
      text-align: left;
      &.no-img-thumb{
        padding-left:20px;
      }
    }
  }

}

</style>
