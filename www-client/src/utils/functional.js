// import cloneDeep from 'lodash/cloneDeep';
// import flowRight from 'lodash/fp/flowRight';
import map from 'lodash/map';
import Vue from 'vue';

const normalizeToArray = v => Array.isArray(v) ? v : [v];

/**
 * Create a new class extended from each of the specified
 * `classes`.
 * Ex:
 *   class A, B, C;
 *   class D extends composeClass(A, B, C);
 *   D.prototype === C; // true
 *   C.prototype === B; // true
 *   B.prototype === A; // true
 */
/*
const composeClass = (
  classes,
  {
    newClass = classes.pop(),
    classExtensionFn = extendClass
  } = {}
) => flowRight(...map(
  classes,
  classExtensionFn
))(newClass);

const composeClass = (...classes) => {
  // Take the last class, which doesn't need to be mapped to
  // an extension function.
  console.log(cloneDeep(classes));

  const base = classes.pop();

  // Map the rest to extension functions.
  const extensionFns = map(classes, A => {
    return B => {
      console.log('superclass ->', B);
      console.log('extendclass ->', A);

      console.log(A.prototype, B.prototype);

      function Intermediate () {
      };

      Intermediate.prototype = Object.create(A.prototype);
      Object.assign(Intermediate.prototype, B.prototype);
      Intermediate.prototype.constructor = Intermediate;

      console.log('composite ->', new Intermediate());
      return Intermediate;
    };
  });

  return flowRight(...extensionFns)(base);
};
*/
/**
 * Create a class extending A's prototype chain
 * with B's own enumerable properties.
 */
const extendClass = C => D => Object.assign(
  class _ extends C {}, D
);

/**
 * Wrap `extendClass` with this function when composing
 * classes to specify a property that should return the
 * aggregate of the return values of its ancestor properties
 * up the prototype chain.
 */
const withAggregateProperty = (
  classExtensionFn, propertyName, aggregateFn = Object.assign
) => (baseClass) => {
  const [
    extendedClass,
    extendedClassWithAggregateProperty
  ] = map([baseClass, baseClass], classExtensionFn);

  return Object.defineProperty(
    extendedClassWithAggregateProperty,
    propertyName,
    (...args) => aggregateFn(
      extendedClass[propertyName](...args),
      baseClass[propertyName](...args)
    )
  );
};

const createComponentFactory = (compileTimeCtx) => (name, runTimeCtx) => {
  return Vue.component(
    name,
    Object.assign(
      compileTimeCtx,
      runTimeCtx
    )
  );
};

export {
  normalizeToArray,
  createComponentFactory,
  // composeClass,
  extendClass,
  withAggregateProperty
};
