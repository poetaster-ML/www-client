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
import Base from './Base.vue';
export default {
  extends: Base,
  data () {
    return {
      className: 'author-read'
    };
  }
};
</script>
