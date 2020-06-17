<template>
  <NLPSyntaxTree :tree='sentence.dependencyParse'/>
</template>

<script>
import Read from './Read.vue';
import { NLPSentence } from '@models';
import { NLPSyntaxTree } from '@components/trees';

export default {
  extends: Read,
  props: {
    sentence: NLPSentence
  },
  components: {
    NLPSyntaxTree
  }
};
</script>
