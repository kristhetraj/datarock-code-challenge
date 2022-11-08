import { itemMap } from './db.js';
import { getCheckout } from './checkout.js';
import { pricingRules } from './prices.js';

export const scanner = (items) => {
  const checkout = getCheckout(pricingRules);

  items.forEach((item) => {
    checkout.scan(item);
  });

  return checkout.total();
};

const bootstrap = async () => {
  scanner([]);
};

bootstrap();
