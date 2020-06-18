<template>
  <TextDetailLayout
    :text='text'
    :author='author'
    :loading='$apollo.queries.text.loading'
    :searchEngine='searchEngine'
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
        <component
          :is='detailMainComponent'
          :text='text'
          @contextmenu.native='onDetailMainComponentContextMenuClick'/>
      </keep-alive>

      <v-menu
        absolute
        offset-y
        v-model='ctrlMenuEnabled'
        :position-x='ctrlMenuPositionX'
        :position-y='ctrlMenuPositionY'
        :close-on-click='true'>

        <v-list>
          <v-list-item
            v-for='(item, index) in ctrlMenuItems'
            :key='index'
            @click='onCtrlMenuItemClick'
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </TextDetailLayout>
</template>

<script>
import Base from './Base';
import TextDetailMixin from './TextDetailMixin';
import { TextRead, TextSyntaxRead } from '@components/text';
import { TextAnnotationCommentaryListRead } from '@components/text/annotations';
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
      [ANNOTATIONS.COM]: TextAnnotationCommentaryListRead
    }
  }),
  methods: {
    onDetailMainComponentContextMenuClick (e) {
      TextDetailMixin.methods.onDetailMainComponentContextMenuClick.apply(this, [e]);

      this.cursorUtility.restoreSelection();
    }
  },
  components: {
    TextRead,
    TextAnnotationCommentaryListRead
  }
};
</script>
