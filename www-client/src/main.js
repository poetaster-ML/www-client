import '@babel/polyfill';

import Vue from 'vue';
import App from './App.vue';
import createRouter from './router';
import createStore from './store';

import vuetify from './plugins/vuetify';

import './styles/main.scss';

(async function main () {
  Vue.config.productionTip = false;

  const store = await createStore();
  const router = createRouter();

  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app');
})();
