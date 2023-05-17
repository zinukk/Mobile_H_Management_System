import axios, { AxiosError, AxiosResponse } from 'axios';

export const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL as string;

const client = axios.create({
  baseURL: `${baseURL}`,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

client.interceptors.response.use(
  (res: AxiosResponse) => {
    try {
      if (res.status === 200) {
        return res.data;
      }
    } catch (e: any) {
      return e.message;
    }
  },
  (error: AxiosError<IResponseError>) => {
    const err = error.response?.data.message;

    if (err) {
      window.alert(err);
    }

    return Promise.reject(error);
  },
);

export default client;
