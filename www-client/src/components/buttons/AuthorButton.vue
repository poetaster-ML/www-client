<template>
  <v-btn text :to='author.readRoute()'>
    {{ author.display }}
  </v-btn>
</template>
<script>
import { Author } from '@models';
export default {
  props: {
    author: Author
  }
};
</script>
