import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { useAuthStore } from 'stores/auth';

export default function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, _from, next) => {
    const auth = useAuthStore();

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
      next('/login');
      return;
    }

    if (to.meta.role === 'admin' && auth.role !== 'admin') {
      next('/user');
      return;
    }

    if (to.meta.role === 'user' && auth.role === 'admin') {
      next('/admin');
      return;
    }

    next();
  });

  return Router;
}
