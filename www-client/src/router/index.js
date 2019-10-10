import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);

export default function (/* { store, ssrContext } */) {
  const router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),

    routes,

    mode: 'history',
    base: process.env.VUE_ROUTER_BASE
  });

  return router;
};
