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
          :ctrlMenuEnabled='ctrlMenuEnabled'
          @contextmenu.native='onDetailMainComponentContextMenuClick'
          @text-editor-selection-change='onTextEditorSelectionChange'/>
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
            @click='() => onCtrlMenuItemClick(item)'
          >
            <v-list-item-title>{{ item.display }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </TextDetailLayout>
</template>

<script>
import Base from './Base';
import TextDetailMixin from './TextDetailMixin';
import { TextEdit, TextSyntaxEdit } from '@components/text';
import { TextAnnotationCommentaryListEdit } from '@components/text/annotations';
import { ANNOTATIONS } from '@/search';

export default {
  extends: Base,
  mixins: [
    TextDetailMixin
  ],
  data: () => ({
    detailLeftComponent: null,
    detailMainComponent: TextEdit,
    ANNOTATION_TO_DETAIL_MAIN_COMPONENT_MAP: {
      [ANNOTATIONS.SYN]: TextSyntaxEdit
    },
    ANNOTATION_TO_DETAIL_LEFT_COMPONENT_MAP: {
      [ANNOTATIONS.COM]: TextAnnotationCommentaryListEdit
    },
    textSelectionRange: {}
  }),
  methods: {
    onTextEditorSelectionChange (range) {
      this.textSelectionRange = range;
    }
  },
  components: {
    TextEdit,
    TextAnnotationCommentaryListEdit
  }
};
</script>
