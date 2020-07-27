import compose from 'lodash/fp/compose';
import reduce from 'lodash/reduce';
import { normalizeToArray } from './functional';

const annotationQueryToEnum = query => compose(
  array => reduce(
    array, (acc, annotation) => Object.assign(
      acc, { [annotation]: annotation }
    ), {}
  ),
  normalizeToArray
)(query);

export {
  annotationQueryToEnum
};
