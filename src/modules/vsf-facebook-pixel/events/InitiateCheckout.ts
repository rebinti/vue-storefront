import rootStore from "@vue-storefront/core/store";
import EventBus from "@vue-storefront/core/compatibility/plugins/event-bus/index";
import config from "config";

import { EventInitiateCheckout, CartItem } from "../types/events";

export default (fbq, currency) => {
  const track = (body: EventInitiateCheckout) => {
    fbq("track", "InitiateCheckout", body);
  };

  EventBus.$on("checkout-after-created", async data => {
    const content_ids: Array<string | number> = [];
    const contents: CartItem[] = [];
    let num_items: number = 0;
    rootStore.state.cart.cartItems.forEach(item => {
      content_ids.push(
        config.facebookPixel.useParentSku && item.parentSku
          ? item.parentSku
          : item.sku
      );
      contents.push({
        id:
          config.facebookPixel.useParentSku && item.parentSku
            ? item.parentSku
            : item.sku,
        quantity: item.qty,
        item_price: item.priceInclTax
      });
      num_items += Number(item.qty);
    });

    track({
      content_category: "product",
      content_type: "product",
      content_ids,
      contents,
      currency,
      num_items,
      value:
        rootStore.getters["cart/totals"][
          rootStore.getters["cart/totals"].length - 1
        ].value
    });
  });
};
