import { message } from 'ant-design-vue';
import axios, { AxiosRequestConfig } from 'axios';
import { useUserStore } from '@/pinia/modules/user';

const Failed = -1;
const Succeed = 0;
const Unauthorized = 101;

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
  err => {
    message.error(err.message);
    // do something...
  },
);

// response interceptors
service.interceptors.response.use(
  resp => {
    const code = resp?.data.code == undefined ? Failed : resp?.data.code;
    if (code === Succeed) {
      if (resp.data.msg) message.success(resp.data.msg);
      return resp.data;
    }
    // check token
    if (code === Unauthorized) {
      const userStore = useUserStore();
      userStore.logout();
    }
    message.error(resp.data.msg ? resp.data.msg : '未知错误');
    return resp.data ? resp.data : null;
  },
  err => {
    message.error(err.message);
    // do something...
  },
);

// call api
const request = async <T>(config: AxiosRequestConfig<any>): Promise<T> => {
  return await (
    await service(config)
  )?.data;
};

export default request;
