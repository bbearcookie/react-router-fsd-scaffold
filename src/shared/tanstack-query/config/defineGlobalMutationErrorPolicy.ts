import { isApiError } from '../util/error';
import { type ErrorAction, type ApiErrorCode } from '../model/action';

export const defineGlobalMutationErrorPolicy = () => {
  const table = new Map<ApiErrorCode, ErrorAction>([
    [1000, { type: 'toast', message: '1000번 오류에 대한 토스트 핸들링' }],
    [1001, { type: 'toast', message: '1001번 오류에 대한 토스트 핸들링' }],
    [
      2000,
      {
        type: 'alert',
        title: '2000번 오류에 대한 얼럿 핸들링',
        description: '2000번 오류에 대한 설명',
      },
    ],
    [
      2001,
      {
        type: 'alert',
        title: '2001번 오류에 대한 얼럿 핸들링',
        description: '2001번 오류에 대한 설명',
      },
    ],
  ]);

  return {
    resolve: (error: unknown): ErrorAction => {
      const NONE: ErrorAction = { type: 'none' };

      if (!isApiError(error)) return NONE;

      const code = error.response?.data.errorCode;
      return typeof code === 'number' ? (table.get(code) ?? NONE) : NONE;
    },
  };
};
