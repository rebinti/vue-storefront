import { EventViewContent } from "../types/events";
import config from "config";

export default (fbq, product, currency) => {
  const track = (body: EventViewContent) => {
    fbq("track", "ViewContent", body);
  };

  track({
    content_ids:
      config.facebookPixel.useParentSku && product.parentSku
        ? product.parentSku
        : product.sku,
    content_name: product.name,
    content_type: "product",
    currency,
    value: product.priceInclTax
  });
};
