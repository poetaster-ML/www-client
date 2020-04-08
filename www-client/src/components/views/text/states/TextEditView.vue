<template>
  <TextDetailView>
    <template v-slot:detail-main='{ text }'>
      <TextEdit :text='text'/>
    </template>
    <template v-slot:tools='{ text }'>
      <TextEditTools :text='text'/>
    </template>
  </TextDetailView>
</template>

<script>
import TextDetailView from './TextDetailView';
import { TextEdit } from '@components/text';
import { TextEditTools } from '@components/tools';

export default {
  components: {
    TextDetailView,
    TextEdit,
    TextEditTools
  }
};
</script>
