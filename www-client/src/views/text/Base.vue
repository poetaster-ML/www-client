<template>
  <layout class="text-detail" :classes="classes">
    <template #nav-global>
      <v-toolbar-title>
        <author-button :author="currentText.author"/>
        <icon-arrow-right/>
        <text-button :text="currentText"/>
      </v-toolbar-title>
    </template>
    <template #nav-index>
      <text-list :items="relatedTexts"/>
    </template>
    <template #main v-if="currentText">
      <v-row
        class="fill-height"
        align="center"
        justify="center"
      >
        <router-view
          :text="currentText"
          class="main"
        />
      </v-row>
    </template>
  </layout>
</template>

<script>
import {
  AuthorButton, TextButton
} from '@buttons';
import { IconArrowRight } from '@icons';
import { Layout } from '@layouts';
import { TextList } from '@components/text';
import { Text } from '@models';

export default {
  name: 'text-base-view',
  components: {
    AuthorButton,
    IconArrowRight,
    Layout,
    TextButton,
    TextList
  },
  props: {
    classes: {
      type: String
    }
  },
  computed: {
    currentSlug () {
      return this.$route.params.slug;
    },
    currentText () {
      return Text.bySlug(this.currentSlug);
    },
    relatedTexts () {
      return Text
        .query()
        .where('authorSlug', this.currentText.authorSlug)
        .get();
    }
  },
  created () {
    // Retrieve all the other texts of this text's author.
    Text.fetch({ authorSlug: this.currentText.authorSlug });
  }
};
</script>
