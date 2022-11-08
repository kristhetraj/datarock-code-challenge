import { itemMap } from './db.js';
import { scanner } from './index.js';

test('scenario 1', () => {
  const { totalPrice } = scanner([
    itemMap.atv,
    itemMap.atv,
    itemMap.atv,
    itemMap.vga,
  ]);

  expect(totalPrice).toBe(249.0);
});

test('scenario 1, extra apple tv', () => {
  const { totalPrice } = scanner([
    itemMap.atv,
    itemMap.atv,
    itemMap.atv,
    itemMap.vga,
    itemMap.atv,
    itemMap.atv,
  ]);

  expect(totalPrice).toBe(468);
});

test('scenario 1, double discount', () => {
  const { totalPrice } = scanner([
    itemMap.atv,
    itemMap.atv,
    itemMap.atv,
    itemMap.vga,
    itemMap.atv,
    itemMap.atv,
    itemMap.atv,
  ]);

  expect(totalPrice).toBe(468);
});

test('scenario 2', () => {
  const { totalPrice } = scanner([
    itemMap.atv,
    itemMap.ipd,
    itemMap.ipd,
    itemMap.atv,
    itemMap.ipd,
    itemMap.ipd,
    itemMap.ipd,
  ]);

  expect(totalPrice).toBe(2718.95);
});

test('scenario 2, exactly 4', () => {
  const { totalPrice } = scanner([
    itemMap.atv,
    itemMap.ipd,
    itemMap.ipd,
    itemMap.atv,
    itemMap.ipd,
    itemMap.ipd,
  ]);

  expect(totalPrice).toBe(2418.96);
});

test('scenario 2, lots', () => {
  const { totalPrice } = scanner([
    itemMap.atv,
    itemMap.ipd,
    itemMap.ipd,
    itemMap.atv,
    itemMap.ipd,
    itemMap.ipd,
    itemMap.ipd,
    itemMap.ipd,
    itemMap.ipd,
    itemMap.ipd,
  ]);

  expect(totalPrice).toBe(4218.92);
});

test('scenario 3', () => {
  const { totalPrice } = scanner([itemMap.mbp, itemMap.vga, itemMap.ipd]);

  expect(totalPrice).toBe(1949.98);
});

test('scenario 3, extra vga, no discount', () => {
  const { totalPrice } = scanner([
    itemMap.mbp,
    itemMap.vga,
    itemMap.ipd,
    itemMap.vga,
    itemMap.vga,
    itemMap.vga,
  ]);

  expect(totalPrice).toBe(2039.98);
});

test('scenario 3, extra macbook, add free vga', () => {
  const { totalPrice, items } = scanner([
    itemMap.mbp,
    itemMap.vga,
    itemMap.ipd,
    itemMap.mbp,
    itemMap.mbp,
  ]);
  expect(totalPrice).toBe(4749.96);
  expect(items.length).toBe(7);
});
