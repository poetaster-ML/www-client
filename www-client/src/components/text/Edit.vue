<template>
  <div class='text-edit'>
    <Editor :text='text' :preventSelectionChangeOnFocusChange='ctrlMenuEnabled'/>
  </div>
</template>
<script>
import Base from './Base';
import Editor from './Editor';

export default {
  extends: Base,
  props: {
    ctrlMenuEnabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Editor
  }
};
</script>
