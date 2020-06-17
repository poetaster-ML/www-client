import '@babel/polyfill';

import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';
import apolloProvider from './apollo';

import vuetify from './plugins/vuetify';

import { normalizeToArray } from '@utils/functional';
import MouseLocator from '@utils/mouse';

import './styles/main.scss';

(function main () {
  const mouseLocator = new MouseLocator();

  Vue.use((Vue) => {
    Vue.prototype.$bubble = function $bubble (eventName, ...args) {
      // Emit the event on all parent components.
      let component = this;
      do {
        component.$emit(eventName, ...args);
        component = component.$parent;
      } while (component);
    };
  });

  Vue.mixin({
    data: () => ({
      mouseLocator: mouseLocator
    }),
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

  Vue.config.productionTip = false;

  new Vue({
    router,
    store,
    vuetify,
    apolloProvider,
    render: h => h(App)
  }).$mount('#app');
})();
