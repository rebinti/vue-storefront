<template>
  <div class="mb-8">
    <!-- My orders header -->
    <div class="row mb-4">
      <div class="col-12 sm:col-6">
        <h2 class="mb-1">
          {{ $t('My orders') }}
        </h2>
      </div>
    </div>
    <!-- My orders body -->
    <div class="row">
      <div class="col-12" v-show="!isHistoryEmpty">

        <div class="inner_prd_box mb_hide">

              <div class="inner_prd_box_item" style="overflow: scroll;clear: both; max-height: 285px;">

                      <div class="inner_prd_box_top">

                          <span class="prd_ordr_id"  >Order ID : ffffff</span>
                          <span class="prd_ordr_id_it"> 1 Items</span>

                      </div>
                      <div class="inner_prd_box_middle"  style="margin-bottom: 15px;">
                      
                        <div class="prd_bx_pic">
                          <img src="/assets/vuetique-small-banners-4.jpg" alt="" title="">
                        </div>
                        <div class="prd_bx_pic_cnt">
                        
                        <h5>Shirt</h5>
                        <div class="prd_bx_details_sec">Item ID: Im-1234</div>

                        <div  class="prd_bx_details_sec">
                          Color:<span class="opv text-grey-dark" > Red </span>
                        </div>

                        <div class="prd_bx_details_right">
                          <!-- <b v-if="!product.totals">
                            <span class="text-error block font-medium" v-if="product.special_price">{{ product.priceInclTax * product.qty | price }} </span>
                            <span class="price-original block text-sm text-grey-dark mt-1" v-if="product.special_price">{{ product.originalPriceInclTax * product.qty | price }}</span>
                            <span v-if="!product.special_price" class="h4">{{ product.priceInclTax * product.qty | price }}</span>
                         </b> 
                         <b v-if="product.totals">
                             <span class="text-error font-medium block" v-if="product.totals.discount_amount">{{ product.totals.row_total_incl_tax - product.totals.discount_amount | price }} </span>
                             <span class="price-original block text-sm text-grey-dark mt-1" v-if="product.totals.discount_amount">{{ product.totals.row_total_incl_tax | price }}</span>
                             <span v-if="!product.totals.discount_amount" class="h4">{{ product.totals.row_total_incl_tax | price }}</span>
                         </b>  -->
                         215 *  1
                        </div>


                        </div>

                      </div>

              </div>

              <div class="inner_prd_price_bx">

                  <div class="p_box_item">
                      <span class="p_box_p_label">Sub-total</span>
                      <span class="p_box_p_size">$35.59</span>
                  </div>

                  <div class="p_box_item">
                      <span class="p_box_p_label">Delivery</span>
                      <span class="p_box_p_size">$0</span>
                  </div>

                  <div class="p_box_item">
                      <span class="p_box_p_label">Delivery</span>
                      <span class="p_box_p_size red_val">-$10</span>
                  </div>

                  <div class="p_box_item pr_box">
                      <span class="p_box_p_label">Total</span>
                      <span class="p_box_p_size">$25.59</span>
                  </div>

                 <!-- <div v-for="(segment, index) in totals" :key="index" class="p_box_item" v-if="segment.code !== 'grand_total'">
                    <span class="p_box_p_label">
                      {{ segment.title }}:
                    </span>
                    <span v-if="segment.value != null" class="p_box_p_size" :class="({ 'text-primary': (segment.code == 'discount') })">
                      {{ segment.value | price }}
                    </span>
                  </div>

                  <div class="p_box_item pr_box" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
                    <span class="p_box_p_label">
                      {{ segment.title }}:
                    </span>
                    <span class="p_box_p_size" >
                      {{ segment.value | price }}
                    </span>
                  </div> -->

              </div>



            </div>
        

        <table class="border ">
          <thead>
            <tr>
              <th>{{ $t('Order ID') }}</th>
              <th class="hidden sm:table-cell">
                {{ $t('Date and time') }}
              </th>
              <th class="hidden lg:table-cell">
                {{ $t('Author') }}
              </th>
              <th class="hidden lg:table-cell">
                {{ $t('Type') }}
              </th>
              <th class="hidden md:table-cell">
                {{ $t('Status') }}
              </th>
              <th>{{ $t('Value') }}</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t" v-for="order in ordersHistory" :key="order.entity_id">
              <td>{{ order.entity_id }}</td>
              <td class="hidden sm:table-cell">
                {{ order.created_at | date }}
              </td>
              <td class="hidden lg:table-cell">
                {{ order.customer_firstname }} {{ order.customer_lastname }}
              </td>
              <td class="hidden lg:table-cell">
                {{ $t('Purchase') }}
              </td>
              <td class="hidden md:table-cell">
                {{ order.status | capitalize }}
              </td>
              <td>{{ order.grand_total | price }}</td>
              <td>
                <span class="relative dropdown">
                  <i class="material-icons text-grey leading-4 cursor-pointer">more_horiz</i>
                  <div class="dropdown-content bg-grey-lighter shadow">
                    <router-link class="text-grey-dark hover:text-black block py-2 px-4" :to="localizedRoute(`/my-account/orders/${order.entity_id}`)">
                      {{ $t('View order') }}
                    </router-link>
                    <a href="#" class="text-grey-dark hover:text-black block py-2 px-4" @click.prevent="remakeOrder(skipGrouped(order.items))">{{ $t('Remake order') }}</a>
                  </div>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-12 text-h4" v-show="isHistoryEmpty" >



        <p class="mb_hide">{{ $t('No orders yet') }}</p>


         <div  class="wish_wrap_box">

            <div class="wish_ico_box">
              <img  src="/assets/no_order.png" alt=""/>
            </div>

           
            <h4 class="mb-2">
              {{ $t('You have No orders yet') }}
            </h4>
            <div class="wish_cnt">
              <p>Keep track of your orders and returns here </p>
              <router-link class="add-now-button block border-none rounded-none bg-grey-dark px-4 py-2 ripple tracking-md text-sm text-white font-medium leading-base mb-2 w-full"
              :to="localizedRoute('/')"
              > Shop now
              </router-link>
            </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import MyOrders from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrders'

export default {
  mixins: [MyOrders]
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;

  th {
    @apply text-xs text-grey-dark tracking-md uppercase py-3 px-4 leading-4 text-left font-medium;
  }

  td {
    @apply text-sm py-3 px-4 leading-4 text-left font-medium;
  }

  i {
    vertical-align: middle;
  }

}

.dropdown {
  @apply block -my-3 -mx-4 py-3 px-4;

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    width: 160px;
    z-index: 1;
  }

  &:hover .dropdown-content {
    display: block;
  }

}

@media (min-width: 577px) {

  .wish_wrap_box{ display: none;}
  .inner_prd_box{ display: none; }

}

@media (max-width: 576px) {

    .mb_hide{ display: none;}
    .add-now-button{
      width: 100px;
    }

    .wish_wrap_box{
      text-align: center;
    }

    .wish_ico_box{
      text-align: center;
    }
    .wish_ico_box img{
      display: inline-block;
    }
    .wish_wrap_box h4{
      font-size:25px;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 15px;
    }
    .wish_cnt{
      text-align: center;
    }
    .wish_cnt p{
      font-size:12px;
      margin-bottom: 15px;
    }
    .wish_cnt a{
      border:1px solid #000;
      color:#000;
      font-weight: bold;
      display: inline-block;
      background: transparent!important;
      font-size: 15px;
      width:auto;
    }
    .wish_wrap_box
    {
      position: relative;
      top:0px;
    }

    .wish_wrap_box.item-in-it{
      top:0px;
      position: relative;
      -webkit-transform: translateY(0%);
      -ms-transform: translateY(0%);
      transform: translateY(0%);
      left: 0px;
    }

    .wishlist.wishlist_out{
      padding-left: 20px;
      padding-right: 20px;
    }

    .upper-letter{
        font-weight: bold;
        text-transform: uppercase;
        font-size: 20px;
    }

}

</style>
