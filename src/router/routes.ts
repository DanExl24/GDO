import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/admin',
      },
      {
        path: 'admin',
        component: () => import('pages/AdminPage.vue'),
        meta: { requiresAuth: true, role: 'admin' },
      },
      {
        path: 'user',
        component: () => import('pages/UserPage.vue'),
        meta: { requiresAuth: true, role: 'user' },
      },
      {
        path: 'history/:id',
        component: () => import('pages/HistoryPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/LoginPage.vue'),
  },
];

export default routes;
