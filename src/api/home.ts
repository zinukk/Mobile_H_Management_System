import client from './client';
import API from './apis';

const homeAPI = {
  getRobotPerformance: () => {
    return client.get(`${API.getRobotPerformance}`);
  },
  getStores: () => {
    return client.get(`${API.getStores}`);
  },
  getRecentErrors: () => {
    return client.get(`${API.getRecentErrors}`);
  },
};

export default homeAPI;
