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
      const delta = this.textAnnotationRelation.toQuillDelta();
      delta && this.quill.setContents(delta);
    }
  },
  mounted () {
    const bubbleTextChange = delta => {
      this.textAnnotationRelation.applyQuillDelta(this.quill.getContents());
      this.$bubble('text-editor-text-change', this.textAnnotationRelation);
    };

    const textChangeEventHandlers = [
      bubbleTextChange
    ];

    textChangeEventHandlers.map(handler => this.quill.on('text-change', handler));
  }
};
</script>
