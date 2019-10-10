<template>
  <v-btn text :to="text.readRoute">
    {{ text.title }}
  </v-btn>
</template>
<script>
import { Text } from '@models';
export default {
  name: 'text-button',
  props: {
    text: Text
  }
};
</script>
