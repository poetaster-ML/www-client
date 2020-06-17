<template>
  <div>
    <TextEditor>
    </TextEditor>
  </div>
</template>

<script>
import Base from './Base.vue';
import { TextEditor } from '@primitives';
export default {
  extends: Base,
  components: {
    TextEditor
  }
};
</script>
