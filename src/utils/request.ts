import { message } from 'ant-design-vue';
import axios, { AxiosRequestConfig } from 'axios';
import { TOKEN_KEY, useUserStore } from '@/pinia/modules/user';

const Ok = 0;
const Fail = -1;

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
    config.headers[TOKEN_KEY] = userStore.token;
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
    const code = resp?.data.code == undefined ? Fail : resp?.data.code;
    if (code === Ok) {
      if (resp.data.msg) message.success(resp.data.msg);
      return resp.data;
    }
    // auth
    if (!resp?.data?.data?.auth) {
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
const request = async <T>(config: AxiosRequestConfig<T>): Promise<T> => {
  return await (
    await service(config)
  )?.data;
};

export default request;
