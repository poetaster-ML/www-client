<script>
import Base from './Base.vue';
import { TextEdit } from '@components/text';
export default {
  name: 'text-edit-view',
  extends: Base,
  data: () => ({
    textComponent: TextEdit
  })
};
</script>
