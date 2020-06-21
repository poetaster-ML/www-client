<template>
  <v-icon small>{{ svg }}</v-icon>
</template>
<script>
import { mdiCircleSmall } from '@mdi/js';
export default {
  data: () => ({
    svg: mdiCircleSmall
  })
};
</script>
