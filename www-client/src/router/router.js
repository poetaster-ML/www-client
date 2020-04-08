import without from 'lodash/without';
import cloneDeep from 'lodash/cloneDeep';
import VueRouter from 'vue-router';
import { normalizeToArray } from '@utils/functional';

const normalizeObjValsToArrays = (key, ...objs) => {
  for (const obj of objs) {
    obj[key] = normalizeToArray(obj[key]);
  }
};

export default class Router extends VueRouter {
  constructor (options) {
    super(options);
    this.defaultRedirect = options.defaultRedirect || '';
  }

  redirect () {
    const { redirect } = this.currentRoute.query;
    this.push(redirect || { name: this.defaultRedirect });
  }

  push (
    location,
    {
      onComplete,
      onAbort,
      appendQuery = false,
      preserveQuery = false // Should take query name...
    } = {}
  ) {
    const currentQuery = cloneDeep(this.currentRoute.query);

    if (appendQuery && currentQuery && location.query) {
      location.query = cloneDeep(location.query);

      for (const k in currentQuery) {
        if (!location.query[k]) continue;

        normalizeObjValsToArrays(k, currentQuery, location.query);

        // Concatenate so the original is preserved.
        location.query[k] = location.query[k].concat(currentQuery[k]);
      }
    }

    if (preserveQuery && this.currentRoute.query) {
      location.query = this.currentRoute.query;
    }

    super.push(location, onComplete, onAbort);
  }

  /**
   * For every k, v pair in query, if k is in the current route's
   * query then remove every item in v from the new query.
   */
  removeQuery (query) {
    const queryToRemove = cloneDeep(query);
    const newQuery = cloneDeep(this.currentRoute.query);

    for (const k in queryToRemove) {
      normalizeObjValsToArrays(k, queryToRemove, newQuery);

      for (const v of queryToRemove[k]) {
        newQuery[k] = without(newQuery[k], v);
      }
    }

    this.push({ query: newQuery });
  }
};
