import { expect, it } from 'vitest';
import { sum } from '../calculator';

it('should return the sum of two numbers', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(2, 2)).toBe(4);
});
