export type ErrorAction =
  | { type: 'toast'; message: string }
  | { type: 'alert'; title: string; description: string }
  | { type: 'none' };

export type ApiErrorCode = number;
