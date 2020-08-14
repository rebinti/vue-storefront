import rootStore from '@vue-storefront/core/store'
import { SET_STATUS } from '../store/mutation-types'
import { searchImpression } from '../events/ProductImpression'

const injectJs = function(w,d,s,l,i) {
  w[l]=w[l]||[];
  w[l].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
  var f = d.getElementsByTagName(s)[0], j=d.createElement(s),
      dl = l != 'dataLayer' ? '&l='+l : ''; 
  j.async=true;
  j.src= 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
}

export function afterRegistration({ Vue, config, store, isServer }){
  if (!isServer && config.googleTagManager && config.googleTagManager.id) {
      if(!store.state['vsf-google-tag-manager'].registered) {
        injectJs(window, document, 'script', 'dataLayer', config.googleTagManager.id);
        store.commit('vsf-google-tag-manager/' + SET_STATUS, true)
      }

      const currency = rootStore.state.storeView.i18n.currencyCode
      searchImpression(currency)
  }
}
