<template>
  <TextDetailSkeleton
    :text='text'
    :author='author'
    :loading='$apollo.queries.text.loading'>

    <template #detail-left v-if='detailLeftComponent'>
      <template v-if='textAnnotationRelations.length'>
        <v-col style='flex-grow: 1'>
          <component
            :is='detailLeftComponent'
            :textAnnotationRelations='textAnnotationRelations'
            @text-editor-text-change='onDetailLeftTextEditorTextChange'/>
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
  </TextDetailSkeleton>
</template>

<script>
import debounce from 'lodash/debounce';
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
      [ANNOTATIONS.COM]: vm => {
        if (vm.textAnnotationRelations.length) {
          return TextAnnotationCommentaryListEdit;
        }
      }
    },
    textSelectionRange: {}
  }),
  methods: {
    onTextEditorSelectionChange (range) {
      if (range) {
        this.textSelectionRange = range;
      } else {
        console.log('got a null range');
      }
    },
    onDetailLeftTextEditorTextChange: debounce(function (textAnnotationRelation) {
      console.log(0, textAnnotationRelation);
      textAnnotationRelation.save();
    }, 500)
  },
  components: {
    TextEdit,
    TextAnnotationCommentaryListEdit
  }
};
</script>
