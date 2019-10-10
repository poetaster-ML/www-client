import { Model } from '@vuex-orm/core';

export default class NLPConstruct extends Model {
  static fields () {
    return {
      textSlug: this.attr(''),
      value: this.attr({})
    };
  }

  static mutators () {
    return {
      value (value) {
        return JSON.parse(value);
      }
    };
  }
}
