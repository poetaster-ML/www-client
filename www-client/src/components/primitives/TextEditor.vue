<template>
  <div class='quill-editor'>
    <slot name='toolbar'></slot>
    <div ref='editor'></div>
  </div>
</template>
<script>
import { Text } from '@models';
import Quill from 'quill';

const defaultOptions = {
  theme: 'snow',
  modules: {
    toolbar: false
  },
  boundary: document.body, // Should be parent element.
  readOnly: false
};

export default {
  props: {
    text: Text
  },
  data: () => ({
    defaultOptions
  }),
  mounted () {
    this.initialize();
  },
  beforeDestroy () {
    this.quill = null;
    delete this.quill;
  },
  methods: {
    /**
     * Init Quill instance, set initial content, init event handlers.
     */
    initialize () {
      if (this.$el) {
        this._options = Object.assign({}, this.defaultOptions, this.options);
        this.quill = new Quill(this.$refs.editor, this._options);

        this.quill.enable(false);

        // Set editor content
        if (this.text) {
          const delta = this.text.toQuillDelta();
          this.quill.setContents(delta);
        }

        this.quill.enable(true);

        // Update model if text changes
        this.quill.on('text-change', () => {
          const delta = this.quill.getContents();
          this.text.applyQuillDelta(delta);
        });

        // Emit ready event
        this.$emit('ready', this.quill);
      }
    }
  }
};
</script>
