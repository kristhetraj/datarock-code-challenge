export const getCheckout = (rules) => {
  let items = [];
  return {
    scan: (item) => {
      items.push(item);
      console.log('scan', { item });
    },
    total: () => {
      const itemsAfterRules = rules.reduce(
        (acc, rule) => {
          const itemsAfterRule = rule(acc);
          return [...itemsAfterRule];
        },
        [...items]
      );
      // console.log('itemsAfterRules', itemsAfterRules);
      const totalPrice = itemsAfterRules.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0);
      console.log('totalPrice', totalPrice);
    },
  };
};