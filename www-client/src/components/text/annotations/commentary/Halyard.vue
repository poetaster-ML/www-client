<template>
  <svg :viewBox='viewBox' :width='width' :height='height'>
    <g font-size='10'>
      <g fill='none' stroke='#555' stroke-opacity='0.4' stroke-width='1.5'>
        <path :d='d' stroke='black'/>
      </g>
    </g>
  </svg>
</template>
<script>
// import { TextAnnotationRelation } from '@models';
// import * as shape from 'd3-shape';

export default {
  props: [
    'textAnnotationRelation'
  ],
  data: () => ({
    width: 150,
    height: 150,
    d: ''
  }),
  mounted () {
    const getOffset = (el) => {
      console.log(el);
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY
      };
    };

    console.log(this.$parent.$el);

    let link = [
      this.$parent.$el,
      this.textAnnotationRelation.textRange.boundingDomEls[0]
    ];

    console.log(link);

    link = link.map(getOffset);

    console.log(link);

    // this.d = shape.line()(link);

    this.d = `M ${link[0].x} ${link[0].y} M ${link[1].x} ${link[1].y} Z`;
  },
  computed: {
    viewBox () {
      return `0 0 0 0`;
    }
  }
};
</script>
