import { defineStore } from 'pinia';
import { login } from '@/api/user';

export const useUserStore = defineStore('user', () => {
  const TokenKey = 'Token';

  const token = ref(window.localStorage.getItem(TokenKey) || '');

  const setToken = (val: string) => {
    token.value = val;
  };

  const removeToken = () => {
    window.localStorage.removeItem(TokenKey);
  };

  watch(token, () => {
    window.localStorage.setItem(TokenKey, token.value);
  });

  const Login = async (loginInfo: any): Promise<Boolean> => {
    const resp = await login(loginInfo);
    if (resp?.token) {
      setToken(resp.token);
      return true;
    }
    return false;
  };

  return {
    TokenKey,
    token,
    setToken,
    removeToken,
    Login,
  };
});
