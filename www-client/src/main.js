import '@babel/polyfill';

import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';
import createApolloProvider from './apollo';

import vuetify from './plugins/vuetify';

import { normalizeToArray } from '@utils/functional';
import CursorUtility from '@utils/cursor';

import './styles/main.scss';

(async function main () {
  const cursorUtility = new CursorUtility();

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
      cursorUtility: cursorUtility
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

  const apolloProvider = await createApolloProvider();

  new Vue({
    router,
    store,
    vuetify,
    apolloProvider,
    render: h => h(App)
  }).$mount('#app');
})();
