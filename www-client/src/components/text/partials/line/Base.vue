<template>
  <div class='line'>
    {{ line.value }}
  </div>
</template>

<script>
import Base from '../Base.vue';
import { TextLine } from '@models';

export default {
  extends: Base,
  props: {
    line: TextLine
  }
};
</script>
