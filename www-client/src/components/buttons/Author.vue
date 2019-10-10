<template>
  <v-btn text :to="author.readRoute">
    {{ author.name }}
  </v-btn>
</template>
<script>
import { Author } from '@models';
export default {
  name: 'author-button',
  props: {
    author: Author
  }
};
</script>
