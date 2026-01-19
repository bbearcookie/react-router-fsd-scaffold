import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { server } from '@/shared/msw/lib/msw.server';

vi.spyOn(console, 'error').mockImplementation(() => undefined);

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());
