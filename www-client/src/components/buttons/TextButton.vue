<template>
  <v-btn text :to="route">
    {{ text.display }}
  </v-btn>
</template>
<script>
import { Text } from '@models';
export default {
  props: {
    text: Text
  },
  computed: {
    route () {
      return this.text.readRoute();
    }
  }
};
</script>
