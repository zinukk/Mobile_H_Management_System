import client from './client';
import API from './apis';

const robotAPI = {
  getRobots: () => {
    return client.get(`${API.getRobots}`);
  },
  getRobotsDetail: (mapId: string) => {
    return client.get(`${API.getRobotsDetail}/${mapId}?state=`);
  },
};

export default robotAPI;
