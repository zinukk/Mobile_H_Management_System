import client from './client';
import API from './apis';

const robotAPI = {
  getRobots: () => {
    return client.get(`${API.getRobots}`);
  },
};

export default robotAPI;
