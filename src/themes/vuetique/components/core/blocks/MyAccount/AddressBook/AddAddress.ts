import Address from './types/Address'
import toString from 'lodash-es/toString'

export const AddAddress = {
  name: 'AddAddress',
  methods: {
    addAddress (address: Address) {
      return new Promise ((resolve) => {
        this.$store.dispatch('addressBook/addAddress', address)
        resolve()
      })
    },
    updateAddress (currentAddressId, address: Address) {
      return new Promise ((resolve) => {
        this.$store.dispatch('addressBook/updateAddress', {"currentAddressId": currentAddressId, "newAddress": address})
        resolve()
      })
    },

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
          
          // if (this.currentUser.hasOwnProperty('default_shipping')) {
          //         if (this.currentUser.addresses.length === 0) {
          //           updatedShippingDetails = null
          //         } else {
          //           updatedShippingDetails.addresses = updatedShippingDetails.addresses.map((address) =>
          //             toString(address.id) === toString(currentAddressId)
          //               ? { ...address, ...updatedShippingDetailsAddress } // update default address if already exist
          //               : address
          //           )
          //         }
          //  }
     
          //  if (this.currentUser.hasOwnProperty('default_billing')) {
          //         if (this.currentUser.addresses.length === 0) {
          //           updatedShippingDetails = null
          //         } else {
          //           updatedShippingDetails.addresses = updatedShippingDetails.addresses.map((address) =>
          //             toString(address.id) === toString(currentAddressId)
          //               ? { ...address, ...updatedShippingDetailsAddress } // update default address if already exist
          //               : address
          //           )
          //         }
          //  } 

           const selectedAddress = updatedShippingDetails.addresses.find(val => val.id === currentAddressId);
           
           if (this.customer.default_shipping) updatedShippingDetailsAddress['default_shipping'] = true;
           if (this.customer.default_billing) updatedShippingDetailsAddress['default_billing'] = true;
           
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


// Update Shipping
//     updateDetails () {
//       let updatedShippingDetails
//       // if (!this.objectsEqual(this.customer, this.getShippingDetails())) {
//             updatedShippingDetails = JSON.parse(JSON.stringify(this.$store.state.user.current))
//             let updatedShippingDetailsAddress = {
//               firstname: this.customer.firstName,
//               lastname: this.customer.lastName,
//               street: [this.customer.street, this.customer.house],
//               city: this.customer.city,
//               ...(this.customer.region ? { region: { region: this.customer.region } } : {}),
//               country_id: this.customer.country,
//               postcode: this.customer.postcode,
//               ...(this.customer.phone ? { telephone: this.customer.phone } : {})
//             }


//            if (this.customer.default_shipping ) {
//               if (this.currentUser.hasOwnProperty('default_shipping')) {
//                   if (this.currentUser.addresses.length === 0) {
//                     updatedShippingDetails = null
//                   } else {
//                     updatedShippingDetails.addresses = updatedShippingDetails.addresses.map((address) =>
//                       toString(address.id) === toString(this.currentUser.default_shipping)
//                         ? { ...address, ...updatedShippingDetailsAddress } // update default address if already exist
//                         : address
//                     )
//                   }
//               }
//            }
      
//            if (this.customer.default_billing ) {
//               if (this.currentUser.hasOwnProperty('default_billing')) {
//                   if (this.currentUser.addresses.length === 0) {
//                     updatedShippingDetails = null
//                   } else {
//                     updatedShippingDetails.addresses = updatedShippingDetails.addresses.map((address) =>
//                       toString(address.id) === toString(this.currentUser.default_billing)
//                         ? { ...address, ...updatedShippingDetailsAddress } // update default address if already exist
//                         : address
//                     )
//                   }
//               } 
//           }


//          if (!this.customer.default_billing && !this.customer.default_shipping ) {
//             // else {
//               // create default address
//               updatedShippingDetails.addresses.push(updatedShippingDetailsAddress)
//             // }
//           }
//       // }
//       this.exitSection(null, updatedShippingDetails)
//     },

// // Update Billing
//     updateProfile () {
//       let updatedProfile
//       if (!this.objectsEqual(this.currentUser, this.$store.state.user.current, ['updated_at', 'addresses']) ||
//         !this.objectsEqual(this.userCompany, this.getUserCompany()) ||
//         (this.userCompany.company && !this.addCompany)
//       ) {
//         updatedProfile = JSON.parse(JSON.stringify(this.$store.state.user.current))
//         // updatedProfile.firstname = this.currentUser.firstname
//         // updatedProfile.lastname = this.currentUser.lastname
//         // updatedProfile.email = this.currentUser.email
//         if (updatedProfile.hasOwnProperty('default_billing')) {
//           let index
//           for (let i = 0; i < updatedProfile.addresses.length; i++) {
//             if (toString(updatedProfile.addresses[i].id) === toString(updatedProfile.default_billing)) {
//               index = i
//             }
//           }
//           if (index >= 0) {
//             if (this.addCompany) {
//               updatedProfile.addresses[index].firstname = this.currentUser.firstname || ''
//               updatedProfile.addresses[index].lastname = this.currentUser.lastname || ''
//               updatedProfile.addresses[index].company = this.userCompany.company || ''
//               updatedProfile.addresses[index].street = [this.userCompany.street, this.userCompany.house] || ['', '']
//               updatedProfile.addresses[index].city = this.userCompany.city || ''
//               updatedProfile.addresses[index].region = {
//                 region: this.userCompany.region ? this.userCompany.region : null
//               }
//               updatedProfile.addresses[index].country_id = this.userCompany.country || ''
//               updatedProfile.addresses[index].postcode = this.userCompany.postcode.toString() || ''
//               updatedProfile.addresses[index].vat_id = this.userCompany.taxId.toString() || ''
//               updatedProfile.addresses[index].telephone = this.userCompany.phone.toString() || ''
//             } else {
//               updatedProfile.addresses.splice(index, 1)
//               this.userCompany = {
//                 company: '',
//                 street: '',
//                 house: '',
//                 city: '',
//                 region: '',
//                 country: '',
//                 postcode: '',
//                 taxId: '',
//                 phone: ''
//               }
//             }
//           }
//         } else if (this.addCompany) {
//           updatedProfile.addresses.push({
//             firstname: this.currentUser.firstname,
//             lastname: this.currentUser.lastname,
//             company: this.userCompany.company,
//             street: [this.userCompany.street, this.userCompany.house],
//             city: this.userCompany.city,
//             ...(this.userCompany.region ? { region: { region: this.userCompany.region } } : {}),
//             country_id: this.userCompany.country,
//             postcode: this.userCompany.postcode.toString(),
//             vat_id: this.userCompany.taxId.toString(),
//             telephone: this.userCompany.phone.toString(),
//             default_billing: true
//           })
//         }
//       }

//       this.exitSection(null, updatedProfile)
//     },
  }
}
