import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { IErrorCodeObject } from '@src/types/common';

export const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL as string;

const client = axios.create({
  baseURL: `${baseURL}`,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

client.interceptors.response.use((response: AxiosResponse) => {
  try {
    if (response.status === 200) {
      return response;
    }

    if (response.status === 400) {
      const router = useRouter();

      const errorCode: string = response?.data.code;

      const errorCodeObject: IErrorCodeObject = {
        '-1': '서버 내부에서 오류가 발생했습니다.',
        '-2': '필수 인자가 포함되지 않은 경우나 호출 인자값의 데이터 타입이 적절하지 않거나 허용된 범위를 벗어났습니다.',
        '-3': '해당 API에 대한 요청 권한이 없습니다.',
        '-4': '서비스 점검중입니다.',
        '-5': '데이터가 존재하지 않습니다.',
        '-101': '로봇에서 에러가 발생했습니다.',
        '-102': '로봇이 작동할 수 없는 환경입니다.',
      };

      const moveToErrorPage = () => {
        router.push({ pathname: '/error', query: { errorCode, errorDescription: errorCodeObject[errorCode] } });
      };

      return moveToErrorPage();
    }
  } catch (e: any) {
    return e.message;
  }
});

export default client;
