import { HttpClient, HttpOptions } from './http-client';

export class BrowserHttpClient implements HttpClient {
  async get<T>(url: string, options?: HttpOptions): Promise<T> {
    const response = await fetch(url, {
      ...options,
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}
