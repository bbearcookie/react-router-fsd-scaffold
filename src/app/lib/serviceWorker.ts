const setupMockServiceWorker = async () => {
  const { worker } = await import('@/shared/msw/lib/msw.browser');

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
};

const setupServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  if (import.meta.env.VITE_MSW === 'true') {
    await setupMockServiceWorker();
  }

  return;
};

export { setupServiceWorker };
