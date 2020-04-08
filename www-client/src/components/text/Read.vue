<template>
  <div class='text-read' @dblclick='onDblClick'>
    <template v-if='annotations.syntax'>
      <TextSentenceRead
        v-for='(sentence, idx) in nlpDoc.sentences'
        :sentence='sentence'
        :key='idx'
      />
    </template>
    <div v-else class='lines'>
      <TextLineRead
        v-for='(line, idx) in text.lines'
        :line='line'
        :key='idx'
      />
    </div>
  </div>
</template>
<script>
import Base from './Base';
import { TextLineRead, TextSentenceRead } from './partials';

export default {
  extends: Base,
  methods: {
    onDblClick () {
      this.$router.push(this.text.editRoute(), { preserveQuery: true });
    }
  },
  computed: {
    nlpDoc () {
      return this.text.nlpDocVersions[0];
    }
  },
  components: {
    TextLineRead,
    TextSentenceRead
  }
};
</script>
