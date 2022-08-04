import * as vueRouter from 'vue-router';
import { modulesRoute } from '../../../../dynamicFile/index';

const routes: vueRouter.RouteRecordRaw[] = [

  {
    path: '/',
    name: 'Header',
    component: () => import('remote/Header'),
  },
];

routes.push(...modulesRoute as vueRouter.RouteRecordRaw[]);
console.log('%c [ modulesRoute ]', 'font-size:13px; background:pink; color:#bf2c9f;', modulesRoute);

console.log('%c [ routes ]', 'font-size:13px; background:pink; color:#bf2c9f;', routes);

const router = vueRouter.createRouter({
  history: vueRouter.createWebHashHistory(),
  routes,
});

export default router;

