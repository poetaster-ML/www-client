import '@babel/polyfill';

import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';
import createApolloProvider from './apollo';

import './styles/main.scss';
import vuetify from './plugins/vuetify';

import CursorUtility from '@utils/cursor';

const eventBus = new Vue();

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
      cursorUtility: cursorUtility,
      eventBus
    })
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
