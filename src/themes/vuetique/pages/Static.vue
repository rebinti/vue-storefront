<template>
  <div>
    <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" :active-route="$props.title" />
    <header class="container mt-2">
      <h1 class="cms-page-head">{{ $props.title }}</h1>
    </header>

    <div class="container pt-4 pb-16">      
      <div class="row gutter-md justify-between">
        <div class="mobile-only-menu hidden" @click="togglecmsmenu">{{title}}</div>
        <div v-if="showcmsmenu" class="md:col-3 lg:col-3 xl:col-2 mb-8">
          <nav class="static-menu">
            <ul class="border-t">
              <li class="border-b py-2" v-for="page in navigation" :key="page.id" :class="{ 'active': page.link === '/'+currentRouteName }">
                <router-link :to="localizedRoute(page.link)" @click.native="setContent(page.component)" class="nav-link">
                  {{ page.title }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>        
        <div class="col-12 md:col-9 lg:col-9 xl:col-10 leading-loose static-content">
          <component :is="activeComponent" :pageidentifier="pageidentifierfromindex"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import StaticExample from 'theme/components/theme/blocks/Static/Example'
import MagentoCmsPage from 'theme/components/theme/blocks/Static/MagentoCmsPage'
import ContactUsComponent from 'theme/components/theme/blocks/contact/ContactUsComponent'
// import ReturnExample from 'theme/components/theme/blocks/Static/Return'
// import PrivacyExample from 'theme/components/theme/blocks/Static/Privacy'
// import ServiceExample from 'theme/components/theme/blocks/Static/Service'

export default {
  components: {
    Breadcrumbs
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$props.title,
      meta: this.$route.meta.description ? [{vmid: 'description', description: this.$route.meta.description}] : []
    }
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    },
  },
  created () {
    this.activeComponent = this.navigation.find(nav => nav.link === this.$route.path) ? this.navigation.find(nav => nav.link === this.$route.path).component : null
  },
  mounted() {
    window.addEventListener('resize', () => {   
      this.windowwidth = window.innerWidth   
      if(window.innerWidth<= 560){
        this.showcmsmenu = false
      }else{
        this.showcmsmenu = true
      }
    })
  },  
  props: {
    title: {
      type: String,
      required: true
    },
    page: {
      type: String,
      required: true
    },
    pageidentifierfromindex: {
      type: String,
      required: true
    }    
  },
  methods: {
    setContent (component) {
      this.activeComponent = component      
      if(window.innerWidth <= 560){        
         this.showcmsmenu = false   
      }       
    },
    togglecmsmenu () {
      if (this.showcmsmenu === false) {
        this.showcmsmenu = true        
      } else {
        this.showcmsmenu = false        
      }
    },    
  },
  data () {
    return {
      navigation: [
        // { title: i18n.t('About us'), link: '/about-us', component: StaticExample },
        // { title: i18n.t('Customer service'), link: '/customer-service', component: ServiceExample },
        // { title: i18n.t('Store locator'), link: '/store-locator', component: StaticExample },
        // { title: i18n.t('Delivery'), link: '/delivery', component: StaticExample },
        // { title: i18n.t('Return policy'), link: '/returns', component: ReturnExample },
        // // { title: i18n.t('Return policy'), link: '/returns', component: Custompage },
        // { title: i18n.t('Privacy policy'), link: '/privacy', component: PrivacyExample },
        // { title: i18n.t('Size guide'), link: '/size-guide', component: StaticExample },
        // { title: i18n.t('Contact us'), link: '/contact', component: StaticExample }
        
        { title: i18n.t('General'), link: '/customer-service-general', component: MagentoCmsPage },
        { title: i18n.t('Contact us'), link: '/contact-us', component: ContactUsComponent },
        { title: i18n.t('My Account'), link: '/account', component: StaticExample },
        { title: i18n.t('Privacy & Security'), link: '/privacy-policy-cookie-restriction-mode', component: MagentoCmsPage },        
        { title: i18n.t('Help/Faqs'), link: '/help-faq', component: MagentoCmsPage },
        { title: i18n.t('Delivery & Return'), link: '/delivery-returns', component: MagentoCmsPage },
        { title: i18n.t('Students'), link: '/students', component: MagentoCmsPage },        
        { title: i18n.t('Size guide'), link: '/size-guide', component: MagentoCmsPage },              
      ],
      activeComponent: null,
      showcmsmenu: true,
      windowwidth:'',      
    }
  }
}
</script>

<style lang="scss" scoped>
.static-menu {
  background: rgb(82, 80, 80);  
  .nav-link {
    @apply block text-black font-medium py-1;

    &:hover, &:focus {
      @apply text-primary2;
      color:#525050;
    }

    &.router-link-exact-active {
      @apply text-primary2;
      color:#525050;

      &::before {
        content: "\25B8";
        margin-right: 10px;
      }
    }
  }
  .border-t{
    .border-b{
      padding-top: 0.25rem;
      padding-bottom: 0.25rem; 
      border-color: #808080;     
      .nav-link{
        margin-left: 10px;
        color:#FFFFFF;
      }
      .nav-link:hover{        
        color:#525050;
      }      
      .nav-link.router-link-active{
        color:#525050;
      }
    }
    .border-b:hover{
      background: #f5f5f5;
      color:#525050;
    }
    .border-b.active{
      color: #525050 !important;
      font-weight: 500;    
      background: #f5f5f5;
      outline: none;
      line-height: 1.25rem;      
    }
  }
}
.static-content {
  *:first-of-type {
    margin-top: 0;
  }
}
h1.cms-page-head{
    text-transform: uppercase;
    font-family: Roboto, sans-serif;
    font-size: 1.5rem;
}
@media (max-width: 560px) { 
  .mobile-only-menu{
    border: 1px solid #525050;
    padding: 7px;
    font-weight: 500;
    display:block;
    margin: 10px;
    width: 100%;
  }
  .mobile-only-menu:after{
    content: '>';
    color: #525050;   
    font-weight: 100;
    float: right;
    margin-left: 5px;
    font-size: 25px;     
  }
}
</style>
