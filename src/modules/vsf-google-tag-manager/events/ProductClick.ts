import { ProductData } from '../types/ProductData'
import productCategoryName from '../util/productCategoryName'
import sizeIdToLabel from '../util/sizeIdToLabel'

declare const dataLayer

export default (product, currency: string, source: string): void => {
    try {
        if(!('dataLayer' in window)) {
            throw new Error("GTM not installed")
        }

        let categoryName = productCategoryName(product)

        const productData: ProductData = {
            name: product.name,
            id: product.sku,
            price: product.priceInclTax,
            brand: 'Kubota',
            category: categoryName,
            variant: product.sku.split('-')[1],
            quantity: product.qty
        }

        dataLayer.push({
            'event': 'productClick',
            'ecommerce': {
                'currencyCode': currency,
                'click': {
                  'actionField': {'list': source},
                  'products': [productData]
                 }
            }
        })
    } catch(e) {
        console.error(e.message)
    }
}