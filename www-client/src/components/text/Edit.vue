<template>
  <div class='text-edit'>
    <TextEditor :text='text'/>
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
