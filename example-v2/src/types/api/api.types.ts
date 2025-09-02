// Base API types
export interface APIResponse<T = any> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly message?: string;
  readonly timestamp?: string;
}

export interface APIError {
  readonly success: false;
  readonly error: string;
  readonly statusCode?: number;
  readonly timestamp: string;
}

export interface HTTPClientConfig {
  readonly baseURL: string;
  readonly timeout: number;
  readonly defaultHeaders: Record<string, string>;
}

export interface RequestConfig {
  readonly method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  readonly headers?: Record<string, string>;
  readonly params?: Record<string, any>;
  readonly data?: any;
  readonly timeout?: number;
}

export interface PaginatedResponse<T> {
  readonly success: boolean;
  readonly data: T[];
  readonly pagination: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
  };
}

export class ChessTrainingAPIError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly originalError?: any
  ) {
    super(message);
    this.name = 'ChessTrainingAPIError';
  }
}