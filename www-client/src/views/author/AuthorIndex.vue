<template>
  <layout>
    <template #nav-global>
      <v-toolbar-title>
      </v-toolbar-title>
    </template>
    <template #nav-index>
      <authors-bar :authors="currentAuthors"/>
    </template>
  </layout>
</template>

<script>
import { AuthorsBar } from '@navigation';
import { Layout } from '@layouts';
import { Author } from '@models';

export default {
  name: 'author-index-view',
  components: {
    AuthorsBar,
    Layout
  },
  computed: {
    currentAuthors: () => Author
      .query()
      .orderBy('name', 'desc')
      .get()
  }
};
</script>
