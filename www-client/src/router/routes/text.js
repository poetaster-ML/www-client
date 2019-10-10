import {
  TextDetail,
  TextIndex
} from '@views';

import {
  TextRead,
  TextEdit
} from '@components/text';

import {
  Text
} from '@models';

import {
  createDetailRoute,
  createIndexRoute
} from '../utils';

const textIndex = createIndexRoute({
  component: TextIndex,
  model: Text
});

const textDetail = createDetailRoute({
  component: TextDetail,
  model: Text,
  relations: ['author', ...Text.NLPConstructs]
});

const textEdit = createDetailRoute({
  component: TextEdit,
  model: Text,
  props: {
    classes: 'text-detail--edit'
  }
});

const textRead = createDetailRoute({
  component: TextRead,
  model: Text,
  props: {
    classes: 'text-detail--read'
  }
});

export {
  textDetail,
  textEdit,
  textIndex,
  textRead
};
