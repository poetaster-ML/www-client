<template>
  <layout>
    <template #nav-global>
      <v-toolbar-title v-if='text'>
        <AuthorButton :author='text.author'/>
        <icon-arrow-right/>
        <GlobalNavTextButton :text='text'/>
      </v-toolbar-title>
    </template>

    <template #search-global>
      <TextDetailSearchBar/>
    </template>

    <template #nav-index>
      <TextsBar v-if='author' :texts='author.texts'/>
    </template>

    <template #main>
      <v-progress-circular indeterminate v-if='loading'/>
      <template v-else>
        <v-row style='width: 100%;'>
          <slot name='detail-left'/>

          <v-col style='flex-grow: 3'>
            <v-row justify='center'>
              <slot name='detail-main'/>
            </v-row>
          </v-col>

        </v-row>
      </template>
    </template>
  </layout>
</template>

<script>
import LayoutBase from './LayoutBase.vue';
import { TextDetailSearchBar } from '@components/text';
import { AuthorButton, GlobalNavTextButton } from '@buttons';
import { IconArrowRight } from '@icons';
import { TextsBar } from '@navigation';
import { Author, Text } from '@models';

export default {
  extends: LayoutBase,
  props: {
    author: Author,
    text: Text,
    loading: {
      type: Boolean,
      default: true
    }
  },
  components: {
    AuthorButton,
    GlobalNavTextButton,
    IconArrowRight,
    TextDetailSearchBar,
    TextsBar
  }
};
</script>
