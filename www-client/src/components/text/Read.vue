<template>
  <div class='text-read' @dblclick='onDblClick'>
    <div class='lines'>
      <component
        v-for='(line, idx) in text.lines'
        :is='getLineComponent(line)'
        :line='line'
        :key='idx'
        :ref='idx'
      />
    </div>
  </div>
</template>

<script>
import Base from './Base';
import { TextLineRead, TextLineClientReadHighlit } from './partials';

export default {
  extends: Base,
  methods: {
    onDblClick () {
      this.$router.push(this.text.editRoute(), { preserveQuery: true });
    },
    getLineComponent (line) {
      return line.isHighlit
        ? TextLineClientReadHighlit
        : TextLineRead;
    }
  },
  components: {
    TextLineRead,
    TextLineClientReadHighlit
  }
};
</script>
