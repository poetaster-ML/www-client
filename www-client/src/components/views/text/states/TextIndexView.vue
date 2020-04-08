<template>
  <layout>
    <template #search-global>
      <TextSearch @input='onTextSearchInput'/>
    </template>

    <template #main>
      <template v-if='textsSearch.length'>
        <TextSearchResult
          v-for='(text, idx) in textsSearch'
          :text='text'
          :key='idx'
          style='padding-bottom: 50px'/>
      </template>
      <TextList v-else :items='textsIndex'/>
    </template>
  </layout>
</template>

<script>
import Base from './Base.vue';
import { TextsIndex, TextsSearch } from '@queries';
import {
  TextConnectionSerializer,
  TextSearchResultConnectionSerializer
} from '@serializers';
import { TextSearch, TextSearchResult, TextList } from '@components/text';

export default {
  extends: Base,
  data: () => ({
    textsIndex: [],
    textsSearch: []
  }),
  apollo: {
    textsIndex: {
      query: TextsIndex,
      variables: {
        first: 100
      },
      update: ({ texts }) => new TextConnectionSerializer(texts)
    },
    textsSearch: {
      query: TextsSearch,
      variables () {
        return { query: this.$route.query.q };
      },
      skip: vm => !vm.$route.query.q,
      update: ({ textsSearch }) => new TextSearchResultConnectionSerializer(textsSearch)
    }
  },
  methods: {
    onTextSearchInput (query) {
      this.$router.push({ query: { q: query } });
    }
  },
  components: {
    TextSearch,
    TextList,
    TextSearchResult
  }
};
</script>
