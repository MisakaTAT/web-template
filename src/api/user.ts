import request from '@/utils/request';

interface LoginResp {
  username: string;
  token: string;
}

export function login(data) {
  return request<LoginResp>({
    url: '/auth/login',
    method: 'POST',
    data,
  });
}
