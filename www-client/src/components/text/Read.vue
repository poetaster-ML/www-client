<template>
  <div class='text-read' @dblclick='onDblClick'>
    <div class='lines'>
      <TextLineRead
        v-for='(line, idx) in text.lines'
        :line='line'
        :key='idx'
      />
    </div>
  </div>
</template>
<script>
import Base from './Base';
import { TextLineRead } from './partials';

export default {
  extends: Base,
  methods: {
    onDblClick () {
      this.$router.push(this.text.editRoute(), { preserveQuery: true });
    }
  },
  components: {
    TextLineRead
  }
};
</script>
