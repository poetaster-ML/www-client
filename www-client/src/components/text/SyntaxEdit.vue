<template>
  <div class='text-edit' @dblclick='onDblClick'>
    <TextSentenceSyntaxEdit
      v-for='(sentence, idx) in nlpDoc.sentences'
      :sentence='sentence'
      :key='idx'
    />
  </div>
</template>
<script>
import Read from './Read';
import SyntaxMixin from './SyntaxMixin';
import { TextSentenceSyntaxEdit } from './partials';

export default {
  extends: Read,
  mixins: [
    SyntaxMixin
  ],
  computed: {
  },
  components: {
    TextSentenceSyntaxEdit
  }
};
</script>
