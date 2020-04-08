<template>
  <g :transform='transform'>
    <text text-anchor='middle'>
      {{ node.data.text }}
    </text>
  </g>
</template>
<script>

export default {
  props: {
    node: Object
  },
  computed: {
    transform () {
      const { x, y } = this.node;
      return `translate(${x},${y})`;
    }
  }
};
</script>
