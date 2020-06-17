<template>
  <v-card-actions>
    <v-container class='py-0 flex-column'>
      <v-btn @click='$emit("save")'>save</v-btn>
    </v-container>
  </v-card-actions>
</template>
<script>
import { Text } from '@models';

export default {
  props: {
    text: Text
  }
};
</script>
