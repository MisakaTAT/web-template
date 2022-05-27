import { defineStore } from 'pinia';
import auth from '@/utils/auth';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      // token: auth.getToken,
    };
  },
  actions: {},
});
