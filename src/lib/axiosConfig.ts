import axios from 'axios';

const BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL as string;

export const client = axios.create({
  baseURL: `${BASE_URL}`,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});
