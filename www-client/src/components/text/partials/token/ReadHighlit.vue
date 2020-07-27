<template>
  <span><em>{{ token.value }}</em><slot name='post'></slot></span>
</template>

<script>
import Base from './Base.vue';

export default {
  extends: Base
};
</script>
