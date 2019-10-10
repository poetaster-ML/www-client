<template>
  <v-list :class="classes" dense>
    <v-list-item
      v-for="(item, idx) in items"
      :to="item.readRoute"
      :key="idx"
    >
      {{ itemDisplay(item) }}
    </v-list-item>
  </v-list>
</template>
<script>

export default {
  data: () => ({
    classes: ''
  }),
  props: {
    items: Array
  },
  methods: {
    itemDisplay: item => item.name
  }
};
</script>
