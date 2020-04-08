<template>
  <v-list :class='classes' dense>
    <v-list-item
      v-for='(item, idx) in items'
      :to='item.readRoute()'
      :key='idx'
    >
      {{ item.display }}
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  data: () => ({
    classes: ''
  }),
  props: {
    items: Array[Object]
  }
};
</script>
