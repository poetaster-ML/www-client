<template>
  <div :class="`${className}__line`">
    {{ line }}
  </div>
</template>

<script>
import Base from '../Base.vue';
export default {
  name: 'text-line-base',
  extends: Base,
  props: {
    line: String
  }
};
</script>
