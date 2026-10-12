export type HttpOptions = Omit<RequestInit, 'method'>;

export interface HttpClient {
  get<T>(url: string, options?: HttpOptions): Promise<T>;
}
