<template>
  <div :class="`${className}__title`">
    {{ title }}
  </div>
</template>

<script>
import Base from '../Base.vue';

export default {
  extends: Base,
  props: {
    title: String
  }
};
</script>
