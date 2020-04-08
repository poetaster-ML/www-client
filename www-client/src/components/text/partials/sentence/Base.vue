<template>
  <NLPSyntaxTree :tree='sentence.tree'/>
</template>

<script>
import Base from '../Base.vue';
import { NLPSentence } from '@models';
import { NLPSyntaxTree } from '@components/trees';

export default {
  extends: Base,
  props: {
    sentence: NLPSentence
  },
  components: {
    NLPSyntaxTree
  }
};
</script>
