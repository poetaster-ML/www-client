<template>
  <layout>
    <template #search-global>
      <TextSearch @input='onTextSearchInput'/>
    </template>

    <template #main>

    </template>
  </layout>
</template>

<script>
import { Layout } from '@layouts';
import { AuthorsIndex } from '@queries';
import { TextSearch } from '@components/text';
import { AuthorConnectionSerializer } from '@serializers';

export default {
  data: () => ({
    authors: []
  }),
  apollo: {
    authors: {
      query: AuthorsIndex,
      update: ({ authors }) => new AuthorConnectionSerializer(authors),
      variables: {
        first: 5000
      }
    }
  },
  methods: {
    onTextSearchInput () {
      throw new Error('!');
    }
  },
  components: {
    Layout,
    TextSearch
  }
};
</script>
