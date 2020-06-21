<template>
  <div class='text-quill-editor'>
    <slot name='toolbar'></slot>
    <div ref='editor'></div>
  </div>
</template>
<script>
import { Text, TextRange } from '@models';
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
    // Lines -> enclosing paragraph elements.
    const elements = range => {
      const { selection } = this.quill;
      const { index, length } = range;

      const elements = [];
      for (let i = 0; i <= length; i++) {
        const [ el ] = selection.scroll.leaf(index + i);
        elements.push(el.domNode.parentElement);
      }
      return elements;
    };

    // Bubble selection. Used:
    //   - By TextEditView to capture index of annotation
    const bubbleSelectionRange = range => {
      if (range && range.index) {
        const { index, length } = range;

        this.$bubble(
          'text-editor-selection-change',
          new TextRange(elements(range), index, length)
        );
      }
    };

    // Apply a class indicating selection to the selection range.
    const classifySelectionRange = range => {
      if (range && range.index) {
        for (const el of elements(range)) {
          el.classList.add('selected');
        }
      }
    };

    // Save the last lengthful selection for the following operation, since `savedRange`
    // has the already lengthless selection.
    const saveLengthfulSelectionRange = range => {
      if (range && range.length) this.lastLengthfulSelection = range;
    };

    // Parent components may want selected text to remain selected even
    // when quill loses focus, for instance when an edit menu is enabled
    // w/r/t the current selection. It would be nice to prevent the change
    // from happening in the first place given this flag, but that's a task
    // for another day... for now revert it.
    const revertToPreviousLengthfulSelectionChange = (_, __, source) => {
      const { selection } = this.quill;
      if (source === 'user' && this.preventSelectionChangeOnFocusChange) {
        selection.setRange(this.lastLengthfulSelection);
      }
    };

    const selectionChangeEventHandlers = [
      bubbleSelectionRange,
      saveLengthfulSelectionRange,
      revertToPreviousLengthfulSelectionChange,
      classifySelectionRange
    ];

    selectionChangeEventHandlers.map(handler => this.quill.on('selection-change', handler));
  }
};
</script>
