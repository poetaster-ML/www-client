import Vue from 'vue';
import VueApollo from 'vue-apollo';
import client from './client';

Vue.use(VueApollo);

export default new VueApollo({ defaultClient: client });
