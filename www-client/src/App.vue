<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { annotationQueryToEnum } from '@utils/annotations';

export default {
  methods: {
    ...mapMutations('query', {
      setCurrentQuery: 'setCurrent'
    }),
    ...mapMutations('annotations', {
      setCurrentAnnotations: 'setCurrent'
    }),
    addCurrentQueryToURL (newQuery, oldQuery) {
      if (newQuery === oldQuery) return;

      this.$router.push(
        { query: { q: newQuery } },
        { preserveQueryKey: 'annotation' }
      );
    },
    addCurrentAnnotationsToURL (currentAnnotations) {
      for (const annotation in currentAnnotations) {
        const urlAnnotations = this.$router.currentRoute.query.annotation;

        if (urlAnnotations && urlAnnotations.includes(annotation)) continue;

        this.$router.push(
          { query: { annotation } },
          { appendQuery: true, preserveQueryKey: 'q' }
        );
      }
    }
  },
  created () {
    // Bootstrap stateful url implications--
    const { q } = this.$route.query;
    if (q) this.setCurrentQuery({ q });

    const annotationQuery = this.$route.query.annotation;
    if (annotationQuery) {
      const annotationEnum = annotationQueryToEnum(annotationQuery);
      this.setCurrentAnnotations(annotationEnum);
    }

    // Initialize these watchers *after* bootstrapping the state
    // so that we don't duplicate navigation.
    [
      ['$store.state.annotations.current', this.addCurrentAnnotationsToURL],
      ['$store.state.query.current.q', this.addCurrentQueryToURL]
    ].forEach(([ key, fn ]) => this.$watch(key, fn));
  }
};
</script>
