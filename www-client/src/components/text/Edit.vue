<template>
  <div class='text-edit'>
    <div v-if='annotations.length' class="lines">
      <TextLineEdit
        v-for="(line, idx) in text.lines"
        :line="line"
        :key="idx"
      />
    </div>
    <TextEditor v-else :text='text'/>
  </div>
</template>
<script>
import Base from './Base';
import { TextLineEdit } from './partials/line';
import { TextEditor } from '@primitives';

export default {
  extends: Base,
  components: {
    TextEditor,
    TextLineEdit
  }
};
</script>
