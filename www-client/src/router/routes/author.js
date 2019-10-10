import {
  AuthorDetail,
  AuthorIndex
} from '@views';

import {
  AuthorRead
  // AuthorEdit
} from '@components/author';

import {
  Author
} from '@models';

import {
  createDetailRoute,
  createIndexRoute
} from '../utils';

const authorIndex = createIndexRoute({
  component: AuthorIndex,
  model: Author
});

const authorDetail = createDetailRoute({
  component: AuthorDetail,
  model: Author,
  relations: ['texts'],
  beforeEnter: [
    (to, from, next) => {
      Author.fetch();
      next();
    }
  ]
});

const authorRead = createDetailRoute({
  component: AuthorRead,
  model: Author
});

export {
  authorDetail,
  authorIndex,
  authorRead
};
