export interface FetchResult<S = unknown> {
  success: boolean;
  message: string;
  data?: S;
}
