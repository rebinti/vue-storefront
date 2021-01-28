<template>
  <div class="mb-8">
    <!-- My orders header -->
    <div class="row mb-4">
      <div class="col-12 sm:col-6">
        <h2 class="mb-1 align-C">
          {{ $t('My orders') }}
        </h2>
      </div>
    </div>
    <!-- My orders body -->
    <div class="row">
      <div class="col-12" v-show="!isHistoryEmpty">

        <div class="thanks_page_mbl inner_prd_box bg-gray">
           <div class="inner_thanks_bottom"  v-for="order in ordersHistory" :key="order.entity_id">
            <h2 style="padding-left:5px;"> {{ formatDate (order.created_at)  }}</h2>
             <router-link :to="localizedRoute(`/my-account/orders/${order.entity_id}`)">
            <div class="inner_prd_box">

              <div class="inner_prd_box_item" style="clear: both;">

                      <div class="inner_prd_box_top">

                          <span class="prd_ordr_id"  >Order ID : {{ order.entity_id }}</span>
                          <span class="prd_ordr_id_it"> {{order.items.length}} Items</span>

                      </div>
                      <div class="inner_prd_box_middle-wrap" style="overflow: scroll; max-height: 250px; clear: both;">
                        <div class="inner_prd_box_middle"  style="margin-bottom: 15px;" v-for="item in skipGrouped(order.items)" :key="item.item_id"> 
                        
                          <div class="prd_bx_pic">
                            <img v-lazy="thumbnail(item.thumbnail)"  alt="" title="">
                          </div>
                          <div class="prd_bx_pic_cnt">
                          
                          <h5>{{ item.name }}</h5>
                          <div class="prd_bx_details_sec">Item ID:  {{ item.sku }}</div>

                          <div  class="prd_bx_details_sec">
                            <!-- Color:<span class="opv text-grey-dark" > Red </span> -->
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
                          {{ item.price_incl_tax | price }} *    {{ item.qty_ordered }}
                          </div>


                          </div>

                        </div>
                      </div>

              </div>

              <div class="inner_prd_price_bx">

                  <div class="p_box_item">
                      <span class="p_box_p_label">Sub-total</span>
                      <span class="p_box_p_size">{{ order.subtotal | price }}</span>
                  </div>

                  <div class="p_box_item">
                      <span class="p_box_p_label">Shipping</span>
                      <span class="p_box_p_size">{{ order.shipping_amount | price }}</span>
                  </div>

                  <div class="p_box_item">
                      <span class="p_box_p_label">Tax</span>
                      <span class="p_box_p_size red_val">{{ order.tax_amount + order.discount_tax_compensation_amount | price }}</span>
                  </div>

                  <div class="p_box_item">
                      <span class="p_box_p_label">Discount</span>
                      <span class="p_box_p_size red_val">{{ order.discount_amount | price }}</span>
                  </div>

                  <div class="p_box_item pr_box">
                      <span class="p_box_p_label">Grand total</span>
                      <span class="p_box_p_size">{{ order.grand_total | price }}</span>
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
             </router-link>
                </div>

            </div>
        

        <table class="border mb_hide">
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
              <td>{{ order.increment_id }}</td>
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
                    <router-link class="text-grey-dark hover:text-black block py-2 px-4" :to="localizedRoute(`/my-account/orders/${order.entity_id}`)">
                      {{ $t('View order') }}
                    </router-link>                  
                  <!-- <i class="material-icons text-grey leading-4 cursor-pointer">more_horiz</i>
                  <div class="dropdown-content bg-grey-lighter shadow">
                    <router-link class="text-grey-dark hover:text-black block py-2 px-4" :to="localizedRoute(`/my-account/orders/${order.entity_id}`)">
                      {{ $t('View order') }}
                    </router-link>
                    <a href="#" class="text-grey-dark hover:text-black block py-2 px-4" @click.prevent="remakeOrder(skipGrouped(order.items))">{{ $t('Remake order') }}</a>
                  </div> -->
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
  mixins: [MyOrders],
  methods: {
    thumbnail (image) {
      return this.getThumbnail(image, 150, 150)
    },
    skipGrouped (items) {
      return items.filter((item) => {
        return !item.parent_item_id
      })
    },
    formatDate(date) {
        let d = new Date(date);
        let month =  d.toLocaleString('default', { month: 'long' }).slice(0,3);
        let day = d.getDate();
        if (day.length < 2) day = '0' + day;
        return month + ' ' + day + ',' + ' ' + d.getFullYear();
    }

 }
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





     .thanks_page_dsk{
    display: none; 
  }

/* for edit purpose */
  .thanks_page_mbl{
    display: block; 
  }
  .thanks_page_mbl.inner_prd_box.bg-gray {
    background:#fafafa;
  }
  .bg-gray .inner_thanks_bottom h2 {
      font-weight: 600;
      font-family: Roboto, system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  .thanks_page_mbl.inner_prd_box.bg-gray .inner_thanks_bottom .inner_prd_box {
    margin:3% 2% 7%;
  }
  .thanks_page_mbl.bg-gray .inner_thanks_bottom .inner_prd_box .inner_prd_box_item .inner_prd_box_middle .prd_bx_pic {
    text-align:center;
    border:1px solid #fff5f5;
    padding:5px;
  }

  .thanks_page_mbl.bg-gray .inner_thanks_bottom .inner_prd_box .inner_prd_box_item .inner_prd_box_middle .prd_bx_pic img {
    width:50px; display:block;
    margin: auto; 
  }
  .thanks_page_mbl.bg-gray .inner_thanks_bottom .inner_prd_box {
    padding: 5px 10px;
  }
  .align-C { text-align: center; }
  // .thanks_page_dsk{
  //   display: block; 
  // }
/*  ---- */
  .thanks_page_mbl{
    min-height:510px;
    position: relative;
    background: #e9e9e9;
    .inner_thanks_page{
      width:100%;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      position: absolute;
      left:0px;
      text-align: center;
      .svg-inline--fa{
        color:#17e3c8;
        font-size:40px;
      }
      h3{
        font-size:30px;
        color:#000;
        font-weight: bold;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      h6{
        font-size:12px;
        color:#7c7c7c;
        padding-bottom: 10px;
        font-weight: 600;
        letter-spacing: 1px;
      }
    }

    .inner_thanks_top{
      width:100%;
      float: left;
    }
    
    .inner_thanks_bottom{
      width:100%;
      float: left;
      .inner_prd_box{
        width:96%;
        float: left;
        padding: 10px;
        margin: 5% 2%;
        background: #ffffff;
       -webkit-box-shadow: -1px -1px 15px 0px #cccccc;
        -moz-box-shadow: -1px -1px 15px 0px #cccccc;
        box-shadow: -1px -1px 15px 0px #cccccc;
        -webkit-border-radius: 3px;
          -moz-border-radius: 3px;
          border-radius: 3px;
        .inner_prd_box_item{
          width:100%;
          float: left;

          .inner_prd_box_top{
            width:100%;
            float: left;
            padding-bottom: 10px;

            .prd_ordr_id{
              float: left;
              color:#7f7f7f;
              font-size:11px;
            }
            .prd_ordr_id_it{
              float: right;
              color:#7f7f7f;
              font-size:11px;
            }
          }
          .inner_prd_box_middle{
            width:100%;
            float: left;
            .prd_bx_pic{
              width:30%;
              float:left;
            }
            .prd_bx_pic_cnt{
              width:65%;
              float:left;
              padding-left: 15px;
              text-align: left;
              h5{
                color:#000;
                font-size: 16px;
                font-weight: 500;
                line-height: 18px;
                margin-bottom: 5px;
              }
              .prd_bx_details_sec{
                font-size:11px;
                line-height: 14px;
                color:#7f7f7f;
                padding-top: 2px;
              }
              .prd_bx_details_right{
                text-align: right;
                font-size:11px;
                line-height: 14px;
                color:#7f7f7f;
                b{
                  font-size:13px;
                  font-weight: bold;
                  color:#000;
                  line-height: 12px;
                }
              }
            }
          }
        }
        .inner_prd_price_bx{
          width:100%;
          float: left;
          border-top:1px solid #cccccc;
          margin-top: 15px;
          padding-top: 15px;
          .p_box_item{
            width:100%;
            float: left;
            font-size:11px;
            line-height: 13px;
            color:#7f7f7f;
            margin-bottom: 8px;
            .p_box_p_label{
              width:50%;
              float: left;
              text-align: left;
            }
            .p_box_p_size{
              width:50%;
              float: left;
              text-align: right;
              &.red_val{
                color:#f10;
              }
            }
            &.pr_box{
              font-size:15px;
              line-height: 17px;
              color: #000;
              font-weight: bold;
              padding-top: 10px;
            }
          }
        }
      }
    }
  }

}

</style>