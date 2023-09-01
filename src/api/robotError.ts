import client from './client';
import API from './apis';
import { IDates, IErrorState } from '@src/types/robotError';

const robotErrorAPI = {
  getErrorList: () => {
    return client.get(`${API.getErrorList}`);
  },
  postErrorDates: (data: IDates) => {
    return client.post(`${API.postErrorDates}`, data);
  },
  getErrorDetail: (data: IErrorState) => {
    return client.post(`${API.getErrorDetail}`, data);
  },
};

export default robotErrorAPI;
