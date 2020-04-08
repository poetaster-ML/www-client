<script>
import TextButton from './TextButton';
export default {
  extends: TextButton,
  computed: {
    route () {
      return {
        ...this.text.readRoute(),
        query: this.$route.query
      };
    }
  }
};
</script>
