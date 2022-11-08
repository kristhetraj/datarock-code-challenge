import { productMap } from './products.js';
import { getCheckout } from './checkout.js';
import { pricingRules } from './prices.js';

export const scanner = (products) => {
  const checkout = getCheckout(pricingRules);

  products.forEach((product) => {
    checkout.scan(product);
  });

  return checkout.total();
};

const bootstrap = async () => {
  scanner([productMap.atv]);
};

bootstrap();
