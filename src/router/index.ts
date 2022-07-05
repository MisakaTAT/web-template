import { createRouter, createWebHashHistory } from 'vue-router';
import BasicLayout from '@/layouts/BasicLayout.vue';
import BlankLayout from '@/layouts/BlankLayout.vue';
import Dashboard from '@/views/Dashboard.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/Login.vue'),
  },
  {
    path: '/',
    name: 'Index',
    meta: { title: '首页' },
    component: BasicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: { title: '仪表盘', icon: 'icon-configure' },
        component: Dashboard,
      },
      {
        path: '/system',
        name: 'System',
        meta: { title: '系统设置', icon: 'icon-configure' },
        component: BlankLayout,
        redirect: () => ({ name: 'api' }),
        children: [
          {
            path: 'api',
            name: 'ApiManager',
            meta: { title: '接口管理', icon: 'icon-configure' },
            component: () => import('@/views/system/Api.vue'),
          },
          {
            path: 'role',
            name: 'RoleManager',
            meta: { title: '角色管理', icon: 'icon-configure' },
            component: () => import('@/views/system/User.vue'),
          },
          {
            path: 'user',
            name: 'UserManager',
            meta: { title: '用户管理', icon: 'icon-configure' },
            component: () => import('@/views/system/User.vue'),
          },
          {
            path: 'menu',
            name: 'MenuManager',
            meta: { title: '菜单管理', icon: 'icon-configure' },
            component: () => import('@/views/system/Menu.vue'),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
