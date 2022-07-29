import * as vueRouter from 'vue-router';

const routes: vueRouter.RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Header',
    component: () => import('remote/Header'),
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHashHistory(),
  routes,
});

setTimeout(() => {
  router.addRoute({
    path: '/about',
    name: 'about',
    component: () => import('remote/About'),
  })
}, 5000)

export default router;

