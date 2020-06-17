<template>
  <div class='text-create'>
    <TextEditor :text='text' focusOnInit />
  </div>
</template>
<script>
import Base from './Base';
import { TextEditor } from '@primitives';

export default {
  extends: Base,
  components: {
    TextEditor
  }
};
</script>
