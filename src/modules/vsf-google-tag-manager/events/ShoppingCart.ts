import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import debounce from '../util/debounce'
import { ProductData } from '../types/ProductData'
import productCategoryName from '../util/productCategoryName'
import sizeIdToLabel from '../util/sizeIdToLabel'
import rootStore from '@vue-storefront/core/store'

declare const dataLayer

export default (currency): void => { 
    let myDebounceOnAdd:(Function | null) = null 
    let myDebounceOnDelete:(Function | null) = null 
    let myDebounceAfterDelete:(Function | null) = null 

    // Product first time added to cart
    EventBus.$on('cart-before-add', product => {
        if(!myDebounceOnAdd) {
            myDebounceOnAdd = debounce((product) => {
                if(!rootStore.state.ui.searchpanel) {
                  return
                }

                const pr = product.product

                console.log('AAAAAAAAAAA >>>>>>> 1111',product)
                console.log('BBBBBBBBBBBB >>>>>>> 1111',product.product)


                let categoryName = productCategoryName(pr)
                 
                  const productData: ProductData = {
                    name: pr.name,
                    id: pr.parentSku,  // id: pr.sku,
                    price: pr.priceInclTax,
                    quantity: pr.qty,
                    variant: pr.sku.split('-')[1],
                    brand: "Kubota",
                    category: categoryName
                  }
                  console.log('cart-before-add >>>>>>> 1111',productData)
                  dataLayer.push({
                    'event': 'addToCart',
                    'ecommerce': {
                      'currencyCode': currency,
                      'add': {                                // 'add' actionFieldObject measures.
                        'products': [productData]
                      }
                    }
                  })
            }, 2000)
        }
        myDebounceOnAdd(product)
    })

    EventBus.$on('cart-before-itemchanged', product => {
        if(!myDebounceOnAdd) {
            myDebounceOnAdd = debounce((product) => {
                const pr = product.product || product.item
                // console.log('CHANGE', product)

                let categoryName = productCategoryName(pr)
                 
                  const productData: ProductData = {
                    name: pr.name,
                    id: pr.parentSku,  // id: pr.sku,
                    price: pr.priceInclTax,
                    quantity: pr.qty,
                    variant: pr.sku.split('-')[1],
                    brand: "Kubota",
                    category: categoryName
                  }
                  console.log('cart-before-itemchanged >>>>>>> 22222',productData)
                  dataLayer.push({
                    'event': 'addToCart',
                    'ecommerce': {
                      'currencyCode': currency,
                      'add': {                                // 'add' actionFieldObject measures.
                        'products': [productData]
                      }
                    }
                  })
            }, 2000)
        }

        if(myDebounceOnAdd && product.item.qty > 1 && product.item.prev_qty < product.item.qty) {
            myDebounceOnAdd(product)
        } 
    })

    let lastProducts = null

    EventBus.$on('cart-before-delete', product => {
        lastProducts = product
        if(!myDebounceOnDelete) {
            myDebounceOnDelete = debounce((product) => {
                // console.log('delete', product)
                const pr = product.items[0]


                console.log('AAAAAAAAAAA >>>>>>> 3333',product)
                console.log('BBBBBBBBBBBB >>>>>>> 3333',pr)

                let categoryName = productCategoryName(pr)
                 
                  const productData: ProductData = {
                    name: pr.name,
                    id: pr.parentSku,  // id: pr.sku,
                    price: pr.priceInclTax,
                    quantity: pr.qty,
                    variant: pr.sku.split('-')[1],
                    brand: "Kubota",
                    category: categoryName
                  }
                  console.log('cart-before-delete >>>>>>> 3333',productData)
                  // dataLayer.push({
                  //   'event': 'removeFromCart',
                  //   'ecommerce': {
                  //     'remove': {     
                  //       'products': [productData]
                  //     }
                  //   }
                  // })

            }, 2000)
        }

        myDebounceOnDelete(product)
    })

    EventBus.$on('cart-after-delete', products => {
      // console.log(lastProducts, products);
      // if(myDebounceOnDelete) {
        // if(JSON.stringify(lastProducts) === JSON.stringify(products)) {
        //   return;
        // }
    //let myDebounceAfterDelete:(Function | null) = null 

      if(!myDebounceAfterDelete) {
        

        myDebounceAfterDelete = debounce((products) => {
          const unique = []
          // console.log('looping', lastProducts, products)
          for(let lpIndex in lastProducts.items) {
            // console.log('LP', lastProducts.items[lpIndex])
            let present = false
            for(let pIndex in products.items) {
              // console.log('P', products.items[pIndex])
              if(lastProducts.items[lpIndex].id == products.items[pIndex].id) {
                // console.log('ID', lastProducts.items[lpIndex].id, products.items[pIndex].id)
                present = true
                // break;
              }
            }

            if(!present) {
              unique.push(lastProducts.items[lpIndex])
            }
            // console.log(lastProducts.items[lpIndex], 'present?: ', present)
          }
          // console.log('unique', unique)
          console.log('cart-after-delete >>>>>>> 4444',unique)
          dataLayer.push({
              'event': 'removeFromCart',
              'ecommerce': {
                'remove': {     
                  'products': unique
                }
              }
            })
        }, 2000)

        
      }

      myDebounceAfterDelete(products)
    })
}