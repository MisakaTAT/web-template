import router from '@/router';
import { useUserStore } from '@/pinia/modules/user';

const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (whiteList.includes(to.path) || userStore.token) {
    next();
  } else {
    next('/login');
  }
});
