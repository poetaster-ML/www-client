<template>
  <AuthorList
    v-if="authors"
    :items="authors"
  />
  <div v-else class="text-center mt-50">
    <v-progress-circular
      :value="20"
      indeterminate/>
  </div>
</template>

<script>
import { Author } from '@models';
import { AuthorList } from '@components/author';
export default {
  name: 'authors-bar',
  components: {
    AuthorList
  },
  props: {
    authors: {
      type: Array[Author]
    }
  }
};
</script>
