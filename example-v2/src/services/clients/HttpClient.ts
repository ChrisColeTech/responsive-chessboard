// Base HTTP client with authentication and error handling
import { APIResponse, HTTPClientConfig, ChessTrainingAPIError } from '@/types';
import { AUTH_STORAGE_KEYS, API_CONFIG, API_HEADERS } from '@/constants';

export class HttpClient {
  private readonly baseURL: string;
  private readonly timeout: number;
  private readonly defaultHeaders: Record<string, string>;

  constructor(config: HTTPClientConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
    this.defaultHeaders = config.defaultHeaders;
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired - attempt refresh
          const refreshSuccess = await this.refreshToken();
          if (refreshSuccess) {
            // Retry with new token
            const newToken = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
            return this.request(endpoint, {
              ...options,
              headers: {
                ...options.headers,
                Authorization: `Bearer ${newToken}`,
              },
            });
          } else {
            // Refresh failed - redirect to login
            this.handleAuthFailure();
          }
        }

        const errorText = await response.text();
        let errorMessage: string;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || 'Request failed';
        } catch {
          errorMessage = errorText || response.statusText || 'Request failed';
        }

        throw new ChessTrainingAPIError(errorMessage, response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ChessTrainingAPIError('Request timeout', 408);
        }
        throw new ChessTrainingAPIError(`Network error: ${error.message}`, 0);
      }

      throw new ChessTrainingAPIError('Unknown error occurred', 0);
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return false;

      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: this.defaultHeaders,
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);

      return true;
    } catch {
      return false;
    }
  }

  private handleAuthFailure(): void {
    localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    // In a real app, this would trigger a navigation to login
    console.warn('Authentication failed - tokens cleared');
  }

  public async get<T = any>(endpoint: string): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  public async post<T = any>(endpoint: string, data?: any): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async put<T = any>(endpoint: string, data?: any): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async delete<T = any>(endpoint: string): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Default HTTP client instance
export const httpClient = new HttpClient({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  defaultHeaders: {
    'Content-Type': API_HEADERS.CONTENT_TYPE,
  },
});