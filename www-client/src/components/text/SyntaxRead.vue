<template>
  <div class='text-read' @dblclick='onDblClick'>
    <TextSentenceSyntaxRead
      v-for='(sentence, idx) in nlpDoc.sentences'
      :sentence='sentence'
      :key='idx'
    />
  </div>
</template>
<script>
import Read from './Read';
import SyntaxMixin from './SyntaxMixin';
import { TextSentenceSyntaxRead } from './partials';

export default {
  extends: Read,
  mixins: [
    SyntaxMixin
  ],
  computed: {
  },
  components: {
    TextSentenceSyntaxRead
  }
};
</script>
