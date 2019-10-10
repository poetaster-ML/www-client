<script>
import { List as BaseList } from '@primitives';

export default {
  name: 'text-list',
  extends: BaseList,
  data () {
    return {
      classes: 'text-list',
      itemRouteName: 'textDetail'
    };
  },
  methods: {
    itemDisplay: item => item.title
  }
};
</script>
