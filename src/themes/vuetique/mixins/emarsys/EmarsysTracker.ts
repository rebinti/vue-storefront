declare const window: any

export const EmarsysTracker =  {
  data () {
    return { 
    }
  },
  beforeMount () {
    this.$bus.$on('send-to-emarsys-tracking', this.sendDataToEmarsys);
  },
  beforeDestroy () {
    this.$bus.$off('send-to-emarsys-tracking');
  },
  computed: {
    productsInCart () {
      return this.$store.state.cart.cartItems
    }
  },
  created () {
  },
  methods: {
    sendDataToEmarsys (event=null) {
      // console.log('event sendDataToEmarsys', event);
      if(window && window.Cookiebot && window.Cookiebot.consent && window.Cookiebot.consent.marketing){
          let cart = [];
          this.productsInCart.filter(val => {
              cart.push({item: val.sku,price: val.price,quantity: val.qty})
          });
      
          if (window && window.ScarabQueue) {
            // console.log('window.ScarabQueue', window.ScarabQueue);
            
            // For logged user to tracker 
            if (this.$store.state.user && this.$store.state.user.current !== null) {
              console.log("Emarsys tracked - cookiebot - login user case 11111111");
              window.ScarabQueue.push(['setEmail', this.$store.state.user.current.email]);
            }

            // Adding the Cart to tracker
            console.log("Emarsys tracked - cookiebot - cart case 22222222");
            window.ScarabQueue.push(['cart', cart ]);

            /* Hits when the event (type = 'Product') 
              from Products page
            */ 
            if (event && event.type === 'Product') {
              console.log("Emarsys tracked - cookiebot -  product case 33333333")
              window.ScarabQueue.push(['view', event.productSku]);
            }
            
            /* Hits when the event (type = 'Category') 
              from Category page
            */ 
            if (event && event.type === 'Category') {
              console.log("Emarsys tracked - cookiebot -  category case 4444444")
              // Passing on the category path being visited. Must match the 'category' values listed in the Product Catalog
              window.ScarabQueue.push(['category', event.categoryData]);
              window.ScarabUtil.loadedModules.emarsys_webpersonalization.instance.reload();
            }

            /* Hits when the event (type = 'Category') 
              from Category page
            */ 
            if (event && event.type === 'Purchase') {
              // Passing on the category path being visited. Must match the 'category' values listed in the Product Catalog
              window.ScarabQueue.push(['purchase', event.purchaseData]);
            }

            window.ScarabQueue.push(['go']);
            // console.log('window.ScarabQueue', window.ScarabQueue);
          }
      }    
    }
  }
}
