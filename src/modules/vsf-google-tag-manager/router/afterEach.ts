import rootStore from '@vue-storefront/core/store'
import { isServer } from '@vue-storefront/core/helpers'
import { Route } from 'vue-router' 

import evProductClick from '../events/ProductClick'
import evProductDetails from '../events/ProductDetails'
import { categoryImperssion, searchImpression } from '../events/ProductImpression'
import evShoppingCart from '../events/ShoppingCart'

let registeredShoppingCart = false

export function afterEach (to: Route, from: Route) {
    const currency = rootStore.state.storeView.i18n.currencyCode
  
    // Each product's route has in name 'product' phrase!
    if(!isServer && to.name !== null) {
        let source = null
        if(rootStore.state.ui.searchpanel) {
            source = "Search"
        } else if(from.name !== null && from.name.match(/product/)) {
            source = "Related products in other product"
        } else {
            source = "Category page"
        }

        if (to.name.match(/product/) ) {
            evProductDetails(
                rootStore.state.product.current, 
                currency, 
                source
            )
        }
        if (to.name.match(/product/) && from.name !== null) {
            let source = null
            if(rootStore.state.ui.searchpanel) {
                source = "Search"
            } else if(from.name !== null && from.name.match(/product/)) {
                source = "Related products in other product"
            } else {
                source = "Category page"
            }
            evProductClick(
                rootStore.state.product.current, 
                currency, 
                source
            )
        } else if (to.name.match(/category/)) {
            let source = "Category page"

            categoryImperssion(
                rootStore.state.category.current.name, 
                rootStore.state.product.list.items, 
                currency
            )
        }

        if(!registeredShoppingCart) {
            evShoppingCart(currency)
            registeredShoppingCart = true
        }
    }
}