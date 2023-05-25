import client from './client';
import API from './apis';

const homeAPI = {
  getServing: () => {
    return client.get(`${API.getServing}`);
  },
  getStores: () => {
    return client.get(`${API.getStores}`);
  },
  getRecentErrors: () => {
    return client.get(`${API.getRecentErrors}`);
  },
  postDates: (data: any) => {
    return client.post(`${API.postDates}`, data);
  },
};

export default homeAPI;
