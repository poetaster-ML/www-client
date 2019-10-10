<template>
  <layout>
    <template #nav-global>
      <v-toolbar-title>
        <author-button :author="currentAuthor"/>
      </v-toolbar-title>
    </template>
    <template #nav-index>
      <authors-bar :authors="currentAuthors"/>
    </template>
    <template #main>
      <router-view :author="currentAuthor"/>
    </template>
  </layout>
</template>

<script>
import { Author } from '@models';
import { AuthorsBar } from '@navigation';
import { AuthorButton } from '@buttons';
import { Layout } from '@layouts';

export default {
  name: 'author-base-view',
  components: {
    AuthorsBar,
    AuthorButton,
    Layout
  },
  computed: {
    currentAuthor () {
      return Author.bySlug(this.$route.params.slug);
    },
    currentAuthors: () => Author
      .query()
      .orderBy('name', 'desc')
      .get()
  },
  beforeRouteUpdate: async ({ params: { slug } }, from, next) => {
    await Author.fetch({ slug }, ['texts']);
    next();
  }
};
</script>
