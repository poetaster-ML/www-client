<template>
  <TextDetailView>
    <template v-slot:detail-main='{ text }'>
      <TextRead :text='text'/>
    </template>
    <template v-slot:tools='{ text }'>
      <TextReadTools :text='text'/>
    </template>
  </TextDetailView>
</template>

<script>
import TextDetailView from './TextDetailView';
import { TextRead } from '@components/text';
import { TextReadTools } from '@components/tools';

export default {
  components: {
    TextDetailView,
    TextRead,
    TextReadTools
  }
};
</script>
