<template>
  <div class="bg-grey-lightest">
    <div class="container text-xs text-grey leading-normal truncate py-4 breadcrumbs">
      <span v-for="link in routes" :key="link.route_link">
        <router-link :to="localizedRoute('/')" v-if='(link.name =="Default Category")' class="text-grey">
         Home
        </router-link> 
         <router-link :to="localizedRoute(link.route_link)" v-else class="text-grey">
          {{ link.name | htmlDecode }}
        </router-link> 
        <span class="px-2">&rsaquo;</span>
      </span>
      <span class="text-grey-dark">
        {{ activeRoute | htmlDecode }}
      </span>
    </div>
    <script v-html="JSON.stringify(getJsonLdBreadcrumbs)" type="application/ld+json"/>
  </div>
</template>

<script>
import Breadcrumbs from '@vue-storefront/core/compatibility/components/Breadcrumbs'

export default {
  mixins: [Breadcrumbs],
  data () {
    return {
      Breadcrumbsresults: [],
      BreadcrumbsFullresults: []
    }
  },  
  mounted () {  
    let count = -1; 
    this.routes.filter((op) => {
      ++count;
      let itemcontent  = {
        '@type':'ListItem',
        'item':{
           '@id':(op.name=='Default Category') ? 'https://www.iclothing.com/' : 'https://www.iclothing.com'+op.route_link,
           'name':(op.name=='Default Category') ? 'Home' : op.name
        },
        'position':count
      }      
      this.Breadcrumbsresults.push(itemcontent);    
    })
    this.BreadcrumbsFullresults =  {
          "@context":"http://schema.org",
          "@type":"BreadcrumbList",
          "itemListElement":this.Breadcrumbsresults,
    }      
  },
  computed: {
    getJsonLdBreadcrumbs () {    
      let count = -1; 
      this.routes.filter((op) => {
        ++count;
        let itemcontent  = {
          '@type':'ListItem',
          'item':{
            '@id':(op.name=='Default Category') ? 'https://www.iclothing.com/' : 'https://www.iclothing.com'+op.route_link,
            'name':(op.name=='Default Category') ? 'Home' : op.name
          },
          'position':count
        }      
        this.Breadcrumbsresults.push(itemcontent);    
      })
      this.BreadcrumbsFullresults =  {
            "@context":"http://schema.org",
            "@type":"BreadcrumbList",
            "itemListElement":this.Breadcrumbsresults,
      }  
      return this.BreadcrumbsFullresults  
    },
  }
}
</script>
