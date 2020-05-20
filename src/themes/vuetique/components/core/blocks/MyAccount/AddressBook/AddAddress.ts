// import Address from './types/Address'
import toString from 'lodash-es/toString'

export default interface Address {
  city: string;
  country: string;
  firstName: string;
  house: string;
  lastName: string;
  phone: string;
  postcode: string;
  region: string;
  street: string;
  default_shipping: boolean;
  default_billing: boolean;
}


export const AddAddress = {
  name: 'AddAddress',
  methods: {

    addNewAddress (address: Address) {

       let updatedShippingDetails;
        updatedShippingDetails = JSON.parse(JSON.stringify(this.$store.state.user.current))
        let updatedShippingDetailsAddress = {
            firstname: this.customer.firstName,
            lastname: this.customer.lastName,
            street: [this.customer.street, this.customer.house],
            city: this.customer.city,
            ...(this.customer.region ? { region: { region: this.customer.region } } : {}),
            country_id: this.customer.country,
            postcode: this.customer.postcode,
            ...(this.customer.phone ? { telephone: this.customer.phone } : {})
        }
          
        if (this.customer.default_shipping) {
            if (this.currentUser.hasOwnProperty('default_shipping')) {
                   updatedShippingDetails.addresses = updatedShippingDetails.addresses.map((address) =>
                      toString(address.id) === toString(this.currentUser.default_shipping)
                        ? { ...address, ...{default_shipping : false} } // update default address if already exist
                        : address
                    )
            }
         }
         if (this.customer.default_billing ) {
            if (this.currentUser.hasOwnProperty('default_billing')) {
                 updatedShippingDetails.addresses = updatedShippingDetails.addresses.map((address) =>
                    toString(address.id) === toString(this.currentUser.default_billing)
                      ? { ...address, ...{default_billing : false} } // update default address if already exist
                      : address
                  )
            }
        } 

        if (this.currentUser.hasOwnProperty('default_shipping') || this.currentUser.hasOwnProperty('default_billing')) {
            if (this.customer.default_shipping) updatedShippingDetailsAddress['default_shipping'] = true;
            if (this.customer.default_billing) updatedShippingDetailsAddress['default_billing'] = true;
            if (!this.customer.default_shipping && !this.customer.default_billing) {  
               updatedShippingDetailsAddress['plane_address'] = true;
            }
            updatedShippingDetails.addresses = []
            updatedShippingDetails.addresses.push(updatedShippingDetailsAddress)
        }

        console.log('updatedShippingDetails', JSON.stringify(updatedShippingDetails));
        // return;
        this.$bus.$emit('notification-progress-start', this.$t('Please wait ...'))
        this.$bus.$emit('myAccount-before-updateUser', updatedShippingDetails)
        this.$bus.$emit('modal-hide', 'modal-addressFromPopup')
        setTimeout(() => {
          this.$bus.$emit('notification-progress-stop')
        }, 400);
    },

    updateEditedAddress (currentAddressId, address: Address) {
        let updatedShippingDetails = JSON.parse(JSON.stringify(this.$store.state.user.current))
        let updatedShippingDetailsAddress = {
            firstname: this.customer.firstName,
            lastname: this.customer.lastName,
            street: [this.customer.street, this.customer.house],
            city: this.customer.city,
            ...(this.customer.region ? { region: { region: this.customer.region } } : {}),
            country_id: this.customer.country,
            postcode: this.customer.postcode,
            ...(this.customer.phone ? { telephone: this.customer.phone } : {})
          }

           const selectedAddress = updatedShippingDetails.addresses.find(val => val.id === currentAddressId);
           
           if (this.customer.default_shipping) updatedShippingDetailsAddress['default_shipping'] = true;
           if (this.customer.default_billing) updatedShippingDetailsAddress['default_billing'] = true;
           if (!this.customer.default_shipping && !this.customer.default_billing) {  
               updatedShippingDetailsAddress['plane_address'] = true;
               updatedShippingDetailsAddress['extra_address_edit'] = true;                              
           }   
           
           updatedShippingDetails.addresses = []
           updatedShippingDetails.addresses.push({ ...selectedAddress, ...updatedShippingDetailsAddress })

          console.log('updatedShippingDetails', updatedShippingDetails);
          // return;
            this.$bus.$emit('notification-progress-start', this.$t('Please wait ...'))
          this.$bus.$emit('myAccount-before-updateUser', updatedShippingDetails)
          this.$bus.$emit('modal-hide', 'modal-addressFromPopup')
          setTimeout(() => {
          this.$bus.$emit('notification-progress-stop')
        }, 400);
    },
  }
}
