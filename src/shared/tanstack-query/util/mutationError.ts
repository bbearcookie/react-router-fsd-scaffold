import type { ApiErrorCode, ErrorAction } from '../model/action';

interface MutationErrorPayload {
  /** 전역에 설정 된 에러 핸들링 로직을 무시할 건지의 여부 */
  ignoreGlobalHandling?: boolean;

  /** 에러 코드별 에러 동작 */
  payloads?: (ErrorAction & { errorCode: ApiErrorCode })[];
}

export const hasMutationErrorPayload = (
  error: unknown,
): error is Error & { mutationErrorPayload: MutationErrorPayload | null } => {
  return 'mutationErrorPayload' in (error as any);
};

/** Mutation에 대한 에러 핸들링을 오버라이드 합니다. */
export const overrideMutationError = (error: unknown, payload: MutationErrorPayload) => {
  (error as any).mutationErrorPayload = payload;
};
