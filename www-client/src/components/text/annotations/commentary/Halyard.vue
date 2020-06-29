<template>
  <svg class='commentary-halyard'
    :width='width'
    :height='height'
    :transform='transform'>

    <path :d='d' stroke='black' stroke-width='0.25'/>
  </svg>
</template>
<script>
// import * as shape from 'd3-shape';

const UP = 'up';
const DOWN = 'down';

export default {
  props: {
    width: Number,
    height: Number,
    transform: String,
    direction: String // 'up' or 'down'
  },
  computed: {
    d () {
      return this.direction === DOWN
        ? `M 0 0 L ${this.width} ${this.height}`
        : `M 0 ${this.height} L ${this.width} 0`;
    }
  }
};

export {
  UP,
  DOWN
};
</script>
