<template>
  <v-card-actions>
    <v-container class='py-0 flex-column'>
      <TextTool
        type='phonology'
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
      <TextTool
        type='commentary'
        :textRoute='textRoute'
      />
      <TextTool
        type='inter-text relationships'
        :textRoute='textRoute'
      />
      <TextTool
        type='intra-text relationships'
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
