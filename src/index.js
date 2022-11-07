import {
  buyAmountDiscountRule,
  bulkBuyDiscountRule,
  discountItemWithPurchaseRule,
} from './rules.js';
import { getCheckout } from './checkout.js';
import { itemMap } from './db.js';

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

const pricingRules = [appleTvRule, superIpadRule, freeVgaAdapter];

const bootstrap = async () => {
  const checkout = getCheckout(pricingRules);

  // #1
  // console.log('scenario 1');
  // checkout.scan(itemMap.atv);
  // checkout.scan(itemMap.atv);
  // checkout.scan(itemMap.atv);
  // checkout.scan(itemMap.vga);

  // #2
  // console.log('scenario 2');
  // checkout.scan(itemMap.atv);
  // checkout.scan(itemMap.ipd);
  // checkout.scan(itemMap.ipd);
  // checkout.scan(itemMap.atv);
  // checkout.scan(itemMap.ipd);
  // checkout.scan(itemMap.ipd);
  // checkout.scan(itemMap.ipd);

  // #3
  console.log('scenario 3');
  checkout.scan(itemMap.mbp);
  checkout.scan(itemMap.vga);
  checkout.scan(itemMap.ipd);

  checkout.total();
};

bootstrap();
