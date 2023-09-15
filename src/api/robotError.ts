import client from './client';
import API from './apis';
import { TDateData, TErrorState } from '@src/types/robotError';

const robotErrorAPI = {
  getErrorList: () => {
    return client.get(`${API.getErrorList}`);
  },
  postErrorDates: (data: TDateData) => {
    return client.post(`${API.postErrorDates}`, data);
  },
  getErrorDetail: (data: TErrorState) => {
    return client.post(`${API.getErrorDetail}`, data);
  },
};

export default robotErrorAPI;
