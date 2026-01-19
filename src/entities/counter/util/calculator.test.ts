import { expect, it } from 'vitest';
import { sum } from './calculator';

it('sum 함수는 두 수를 더한 값을 반환한다', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(2, 2)).toBe(4);
});
