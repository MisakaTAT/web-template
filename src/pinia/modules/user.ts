import { defineStore } from 'pinia';
import { login } from '@/api/user';
import router from '@/router';

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

  const Logout = () => {
    // TODO: Wait optimze
    removeToken();
    router.push('/login');
    window.location.reload();
  };

  return {
    TokenKey,
    token,
    Login,
    Logout,
  };
});
