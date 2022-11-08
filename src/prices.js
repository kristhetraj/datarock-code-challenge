import {
  buyAmountDiscountRule,
  bulkBuyDiscountRule,
  discountProductWithPurchaseRule,
} from './rules.js';

const appleTvRule = buyAmountDiscountRule({
  discountProductCode: 'atv',
  noToGetDiscount: 3,
  discountPrice: 0,
  discountComment: 'By 2 get 1 Free',
});

const superIpadRule = bulkBuyDiscountRule({
  discountProductCode: 'ipd',
  noToGetDiscount: 4,
  discountPrice: 499.99,
  discountComment: 'Bulk buy discount',
});

const freeVgaAdapter = discountProductWithPurchaseRule({
  discountProductCode: 'vga',
  discountProductName: 'VGA adapter',
  purchaseProductCode: 'mbp',
  discountPrice: 0,
  discountComment: 'Free VGA with every MacBook',
});

export const pricingRules = [appleTvRule, superIpadRule, freeVgaAdapter];
