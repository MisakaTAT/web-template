import { defineStore } from 'pinia';
import { login } from '@/api/user';

export const useUserStore = defineStore('user', () => {
  const TokenKey = 'Token';

  const token = ref(window.localStorage.getItem(TokenKey) || '');

  const setToken = val => {
    token.value = val;
  };

  watch(token, () => {
    window.localStorage.setItem(TokenKey, token.value);
  });

  const Login = async loginInfo => {
    const resp = await login(loginInfo);
    if (resp.token) setToken(resp.token);
  };

  return {
    TokenKey,
    token,
    setToken,
    Login,
  };
});
