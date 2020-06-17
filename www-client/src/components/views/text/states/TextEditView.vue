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
          @click.native='onDetailMainComponentClick'
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
            v-for='(item, index) in ctrlClickMenuItems'
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
import { TextEdit, TextSyntaxEdit } from '@components/text';
import { TextCommentaryListEdit } from '@components/text/partials';
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
      [ANNOTATIONS.COM]: TextCommentaryListEdit
    },
    ctrlClickMenuItems: [
      'Comment',
      'Tag'
    ],
    ctrlMenuEnabled: false,
    ctrlMenuPositionY: 0,
    ctrlMenuPositionX: 0,
    textSelectionRange: {}
  }),
  methods: {
    onDetailMainComponentClick (e) {
      // Unfortunately without tinkering with vuetify internals
      // we have to do this to prevent the menu from closing simultaneously.
      e.preventDefault();

      if (this.textSelectionRange.length) {
        this.ctrlMenuPositionX = this.mouseLocator.x;
        this.ctrlMenuPositionY = this.mouseLocator.y;
        this.ctrlMenuEnabled = true;
      }
    },
    onTextEditorSelectionChange (range) {
      this.textSelectionRange = range;
    },
    onCtrlMenuItemClick () {

    }
  },
  components: {
    TextEdit,
    TextCommentaryListEdit
  }
};
</script>
