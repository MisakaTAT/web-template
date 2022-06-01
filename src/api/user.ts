import request from '@/utils/request';
import { AxiosRequestConfig } from 'axios';

interface LoginResp {
  username: string;
  token: string;
}

export function loginReq(data: AxiosRequestConfig<any>) {
  return request<LoginResp>({
    url: '/auth/login',
    method: 'POST',
    data,
  });
}
