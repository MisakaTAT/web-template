import { defineStore } from 'pinia';
import { loginReq } from '@/api/user';
import router from '@/router';

export const useUserStore = defineStore('user', () => {
  const TOKEN_KEY = 'X-Token';

  const token = ref(window.localStorage.getItem(TOKEN_KEY) || '');

  watch(token, () => {
    window.localStorage.setItem(TOKEN_KEY, token.value);
  });

  const login = async (authInfo: any): Promise<Boolean> => {
    const resp = await loginReq(authInfo);
    if (!resp?.token) return false;
    token.value = resp.token;
    return true;
  };

  const logout = () => {
    token.value = '';
    router.push({ name: 'Login' });
  };

  return {
    TOKEN_KEY,
    token,
    login,
    logout,
  };
});
