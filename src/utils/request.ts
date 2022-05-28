import { message } from 'ant-design-vue';
import axios, { AxiosRequestConfig } from 'axios';
import { useUserStore } from '@/pinia/modules/user';

const SUCCESS = 0;

const REQUEST_TIMEOUT = 5000;
const REQUEST_BASE_URL = '/api/v1';

// create axios instanse
const service = axios.create({
  baseURL: REQUEST_BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

// request interceptors
service.interceptors.request.use(
  config => {
    const userStore = useUserStore();
    config.headers[userStore.TokenKey] = userStore.token;
    return config;
  },
  error => {
    // do something...
  },
);

// response interceptors
service.interceptors.response.use(
  resp => {
    if (resp.data.code === SUCCESS) {
      if (resp.data.msg) message.success(resp.data.msg);
      return resp.data;
    }
    message.error(resp.data.msg ? resp.data.msg : '未知错误');
    return resp.data ? resp.data : null;
  },
  err => {
    // do something...
  },
);

// call api
const request = async <T>(config: AxiosRequestConfig<any>): Promise<T> => {
  return await (
    await service(config)
  ).data;
};

export default request;
