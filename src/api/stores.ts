import client from './client';
import API from './apis';

const storesAPI = {
  getStores: (storeId?: string | number) => {
    if (storeId) {
      return client.get(`${API.getStores}/${storeId}`);
    } else {
      return client.get(`${API.getStores}`);
    }
  },
};

export default storesAPI;
