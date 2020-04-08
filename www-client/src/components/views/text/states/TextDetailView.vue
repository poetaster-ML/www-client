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
      <TextSearch @input='onTextSearchInput'/>
    </template>

    <template #nav-index>
      <TextsBar v-if='author' :texts='author.texts'/>
    </template>

    <template #nav-tools>
      <v-progress-circular v-if='$apollo.queries.text.loading'/>
      <slot v-else name='tools' :text='text'/>
    </template>

    <template #main>
      <v-progress-circular v-if='$apollo.queries.text.loading'/>
      <slot v-else name='detail-main' :text='text'/>
    </template>
  </layout>
</template>

<script>
import Base from './Base.vue';
import { TextDetail, AuthorDetail } from '@queries';
import { AuthorConnectionSerializer, TextConnectionSerializer } from '@serializers';
import { TextSearch } from '@components/text';
import { AuthorButton, GlobalNavTextButton } from '@buttons';
import { IconArrowRight } from '@icons';
import { TextsBar } from '@navigation';
import { currentSlug } from '@utils/queries';

export default {
  extends: Base,
  data: () => ({
    text: null,
    author: null
  }),
  apollo: {
    text: {
      query: TextDetail,
      variables: currentSlug,
      update: ({ texts }) => new TextConnectionSerializer(texts)[0]
    },
    author: {
      query: AuthorDetail,
      variables () {
        const { slug } = this.text.author;
        return { slug };
      },
      skip: vm => !vm.text,
      update: ({ authors }) => new AuthorConnectionSerializer(authors)[0]
    }
  },
  methods: {
    onTextSearchInput () {
      throw new Error('Implement me!');
    }
  },
  components: {
    AuthorButton,
    GlobalNavTextButton,
    IconArrowRight,
    TextSearch,
    TextsBar
  }
};
</script>
