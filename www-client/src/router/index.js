import Vue from 'vue';
import Router from './router';

import {
  IndexView,
  AuthorView,
  AuthorIndexView,
  AuthorReadView,
  AuthorEditView,
  TextView,
  TextIndexView,
  TextReadView,
  TextEditView,
  TextCreateView
} from '@views';

Vue.use(Router);

export default new Router({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  mode: 'history',
  base: process.env.VUE_ROUTER_BASE,
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView
    },
    {
      path: '/authors/',
      component: AuthorView,
      children: [
        {
          path: ':slug/edit/',
          name: 'authorEdit',
          component: AuthorEditView
        },
        {
          path: ':slug/',
          name: 'authorRead',
          component: AuthorReadView
        },
        {
          path: '',
          name: 'authorIndex',
          component: AuthorIndexView
        }
      ]
    },
    {
      path: '/texts/',
      component: TextView,
      children: [
        {
          path: 'new/',
          name: 'textCreate',
          component: TextCreateView
        },
        {
          path: ':slug/edit/',
          name: 'textEdit',
          component: TextEditView
        },
        {
          path: ':slug/',
          name: 'textRead',
          component: TextReadView
        },
        {
          path: '',
          name: 'textIndex',
          component: TextIndexView
        }
      ]
    }
  ]
});
