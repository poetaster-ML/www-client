<template>
  <div class='commentary-list-edit'>
    <Edit
      v-for='(textAnnotationRelation, idx) in text.annotations'
      :textAnnotationRelation='textAnnotationRelation'
      :key='idx'
    />
  </div>
</template>

<script>
import Base from './ListBase';
import Edit from './Edit';
export default {
  extends: Base,
  components: {
    Edit
  }
};
</script>
