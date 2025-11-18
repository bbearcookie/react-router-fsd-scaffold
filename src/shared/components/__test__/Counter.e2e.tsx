import { test, expect } from '@playwright/test';

test.describe('Counter E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Counter가 있는 홈페이지로 이동
    await page.goto('/');
  });

  test('초기 렌더링 시 카운터가 0으로 표시된다', async ({ page }) => {
    const valueElement = page.getByTestId('value').first();
    await expect(valueElement).toBeVisible();
    await expect(valueElement).toHaveText('0');
  });

  test('+ 버튼을 클릭하면 카운터가 증가한다', async ({ page }) => {
    const incrementButton = page.getByTestId('increment').first();
    const valueElement = page.getByTestId('value').first();

    await incrementButton.click();
    await expect(valueElement).toHaveText('1');

    await incrementButton.click();
    await expect(valueElement).toHaveText('2');
  });

  test('- 버튼을 클릭하면 카운터가 감소한다', async ({ page }) => {
    const decrementButton = page.getByTestId('decrement').first();
    const valueElement = page.getByTestId('value').first();

    await decrementButton.click();
    await expect(valueElement).toHaveText('-1');

    await decrementButton.click();
    await expect(valueElement).toHaveText('-2');
  });

  test('증가와 감소 버튼을 번갈아 클릭하면 카운터가 정확히 업데이트된다', async ({ page }) => {
    const incrementButton = page.getByTestId('increment').first();
    const decrementButton = page.getByTestId('decrement').first();
    const valueElement = page.getByTestId('value').first();

    // 3번 증가
    await incrementButton.click();
    await incrementButton.click();
    await incrementButton.click();
    await expect(valueElement).toHaveText('3');

    // 2번 감소
    await decrementButton.click();
    await decrementButton.click();
    await expect(valueElement).toHaveText('1');

    // 다시 1번 감소
    await decrementButton.click();
    await expect(valueElement).toHaveText('0');

    // 음수로 감소
    await decrementButton.click();
    await expect(valueElement).toHaveText('-1');
  });

  test('버튼들이 올바르게 렌더링되고 클릭 가능하다', async ({ page }) => {
    const incrementButton = page.getByTestId('increment').first();
    const decrementButton = page.getByTestId('decrement').first();

    await expect(incrementButton).toBeVisible();
    await expect(incrementButton).toBeEnabled();
    await expect(incrementButton).toHaveText('+');

    await expect(decrementButton).toBeVisible();
    await expect(decrementButton).toBeEnabled();
    await expect(decrementButton).toHaveText('-');
  });

  test('Counter 제목이 표시된다', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Counter' });
    await expect(heading).toBeVisible();
  });

  test('Current Count 라벨이 표시된다', async ({ page }) => {
    const label = page.getByText('Current Count');
    await expect(label).toBeVisible();
  });
});
