<template>
  <div class="text-read" @dblclick="onDblClick">
    <text-title-read :title="text.title"/>
    <div class="lines">
      <text-line-read
        v-for="(line, idx) in text.lines"
        :line="line"
        :key="idx"
      />
    </div>
  </div>
</template>
<script>
import Base from './Base';
import { TextLineRead, TextTitleRead } from './partials';
export default {
  name: 'text-read',
  extends: Base,
  components: {
    TextTitleRead,
    TextLineRead
  },
  methods: {
    onDblClick () {
      this.$router.push(this.text.editRoute);
    }
  }
};
</script>
