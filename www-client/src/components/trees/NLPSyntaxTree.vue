<template>
  <svg :viewBox='viewBox' :width='width' :height='height + 25'>
    <g :font-size='fontSize' :transform='transform'>
      <g fill='none' stroke='#555' stroke-opacity='0.4' stroke-width='1.5'>
        <NLPSyntaxTreeEdge
          v-for='(node, idx) in nodes'
          :node='node'
          :key='idx'/>
      </g>
      <g>
        <NLPSyntaxTreeNode
          v-for='(node, idx) in nodes'
          :node='node'
          :key='idx'/>
      </g>
    </g>
  </svg>
</template>

<script>
import Base from './Base.vue';
import NLPSyntaxTreeEdge from './NLPSyntaxTreeEdge';
import NLPSyntaxTreeNode from './NLPSyntaxTreeNode';

export default {
  extends: Base,
  data: () => ({
    separationDistance: 75,
    fontSize: 10,
    tidyTree: {}
  }),
  components: {
    NLPSyntaxTreeEdge,
    NLPSyntaxTreeNode
  },
  computed: {
    nodes () {
      return this.tidyTree.descendants();
    },
    links () {
      return this.tidyTree.links();
    },
    transform () {
      return `translate(${this.width / 2})`;
    },
    viewBox () {
      return `0 0 ${this.width} ${this.height}`;
    },
    width () { // eslint-disable-line
      /*
      return this
        .$parent
        .$parent
        .$el
        .offsetWidth;
      */
      return 984;
    },
    height () {
      return this.tree.height * this.separationDistance;
    }
  },
  created () {
    this.tidyTree = this.tree.toTidyTree(this.height);
  }
};
</script>
