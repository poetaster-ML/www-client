const fetchAllGuard = model => (to, from, next) => {
  model.fetch();
  next();
};

const fetchOneGuard = (model, relations) => (to, from, next) => {
  const { slug } = to.params;
  model
    .fetch(slug, relations)
    .then(() => next());
};

const isUndefined = value => value === undefined;

const evaluateGuards = (guards, to, from, next) => {
  const guardsLeft = guards.slice(0);
  const nextGuard = guardsLeft.shift();

  if (isUndefined(nextGuard)) {
    next();
    return;
  }

  nextGuard(to, from, (nextArg) => {
    if (isUndefined(nextArg)) {
      evaluateGuards(guardsLeft, to, from, next);
      return;
    }

    next(nextArg);
  });
};

/*
@assert([
  [guards => Array.isArray(guards), 'guards must be an array']
])
*/
const chainGuards = guards => (
  to, from, next
) => evaluateGuards(
  guards, to, from, next
);

const nestRoutes = ({ root, children }) => ({
  ...root,
  children
});

const createIndexRoute = ({
  model,
  component,
  beforeEnter = [],
  etc = {}
}) => ({ name, path } = {}) => ({
  name,
  component,
  path: `/${model.entity}`,
  beforeEnter: chainGuards([
    fetchAllGuard(model),
    ...beforeEnter
  ]),
  ...etc
});

const createDetailRoute = ({
  model,
  component,
  relations = [],
  beforeEnter = [],
  etc = {}
}) => ({
  name,
  path = `/${model.entity}/:slug`
} = {}) => ({
  name,
  component,
  path,
  beforeEnter: chainGuards([
    fetchOneGuard(model, relations),
    ...beforeEnter
  ]),
  ...etc
});

export {
  createDetailRoute,
  createIndexRoute,
  nestRoutes
};
