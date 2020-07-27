<template>
  <div class='commentary-edit' style='position: relative'>
    <Editor
      ref='editor'
      :textAnnotationRelation='textAnnotationRelation'
      :quill='quill'/>
    <Halyard
      style='position: absolute;'
      :transform='halyardTransform'
      :height='halyardHeight'
      :width='halyardWidth'
      :direction='halyardDirection'/>
  </div>
</template>

<script>
import Quill from 'quill';
import Base from './Base.vue';
import Editor from './Editor';
import halyardMixin from './halyardMixin';
import { TextAnnotationRelation, TextRange } from '@models';

export default {
  extends: Base,
  mixins: [halyardMixin],
  props: {
    textAnnotationRelation: TextAnnotationRelation,
    quill: Quill
  },
  mounted () {
    this.$set(this, 'halyardSource', this.$refs.editor.$el);

    // If the textAnnotationRelation doesn't have a textRange yet
    // then it has come from the server and we need to figure out where
    // it is in quill terms.
    this.eventBus.$once('quill-initialized', (quill) => {
      if (!this.textAnnotationRelation.textRange) {
        const { textStartIndex, length } = this.textAnnotationRelation;
        const blocks = quill.getLines(textStartIndex, length);
        const elements = blocks.map(block => block.domNode);

        console.log(this.textAnnotationRelation, blocks, elements);

        this.textAnnotationRelation.textRange = new TextRange(elements, textStartIndex, length);

        // Stateful operations on elements in another component.. not good.
        // Should be handled by the editor.
        for (const el of elements) {
          el.classList.add('selected');
        }
      }
    });
  },
  components: {
    Editor
  }
};
</script>
