import { describe, it, expect } from 'vitest';
import Counter from './Counter';
import { render, screen } from '@/shared/testing-library/util/render';

describe('Counter', () => {
  it('초기 렌더링 시 카운터가 0으로 표시된다', async () => {
    await render(<Counter />);
    const valueElement = screen.getByTestId('value');
    expect(valueElement).toBeDefined();
    expect(valueElement.textContent).toBe('0');
  });

  it('- 버튼을 클릭하면 카운터가 감소한다', async () => {
    const { user } = await render(<Counter />);
    const decrementButton = screen.getByTestId('decrement');
    const valueElement = screen.getByTestId('value');

    await user.click(decrementButton);

    expect(valueElement.textContent).toBe('-1');
  });

  it('여러 번 클릭하면 카운터가 정확히 업데이트된다', async () => {
    const { user } = await render(<Counter />);
    const incrementButton = screen.getByTestId('increment');
    const decrementButton = screen.getByTestId('decrement');
    const valueElement = screen.getByTestId('value');

    await user.click(incrementButton);
    await user.click(incrementButton);
    expect(valueElement.textContent).toBe('2');

    await user.click(decrementButton);
    expect(valueElement.textContent).toBe('1');

    await user.click(decrementButton);
    await user.click(decrementButton);
    expect(valueElement.textContent).toBe('-1');
  });

  it('버튼들이 올바르게 렌더링된다', async () => {
    await render(<Counter />);
    const incrementButton = screen.getByTestId('increment');
    const decrementButton = screen.getByTestId('decrement');

    expect(incrementButton).toBeDefined();
    expect(decrementButton).toBeDefined();
  });
});
