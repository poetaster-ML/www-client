<template>
  <div class='commentary-list-read'>
    <template v-for='(textAnnotationRelation, idx) in textAnnotationRelations'>
      <Read
        :textAnnotationRelation='textAnnotationRelation'
        :key='idx'
      />
    </template>
  </div>
</template>

<script>
import Base from './ListBase';
import Read from './Read';
export default {
  extends: Base,
  components: {
    Read
  }
};
</script>
