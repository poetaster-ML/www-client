<template>
  <v-container
    class="fill-height d-flex"
    fluid
  >
    <v-row>
      <TextList :items="author.texts"/>
    </v-row>
  </v-container>
</template>

<script>
import { Author } from '@models';
import { TextList } from '@components/text';

export default {
  props: {
    author: Author
  },
  data: () => ({
    className: ''
  }),
  components: {
    TextList
  }
};
</script>
