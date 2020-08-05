<template>
  <div class="header">
    <header
      class="fixed lg:static top-0 z-header w-full bg-white border-b border-solid"
      :class="{ 'is-visible': navVisible }"
    >
      <div class="container h-full">
        <div class="row gutter-md items-center h-full" v-if="!isCheckoutPage">
          <div class="col-auto sm:col-4 lg:col-auto lg_mnu">
            <div @click.stop="headmenuopen()">
              <template v-if="!canGoBack">
                <hamburger-icon class="p-3" />
              </template>
              <template v-else>
                <return-icon class="p-3" v-if="canGoBack" />
              </template>
            </div>
          </div>
          <div class="col-grow m_logo sm:col-4 lg:col-grow flex items-center justify-center lg:justify-start">
            <logo />
          </div>
           <div class="col-6 hidden lg:block">
              <search />
          </div>
           <div class="lg:col-6 md:col-12 sm:col-12 w-full hidden toogle-search mob-search-box"
           :style="{ display: openSearchPanel ? 'block': 'none' }">
             <search-box-mobile :showpanelflag="showSearchBoxSection" @click="toggleSearchBox"/>
          </div>
          <div class="col-auto sm:col-4 lg:col-grow justify-end" :style="{ display: !openSearchPanel ? 'block': 'none' }">
            <div class="right-icons flex">
              <search-icon class="p-3 xs:block lg:hidden" style="margin-top: 5px;"
               @click="toggleSearchBox" /> 
              <!-- p-3 hidden xs:block xsm:block md:block lg:hidden -->
              <account-icon class="p-3" />
              <compare-icon class="p-3 hidden sm:block" />
              <wishlist-icon class="p-3" />
              <microcart-icon class="p-3" />
            </div>
          </div>
        </div>
        <div class="row gutter-md items-center justify-between h-full" v-if="isCheckoutPage">
          <div class="col-3 flex items-center">
            <div>
              <router-link :to="localizedRoute('/')" class="flex text-grey">
                <span class="hidden md:inline">
                  &lt;&nbsp;{{ $t('Return to shopping') }}
                </span>
                <svg class="vt-icon md:hidden" viewBox="0 0 25 25">
                  <use xlink:href="#left" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="col-6 flex items-center justify-center">
            <logo />
          </div>
          <div class="col-3 flex justify-end">
            <div>
              <a v-if="!currentUser" href="#" @click.prevent="gotoAccount" class="flex text-grey">
                <span class="hidden md:inline">
                  {{ $t('Login to your account') }}&nbsp;&gt;
                </span>
                <svg class="vt-icon md:hidden" viewBox="0 0 25 25">
                  <use xlink:href="#user" />
                </svg>
              </a>
              <span class="text-xs sm:text-sm md:text-base text-grey" v-else>
                {{ $t('You are logged in as') }} {{ currentUser.firstname }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="header-placeholder" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CurrentPage from 'theme/mixins/currentPage'
import AccountIcon from 'theme/components/core/blocks/Header/AccountIcon'
import CompareIcon from 'theme/components/core/blocks/Header/CompareIcon'
import HamburgerIcon from 'theme/components/core/blocks/Header/HamburgerIcon'
import Logo from 'theme/components/core/Logo'
import MicrocartIcon from 'theme/components/core/blocks/Header/MicrocartIcon'
import ReturnIcon from 'theme/components/core/blocks/Header/ReturnIcon'
import SearchIcon from 'theme/components/core/blocks/Header/SearchIcon'
import WishlistIcon from 'theme/components/core/blocks/Header/WishlistIcon'
import Search from 'theme/components/core/blocks/Search/Search'
import SearchBoxMobile from 'theme/components/core/blocks/Search/SearchBoxMobile'

export default {
  name: 'Header',
  components: {
    AccountIcon,
    CompareIcon,
    HamburgerIcon,
    Logo,
    MicrocartIcon,
    ReturnIcon,
    SearchIcon,
    WishlistIcon,
    Search,
    SearchBoxMobile
  },
  mixins: [CurrentPage],
  computed: {
    ...mapState({
      isOpenLogin: state => state.ui.signUp,
      currentUser: state => state.user.current
    })
  },
  data () {
    return {
      navVisible: true,
      isScrolling: false,
      scrollTop: 0,
      lastScrollTop: 0,
      navbarHeight: 70,
      openSearchPanel: false,
      showSearchBoxSection: false
    }
  },
  watch: {
    '$route': 'changeSerachBoxView'
  },
  beforeMount () {
    window.addEventListener('scroll', () => {
      this.isScrolling = true
    }, {passive: true})

    setInterval(() => {
      if (this.isScrolling) {
        this.hasScrolled()
        this.isScrolling = false
      }
    }, 250)
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$route.path === '/search' && window.innerWidth <= 991) this.toggleSearchBox()
    })
  },
  methods: {
    changeSerachBoxView () {
      if (window.innerWidth <= 991)  {
        if (this.$route.path === '/search') {
          this.openSearchPanel = true
          this.showSearchBoxSection = true
        } else {
          this.openSearchPanel = false
          this.showSearchBoxSection = false
        }
      }
    },
    toggleSearchBox () {
        this.openSearchPanel = !this.openSearchPanel
        this.showSearchBoxSection = !this.showSearchBoxSection
        if (!this.showSearchBoxSection && this.$route.path == '/search') {
          if (window.history.length <= 2) this.$router.push(this.localizedRoute('/'))
          else  this.$router.back()
        }
    },
    gotoAccount () {
      this.$bus.$emit('modal-toggle', 'modal-signup')
    },
    hasScrolled () {
      this.scrollTop = window.scrollY
      if (this.scrollTop > this.lastScrollTop && this.scrollTop > this.navbarHeight) {
        this.navVisible = false
      } else {
        this.navVisible = true
      }
      this.lastScrollTop = this.scrollTop
    },
    headmenuopen () {      
      this.$store.commit('ui/setSubmenu', {
        id:'',
        depth: 0
      })
    }    
  },
  destroyed () {
    window.removeEventListener('scroll', null);
  }  
}
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  top: -70px;
  z-index: 3;
  transition: top 0.2s ease-in-out;
  &.is-visible {
    top: 0;
  }
  // @screen lg {
  //   top: -70px;
  // }

}

.menu-high-opacity {
    header {
     z-index: 6!important;
    } 
  }

.header-placeholder {
  height: 70px;

  @screen lg {
    height: 0;
  }
}

.right-icons {
  //for edge
  float: right;
}

@screen lg {
  .header-fixed {
    header {
      position: fixed;
      top: -70px;
      left: 0;
      right: 0;
      transition: top 0.2s ease-in-out;
    }

    .header-placeholder {
      height: 70px;
    }

    &.header-visible header {
      top: 0;
    }
  }
}
@media (min-width: 1200px) and (max-width: 1599px){
  .container {
      max-width: 1200px;
  }
}
 .toogle-search {
    display: block;
   background: #ffff;z-index: 100;margin-top: -39px;margin-left: 3px;width: 101%;
 }
 .mob-search-box{ height: 50px; }
</style>
