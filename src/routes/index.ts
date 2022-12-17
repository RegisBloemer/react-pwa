import asyncComponentLoader from '@/utils/loader';

const routes = [
  {
    component: asyncComponentLoader(() => import('@/pages/home')),
    path: '/',
    title: 'Home',
  },
  {
    component: asyncComponentLoader(() => import('@/pages/login')),
    path: '/login',
    title: 'Login',
  },
  {
    component: asyncComponentLoader(() => import('@/pages/404')),
    path: '*',
  },
];

export default routes;
