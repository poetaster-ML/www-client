<template>
  <layout>
    <template #navigation-drawer>
      <text-list v-if="currentTexts" :texts="currentTexts"/>
    </template>
    <template #main>
      <text-read :text="currentTexts[0]"/>
    </template>
  </layout>
</template>

<script>
import { Layout } from '@layouts';
import { TextList, TextRead } from '@components/text';
import { Text } from '@models';

export default {
  name: 'text-index',
  components: {
    Layout,
    TextList,
    TextRead
  },
  computed: {
    currentTexts: () => Text.all()
  }
};
</script>
