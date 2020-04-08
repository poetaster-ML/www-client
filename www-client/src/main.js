import '@babel/polyfill';

import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';
import apolloProvider from './apollo';

import vuetify from './plugins/vuetify';

import { normalizeToArray } from '@utils/functional';

import './styles/main.scss';

(function main () {
  Vue.mixin({
    computed: {
      /**
       * Enum of currently selected annotations.
       */
      annotations () {
        const { annotation } = this.$route.query;
        const annotations = annotation ? normalizeToArray(annotation) : [];
        return annotations.reduce(
          (acc, annotation) => Object.assign(acc, { [annotation]: annotation }),
          {}
        );
      }
    }
  });

  /*
  Object.defineProperty(Vue.prototype, 'children', {
    get: function () {
      return this.$children;
    }
  });
  */

  Vue.config.productionTip = false;

  new Vue({
    router,
    store,
    vuetify,
    apolloProvider,
    render: h => h(App)
  }).$mount('#app');
})();
