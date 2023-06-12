import client from './client';
import API from './apis';
import { IDates } from '@src/types/error';

const errorAPI = {
  getErrorList: () => {
    return client.get(`${API.getErrorList}`);
  },
  postErrorDates: (data: IDates) => {
    return client.post(`${API.postErrorDates}`, data);
  },
  postErrorDetail: (data: any) => {
    return client.post(`${API.postErrorDetail}`, data);
  },
};

export default errorAPI;
