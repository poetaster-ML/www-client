<template>
  <div>
    <span ref='commentary'>
      {{ textAnnotationRelation.commentary }}
    </span>
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
import { TextAnnotationRelation } from '@models';
import halyardMixin from './halyardMixin';

export default {
  extends: Base,
  mixins: [halyardMixin],
  props: {
    textAnnotationRelation: TextAnnotationRelation
  },
  mounted () {
    this.$set(this, 'halyardSource', this.$refs.commentary);
  }
};
</script>
