/*
 * Rule to discount a product when you buy certain amount of it
 */
export const buyAmountDiscountRule =
  ({ discountProductCode, noToGetDiscount, discountPrice, discountComment }) =>
  (products) => {
    let productsFound = 0;
    const newProducts = products.map((product) => {
      if (product.sku === discountProductCode) {
        productsFound++;
      }
      if (productsFound === noToGetDiscount) {
        productsFound = 0;
        return {
          ...product,
          price: discountPrice,
          comment: discountComment,
        };
      }
      return product;
    });
    return newProducts;
  };

/*
 * When you bulk buy a certain amount of products they are all discounted
 */
export const bulkBuyDiscountRule =
  ({ discountProductCode, noToGetDiscount, discountPrice, discountComment }) =>
  (products) => {
    let discountProductsFound = 0;
    const newProducts = products.map((product) => {
      if (product.sku === discountProductCode) {
        discountProductsFound++;
        return {
          ...product,
          price: discountPrice,
          comment: discountComment,
        };
      }
      return {
        ...product,
      };
    });
    if (discountProductsFound > noToGetDiscount) {
      return newProducts;
    }
    return products;
  };

/*
 * Discount product when purchasing a related product
 */
export const discountProductWithPurchaseRule =
  ({
    discountProductCode,
    discountProductName,
    purchaseProductCode,
    discountPrice,
    discountComment,
  }) =>
  (products) => {
    const noFreeProducts = products.reduce((acc, curr) => {
      if (curr.sku === purchaseProductCode) {
        return acc + 1;
      }
      return acc;
    }, 0);
    // console.log('noFreeproducts', noFreeproducts);

    let freeProductsLeft = noFreeProducts;
    const productsAfterAddingFree = products.map((product) => {
      if (freeProductsLeft > 0 && product.sku === discountProductCode) {
        // console.log('add free product');
        freeProductsLeft--;
        return {
          ...product,
          price: discountPrice,
          comment: discountComment,
        };
      }
      return {
        ...product,
      };
    });
    // console.log('freeproductsLeft', freeproductsLeft);
    // console.log('productsAfterAddingFree', productsAfterAddingFree);
    if (freeProductsLeft === 0) {
      return productsAfterAddingFree;
    }

    const leftoverFree = Array(freeProductsLeft)
      .fill()
      .map(() => {
        // console.log('product', product)
        return {
          sku: discountProductCode,
          name: discountProductName,
          price: discountPrice,
          comment: discountComment,
        };
      });
    // console.log('leftoverFree', leftoverFree);
    const newProducts = [...productsAfterAddingFree, ...leftoverFree];
    // console.log('newproducts', newproducts);
    return newProducts;
  };
