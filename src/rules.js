/*
 * Rule to discount an item when you buy certain amount of it
 */
export const buyAmountDiscountRule =
  ({ discountItemCode, noToGetDiscount, discountPrice, discountComment }) =>
  (items) => {
    let itemsFound = 0;
    const newItems = items.map((item) => {
      if (item.sku === discountItemCode) {
        itemsFound++;
      }
      if (itemsFound === noToGetDiscount) {
        itemsFound = 0;
        return {
          ...item,
          price: discountPrice,
          comment: discountComment,
        };
      }
      return item;
    });
    return newItems;
  };

/*
 * When you bulk buy a certain amount of items they are all discounted
 */
export const bulkBuyDiscountRule =
  ({ discountItemCode, noToGetDiscount, discountPrice, discountComment }) =>
  (items) => {
    let discountItemsFound = 0;
    const newItems = items.map((item) => {
      if (item.sku === discountItemCode) {
        discountItemsFound++;
        return {
          ...item,
          price: discountPrice,
          comment: discountComment,
        };
      }
      return {
        ...item,
      };
    });
    if (discountItemsFound > noToGetDiscount) {
      return newItems;
    }
    return items;
  };

/*
 * Discount item when purchasing a related item
 */
export const discountItemWithPurchaseRule =
  ({
    discountItemCode,
    discountItemName,
    purchaseItemCode,
    discountPrice,
    discountComment,
  }) =>
  (items) => {
    const noFreeItems = items.reduce((acc, curr) => {
      if (curr.sku === purchaseItemCode) {
        return acc + 1;
      }
      return acc;
    }, 0);
    // console.log('noFreeItems', noFreeItems);

    let freeItemsLeft = noFreeItems;
    const itemsAfterAddingFree = items.map((item) => {
      if (freeItemsLeft > 0 && item.sku === discountItemCode) {
        // console.log('add free item');
        freeItemsLeft--;
        return {
          ...item,
          price: discountPrice,
          comment: discountComment,
        };
      }
      return {
        ...item,
      };
    });
    // console.log('freeItemsLeft', freeItemsLeft);
    // console.log('itemsAfterAddingFree', itemsAfterAddingFree);
    if (freeItemsLeft === 0) {
      return itemsAfterAddingFree;
    }

    const leftoverFree = Array(freeItemsLeft)
      .fill()
      .map(() => {
        // console.log('item', item)
        return {
          sku: discountItemCode,
          name: discountItemName,
          price: discountPrice,
          comment: discountComment,
        };
      });
    // console.log('leftoverFree', leftoverFree);
    const newItems = [...itemsAfterAddingFree, ...leftoverFree];
    // console.log('newItems', newItems);
    return newItems;
  };
