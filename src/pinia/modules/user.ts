import { defineStore } from 'pinia';
import { loginReq } from '@/api/user';
import router from '@/router';

export const useUserStore = defineStore('user', () => {
  const TokenKey = 'Token';

  const token = ref(window.localStorage.getItem(TokenKey) || '');

  watch(token, () => {
    window.localStorage.setItem(TokenKey, token.value);
  });

  const login = async (loginInfo: any): Promise<Boolean> => {
    const resp = await loginReq(loginInfo);
    if (!resp?.token) return false;
    token.value = resp.token;
    return true;
  };

  const logout = () => {
    window.localStorage.removeItem(TokenKey);
    // router.push('/login');
    window.location.reload();
  };

  return {
    TokenKey,
    token,
    login,
    logout,
  };
});
