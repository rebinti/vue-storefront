import { ProductData } from '../types/ProductData'
import productCategoryName from '../util/productCategoryName'
import sizeIdToLabel from '../util/sizeIdToLabel'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import debounce from '../util/debounce'

declare const dataLayer

export const categoryImperssion = (categoryName: string, products, currency: string): void => {
    try {
        if(!('dataLayer' in window)) {
            throw new Error("GTM not installed")
        }

        const source = "Category page"

        const productsData: ProductData[] = []
        for(let product of products) {
            productsData.push({
                name: product.name,
                id: product.sku,
                price: product.priceInclTax,
                brand: 'Kubota',
                category: categoryName,
                list: source,
                variant: product.sku.split('-')[1]
            })
        }

        dataLayer.push({
            'ecommerce': {
                'currencyCode': currency,
                'impressions': productsData
            }
        })
    } catch(e) {
        console.error(e.message)
    }
}

export const searchImpression = (currency: string): void => {
    try {
        if(!('dataLayer' in window)) {
            throw new Error("GTM not installed")
        }

        let myDebounce: Function;
        let previousState = {}

        EventBus.$on('product-after-list', payload => {

            if(!myDebounce) {
                myDebounce = debounce(py => {
                    
                    const products = py.result.items

                    const source = "Search"

                    const productsData: ProductData[] = []
                    
                    for(let product of products) {
                        productsData.push({
                            name: product.name,
                            id: product.sku,
                            price: product.priceInclTax,
                            brand: 'Kubota',
                            category: "View",
                            list: source,
                            variant: product.sku.split('-')[1]
                        })
                    }

                    if(JSON.stringify({
                        'ecommerce': {
                            'currencyCode': currency,
                            'impressions': productsData
                        }
                    }) !== JSON.stringify(previousState)) {
                        dataLayer.push({
                            'ecommerce': {
                                'currencyCode': currency,
                                'impressions': productsData
                            }
                        })
                    }

                    previousState = {
                        'ecommerce': {
                            'currencyCode': currency,
                            'impressions': productsData
                        }
                    }

                }, 2000)
            }
            myDebounce(payload)
        })

    } catch(e) {
        console.error(e.message)
    }
}