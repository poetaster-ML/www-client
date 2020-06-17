import map from 'lodash/map';
import reduce from 'lodash/reduce';

class Serializer {};

class ModelSerializer extends Serializer {
  static model;

  static fields () {
    return {};
  }

  constructor (data) {
    super();

    const Model = this.constructor.model;
    const fields = this.constructor.fields();

    // Do the data keys correspond to field-serializer mappings?
    // If so then apply their serialization functions.
    return new Model(
      reduce(
        data,
        (a, v, k) => Object.assign(a, {
          [k]: k in fields ? fields[k](v) : v
        }),
        {}
      )
    );
  }
};

class ListSerializer extends ModelSerializer {
  constructor (data) {
    return data
      ? map(data, datum => super(datum))
      : [];
  }
};

/**
 * A list serializer where the list is called `edges` and
 * each object is wrapped in a `node`.
 */
class ConnectionSerializer extends ModelSerializer {
  constructor (data) {
    return data
      ? map(data.edges, edge => super(edge.node))
      : [];
  }
};

export {
  ModelSerializer,
  ListSerializer,
  ConnectionSerializer
};
