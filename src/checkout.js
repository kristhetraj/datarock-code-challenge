export const getCheckout = (rules) => {
  let products = [];
  return {
    scan: (product) => {
      products.push(product);
    },
    total: () => {
      const productsAfterRules = rules.reduce(
        (acc, rule) => {
          const productsAfterRule = rule(acc);
          return [...productsAfterRule];
        },
        [...products]
      );
      const totalPrice = productsAfterRules.reduce((acc, curr) => {
        return +(acc + curr.price).toFixed(2);
      }, 0);
      // console.log('totalPrice', totalPrice);
      return { totalPrice, products: productsAfterRules };
    },
  };
};
