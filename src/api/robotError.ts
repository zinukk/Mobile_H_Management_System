import client from './client';
import API from './apis';
import { TDates, TErrorState } from '@src/types/robotError';

const robotErrorAPI = {
  getErrorList: () => {
    return client.get(`${API.getErrorList}`);
  },
  postErrorDates: (data: TDates) => {
    return client.post(`${API.postErrorDates}`, data);
  },
  getErrorDetail: (data: TErrorState) => {
    return client.post(`${API.getErrorDetail}`, data);
  },
};

export default robotErrorAPI;
