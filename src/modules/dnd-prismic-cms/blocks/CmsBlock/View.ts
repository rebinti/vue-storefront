import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import config from 'config'

export default {
  name: 'PrismicCmsBlock',
  props: {
    identifier: {
      type: String,
      default: null,
      required: false
    }
  },
  data () {
    return {
      block: null
    }
  },
  methods: {},
  created () {
    const storeView = currentStoreView()
    // console.log('PrismicCmsBlock ', this.identifier);
    let storeCode = 'en-us'
    if (typeof config.prismic != 'undefined' && typeof config.prismic.defaultLocale != 'undefined') {
      // storeCode = config.prismic.defaultLocale
    }
    if (storeView && storeView.storeCode.length !== 0) {
      // storeCode = storeView.storeCode
    }

    this.$store.dispatch('dnd-prismic-cms/refreshHomePageCollection').then((cmsBlocksCollection) => {
      let lang = storeCode.split('-')[0]
      // console.log('dnd-prismic-cms/refreshHomePageCollection' , cmsBlocksCollection);
      this.block = this.$store.getters[`dnd-prismic-cms/getCmsBlock`](this.identifier, lang)
    })

    this.$store.dispatch('dnd-prismic-cms/refreshCmsBlocksCollection').then((cmsBlocksCollection) => {
      let lang = storeCode.split('-')[0]
      // console.log('dnd-prismic-cms/refreshCmsBlocksCollection' , cmsBlocksCollection);
      this.block = this.$store.getters[`dnd-prismic-cms/getCmsBlock`](this.identifier, lang)
    })
  }
}
