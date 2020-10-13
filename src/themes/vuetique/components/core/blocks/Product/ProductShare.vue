<template>
  <div class="shadow-box-inner border-t border-solid border-white">
  <ShareNetwork
      v-for="network in networks"
      :network="network.network"
      :key="network.network"
      :class="'share-items'"
      :url="'https://vue.iclothing.com/'+ localizedRoute(product.url_path)"
      :title="product.name"
      :description="product.description"
      :image="imgpath"
    >
      <i :class="network.icon" class="cursor: pointer;"></i>      
    </ShareNetwork>
  </div>
</template>
<script>
import NoSSR from 'vue-no-ssr'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'

export default {
  name: 'ProductShare',
  data () {
    return {
      sharing: {
          url: 'https://news.vuejs.org/issues/180',
          title: 'Say hi to Vite! A brand new, extremely fast development setup for Vue.',
          description: 'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
          quote: 'The hot reload is so fast it\'s near instant. - Evan You',
          hashtags: 'vuejs,vite,javascript',
          twitterUser: 'youyuxi'
      },
      networks: [
        { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
        { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
        { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
        { network: 'pinterest', name: 'Pinterest', icon: 'fab fah fa-lg fa-pinterest', color: '#bd081c' },
        // { network: 'googleplus', name: 'Google +', icon: 'fab fah fa-lg fa-google-plus', color: '#000000' },
        { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#bd081c' },
      ]
    }
  },
  props: {
    product: {
      type: Object,
      required: true,
      default: {}
    },
    imgpath: {
      type: String,
      required: true,
      default: String
    }    
  }
}
</script>
<style>
.share-items {
    margin-right: 20px;
    cursor: pointer;
}
.shadow-box-inner {
  padding: 10px 0 0 20px;
}
</style>
