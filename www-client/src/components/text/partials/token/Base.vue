<template>
  <div :class="`${className}__token`">
    {{ line }}
  </div>
</template>

<script>
import Base from '../Base.vue';
export default {
  extends: Base,
  props: {
    line: String
  }
};
</script>
