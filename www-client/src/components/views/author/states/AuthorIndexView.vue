<template>
  <layout class='author-index-view'>
    <template #search-global>
      <TextIndexSearchBar @input='onTextIndexSearchBarInput'/>
    </template>

    <template #main>
      <div
        v-for='([letter, authors]) in authorsByLastName'
        class='group'
        :key='letter'>
        <div>{{ letter }}</div>
        <AuthorList :items='authors' style='width: 33%;'/>
      </div>
    </template>
  </layout>
</template>

<script>
import groupBy from 'lodash/groupBy';
import Base from './Base.vue';
import { AuthorsIndex } from '@queries';
import { TextIndexSearchBar } from '@components/text';
import { AuthorList } from '@components/author';
import { AuthorConnectionSerializer } from '@serializers';

export default {
  extends: Base,
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
  computed: {
    authorsByLastName () {
      return Object.entries(
        groupBy(
          this.authors.slice().sort(
            (a1, a2) => a1.lastName.localeCompare(a2.lastName)
          ),
          author => author.lastName[0]
        )
      );
    }
  },
  methods: {
    onTextIndexSearchBarInput () {
      throw new Error('!');
    }
  },
  components: {
    TextIndexSearchBar,
    AuthorList
  }
};
</script>
