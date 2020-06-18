<template>
  <div class='commentary-list-edit'>
    <template v-for='(textAnnotationRelation, idx) in text.annotations'>
      <Edit
        :textAnnotationRelation='textAnnotationRelation'
        :key='idx'
      />
    </template>
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
