import { Model } from '@vuex-orm/core';

/**
 * All the models have an ID field.
 */
export default class Base extends Model {
  static fields () {
    return {
      id: this.attr(null)
    };
  }
  static bySlug (slug) {
    return this
      .query()
      .withAll()
      .where('slug', slug)
      .first();
  }
  detailRoute (name) {
    const { primaryKey } = this.constructor;
    return {
      name,
      params: {
        [primaryKey]: this.$id
      }
    };
  }
  get readRoute () {
    const { readRoute } = this.constructor;
    return this.detailRoute(readRoute);
  }
  get editRoute () {
    const { editRoute } = this.constructor;
    return this.detailRoute(editRoute);
  }
};
