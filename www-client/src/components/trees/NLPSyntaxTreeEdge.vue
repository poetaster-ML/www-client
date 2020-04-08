<template>
  <path :d='d'/>
</template>
<script>
import * as shape from 'd3-shape';

export default {
  props: {
    node: Object
  },
  computed: {
    d () {
      if (!this.node.parent) return null;

      const link = {
        source: this.node.parent,
        target: this.node
      };

      const getEdgeCoordinates = shape.linkVertical()
        .x(d => d.x)
        .y(d => d.y);

      return getEdgeCoordinates(link);
    }
  }
};
</script>
