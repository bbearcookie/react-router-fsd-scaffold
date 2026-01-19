import { getSwaggerPetstoreOpenAPI30Mock } from '../../api/generated';
import { setupServer } from 'msw/node';

export const server = setupServer(...getSwaggerPetstoreOpenAPI30Mock());
