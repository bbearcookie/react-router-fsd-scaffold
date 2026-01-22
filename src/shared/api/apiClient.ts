import axios, { type AxiosRequestConfig } from 'axios';

const apiClient = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      ...config.headers,
    },
  });

  return (await api(config)).data;
};

export { apiClient };
