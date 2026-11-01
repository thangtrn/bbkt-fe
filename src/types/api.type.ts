export type ErrorCodeType = {
  en: string;
  vn: string;
};

export interface ApiResponse<T> extends Pagination {
  data: T;
}

export type ParamPanigation = {
  offset: number;
  limit: number;
};

export type Pagination = {
  count: number;
  limit: number;
  page: number;
};

export type CommonAttributes = {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
};

export type ApiResponseDelete = {
  body: any;
  bodyUsed: boolean;
  headers: any;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: string;
  url: string;
  errorCode: string;
  message: string;
  statusCode: number;
};

export type ApiErrorResponse = {
  statusCode: number;
  message: string;
  errorCode: string;
  correlationId: string;
  subErrors: [];
};

export type ApiResponseRefreshToken = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type ResponseApi<T> = {
  payload: T;
  ok: boolean;
  message?: string;
};

