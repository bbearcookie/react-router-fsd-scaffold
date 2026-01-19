import { describe, it, expect } from 'vitest';
import Page from './Page';
import { screen, waitFor } from '@testing-library/react';
import { render } from '@/shared/testing-library';
import { ROUTES } from '@/shared/router';

describe('게시물 페이지', () => {
  it('게시물 페이지를 렌더링한다', async () => {
    const { i18n } = await render(<Page />);

    expect(i18n.t('posts')).toBe('게시물');
  });

  it('게시물 상세 링크를 클릭하면 게시물 상세 페이지로 이동한다', async () => {
    const { user, i18n } = await render(<Page />);

    const link = screen.getByRole('link', { name: i18n.t('postDetail') });
    await user.click(link);

    await waitFor(() => {
      expect(window.location.pathname).toBe(ROUTES.POSTS.DETAIL('1'));
    });
  });
});
