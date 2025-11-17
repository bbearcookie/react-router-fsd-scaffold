import ky, { type Options as KyOptions } from 'ky';

const kyInstance = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
});

export const apiClient = async <T>(config: {
  url: string;
  method: KyOptions['method'];
  params?: any;
  data?: any;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}): Promise<T> => {
  // ky의 prefixUrl 사용 시 URL이 '/'로 시작하면 안 되므로 제거
  const url = config.url.replace(/^\//, '');

  return kyInstance(url, {
    method: config.method,
    json: config.data,
    searchParams: config.params,
    headers: config.headers,
    signal: config.signal,
  }).json<T>();
};
