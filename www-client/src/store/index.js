import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    query: {
      namespaced: true,
      state: {
        current: ''
      },
      mutations: {
        setCurrent (state, current) {
          state.current = current;
        }
      }
    },
    annotations: {
      namespaced: true,
      state: {
        current: {}
      },
      mutations: {
        setCurrent (state, current) {
          state.current = current;
        }
      }
    }
  }
});
