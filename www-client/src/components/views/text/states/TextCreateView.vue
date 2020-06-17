<template>
  <layout class='text-create-view'>
    <template #nav-global>
      <v-toolbar-title>
        <v-btn text>
          <v-text-field
            v-model='authorName'
            placeholder='Author'
          ></v-text-field>
        </v-btn>
        <icon-arrow-right/>
        <v-btn text>
          <v-text-field
            v-model='title'
            placeholder='Title'>
        </v-text-field>
        </v-btn>
      </v-toolbar-title>

    </template>

    <template #search-global>
      <TextDetailSearchBar :searcher='searcher' :text='text'/>
    </template>

    <template #nav-index>
      <TextsBar v-if='author && author.texts' :texts='author.texts'/>
    </template>

    <template #main>
      <TextCreate :text='text'/>
    </template>
  </layout>
</template>

<script>
import Base from './Base.vue';
import { AuthorConnectionSerializer } from '@serializers';
import { AuthorsSearch } from '@queries';
import { emptyTextFactory } from '@/apollo/factories';
import { Author } from '@models';
import { TextCreate, TextDetailSearchBar } from '@components/text';
import { IconArrowRight } from '@icons';
import { TextsBar } from '@navigation';

export default {
  extends: Base,
  data: () => ({
    authorName: '',
    authorsSearch: [],
    title: '',
    text: emptyTextFactory()
  }),
  components: {
    TextCreate,
    TextDetailSearchBar,
    TextsBar,
    IconArrowRight
  },
  apollo: {
    authorsSearch: {
      query: AuthorsSearch,
      variables () {
        return {
          query: this.authorName
        };
      },
      skip: vm => !vm.authorName,
      debounce: 50,
      update: ({ authorsSearch }) => new AuthorConnectionSerializer(authorsSearch)
    }
  },
  computed: {
    author () {
      return this.authorsSearch.length
        ? this.authorsSearch[0]
        : new Author({ name: this.authorName });
    }
  },
  methods: {
    async onSave () {
      if (!this.author.slug) {
        await this.author.save();
      }

      await this.text.save({
        title: this.title,
        authorSlug: this.author.slug
      });

      this.$router.push(this.text.editRoute());
    }
  }
};
</script>
