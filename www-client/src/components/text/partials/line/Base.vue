<template>
  <div class='line'>
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
