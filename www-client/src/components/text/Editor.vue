<template>
  <div class='text-quill-editor'>
    <slot name='toolbar'></slot>
    <div ref='editor'></div>
  </div>
</template>
<script>
import { Text } from '@models';
import QuillEditorMixin from '@/components/mixins/quill';

export default {
  mixins: [
    QuillEditorMixin
  ],
  props: {
    text: Text,
    preventSelectionChangeOnFocusChange: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    lastLengthfulSelection: null
  }),
  methods: {
    setQuillContent () {
      const delta = this.text.toQuillDelta();
      this.quill.setContents(delta);

      // Update model if text changes.
      this.quill.on('text-change', () => {
        const delta = this.quill.getContents();
        this.text.applyQuillDelta(delta);
      });
    }
  },
  mounted () {
    // Bubble selection. Used:
    //   - By TextEditView to capture index of commentary and labelling.
    const bubbleSelectionRange = range => this.$bubble('text-editor-selection-change', range);
    this.quill.on('selection-change', bubbleSelectionRange);

    // Save the last lengthful selection for the following operation, since `savedRange`
    // has the already lengthless selection.
    const saveLengthfulSelectionRange = range => {
      if (range && range.length) this.lastLengthfulSelection = range;
    };
    this.quill.on('selection-change', saveLengthfulSelectionRange);

    // Parent components may want selected text to remain selected even
    // when quill loses focus, for instance when an edit menu is enabled
    // w/r/t the current selection. It would be nice to prevent the change
    // from happening in the first place given this flag, but that's a task
    // for another day... for now revert it.
    const revertSelectionChange = (_, __, source) => {
      const { selection } = this.quill;
      if (source === 'user' && this.preventSelectionChangeOnFocusChange) {
        selection.setRange(this.lastLengthfulSelection);
      }
    };
    this.quill.on('selection-change', revertSelectionChange);
  }
};
</script>
