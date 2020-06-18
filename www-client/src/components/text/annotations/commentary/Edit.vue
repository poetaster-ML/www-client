<template>
  <div class='commentary-edit'>
    <Editor/>
    <Halyard :textAnnotationRelation='textAnnotationRelation'/>
  </div>
</template>

<script>
import Base from './Base.vue';
import Editor from './Editor';
import Halyard from './Halyard';

import { TextAnnotationRelation } from '@models';

export default {
  extends: Base,
  props: {
    textAnnotationRelation: TextAnnotationRelation
  },
  components: {
    Editor,
    Halyard
  }
};
</script>
