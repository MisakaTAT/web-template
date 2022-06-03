import { defineStore } from 'pinia';
import { loginReq } from '@/api/user';
import router from '@/router';

export const TOKEN_KEY = 'X-Token';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: ref(
      window.localStorage.getItem(TOKEN_KEY) || window.sessionStorage.getItem(TOKEN_KEY) || '',
    ),
  }),
  actions: {
    async login(authInfo: any): Promise<Boolean> {
      const resp = await loginReq(authInfo);
      if (!resp?.token) return false;
      this.token = resp.token;
      if (authInfo.remember) {
        window.localStorage.setItem(TOKEN_KEY, this.token);
      } else {
        window.sessionStorage.setItem(TOKEN_KEY, this.token);
      }
      return true;
    },
    logout() {
      this.token = '';
      window.localStorage.clear();
      window.sessionStorage.clear();
      router.push({ name: 'Login' });
    },
  },
});
