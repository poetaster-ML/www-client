<template>
  <div class='commentary-edit'>
    <Editor/>
  </div>
</template>

<script>
import Base from './Base.vue';
import Editor from './Editor';
import { TextAnnotationRelation } from '@models';
export default {
  extends: Base,
  props: {
    textAnnotationRelation: TextAnnotationRelation
  },
  components: {
    Editor
  }
};
</script>
