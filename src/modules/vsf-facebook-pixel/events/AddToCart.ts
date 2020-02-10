import { EventAddToCart } from "../types/events";
import config from "config";

export default (fbq, currency, product) => {
  const track = (body: EventAddToCart) => {
    fbq("track", "AddToCart", body);
  };

  const pr = product.product;
  track({
    content_ids:
      config.facebookPixel.useParentSku && pr.parentSku ? pr.parentSku : pr.sku,
    content_name: pr.name,
    value: pr.priceInclTax * pr.qty,
    currency,
    content_type: "product"
  });
};
