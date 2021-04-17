<template>
   <!-- <div style="width: auto;height:auto;width: auto;margin-left:10px;" 
   class="gift-card"> 

     <h1> Gift card </h1>
     <add-to-cart-quick-prod-btn  v-if="product !== null"
        :product="product"  
        class="cart-icon" :addtocarttype="'Text-Only'" />    -->
<div  class="container-fluid">     
     <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" :active-route="'Gift card'" />
   <section class="pt-2 pl-20 pr-10 content-mob-section">
     <div class="row"> 
      <div  class="col-9 md:col-12 sm:col-12 card-style-div" style="overflow: hidden;">
         <div  class="flex">
          <div class="giftcard-product-media scalling-div" id="giftcard-product-media" >
            <div class="background-popup" style="cursor: pointer; -moz-transform-origin: left top;" onclick="getPreview()">
                <div id="giftcard-template-back" style="">           
                      <div class="giftcard-template-content" style="display: none; background-image: url('https://cdn.iclothing.com/media/giftvoucher/template/background/default.png');"></div>
                      <div class="giftcard-change-image-background-popup giftcard-change-image" style=" background-image: url('https://www.iclothing.com/assets/giftcardnew.png');background-repeat: no-repeat;background-size: cover;
                      ">          
                            <div class="giftcard-logo"><img src="https://cdn.iclothing.com/media/giftvoucher/pdf/logo/default/giftlogowhite.png"></div>
                            <div class="expire-day expire-day-top" id="expire-day-background" style="font-size: 10px; float: right; margin-top: 5px;margin-right: 5px; color: white; font-weight: bold; "></div> 
                            <div class="title-value giftcard-logo-background">
                                <div class="giftcard-style-color giftcard-title">Gift Card</div>
                                <div class="giftcard-value-color">
                                    <span class="giftcard-style-color">Value</span>
                                    <span class="giftcard-style-color giftcard-price-change">€{{giftCardUserValue}}.00</span>
                                </div>
                            </div>
                            <div class="from-to-barcode-background">
                                <div class="from-to">
                                    <div class="giftcard-form">
                                        <label class="giftcard-text-color" for="giftcard-from" style="color: rgb(0, 0, 0);">From:</label>
                                        <span class="giftcard-style-color giftcard-send-from" id="giftcard-from"> {{senderName}}</span>
                                    </div>
                                    <div class="giftcard-to" style="">
                                        <label class="giftcard-text-color" for="giftcard-to" style="color: rgb(0, 0, 0);">To: </label>
                                        <span class="giftcard-style-color giftcard-send-to" id="giftcard-to"> {{recipientName}} </span>
                                    </div>
                                </div>
                                <div class="giftcard-barcode">                
                                                        <div class="giftcard-number">                
                                            <span class="giftcard-style-color" style="">GIFT-XXXX-XXXX</span>
                                        </div>
                                                </div>
                            </div>
                            <div class="giftcard-box-background">
                                <div class="giftcard-text-box"
                                style="white-space: pre-line;"
                                v-html="customMessage"
                                ><pre class="giftcard-text-color giftcard-custom-message" style="color: rgb(0, 0, 0);"></pre></div>
                            </div>
                            <div class="giftcard-note-background">
                                <div class="form-note">
                                    <p class="giftcard-text-color" style="color: rgb(0, 0, 0);">T&amp;Cs:Converting to cash is not allowed. You can use the gift card code or redeem it to pay for your order at www.iclothing.com</p>
                                </div>
                            </div>

                        </div>
                </div>
              </div>
            </div>      
         </div>
      </div>
      <div  class="col-3 md:col-12 sm:col-12 card-data-div">
 <!-- right block -->
         <div class="product-name">
				<h1 itemprop="name" class="product-name-h1">Gift Card</h1>
        </div>

        <div class="price-box mt-5">
            <span class="regular-price">
                <span class="price" id="giftcard-product-price">€{{giftCardAmount}}.00</span>
            </span>
        </div>

        <div class="col-xs-12 text-left mt-8">
                <input :value="giftCardUserValue" id="amount_range"
                :min="product.gift_from" :max="product.gift_to" name="amount"
                type="number" 
                class="input-text required-entry validate-greater-than-zero form-control" 
                @change="isWithinTheLimit" > <br/>
                <span style="font-size: 12px;">
                (<span class="price"><span class="price">€{{product.gift_from}}.00</span></span> -  <span class="price">
                    <span class="price">€{{product.gift_to}}.00</span></span>)
                    </span>
        </div>

        <div class="giftcard-send-friend form-group mt-5" v-if="isGiftCardDataFetchedFlag">
            <div class="checkbox">
                <label for="send_friend label">Send Gift Card to friend<input style="margin-left: 5px;" type="checkbox" value="1" name="send_friend" id="send_friend"
                 @click="sendGiftCardToFriendFlag = !sendGiftCardToFriendFlag" >
                 </label>
            </div>
        </div>

        <div class="giftvoucher-receiver form-group mt-3" id="giftvoucher-receiver" style="" v-if="sendGiftCardToFriendFlag">
          <form @submit.prevent="addTOCartBefore" novalidate style="padding-bottom: 15px;">
            <div class="form-group">
                 <base-input
                    class="mb-3 w-full tx_bx_out"
                    type="text"
                    name="senderName"
                    v-model="senderName"
                    @blur="$v.senderName.$touch()"
                    :placeholder="'Sender name (optional)'"
                />
                
            </div>
            <div class="form-group">
                <base-input
                class="mb-3 w-full tx_bx_out"
                type="text"
                name="recipientName"
                v-model="recipientName"
                @blur="$v.recipientName.$touch()"
                :placeholder="'Recipient name'"
                :validation="{
                    condition: !$v.recipientName.required && $v.recipientName.$error,
                    text: $t('Field is required.')
                }"
              />
            </div>
            <div class="form-group">
              <base-input
                class="mb-3 w-full tx_bx_out"
                type="text"
                name="recipientEmail"
                v-model="recipientEmail"
                @blur="$v.recipientEmail.$touch()"
                :placeholder="'Recipient email address'"
                :validations="[
                    {
                    condition: !$v.recipientEmail.required && $v.recipientEmail.$error,
                    text: $t('Field is required.')
                    },
                    {
                    condition: !$v.recipientEmail.email && $v.recipientEmail.$error,
                    text: $t('Please provide valid e-mail address.')
                    }
                ]"
                />
            </div>
            <div class="form-group">
                  <base-textarea
                     class="w-full tx_bx_out"
                    type="text"
                    name="customMessage"
                    v-model="customMessage"
                    @blur="$v.customMessage.$touch()"
                    :placeholder="'Custom message'"
                    :validation="{
                        condition: !$v.customMessage.required && $v.customMessage.$error,
                        text: $t('Field is required.')
                    }"
                />
                <small>Characters Remaining: <span id="giftvoucher_char_remaining"> {{ customMessageMaxLength - customMessage.length}} </span></small>
            </div>
            <div class="form-group mt-3">
                <div class="checkbox">
                <base-checkbox
                    class="mb-3 text-black"
                    id="getEmailNotification"
                    v-model="getEmailNotification"
                    @click="getEmailNotification = !getEmailNotification"
                    @change="$v.getEmailNotification.$touch()"
                    >
                    Get notification email when your friend receives Gift Card
                </base-checkbox>
                </div>
            </div>

           <add-to-cart-quick-prod-btn  v-if="isGiftCardDataFetchedFlag"
            :product="product"   :addtocartButtonType="'submit'" 
            class="mb-2 w-full d_lgn gift-card-add-button" :addtocarttype="'Text-Only'" 
            @click.native="addTOCartBefore"  :addtocartFormValidationFlag="$v.$invalid" 
            />  
          </form>
        </div>

      <add-to-cart-quick-prod-btn  v-if="isGiftCardDataFetchedFlag && !sendGiftCardToFriendFlag"
            :product="product"  
            class="cart-icon mt-10" :addtocarttype="'Text-Only'" />  
      </div>
     </div>
   </section>
</div>               
  
</template>


<script>
import Vue from 'vue'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import AddToCartQuickProdBtn from 'theme/components/core/AddToCartQuickProdBtn.vue'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'

import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox.vue'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import BaseTextarea from 'theme/components/core/blocks/Form/BaseTextarea.vue'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'

import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'


export default {
  name: 'GiftCardPage',
  components: {
    AddToCartQuickProdBtn,
    Breadcrumbs,

    BaseCheckbox,
    BaseInput,
    BaseTextarea,
    ButtonFull,
  },
  data () {
  return {
      product: {},
      giftCardUserValue: 0,
      giftCardAmount: 0,
      isGiftCardDataFetchedFlag: false,


      sendGiftCardToFriendFlag: false,
      customMessageMaxLength: 220,

      senderName: '',
      recipientName: '',
      recipientEmail: '',
      customMessage: '',
      getEmailNotification: false 

    }
  },
  validations: {
    senderName: {

    },
    recipientName: {
      required
    },
    recipientEmail: {
      required,
      email
    },
    customMessage: {
      maxLength: maxLength(220),
      required
    },
    getEmailNotification: {

    }
  },
  computed: {
    isProductDisabled () {
      return this.disabled || formatProductMessages(this.product.errors) !== '' || this.isAddingToCart
    }
  },
  created () {
      this.getGiftCardProductData()
  },
  methods: {
      addTOCartBefore () {
        if (this.$v.$invalid) {
            this.$v.$touch()
            this.product['sendGiftCardToFrnd'] = {};
            return
        }
        const giftData = { senderName: this.senderName || '',
                           recipientName: this.recipientName || '',
                           recipientEmail: this.recipientEmail || '',
                           customMessage: this.customMessage || '',
                           getEmailNotification: this.getEmailNotification || '' 
                        };
        this.product['sendGiftCardToFrnd'] = giftData;
        console.log("Product Data ", this.product);
      },
      getGiftCardProductData () {
        let query = new SearchQuery()
        query = query.applyFilter({key: 'id', value: {'eq': 92323}})
        this.$store.dispatch('product/list', {
          query: query,
          start: 0,
          size: 1,
          updateState: false
        }).then((items) => {
            // console.log('gift card data---->', items);
            this.product = items.items[0];
            this.giftCardAmount  = this.product.gift_from;
            this.giftCardUserValue = this.product.gift_from;
            this.isGiftCardDataFetchedFlag = true;
        }, err => {
            this.isGiftCardDataFetchedFlag = false;
        });
      },
      checkGiftCardPriceAmount (addedCardAmt= 0) {
           if (this.product.gift_type == 2) {
               if ( this.product.gift_price_type == 3 ) { // Fixed Price
                    this.giftCardAmount =  (addedCardAmt*this.product.gift_price)/100;
                    this.product['price'] =  this.giftCardAmount
                } else {
                    this.giftCardAmount = 0
                }
            }
      },
      isWithinTheLimit (event) {
            const value = event.target.value
            console.log(value, this.giftCardUserValue)
            if (value>= 10 && value <= 300) {
                this.giftCardUserValue = value
                this.checkGiftCardPriceAmount(this.giftCardUserValue )
            } else {
                if(value >= this.product.gift_to) this.giftCardUserValue = this.product.gift_to
                else this.giftCardUserValue = this.product.gift_from
                this.checkGiftCardPriceAmount(this.giftCardUserValue)
            }
      }
  },

}
</script>

<style lang="scss" scoped>
.gift-card .cart-icon {
    width: 200px;
    margin-left: 10px;
    margin-top: 50px;
}
.giftcard-product-media {
    float: Left;
    width: 54%;
   /* height: 365px;
    transform-origin: top left;*/
    -webkit-transform-origin: top left;
}
#giftcard-template-back {
    width: 100%;
    float: left;
    position: relative;
}
#giftcard-template-back .giftcard-template-content {
    /* display: none; */
    height: 0px;
}
#giftcard-template-back .giftcard-change-image-background-popup {
    width: 100%;
    position: absolute;
    top: 0%;
}
.giftcard-change-image-background-popup .giftcard-logo {
    float: left;
    height: 84px;
    margin-left: 15px;
}
.giftcard-change-image-background-popup .giftcard-logo img {
    margin-bottom: 15px;
    border-radius: 0px 0px 5px 5px;
    max-height: 70px;
    float: left;
}
.giftcard-change-image img {
    height: 63px;
    max-width: 100%;
    display: inline;
}
.title-value.giftcard-logo-background {
    float: left;
    width: 100%;
    background: url(https://cdn.iclothing.com/skin/frontend/base/default/css/magestore/giftvoucher/bkg-title.png) no-repeat;
    height: 50px;
    background-size: 100%;
}
.from-to-barcode-background {
    float: left;
    width: 100%;
    margin-bottom: 5px;
}
.giftcard-box-background {
    width: 93% !important;
    height: 95px;
    padding: 5px 3%;
    margin-top: 0px !important;
    box-sizing: content-box;
    float: left;
}
.giftcard-box-background {
    overflow: hidden;
    width: 95%;
    margin: 0 auto;
}
.giftcard-note-background {
    /* margin-top: 8px; */
    float: left;
    box-sizing: content-box;
    overflow: hidden;
    text-align: center;
    vertical-align: middle;
    margin-top: 8px;
    height: 45px;
}
.giftcard-note-background .form-note {
    width: 100%;
    margin: 0 auto;
}
.giftcard-note-background .giftcard-text-color {
    font-size: 12px;
    line-height: 15px;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    text-align: left;
    padding: 0 15px;
    font-weight: 600;
    max-height: 33px;
    overflow: hidden;
}
.giftcard-logo-background .giftcard-value-color {
    float: right;
    background: url(https://cdn.iclothing.com/skin/frontend/base/default/css/magestore/giftvoucher/bkg-value.png) no-repeat left center;
    height: 50px;
    text-align: right;
    padding-right: 15px;
    padding-left: 20px;
    line-height: 48px;
}
.giftcard-logo-background .giftcard-style-color.giftcard-price-change {
    font-size: 26px;
    margin-top: 6px;
}
.giftcard-logo-background .giftcard-title {
    float: left;
    font-size: 20px;
    font-family: 'Open Sans', sans-serif;
    margin-left: 15px;
    line-height: 52px;
    font-weight: 600;
}
.from-to-barcode-background .from-to {
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    float: left;
    margin-left: 15px;
}
.from-to-barcode-background .from-to .giftcard-form {
    float: left;
    text-align: left;
    margin-top: 10px;
}
.from-to-barcode-background .from-to .giftcard-text-color {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: 600;
}
.from-to-barcode-background .from-to .giftcard-style-color {
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
}
.from-to-barcode-background .from-to .giftcard-to {
    float: left;
    text-align: left;
    clear: both;
}
.giftcard-to {
    max-height: 25px;
}
.from-to-barcode-background .giftcard-barcode {
    float: right;
    margin-right: 15px;
}
.giftcard-box-background .giftcard-text-box {
    display: inherit !important;
    background-size: 100% !important;
    width: 98% !important;
    height: 86px;
    text-align: left;
}
.giftcard-box-background .giftcard-text-box {
    background: #fff;
    border-radius: 5px;
    border: 1px solid #cccccc;
    padding: 12px;
    padding-bottom: 10px;
    padding-top: 3px;
    display: table-cell;
    vertical-align: middle;
}
.giftcard-box-background .giftcard-text-color.giftcard-custom-message {
    margin: 0;
    white-space: pre-wrap;
    max-height: 85px;
    overflow: hidden;
    font-size: 11px;
    font-family: 'Open Sans', sans-serif;
    padding: 0px 5px;
    color: black !important;
}




.product-view.giftcard-product #amount_range {
    border: 1px solid #ccc;
    border-radius: 0px;
    -moz-border-radius: 0px;
    -webkit-border-radius: 0px;
    margin-bottom: 10px;
}
#amount_range {
    width: 160px;
}
input.input-text {
    font: 500 16px/1.55 PT , brandon_grotesque, Helvetica Neue, Verdana, Arial, sans-serif;
    width: 100%;
    height: 40px !important;
    color: #000000;
    border: 1px solid #e1e1e1;
}

 .product-name h1 {
    font: 600 24px/1.35 PT, brandon_grotesque, Helvetica Neue, Verdana, Arial, sans-serif;
    font-size: 16px;
    color: #000;
    text-transform: uppercase;
}


.regular-price .price {
    font: 600 24px/1.35 PT, brandon_grotesque, Helvetica Neue, Verdana, Arial, sans-serif;
    font-size: 14px;
    padding-top: 0px;
}





.loader {
  display: inline-block;
  border: 3px solid #fff;
  border-top: 3px solid theme('colors.primary');
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader-style {
 display: inline-block;
 background: #d2c4c47d !important;
 padding: 3px 9px 0 4px;
 margin-left: -8px;
}

.scalling-div {
    transform: scale(1.76167);
    height: 643.008px;
}
@media (max-width: 320px) {
    .card-style-div {
        width: 100% !important;
        max-width: 100% !important;
        flex-basis: 100% !important;
    }
    .card-data-div {
        width: 100% !important;
        max-width: 100% !important;
        flex-basis: 100% !important;
        margin-bottom: 1.5rem;
    }

    .scalling-div {
        transform: scale(1) !important;
        height: 350px;
    }
    .giftcard-product-media{
        width: 100% !important;
    }
    .content-mob-section {
        padding-left: 5px !important;
        padding-right: 5px !important;
    } 
        .giftcard-value-color {
      height: 28px !important;
    line-height: 32px !important;

    }

    .giftcard-title {
        line-height: 27px !important;
        color: #fff !important;
    }
    .giftcard-box-background .giftcard-text-box {
        width: 93% !important;
    }
}
@media screen and (min-width: 320px) and (max-width: 375px) {
    .card-style-div {
        width: 100% !important;
        max-width: 100% !important;
        flex-basis: 100% !important;
        height: 360px !important
    }
    .card-data-div {
        width: 100% !important;
        max-width: 100% !important;
        flex-basis: 100% !important;
        margin-bottom: 1.5rem;
    }

    .scalling-div {
        transform: scale(1) !important;
        height: 350px;
    }
    .giftcard-product-media{
        width: 100% !important;
    }  
    .content-mob-section {
        padding-left: 5px !important;
        padding-right: 5px !important;
    }   
      .giftcard-value-color {
      height: 28px !important;
        line-height: 32px !important;
         color: #fff !important;
    }

        .giftcard-title {
        line-height: 27px !important;
        color: #fff !important;
    }
    .giftcard-box-background .giftcard-text-box {
        width: 93% !important;
    }    
}
@media screen and (min-width: 375px) and (max-width: 425px) {
    .card-style-div {
        width: 100% !important;
        max-width: 100% !important;
        flex-basis: 100% !important;
        height: 360px !important;
    }
    .card-data-div {
        width: 100% !important;
        max-width: 100% !important;
        flex-basis: 100% !important;
        margin-bottom: 1.5rem;
    }

    .scalling-div {
        transform: scale(1) !important;
        height: 350px;       
    }
    .giftcard-product-media{
        width: 100% !important;
    }  
    .content-mob-section {
        padding-left: 10px !important;
        padding-right: 10px !important;
    }   
       .giftcard-value-color {
        height: 32px !important;
        line-height: 36px !important;
        color: #fff !important;
    }

    
    .giftcard-title {
        line-height: 36px !important;
        color: #fff !important;
    }
    .giftcard-box-background .giftcard-text-box {
        width: 93% !important;
    }    
}
@media screen and (min-width: 425px) and (max-width: 768px) {
    .card-style-div {
        width: 100% !important;
        max-width: 100% !important;
        flex-basis: 100% !important;
    }
    .card-data-div {
        width: 100% !important;
        max-width: 100% !important;
        flex-basis: 100% !important;
        margin-bottom: 1.5rem;
    }

    .scalling-div {
        transform: scale(1) !important;
        height: 350px;
    }
   .giftcard-product-media{
        width: 100% !important;
    }   
    .content-mob-section {
        padding-left: 5px !important;
        padding-right: 5px !important;
    } 

    .giftcard-value-color {
        height: 36px !important;
        line-height: 40px !important;
        color: #fff !important;
    }

    .giftcard-title {
        line-height: 40px !important;
        color: #fff !important;
    }

    .giftcard-logo-background .giftcard-value-color { 
        height: 50px !important;
        line-height: 60px !important;
    }
}

.giftcard-style-color {
    color: #fff !important;
}
#giftcard-from.giftcard-style-color,#giftcard-to.giftcard-style-color{
    color: #5a5a5a !important;
}
 .giftcard-title {
           color: #fff !important;
    }

 .giftcard-text-color {
      color: #000 !important;
 }

@media screen and (min-width: 768px) and (max-width: 1024px) {

    .giftcard-value-color {
         height: 32px !important;
        line-height: 40px !important;
    }

    .giftcard-title {
        line-height: 36px  !important;
    }

    .content-mob-section {
        padding-left: 21px !important;
        padding-right: 21px !important;
    }
}

@media (min-width: 1440px) {
 .scalling-div {
        transform: scale(1.82) !important;
    }
    .giftcard-box-background {
        padding: 5px 2%;
    }
}
@media screen and (min-width: 1910px) {
    .pt-2.pl-20.pr-10.content-mob-section{
        padding-right: 350px !important;
        padding-left: 350px !important;
    }
    .col-9.card-style-div{
        flex-basis: 70%;
        max-width: 70%;
        .flex{
            padding: 20px;
        }
    }
    .col-3.card-data-div{
        flex-basis: 30%;
        max-width: 30%;         
        padding: 50px;                       
    }
}

</style>
