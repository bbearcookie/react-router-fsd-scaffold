import { http, delay, HttpResponse } from 'msw';
import { getDeletePetMockHandler } from '../../generated';
import { DELAY } from '../../constant';

const PATH = `${import.meta.env.VITE_API_URL}/pet/:petId`;

const SUCCESS = () => getDeletePetMockHandler();

const NOT_FOUND = () =>
  http.delete(PATH, async ({ params }) => {
    await delay(DELAY);

    return HttpResponse.json(
      {
        code: 1000,
        name: 'NOT_FOUND',
        message: 'Not Found',
      },
      { status: 404 },
    );
  });

const INTERNAL_SERVER_ERROR = () =>
  http.delete(PATH, async ({ params }) => {
    await delay(DELAY);

    return HttpResponse.json(
      { code: 500, name: 'INTERNAL_SERVER_ERROR', message: 'Internal Server Error' },
      { status: 500 },
    );
  });

export const deletePetMock = {
  DEFAULT: NOT_FOUND,
  SUCCESS,
  NOT_FOUND,
};
