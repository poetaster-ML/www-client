<template>
  <div class='text-search-result' @dblclick='onDblClick'>
    <div class='lines'>
      <component
        :is='lineComponent'
        v-for='(line, idx) in lines'
        :line='line'
        :key='idx'/>
    </div>
  </div>
</template>
<script>
import { TextSearchResult } from '@models';
import {
  TextLineServerReadHighlit,
  TextLineRead
} from './partials/line';
export default {
  props: {
    text: TextSearchResult
  },
  methods: {
    onDblClick () {
      this.$router.push(this.text.readRoute());
    }
  },
  computed: {
    lineComponent () {
      return this.text.rawHighlight
        ? TextLineServerReadHighlit
        : TextLineRead;
    },
    lines () {
      return this.text.rawHighlight
        ? this.text.highlightedLinesFromRaw
        : this.text.linesFromRaw;
    }
  },
  components: {
    TextLineRead,
    TextLineServerReadHighlit
  }
};
</script>
