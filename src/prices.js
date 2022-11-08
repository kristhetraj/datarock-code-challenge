import {
  buyAmountDiscountRule,
  bulkBuyDiscountRule,
  discountItemWithPurchaseRule,
} from './rules.js';

const appleTvRule = buyAmountDiscountRule({
  discountItemCode: 'atv',
  noToGetDiscount: 3,
  discountPrice: 0,
  discountComment: 'By 2 get 1 Free',
});

const superIpadRule = bulkBuyDiscountRule({
  discountItemCode: 'ipd',
  noToGetDiscount: 4,
  discountPrice: 499.99,
  discountComment: 'Bulk buy discount',
});

const freeVgaAdapter = discountItemWithPurchaseRule({
  discountItemCode: 'vga',
  discountItemName: 'VGA adapter',
  purchaseItemCode: 'mbp',
  discountPrice: 0,
  discountComment: 'Free VGA with every MacBook',
});

export const pricingRules = [appleTvRule, superIpadRule, freeVgaAdapter];
