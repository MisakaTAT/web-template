import axios from 'axios';
import auth from '@/utils/auth';

// create axios instanse
const service = axios.create({
  // baseURL: process.env.,
  timeout: 5000,
});

// request interceptors
service.interceptors.request.use(
  config => {
    let token = auth.getToken();
    if (token) {
      config.headers[auth.TokenKey] = token;
    }
    return config;
  },
  error => {
    // handler error
    return Promise.reject(error);
  },
);

// response interceptors
service.interceptors.response.use(response => {
  const resp = response.data;
  if (resp.code !== 0) {
    // do something...
  }
});

export default service;
