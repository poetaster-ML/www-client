<template>
  <div class="text-list__item">
    <router-link :to="text.slug">
      {{ text.lines[0] }}
    </router-link>
  </div>
</template>

<script>
import { Text } from '@models';

export default {
  name: 'list-item',
  props: {
    text: Text
  }
};
</script>
