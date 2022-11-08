import { productMap } from './products.js';
import { scanner } from './index.js';

test('scenario 1', () => {
  const { totalPrice } = scanner([
    productMap.atv,
    productMap.atv,
    productMap.atv,
    productMap.vga,
  ]);

  expect(totalPrice).toBe(249.0);
});

test('scenario 1, extra apple tv', () => {
  const { totalPrice } = scanner([
    productMap.atv,
    productMap.atv,
    productMap.atv,
    productMap.vga,
    productMap.atv,
    productMap.atv,
  ]);

  expect(totalPrice).toBe(468);
});

test('scenario 1, double discount', () => {
  const { totalPrice } = scanner([
    productMap.atv,
    productMap.atv,
    productMap.atv,
    productMap.vga,
    productMap.atv,
    productMap.atv,
    productMap.atv,
  ]);

  expect(totalPrice).toBe(468);
});

test('scenario 2', () => {
  const { totalPrice } = scanner([
    productMap.atv,
    productMap.ipd,
    productMap.ipd,
    productMap.atv,
    productMap.ipd,
    productMap.ipd,
    productMap.ipd,
  ]);

  expect(totalPrice).toBe(2718.95);
});

test('scenario 2, exactly 4', () => {
  const { totalPrice } = scanner([
    productMap.atv,
    productMap.ipd,
    productMap.ipd,
    productMap.atv,
    productMap.ipd,
    productMap.ipd,
  ]);

  expect(totalPrice).toBe(2418.96);
});

test('scenario 2, lots', () => {
  const { totalPrice } = scanner([
    productMap.atv,
    productMap.ipd,
    productMap.ipd,
    productMap.atv,
    productMap.ipd,
    productMap.ipd,
    productMap.ipd,
    productMap.ipd,
    productMap.ipd,
    productMap.ipd,
  ]);

  expect(totalPrice).toBe(4218.92);
});

test('scenario 3', () => {
  const { totalPrice } = scanner([productMap.mbp, productMap.vga, productMap.ipd]);

  expect(totalPrice).toBe(1949.98);
});

test('scenario 3, extra vga, no discount', () => {
  const { totalPrice } = scanner([
    productMap.mbp,
    productMap.vga,
    productMap.ipd,
    productMap.vga,
    productMap.vga,
    productMap.vga,
  ]);

  expect(totalPrice).toBe(2039.98);
});

test('scenario 3, extra macbook, add free vga', () => {
  const { totalPrice, products } = scanner([
    productMap.mbp,
    productMap.vga,
    productMap.ipd,
    productMap.mbp,
    productMap.mbp,
  ]);
  expect(totalPrice).toBe(4749.96);
  expect(products.length).toBe(7);
});
