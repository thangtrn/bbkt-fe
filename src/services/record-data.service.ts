import { axiosService } from '@/apis/axios.base';

class RecordDataServiceBase {
  protected baseUrl: string = '/record-data';

  getById<T>(id: string): Promise<T> {
    const reponse = axiosService.getById<T>(`${this.baseUrl}/${id}`);
    return reponse;
  }

  getOne<T>(params: string): Promise<T | null> {
    const reponse = axiosService.getOne<T | null>(this.baseUrl, params);
    return reponse;
  }

  getWithParams<T>(params?: string): Promise<T> {
    const reponse = axiosService.getWithParams<T>(this.baseUrl, params);
    return reponse;
  }

  post<T, FromData>(id: string, data: FromData): Promise<T> {
    const response = axiosService.post<T, FromData>(this.baseUrl, data);
    return response;
  }

  put<T, FromData>(id: string, data: FromData): Promise<T> {
    const response = axiosService.put<T, FromData>(this.baseUrl, data);
    return response;
  }

  delete<T>(id: string): Promise<T> {
    const response = axiosService.delete<T>(`${this.baseUrl}/${id}`);
    return response;
  }
}

const RecordDataService = new RecordDataServiceBase();
export default RecordDataService;
