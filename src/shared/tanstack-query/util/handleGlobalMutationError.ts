import { defineGlobalMutationErrorPolicy } from '../config/defineGlobalMutationErrorPolicy';
import { ensureAxiosError, isApiError } from './error';
import { hasMutationErrorPayload } from './mutationError';

type Notifiers = {
  toast: (message: string) => void;
  alert: (a: { title: string; description: string }) => void;
};

const notifiers: Notifiers = {
  toast: (message: string) => {
    window.alert(`[TOAST]: ${message}`);
  },
  alert: (a: { title: string; description: string }) => {
    window.alert(`[ALERT] ${a?.title}\n${a?.description}`);
  },
};

/**
 * 전역에 정의된 기본 Mutation 에러 핸들링 정책에 따라 에러를 처리합니다.
 *
 * @param error - 처리할 에러 객체
 * @returns 에러가 성공적으로 처리되었으면 `true`, 처리되지 않았으면 `false`
 * - `true`: 에러가 정책에 따라 처리됨 (toast/alert 표시 또는 기본 메시지 표시)
 * - `false`: 에러를 처리할 수 없음 (정책에서 정의되지 않은 에러)
 */
const handleDefaultGlobalMutationError = (error: unknown): boolean => {
  const policy = defineGlobalMutationErrorPolicy();
  const action = policy.resolve(error);

  switch (action.type) {
    case 'toast':
      notifiers.toast(action.message);
      return true;
    case 'alert':
      notifiers.alert({ title: action.title, description: action.description });
      return true;
    case 'none':
      notifiers.toast('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      return true;
    default:
      return false;
  }
};

/**
 * 로컬(페이지/컴포넌트)에서 오버라이드된 Mutation 에러 핸들링을 처리합니다.
 * `overrideMutationError`로 설정된 커스텀 에러 핸들링이 있는지 확인하고 실행합니다.
 *
 * @param _error - 처리할 에러 객체
 * @returns 오버라이드된 에러 핸들링이 처리되었으면 `true`, 처리되지 않았으면 `false`
 * - `true`: 오버라이드된 핸들링이 존재하고 처리됨 (ignoreGlobalHandling이 true이거나 매칭되는 errorCode의 액션이 실행됨)
 * - `false`: 오버라이드된 핸들링이 없거나 매칭되는 errorCode가 없음 (기본 전역 핸들링으로 fallback 필요)
 */
const handleOverridedMutationError = (_error: unknown): boolean => {
  const { message, error } = ensureAxiosError(_error);

  if (hasMutationErrorPayload(error)) {
    if (error.mutationErrorPayload?.ignoreGlobalHandling) {
      return true;
    }

    for (const payload of error.mutationErrorPayload?.payloads ?? []) {
      if (isApiError(error) && error.response?.data.errorCode === payload.errorCode) {
        switch (payload.type) {
          case 'toast':
            notifiers.toast(payload.message);
            return true;
          case 'alert':
            notifiers.alert({ title: payload.title, description: payload.description });
            return true;
          case 'none':
            return true;
        }
      }
    }
  }

  return false;
};

export const handleGlobalMutationError = (error: unknown) => {
  // @NOTE: Local Mutation의 onError보다 Global Mutation의 onError가 먼저 실행되므로, setTimeout을 사용하여 순서를 보장합니다.
  // Local Mutation에서 출력할 토스트 메시지를 오버라이딩 하였다면, Global Mutation의 onError에서는 기본 메시지 대신에 오버라이딩된 메시지를 사용합니다.
  setTimeout(() => {
    if (handleOverridedMutationError(error)) {
      return;
    }

    if (handleDefaultGlobalMutationError(error)) {
      return;
    }
  }, 0);
};
