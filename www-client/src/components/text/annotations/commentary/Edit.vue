<template>
  <div class='commentary-edit' style='position: relative'>
    <Editor ref='editor'/>
    <Halyard
      style='position: absolute;'
      :transform='halyardTransform'
      :height='halyardHeight'
      :width='halyardWidth'
      :direction='halyardDirection'/>
  </div>
</template>

<script>
import Base from './Base.vue';
import Editor from './Editor';
import Halyard, { UP, DOWN } from './Halyard';
// import AlertCircleOutline from '@/components/icons/AlertCircleOutline';

import { TextAnnotationRelation } from '@models';

const measure = el => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left,
    right: rect.right,
    top: rect.top,
    bottom: rect.bottom,
    height: el.offsetHeight,
    width: el.offsetWidth
  };
};

export default {
  extends: Base,
  props: {
    textAnnotationRelation: TextAnnotationRelation
  },
  data: () => ({
    halyardSource: null
  }),
  computed: {
    halyardSourceMeasurements () {
      return this.halyardSource ? measure(this.halyardSource) : null;
    },
    halyardTargetMeasurements () {
      const { boundingDomEls } = this.textAnnotationRelation.textRange;
      const boundingDomElMeasurements = boundingDomEls.map(measure);

      // If here is an odd number of lines we can just take
      // the centermost...

      if (boundingDomElMeasurements.length === 1) {
        return boundingDomElMeasurements[0];
      }

      const centerIdx = boundingDomElMeasurements.length / 2;

      if (Number.isInteger(centerIdx)) {
        return boundingDomElMeasurements[centerIdx];
      }

      // Otherwise we have to do some math to calculate
      // the centermost point of the target.

      const [ ceil, floor ] = [Math.ceil, Math.floor].map(
        fn => boundingDomElMeasurements[fn(centerIdx)]
      );

      return Object.assign(
        floor,
        { top: floor.top + (Math.abs(floor.top - ceil.top) / 2) }
      );
    },
    halyardHeight () {
      if (!this.halyardSourceMeasurements) return 0;

      const sourceMeasurements = this.halyardSourceMeasurements;
      const targetMeasurements = this.halyardTargetMeasurements;

      const yAbs = yRel => yRel + window.scrollY;

      return Math.abs(
        yAbs(sourceMeasurements.top) - yAbs(targetMeasurements.top)
      ) - (
        sourceMeasurements.height ? sourceMeasurements.height / 2 : 0
      );
    },
    halyardWidth () {
      if (!this.halyardSourceMeasurements) return 0;

      return this.halyardTargetMeasurements.left - this.halyardSourceMeasurements.right;
    },
    halyardSourceMidpoint () {
      if (!this.halyardSourceMeasurements) return 0;

      return this.halyardSourceMeasurements.height / 2;
    },
    halyardTransform () {
      if (!this.halyardSourceMeasurements) return '';

      const x = this.halyardSourceMeasurements.width;
      const y = (this.halyardSourceMidpoint * -1) - (
        this.halyardDirection === UP
          ? this.halyardHeight
          : 0
      );

      return `translate(${x} ${y})`;
    },
    halyardDirection () {
      if (!this.halyardSourceMeasurements) return DOWN;

      return this.halyardSourceMeasurements.top > this.halyardTargetMeasurements.top
        ? UP
        : DOWN;
    }
  },
  mounted () {
    this.$set(this, 'halyardSource', this.$refs.editor.$el);
  },
  components: {
    Editor,
    //  AlertCircleOutline,
    Halyard
  }
};
</script>
