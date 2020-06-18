export default {
  computed: {
    nlpDoc () {
      return this.text.nlpDocVersions[0];
    }
  }
};
