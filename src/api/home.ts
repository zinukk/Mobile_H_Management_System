import client from './client';
import API from './apis';

const homeAPI = {
  getServing: () => {
    return client.get(`${API.getServing}`);
  },
  getStores: () => {
    return client.get(`${API.getStores}`);
  },
  getErrorStatus: () => {
    return client.get(`${API.getErrorStatus}`);
  },
  getAllErrors: () => {
    return client.get(`${API.getAllErrors}`);
  },
  postDates: (data: any) => {
    return client.post(`${API.postDates}`, data);
  },
};

export default homeAPI;
