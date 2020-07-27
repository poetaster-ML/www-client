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
import { LASI } from '@/search';

export default {
  data: () => ({
    engine: new LASI()
  }),
  computed: {
    query: {
      set (q) {
        const annotationResults = this.engine.search(q);

        // Remove annotative syntax from the query...
        q = LASI.redact(q);

        this.$store.commit('annotations/setCurrent', annotationResults);
        this.$store.commit('query/setCurrent', { q: q.trim() });
      },
      get () {
        const { annotations, query } = this.$store.state;
        const annotationString = Object.values(annotations.current).map(a => `annotation:${a}`).join(' ');
        const queryString = query.current.q || '';
        const completeString = annotationString ? annotationString + ' ' + queryString : queryString;
        return completeString;
      }
    }
  },
  methods: {
    onKeydownEnter () {
    }
  }
};
</script>
