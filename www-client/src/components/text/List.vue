<script>
import { List } from '@primitives';

export default {
  extends: List,
  methods: {
    itemDisplay: item => item.title
  }
};
</script>
