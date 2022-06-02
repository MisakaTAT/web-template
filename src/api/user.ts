import request from '@/utils/request';
import { AxiosRequestConfig } from 'axios';

interface LoginResp {
  username: string;
  token: string;
}

interface UserInfoResp {
  avatar: string;
}

export const loginReq = (data: AxiosRequestConfig<any>) => {
  return request<LoginResp>({
    url: '/auth/login',
    method: 'POST',
    data,
  });
};

export const userInfoReq = () => {
  return request<UserInfoResp>({
    url: '/user/info',
    method: 'GET',
  });
};
