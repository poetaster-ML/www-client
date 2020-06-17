<template>
  <v-text-field
    class='text-search'
    v-model='query'
    label='Search'
    outlined
    dense
    hide-details
    @keydown.enter='onKeydownEnter'>
  </v-text-field>
</template>
<script>
import { Text } from '@models';

export default {
  props: {
    searchEngine: Object,
    text: Text
  },
  data: vm => ({
    query: ''
  }),
  methods: {
    onKeydownEnter (e) {
      const searchResult = this.searchEngine.search(this.query);
      this.$bubble('text-detail-search-bar-output', searchResult);
    }
  },
  watch: {
    query (query) {}
  }
};
</script>
