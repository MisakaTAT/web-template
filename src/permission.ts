import router from '@/router';
import { useUserStore } from '@/pinia/modules/user';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach((to, _, next) => {
  // start progress bar
  NProgress.start();

  const userStore = useUserStore();
  if (userStore.token) {
    // if is logged in, redirect to the home page
    console.log(to.name);
    if (to.name === 'Login') {
      next({ name: 'Index' });
      NProgress.done();
    } else {
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next({ name: 'Login' });
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
