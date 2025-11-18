import { describe, it, expect } from 'vitest';
import Counter from './Counter';
import { render, screen } from '@/shared/testing-library/render';

describe('Counter', () => {
  it('초기 렌더링 시 카운터가 0으로 표시된다', () => {
    render(<Counter />);
    expect(screen.getByText('Counter: 0')).toBeDefined();
  });

  it('+ 버튼을 클릭하면 카운터가 증가한다', async () => {
    const { user } = render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: '+' });

    await user.click(incrementButton);

    expect(screen.getByText('Counter: 1')).toBeDefined();
  });

  it('- 버튼을 클릭하면 카운터가 감소한다', async () => {
    const { user } = render(<Counter />);
    const decrementButton = screen.getByRole('button', { name: '-' });

    await user.click(decrementButton);

    expect(screen.getByText('Counter: -1')).toBeDefined();
  });

  it('여러 번 클릭하면 카운터가 정확히 업데이트된다', async () => {
    const { user } = render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: '+' });
    const decrementButton = screen.getByRole('button', { name: '-' });

    await user.click(incrementButton);
    await user.click(incrementButton);
    expect(screen.getByText('Counter: 2')).toBeDefined();

    await user.click(decrementButton);
    expect(screen.getByText('Counter: 1')).toBeDefined();

    await user.click(decrementButton);
    await user.click(decrementButton);
    expect(screen.getByText('Counter: -1')).toBeDefined();
  });

  it('버튼들이 올바르게 렌더링된다', () => {
    render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: '+' });
    const decrementButton = screen.getByRole('button', { name: '-' });

    expect(incrementButton).toBeDefined();
    expect(decrementButton).toBeDefined();
  });
});
