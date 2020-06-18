<template>
  <div class='text-create'>
    <Editor :text='text' focusOnInit />
  </div>
</template>
<script>
import Base from './Base';
import Editor from './Editor';

export default {
  extends: Base,
  components: {
    Editor
  }
};
</script>
