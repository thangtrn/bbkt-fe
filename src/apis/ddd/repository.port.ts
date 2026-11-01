export interface AuthorizationPort {
  getToken(): string;
  setToken(token: string, expires?: string): void;
  removeToken(): void;
}

export interface RepositoryPort {
  get<T>(url: string): Promise<T>;
  getWithParams<T>(url: string, params: URLSearchParams): Promise<T>;
  post<T, FromData>(url: string, data: FromData): Promise<T>;
  put<T, FromData>(url: string, data: FromData): Promise<T>;
  delete<T>(url: string): Promise<T>;
}
