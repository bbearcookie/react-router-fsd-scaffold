import { type AxiosError, isAxiosError } from 'axios';

/**
 * API 에러 응답 타입
 */
interface ApiErrorResponse {
  message: string;
  errorCode: number;
}

/**
 * 에러가 API 에러인지 확인하는 타입 가드입니다.
 * response.data에 message, errorCode가 포함되어 있는지 체크합니다.
 */
export const isApiError = (
  error: unknown,
): error is AxiosError & { response: { data: ApiErrorResponse } } => {
  if (!isAxiosError(error)) {
    return false;
  }

  const data = error.response?.data;

  return (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof data.message === 'string' &&
    'errorCode' in data &&
    typeof data.errorCode === 'number'
  );
};

/**
 * 에러가 AxiosError인지 확인하고, 타입을 좁혀서 반환합니다.
 * API 응답 내부에 오류 메시지가 있다면 그것을 사용하고, 아니라면 AxiosError의 메시지를 사용합니다.
 */
export const ensureAxiosError = (error: unknown): { message: string; error: AxiosError } => {
  if (!isAxiosError(error)) {
    throw error;
  }

  return {
    message: error.response?.data?.message || error.message,
    error,
  };
};
