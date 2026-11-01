import { axiosService } from '@/apis/axios.base';

class RecordDataServiceBase {
  protected baseUrl: string = '/record-data';

  get<T>(id: string): Promise<T> {
    const url = `${this.baseUrl}/${id}`;
    const reponse = axiosService.get<T>(url);
    return reponse;
  }

  getWithParams<T>(params: URLSearchParams): Promise<T> {
    const url = `${this.baseUrl}`;
    const reponse = axiosService.getWithParams<T>(url, params);
    return reponse;
  }

  post<T, FromData>(id: string, data: FromData): Promise<T> {
    const url = `${this.baseUrl}/${id}`;
    const response = axiosService.post<T, FromData>(url, data);
    return response;
  }

  put<T, FromData>(id: string, data: FromData): Promise<T> {
    const url = `${this.baseUrl}/${id}`;
    const response = axiosService.put<T, FromData>(url, data);
    return response;
  }

  delete<T>(id: string): Promise<T> {
    const url = `${this.baseUrl}/${id}`;
    const response = axiosService.delete<T>(url);
    return response;
  }
}

const RecordDataService = new RecordDataServiceBase();
export default RecordDataService;
