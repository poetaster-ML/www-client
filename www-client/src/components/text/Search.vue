<template>
  <v-text-field
    class='text-search'
    v-model='query'
    label='Search'
    outlined
    dense
    hide-details>
  </v-text-field>
</template>
<script>

export default {
  data: vm => ({
    query: vm.$route.query.q
  }),
  watch: {
    query (newQuery, oldQuery) {
      this.$emit('input', newQuery);
    }
  }
};
</script>
