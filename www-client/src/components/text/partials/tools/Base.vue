<template>
  <aside :class="`${className}__tools`">
  </aside>
</template>

<script>
import Base from '../Base.vue';
import { Text } from '@models';

export default {
  name: 'text-tools-base',
  extends: Base,
  props: {
    text: Text
  }
};
</script>
