import { http, delay, HttpResponse } from 'msw';
import { getDeletePetMockHandler } from '../../generated';
import { DELAY } from '../../constant';

const PATH = `${import.meta.env.VITE_API_URL}/pet/:petId`;

const SUCCESS = () => getDeletePetMockHandler();

const ERROR_CODE_1000 = () =>
  http.delete(PATH, async ({ params }) => {
    await delay(DELAY);

    return HttpResponse.json(
      {
        message: '1000번 에러 - 토스트로 표시됩니다',
        errorCode: 1000,
      },
      { status: 400 },
    );
  });

const ERROR_CODE_1001 = () =>
  http.delete(PATH, async ({ params }) => {
    await delay(DELAY);

    return HttpResponse.json(
      {
        message: '1001번 에러 - 토스트로 표시됩니다',
        errorCode: 1001,
      },
      { status: 400 },
    );
  });

const ERROR_CODE_2000 = () =>
  http.delete(PATH, async ({ params }) => {
    await delay(DELAY);

    return HttpResponse.json(
      {
        message: '2000번 에러 - 얼럿으로 표시됩니다',
        errorCode: 2000,
      },
      { status: 400 },
    );
  });

const ERROR_CODE_2001 = () =>
  http.delete(PATH, async ({ params }) => {
    await delay(DELAY);

    return HttpResponse.json(
      {
        message: '2001번 에러 - 얼럿으로 표시됩니다',
        errorCode: 2001,
      },
      { status: 400 },
    );
  });

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
  DEFAULT: ERROR_CODE_1000,
  SUCCESS,
  ERROR_CODE_1000,
  ERROR_CODE_1001,
  ERROR_CODE_2000,
  ERROR_CODE_2001,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
};
