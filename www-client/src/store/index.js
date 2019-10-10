import Vue from 'vue';
import Vuex from 'vuex';

import VuexORM from '@vuex-orm/core';
import VuexORMGraphQL from '@vuex-orm/plugin-graphql';

import createApolloClient from './ApolloClient';
import Adapter from './Adapter';

import * as models from './models';

export default async function createStore () {
  Vue.use(Vuex);

  const database = new VuexORM.Database();
  const apolloClient = await createApolloClient();

  // Register all the models with the database.
  Object.values(
    models
  ).forEach(database.register.bind(database));

  VuexORM.use(VuexORMGraphQL, {
    database,
    apolloClient,
    adapter: new Adapter(),
    debug: process.env.NODE_ENV !== 'production'
  });

  // Create Vuex Store and register database through Vuex ORM.
  const store = new Vuex.Store({
    plugins: [VuexORM.install(database)]
  });

  return store;
};
