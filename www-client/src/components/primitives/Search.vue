<template>
  <v-text-field
    v-model='query'
    label='Search'
    outlined
    dense
    hide-details>
  </v-text-field>
</template>
<script>
export default {
  data: () => ({
    query: ''
  }),
  watch: {
    query (query, oldQuery) {
      this.$emit('input', { query });
    }
  }
};
</script>
