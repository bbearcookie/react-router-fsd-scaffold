import { getSwaggerPetstoreOpenAPI30Mock } from '../../api/generated';
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(...getSwaggerPetstoreOpenAPI30Mock());
