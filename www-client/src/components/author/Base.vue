<template>
  <v-container
    class="fill-height d-flex"
    fluid
  >
    <v-row>
      <text-list :items="author.texts"/>
    </v-row>
  </v-container>
</template>

<script>
import { Author } from '@models';
import { TextList } from '@components/text';

export default {
  name: 'author-base',
  components: {
    TextList
  },
  data () {
    return {
      className: ''
    };
  },
  props: {
    author: Author
  }
};
</script>
