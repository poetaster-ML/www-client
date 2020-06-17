<template>
  <layout>
    <template #search-global>
      <TextIndexSearchBar @input='onTextIndexSearchBarInput'/>
    </template>

    <template #main>

    </template>
  </layout>
</template>

<script>
import { Layout } from '@layouts';
import { AuthorsIndex } from '@queries';
import { TextIndexSearchBar } from '@components/text';
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
    onTextIndexSearchBarInput () {
      throw new Error('!');
    }
  },
  components: {
    Layout,
    TextIndexSearchBar
  }
};
</script>
