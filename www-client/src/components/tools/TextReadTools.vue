<script>
import Base from './Base';

export default {
  extends: Base,
  computed: {
    textRoute () {
      return (...args) => this.text.readRoute(...args);
    }
  }
};
</script>
