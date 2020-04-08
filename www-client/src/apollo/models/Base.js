class NotImplementedError extends Error {};

class Base {
  static primaryKey;

  constructor (data) {
    for (const key in data) {
      this[key] = data[key];
    }
  }

  get pk () {
    return this[this.constructor.primaryKey];
  }

  get display () {
    throw new NotImplementedError();
  }
}

class Routable extends Base {
  static readRoute;
  static editRoute;

  detailRoute (name, query) {
    const { primaryKey } = this.constructor;
    return {
      name,
      query,
      params: {
        [primaryKey]: this.pk
      }
    };
  }

  readRoute ({ query } = {}) {
    const { readRoute } = this.constructor;
    return this.detailRoute(readRoute, query);
  }

  editRoute ({ query } = {}) {
    const { editRoute } = this.constructor;
    return this.detailRoute(editRoute, query);
  }
}

export {
  Base,
  Routable
};
