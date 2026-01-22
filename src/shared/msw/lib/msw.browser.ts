import { getSwaggerPetstoreOpenAPI30Mock } from '../../api/generated';
import { setupWorker } from 'msw/browser';
import { getMockOverrideHandlers } from '../../api/override.mocks';

export const worker = setupWorker(
  ...getMockOverrideHandlers(),
  ...getSwaggerPetstoreOpenAPI30Mock(),
);
