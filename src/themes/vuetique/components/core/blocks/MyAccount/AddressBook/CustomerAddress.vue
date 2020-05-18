<template>

  <div class="mb15 mt20 customer-address">

    <div class="row mb-5">
      <div class="col-6 text-h4 address-box">
        <h3 class="flex"> Billing Address  
        <sub v-if="getBillingAddress">  
          <a href="#" class="text-grey flex md:justify-end" 
          style="margin-top: 8px;margin-left: 21px;" 
          @click.prevent="editAddress(getBillingAddress.id)">
                <i class="material-icons">edit</i>
                 <span class="text-grey pr5" style="margin-top: 11px;
                  text-decoration: none;
                  font-weight: 100 !important;">
              Edit Address
            </span>
           </a>
         </sub>
        </h3>
        <template v-if="getBillingAddress">
            <p class="mb15"><strong>{{ getBillingAddress.firstname }} {{ getBillingAddress.lastname }}</strong></p>
            <p v-if="getBillingAddress.company">
              {{ getBillingAddress.company }}
            </p>
            <p>
              {{ getBillingAddress.street[0] }}
              <span v-if="getBillingAddress.street[1]"> {{ getBillingAddress.street[1] }}</span>
            </p>
            <p>
              {{ getBillingAddress.city }} {{ getBillingAddress.postcode }}
            </p>
            <p>
              <span v-if="getBillingAddress.region">{{ getBillingAddress.region.region }}, </span>
              {{ getCountryName(getBillingAddress.country_id) }}
            </p>
            <div v-if="getBillingAddress.telephone">
              {{ getBillingAddress.telephone }}
            </div>
        </template >
        <template v-else>
          <p> No Address</p>
        </template>

      </div>


      <div class="col-6 text-h4 address-box">
        <h3 class="flex"> Shipping Address
          <sub v-if="getShippingAddress">  
            <a href="#" class="text-grey flex md:justify-end" 
            style="margin-top: 8px;margin-left: 21px;" 
             @click.prevent="editAddress(getShippingAddress.id)">
                  <i class="material-icons">edit</i>
                   <span class="text-grey pr5" style="margin-top: 11px;
                    text-decoration: none;
                    font-weight: 100 !important;">
                Edit Address
              </span>
             </a>
           </sub>
        </h3>
        <template v-if="getShippingAddress">
          <p class="mb15"><strong>{{ getShippingAddress.firstname }} {{ getShippingAddress.lastname }}</strong></p>
            <p v-if="getShippingAddress.company">
              {{ getShippingAddress.company }}
            </p>
            <p>
              {{ getShippingAddress.street[0] }}
              <span v-if="getShippingAddress.street[1]"> {{ getShippingAddress.street[1] }}</span>
            </p>
            <p>
              {{ getShippingAddress.city }} {{ getShippingAddress.postcode }}
            </p>
            <p>
              <span v-if="getShippingAddress.region">{{ getShippingAddress.region.region }}, </span>
              {{ getCountryName(getShippingAddress.country_id) }}
            </p>
            <div v-if="getShippingAddress.telephone">
              {{ getShippingAddress.telephone }}
            </div>
        </template >
        <template v-else>
          <p> No Address</p>
        </template>
      </div>


    </div>



    <div class="row gutter-md mb-5">
      <div class="col-xs-12 col-md-6">
        <button-full
          @click.native="openAddEditAddressPopup"
        >
         <!-- v-show="!toggleAddressForm" -->
          {{ $t('Add new address') }}
        </button-full>
      </div>
    </div>



    <div class="customer-address-list mb15" v-if="getallAddresses.length > 0">
      <h3 class="mb30">
        {{ $t('Additional Addresses') }}
      </h3>
      <div class="row gutter-md">
        <div class="col-6 col-md-6 col-sm-6 col-xs-12 mb-5" :class="'customer-address-'+ address.id" v-for="address in getallAddresses" :key="address.id">
          <div class="address-box">
            <p class="mb15"><strong>{{ address.firstname }} {{ address.lastname }}</strong></p>
            <p v-if="address.company">
              {{ address.company }}
            </p>
            <p>
              {{ address.street[0] }}
              <span v-if="address.street[1]"> {{ address.street[1] }}</span>
            </p>
            <p>
              {{ address.city }} {{ address.postcode }}
            </p>
            <p>
              <span v-if="address.region">{{ address.region.region }}, </span>
              {{ getCountryName(address.country_id) }}
            </p>
            <div v-if="address.telephone">
              {{ address.telephone }}
            </div>
          </div>
          <div class="address-action">
            <a href="javascript:void(0)" @click="editAddress(address.id)">{{ $t('Edit') }}</a>
            <a href="javascript:void(0)" @click="removeCustomerAddress(address.id)">{{ $t('Remove') }}</a>
          </div>
        </div>
      </div>
    </div>


   <!--  <address-form
      v-if="toggleAddressForm"
      @reset-toggle="resetToggle"
      :address-id="currentAddressId"
    /> -->

   <address-form-popup :address-id="currentAddressId" @reset-toggle="resetToggle" v-if="toggleAddressForm" />
  </div>

</template>
<script>

// import AddressForm from './AddressForm'
import AddressFormPopup from './AddressFormPopup'
import ButtonFull from 'theme/components/theme/ButtonFull'
import Countries from '@vue-storefront/i18n/resource/countries.json'
// import { RemoveAddress } from './RemoveAddress'
import i18n from '@vue-storefront/i18n'
import toString from 'lodash-es/toString'

export default {
  name: 'CustomerAddress',
  data () {
    return {
      toggleAddressForm: false,
      countries: Countries,
      currentAddressId: null
    }
  },
  computed: {
    getallAddresses () {
      return this.$store.state.user.current ? this.$store.state.user.current.addresses.filter(address => address.default_shipping !== true && address.default_billing !== true) : {}

      // if (this.$store.state.user.current) {
      //    this.$store.state.user.current.addresses.filter(address => {
      //       if (address.default_shipping  !== true )

      //    });
      // } else {

      // }
    },
    getBillingAddress () {
        let billId; 
        billId = this.$store.state.user && this.$store.state.user.current && this.$store.state.user.current.hasOwnProperty('default_billing') ? this.$store.state.user.current.default_billing : null
        if (billId) {
          return this.$store.state.user.current ? this.$store.state.user.current.addresses.find(address =>toString(address.id) === toString(billId)) : null
        } else {
          return null
        }
       
    },
    getShippingAddress () {
       const shipId = this.$store.state.user && this.$store.state.user.current && this.$store.state.user.current.hasOwnProperty('default_shipping') ? this.$store.state.user.current.default_shipping : null
        if (shipId) {
          return this.$store.state.user.current ? this.$store.state.user.current.addresses.find(address =>  toString(address.id) === toString(shipId)) : null
        } else {
          return null
        }
        // return this.$store.state.user.current ? this.$store.state.user.current.addresses.find(address => address.default_shipping === true) : null
    }
  },
  components: {
    ButtonFull,
    AddressFormPopup
  },
  // mixins: [ RemoveAddress ], // AddressForm
  methods: {
    resetToggle () {
      this.toggleAddressForm = false
      this.currentAddressId = null
      this.$bus.$emit('modal-hide', 'modal-addressFromPopup')
    },
    getCountryName (countryId) {
      return this.countries.filter(country => country.code === countryId)[0].name
    },
    editAddress (addressId) {
      if (this.toggleAddressForm) {
        this.toggleAddressForm = false
      }
      setTimeout(() => {
        this.toggleAddressForm = true
        this.currentAddressId = addressId
        this.$bus.$emit('modal-show', 'modal-addressFromPopup')
      }, 1)
    },
    removeCustomerAddress (addressId) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: i18n.t('Are you sure you want to remove this address?'),
        action1: { label: i18n.t('Cancel'), action: 'close' },
        action2: { label: i18n.t('OK'),
          action: () => {
            // this.removeAddress(addressId)
            this.deleteSelectedAddress(addressId);
            document.querySelector('.customer-address-' + addressId).remove()
          }
        },
        hasNoTimeout: true
      })
    },
    openAddEditAddressPopup () {
      this.toggleAddressForm = true;
      this.currentAddressId = null;
      this.$bus.$emit('modal-show', 'modal-addressFromPopup')
    },
    deleteSelectedAddress (selectedAddressId) {
        let updatedShippingDetails = JSON.parse(JSON.stringify(this.$store.state.user.current))
        const selectedAddress = updatedShippingDetails.addresses.find(val => val.id === selectedAddressId);
        updatedShippingDetails.addresses = [];
        // updatedShippingDetails.addresses.push({delete_address: true, address_id: selectedAddress.id})
        updatedShippingDetails.addresses.push({ ...selectedAddress, ...{delete_address: true, address_id: selectedAddress.id}})
        console.log('Delete Shipping Details', updatedShippingDetails);
        this.$bus.$emit('notification-progress-start', this.$t('Please wait ...'))
        this.$bus.$emit('myAccount-before-updateUser', updatedShippingDetails)
        this.$bus.$emit('modal-hide', 'modal-addressFromPopup')
        setTimeout(() => {
          this.$bus.$emit('notification-progress-stop')
        }, 400);
    }
  }
}
</script>
<style lang="scss">
.address-box {
  padding: 10px;
  min-height: 240px;
  border: 1px solid #ededed;
}
.address-action {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  border: 1px solid #ededed;
  border-top: 0;
  background: #F5F5F5;
  a {
    color: #4A4A4A;
  }
}
</style>
