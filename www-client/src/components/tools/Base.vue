<template>
  <v-card-actions>
    <v-container class='py-0 flex-column'>
      <TextTool
        type='prosody'
        :textRoute='textRoute'
      />
      <TextTool
        type='syntax'
        :textRoute='textRoute'
      />
      <TextTool
        type='morphology'
        :textRoute='textRoute'
      />
      <TextTool
        type='semantics'
        :textRoute='textRoute'
      />
    </v-container>
  </v-card-actions>
</template>
<script>
import { Text } from '@models';
import TextTool from './TextTool';

export default {
  data: () => ({
    classes: ''
  }),
  props: {
    text: Text
  },
  methods: {
    getRoute (annotation) {}
  },
  components: {
    TextTool
  }
};
</script>
