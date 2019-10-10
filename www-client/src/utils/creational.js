import flowRight from 'lodash/fp/flow';
import map from 'lodash/map';
import Vue from 'vue';

/**
 * Create a class extending A's prototype chain
 * with B's own enumerable properties.
 */
const extendClass = (C) => (D) => Object.assign(
  class extends C {}, D
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

/**
 * Create a new class extended from each of the specified
 * `classes`.
 * Ex:
 *   class A, B, C, D;
 *   const E = composeClass(A, B, C, D);
 *   E.prototype === D; // true
 *   D.prototype === C; // true
 */
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
  createComponentFactory,
  composeClass,
  extendClass,
  withAggregateProperty
};
