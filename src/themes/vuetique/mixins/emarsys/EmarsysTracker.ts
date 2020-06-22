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

      let cart = [];
      this.productsInCart.filter(val => {
          cart.push({item: val.sku,price: val.price,quantity: val.qty})
      });
  
      if (window && window.ScarabQueue) {
        // console.log('window.ScarabQueue', window.ScarabQueue);
        
        // For logged user to tracker 
        if (this.$store.state.user && this.$store.state.user.current !== null) {
          window.ScarabQueue.push(['setEmail', this.$store.state.user.current.email]);
        }

        // Adding the Cart to tracker
        window.ScarabQueue.push(['cart', cart ]);

        /* Hits when the event (type = 'Product') 
           from Products page
        */ 
        if (event && event.type === 'Product') {
          window.ScarabQueue.push(['view', event.productSku]);
        }
        
        /* Hits when the event (type = 'Category') 
           from Category page
        */ 
        if (event && event.type === 'Category') {
          // Passing on the category path being visited. Must match the 'category' values listed in the Product Catalog
          window.ScarabQueue.push(['category', event.categoryData]);
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
