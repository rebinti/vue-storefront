<template>
  <div class="mb-8">
    <div class="desktop-view mb_hide">
      <!-- My order header -->
      <div class="row mb-4">
        <div class="col-12 sm:col-6">
          <h2 class="mb-1">
            {{ $t('Order #') }}{{ order.entity_id }}
            <span
              class="border py-1 px-2 ml-5 text-sm leading-sm text-grey-dark"
            >{{ order.status | capitalize }}</span>
          </h2>
        </div>
      </div>
      <!-- My order body -->
      <div class="row mb-5">
        <div class="col-12 text-h4">
          <p>{{ order.created_at | date('MMMM D, YYYY') }}</p>
          <p class="mt-8">
            <a
              href="#"
              class="underline"
              @click.prevent="remakeOrder(skipGrouped(order.items))"
            >{{ $t('Remake order') }}</a>
          </p>
        </div>
      </div>
      <div class="row mb-8">
        <div class="col-12 text-h4">
          <h4>{{ $t('Items ordered') }}</h4>
          <table>
            <thead class="border">
              <tr>
                <th>{{ $t('Product Name') }}</th>
                <th>{{ $t('SKU') }}</th>
                <th>{{ $t('Price') }}</th>
                <th>{{ $t('Qty') }}</th>
                <th>{{ $t('Subtotal') }}</th>
              </tr>
            </thead>
            <tbody class="border">
              <tr class="border-t" v-for="item in skipGrouped(order.items)" :key="item.item_id">
                <td :data-th="$t('Product Name')">{{ item.name }}</td>
                <td :data-th="$t('SKU')">{{ item.sku }}</td>
                <td :data-th="$t('Price')">{{ item.price_incl_tax | price }}</td>
                <td class="text-right" :data-th="$t('Qty')">{{ item.qty_ordered }}</td>
                <td :data-th="$t('Subtotal')">{{ item.row_total_incl_tax | price }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t">
                <td colspan="4" class="text-right">{{ $t('Subtotal') }}</td>
                <td>{{ order.subtotal | price }}</td>
              </tr>
              <tr>
                <td colspan="4" class="text-right">{{ $t('Shipping') }}</td>
                <td>{{ order.shipping_amount | price }}</td>
              </tr>
              <tr>
                <td colspan="4" class="text-right">{{ $t('Tax') }}</td>
                <td>{{ order.tax_amount + order.discount_tax_compensation_amount | price }}</td>
              </tr>
              <tr v-if="order.discount_amount">
                <td colspan="4" class="text-right">{{ $t('Discount') }}</td>
                <td>{{ order.discount_amount | price }}</td>
              </tr>
              <tr>
                <td colspan="4" class="text-right">{{ $t('Grand total') }}</td>
                <td>{{ order.grand_total | price }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="row mb-8">
        <div class="col-12 text-h4 mb-2">
          <h4>{{ $t('Order informations') }}</h4>
          <div class="row">
            <div class="sm:col-6 md:col-3 mb-3">
              <h5>{{ $t('Shipping address') }}</h5>
              <address>
                <p class="name-row">{{ shippingAddress.firstname }} {{ shippingAddress.lastname }}</p>
                <p>{{ shippingAddress.street[0] }} {{ shippingAddress.street[1] }}</p>
                <p>{{ shippingAddress.postcode }} {{ shippingAddress.city }}</p>
                <p>{{ shippingAddress.country }}</p>
              </address>
            </div>
            <div class="sm:col-6 md:col-3 mb-3">
              <h5>{{ $t('Shipping method') }}</h5>
              <p>{{ order.shipping_description }}</p>
            </div>
            <div class="sm:col-6 md:col-3 mb-3">
              <h5>{{ $t('Billing address') }}</h5>
              <address>
                <p class="name-row">{{ billingAddress.firstname }} {{ billingAddress.lastname }}</p>
                <p>{{ billingAddress.street[0] }} {{ billingAddress.street[1] }}</p>
                <p>{{ billingAddress.postcode }} {{ billingAddress.city }}</p>
                <p>{{ billingAddress.country }}</p>
              </address>
            </div>
            <div class="sm:col-6 md:col-3 mb-3">
              <h5>{{ $t('Payment method') }}</h5>
              <p>{{ paymentMethod }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- mobile design -->
    <div>
          <!-- My orders header -->
      <div class="row mb-4">
        <div class="col-12 sm:col-6">
          <h2 class="mb-1 align-C">
            {{ $t('My orders') }}
          </h2>
        </div>
      </div>
      <div class="thanks_page_mbl inner_prd_box bg-gray">
        <div class="inner_thanks_bottom">
           <h2>Items</h2>
          <div class="inner_prd_box">
            <div
              class="inner_prd_box_item"
              style="overflow: scroll;clear: both; max-height: 285px;"
            >
              <div class="inner_prd_box_top">
                <span class="prd_ordr_id">Order ID : {{ order.entity_id }}</span>
                <span class="prd_ordr_id_it">{{order.items.length}} Items</span>
              </div>
              <div
                class="inner_prd_box_middle"
                style="margin-bottom: 15px;"
                v-for="item in skipGrouped(order.items)"
                :key="item.item_id"
              >
                <div class="prd_bx_pic">
                  <img v-lazy="thumbnail(item.thumbnail)" alt title />
                </div>
                <div class="prd_bx_pic_cnt">
                  <h5>Shirt</h5>
                  <div class="prd_bx_details_sec">Item ID: {{ item.sku }}</div>

                  <div class="prd_bx_details_sec">
                    <!-- Color:<span class="opv text-grey-dark" > Red </span> -->
                  </div>

                  <div class="prd_bx_details_right">
                    {{ item.price_incl_tax | price }} * {{ item.qty_ordered }}
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

              </div>

          </div>
        </div>


        <div class="inner_thanks_bottom">
           <h2>{{ $t('Shipping address') }}</h2>
          <div class="inner_prd_box">
            <div class="inner_prd_box_item" style="overflow: scroll;clear: both; max-height: 285px;">
              <div class="address-info-row">
                <div class="inner_prd_box_top">
                  <img src="/assets/map-pointer.png" />
                </div>
                <div  class="inner_prd_box_middle" style="margin-bottom: 15px;">
                  <address>          
                    <p class="name-row">{{ shippingAddress.firstname }} {{ shippingAddress.lastname }}</p>
                    <p>{{ shippingAddress.street[0] }} {{ shippingAddress.street[1] }}</p>
                    <p>{{ shippingAddress.postcode }} {{ shippingAddress.city }}</p>
                    <p>{{ shippingAddress.country }}</p>
                  </address>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="inner_thanks_bottom">
           <h2>{{ $t('Shipping method') }}</h2>
          <div class="inner_prd_box">
            <div
              class="inner_prd_box_item row" style="overflow: scroll;clear: both; max-height: 285px;">
              <div class="col-12 inner_prd_box_top">
                <p>{{ order.shipping_description }}</p>
              </div>
            </div>

          </div>
        </div>

        <div class="inner_thanks_bottom">
           <h2>{{ $t('Billing address') }}</h2>
          <div class="inner_prd_box">
            <div class="inner_prd_box_item" style="overflow: scroll;clear: both; max-height: 285px;">
              <div class="address-info-row">
                <div class="inner_prd_box_top">
                  <img src="/assets/map-pointer.png" /> 
                </div>
                <div class="inner_prd_box_middle" style="margin-bottom: 15px;">
                    <address>
                    <p class="name-row">{{ billingAddress.firstname }} {{ billingAddress.lastname }}</p>
                    <p>{{ billingAddress.street[0] }} {{ billingAddress.street[1] }}</p>
                    <p>{{ billingAddress.postcode }} {{ billingAddress.city }}</p>
                    <p>{{ billingAddress.country }}</p>
                  </address>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="inner_thanks_bottom">
           <h2>{{ $t('Payment method') }}</h2>
          <div class="inner_prd_box">
            <div
              class="inner_prd_box_item row"
              style="overflow: scroll;clear: both; max-height: 285px;"
            >
              <div class="col-12 inner_prd_box_top">
                 <p>{{ paymentMethod }}</p>
              </div>
            </div>

          </div>
        </div>






      </div>
    </div>
  </div>
</template>

<script>
import MyOrder from "@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrder"

export default {
  mixins: [MyOrder],
  methods: {
    thumbnail(image) {
      return this.getThumbnail(image, 150, 150);
    }
  }
};
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

  th,
  td {
    &.text-right {
      @apply text-right;

      @media (max-width: 767px) {
        @apply text-left;
      }
    }
  }

  thead {
    @media (max-width: 767px) {
      display: none;
    }
  }

  tbody {
    tr {
      @media (max-width: 767px) {
        display: block;
      }
    }

    td {
      @media (max-width: 767px) {
        display: block;
        text-align: left;
        padding: 10px 20px;
        &:before {
          content: attr(data-th) ": ";
          font-weight: 700;
        }
      }

      &:first-child {
        @media (max-width: 767px) {
          padding: 20px 20px 10px 20px;
        }
      }

      &:last-child {
        @media (max-width: 767px) {
          padding: 10px 20px 20px 20px;
        }
      }
    }
  }

  tfoot {
    tr {
      @media (max-width: 767px) {
        display: block;
      }

      &:last-child {
        td:last-child {
          padding-bottom: 20px;
        }
      }
    }

    td {
      @media (max-width: 767px) {
        display: block;
      }

      &:first-child {
        @media (max-width: 767px) {
          font-weight: 700;
          padding: 20px 20px 5px 20px;
        }
      }

      &:last-child {
        @media (max-width: 767px) {
          padding: 5px 20px 0 20px;
        }
      }
    }
  }

  i {
    vertical-align: middle;
  }
}

address {
  font-style: normal;
}

@media (min-width: 577px) {
  .wish_wrap_box {
    display: none;
  }
  .inner_prd_box {
    display: none;
  }
}

@media (max-width: 576px) {
  .mb_hide {
    display: none;
  }
  .add-now-button {
    width: 100px;
  }

  .wish_wrap_box {
    text-align: center;
  }

  .wish_ico_box {
    text-align: center;
  }
  .wish_ico_box img {
    display: inline-block;
  }
  .wish_wrap_box h4 {
    font-size: 25px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  .wish_cnt {
    text-align: center;
  }
  .wish_cnt p {
    font-size: 12px;
    margin-bottom: 15px;
  }
  .wish_cnt a {
    border: 1px solid #000;
    color: #000;
    font-weight: bold;
    display: inline-block;
    background: transparent !important;
    font-size: 15px;
    width: auto;
  }
  .wish_wrap_box {
    position: relative;
    top: 0px;
  }

  .wish_wrap_box.item-in-it {
    top: 0px;
    position: relative;
    -webkit-transform: translateY(0%);
    -ms-transform: translateY(0%);
    transform: translateY(0%);
    left: 0px;
  }

  .wishlist.wishlist_out {
    padding-left: 20px;
    padding-right: 20px;
  }

  .upper-letter {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 20px;
  }

  .thanks_page_dsk {
    display: none;
  }
  

  /* for edit purpose */
  .thanks_page_mbl {
    display: block;
  }
  .thanks_page_mbl.inner_prd_box.bg-gray {
    background: #fafafa;
  }
  .bg-gray .inner_thanks_bottom h2 {
    font-weight: 600;
    font-family: Roboto, system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    padding-left: 10px;
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
  .address-info-row { display: flex; padding:10px; align-items: center; }
  .address-info-row .inner_prd_box_top {
    float: none !important; width: auto !important;
  }
  .address-info-row .inner_prd_box_middle {
    float: none !important; width: auto !important;
    padding-left: 20px; margin-bottom: 0 !important;
  }
  address .name-row {
    font-size: 16px;
    font-weight: 600;
  }
  // .thanks_page_dsk{
  //   display: block;
  // }
  /*  ---- */
  .thanks_page_mbl {
    min-height: 510px;
    position: relative;
    background: #e9e9e9;
    .inner_thanks_page {
      width: 100%;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      position: absolute;
      left: 0px;
      text-align: center;
      .svg-inline--fa {
        color: #17e3c8;
        font-size: 40px;
      }
      h3 {
        font-size: 30px;
        color: #000;
        font-weight: bold;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      h6 {
        font-size: 12px;
        color: #7c7c7c;
        padding-bottom: 10px;
        font-weight: 600;
        letter-spacing: 1px;
      }
    }

    .inner_thanks_top {
      width: 100%;
      float: left;
    }
    .inner_thanks_bottom {
      width: 100%;
      float: left;
      .inner_prd_box {
        width: 96%;
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
        .inner_prd_box_item {
          width: 100%;
          float: left;

          .inner_prd_box_top {
            width: 100%;
            float: left;
            padding-bottom: 10px;

            .prd_ordr_id {
              float: left;
              color: #7f7f7f;
              font-size: 11px;
            }
            .prd_ordr_id_it {
              float: right;
              color: #7f7f7f;
              font-size: 11px;
            }
          }
          .inner_prd_box_middle {
            width: 100%;
            float: left;
            .prd_bx_pic {
              width: 30%;
              float: left;
            }
            .prd_bx_pic_cnt {
              width: 65%;
              float: left;
              padding-left: 15px;
              text-align: left;
              h5 {
                color: #000;
                font-size: 16px;
                font-weight: 500;
                line-height: 18px;
                margin-bottom: 5px;
              }
              .prd_bx_details_sec {
                font-size: 11px;
                line-height: 14px;
                color: #7f7f7f;
                padding-top: 2px;
              }
              .prd_bx_details_right {
                text-align: right;
                font-size: 11px;
                line-height: 14px;
                color: #7f7f7f;
                b {
                  font-size: 13px;
                  font-weight: bold;
                  color: #000;
                  line-height: 12px;
                }
              }
            }
          }
        }
        .inner_prd_price_bx {
          width: 100%;
          float: left;
          border-top: 1px solid #cccccc;
          margin-top: 15px;
          padding-top: 15px;
          .p_box_item {
            width: 100%;
            float: left;
            font-size: 11px;
            line-height: 13px;
            color: #7f7f7f;
            margin-bottom: 8px;
            .p_box_p_label {
              width: 50%;
              float: left;
              text-align: left;
            }
            .p_box_p_size {
              width: 50%;
              float: left;
              text-align: right;
              &.red_val {
                color: #f10;
              }
            }
            &.pr_box {
              font-size: 15px;
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
