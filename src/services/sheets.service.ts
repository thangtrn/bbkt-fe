import api from '@/lib/axios';

export async function fetchAllSheets() {
  const response = await api.get('/sheets');
  return response.data;
}
