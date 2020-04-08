<template>
  <layout>
    <template #nav-global>
      <v-toolbar-title>
        <AuthorButton v-if='author' :author='author'/>
      </v-toolbar-title>
    </template>

    <template #main>
      <AuthorRead :author='author'/>
    </template>
  </layout>
</template>

<script>
import Base from './Base.vue';
import { AuthorRead } from '@components/author';
import { AuthorDetail } from '@queries';
import { AuthorConnectionSerializer } from '@serializers';
import { currentSlug } from '@utils/queries';

export default {
  extends: Base,
  data: () => ({
    author: null
  }),
  apollo: {
    author: {
      query: AuthorDetail,
      variables: currentSlug,
      update: ({ authors }) => new AuthorConnectionSerializer(authors)[0]
    }
  },
  components: {
    AuthorRead
  }
};
</script>
