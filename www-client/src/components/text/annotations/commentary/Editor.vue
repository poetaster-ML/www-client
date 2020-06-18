<template>
  <div class='commentary-quill-editor'>
    <slot name='toolbar'></slot>
    <div ref='editor'></div>
  </div>
</template>
<script>
import { TextAnnotationRelation } from '@models';
import QuillEditorMixin from '@/components/mixins/quill';

export default {
  mixins: [
    QuillEditorMixin
  ],
  props: {
    textAnnotationRelation: TextAnnotationRelation
  },
  methods: {
    setQuillContent () {
    }
  },
  mounted () {
  }
};
</script>
