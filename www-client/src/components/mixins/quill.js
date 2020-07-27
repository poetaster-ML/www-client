import Quill from 'quill';

const defaultOptions = {
  theme: 'snow',
  modules: {
    toolbar: false
  },
  boundary: document.body, // FIXME: Should probably be parent element.
  readOnly: false
};

export default {
  props: {
    focusOnInit: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    defaultOptions,
    quill: null,
    lastLengthfulSelection: null
  }),
  mounted () {
    this.initializeQuill();
    this.setQuillContent();

    this.eventBus.$emit('quill-initialized', this.quill);

    this.focusOnInit && this.quill.focus();
  },
  beforeDestroy () {
    // Should we be removing event listeners?
    this.quill = null;
    delete this.quill;
  },
  methods: {
    initializeQuill () {
      if (this.$el) {
        this._options = Object.assign({}, this.defaultOptions, this.options);
        this.quill = new Quill(this.$refs.editor, this._options);
      }
    },
    setQuillContent () { /* Varies by mixee. */ }
  }
};
