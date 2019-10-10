<template>
  <v-icon small>{{ svg }}</v-icon>
</template>
<script>
import { mdiMenuRight } from '@mdi/js';
export default {
  name: 'icon-arrow-right',
  data: () => ({
    svg: mdiMenuRight
  })
};
</script>
