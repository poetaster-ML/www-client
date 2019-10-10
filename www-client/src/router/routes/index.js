import {
  authorDetail,
  // authorEdit,
  authorRead,
  authorIndex
} from './author';

import {
  textDetail,
  textEdit,
  textRead
} from './text';

import { nestRoutes } from '../utils';

export default [
  nestRoutes({
    root: authorDetail(),
    children: [
      // authorEdit({
      //   name: 'author-edit',
      //   path: 'edit'
      // }),
      authorRead({
        name: 'authorRead',
        path: ''
      })
    ]
  }),
  nestRoutes({
    root: textDetail(),
    children: [
      textEdit({
        name: 'textEdit',
        path: 'edit'
      }),
      textRead({
        name: 'textRead',
        path: ''
      })
    ]
  }),
  authorIndex({
    name: 'authorIndex'
  }),
  {
    path: '/',
    name: 'home',
    redirect: 'authors'
  }
];
