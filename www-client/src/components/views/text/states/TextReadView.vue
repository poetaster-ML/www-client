<template>
  <TextDetailLayout
    :text='text'
    :author='author'
    :loading='$apollo.queries.text.loading'
    :searchEngine='searchEngine'
    @click='onCtrlClick'
    @text-detail-search-bar-output='onTextDetailSearchBarOutput'>

    <template #detail-left>
      <template v-if='detailLeftComponent'>
        <v-col style='flex-grow: 1'>
          <component :is='detailLeftComponent' :text='text'/>
        </v-col>
        <v-divider vertical/>
      </template>
    </template>

    <template #detail-main>
      <keep-alive>
        <component :is='detailMainComponent' :text='text'
                  />
      </keep-alive>
    </template>
  </TextDetailLayout>
</template>

<script>
import Base from './Base';
import TextDetailMixin from './TextDetailMixin';
import { TextRead, TextSyntaxRead } from '@components/text';
import { TextCommentaryListRead } from '@components/text/partials';
import { ANNOTATIONS } from '@/search';

export default {
  extends: Base,
  mixins: [
    TextDetailMixin
  ],
  data: () => ({
    detailLeftComponent: null,
    detailMainComponent: TextRead,
    ANNOTATION_TO_DETAIL_MAIN_COMPONENT_MAP: {
      [ANNOTATIONS.SYN]: TextSyntaxRead
    },
    ANNOTATION_TO_DETAIL_LEFT_COMPONENT_MAP: {
      [ANNOTATIONS.COM]: TextCommentaryListRead
    }
  }),
  methods: {
    onCtrlClick (e) {
      console.log(e);
    }
  },
  components: {
    TextRead,
    TextCommentaryListRead
  }
};
</script>
