import { getSwaggerPetstoreOpenAPI30Mock } from '../../api/generated';
import { setupServer } from 'msw/node';
import { getMockOverrideHandlers } from '../../api/override.mocks';

export const server = setupServer(
  ...getMockOverrideHandlers(),
  ...getSwaggerPetstoreOpenAPI30Mock(),
);
