

const modulesRoute = [{
      path: '/About',
      name: 'About',
      component: () => import('remote/About'),
    },
{
      path: '/Header',
      name: 'Header',
      component: () => import('remote/Header'),
    },]


module.exports = {
  exposeModules: {"./About":"E:\\module-federation\\packages\\transport-aircraft\\src\\modules\\About\\About.vue","./Header":"E:\\module-federation\\packages\\transport-aircraft\\src\\modules\\Header\\Header.vue"},
  modulesRoute,
}

