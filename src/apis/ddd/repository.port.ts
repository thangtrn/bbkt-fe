export interface AuthorizationPort {
  getToken(): string;
  setToken(token: string, expires?: string): void;
  removeToken(): void;
}

export interface RepositoryPort {
  getById<T>(url: string): Promise<T>;
  getOne<T>(url: string, params: string): Promise<T | null>;
  getWithParams<T>(url: string, params?: string): Promise<T>;
  post<T, FromData>(url: string, data: FromData): Promise<T>;
  put<T, FromData>(url: string, data: FromData): Promise<T>;
  delete<T>(url: string): Promise<T>;
}
