import { TextDetail, AuthorDetail, TextAnnotationsIndex } from '@queries';
import {
  AuthorConnectionSerializer,
  TextConnectionSerializer,
  TextAnnotationConnectionSerializer
} from '@serializers';
import { currentSlug } from '@utils/queries';
import TextDetailLayout from './TextDetailLayout';
import { TextAnnotationRelation } from '@models';

export default {
  data: () => ({
    text: null,
    author: null,
    detailLeftComponent: null,
    detailMainComponent: null,
    ctrlMenuEnabled: false,
    ctrlMenuPositionY: 0,
    ctrlMenuPositionX: 0
  }),
  computed: {
    ctrlMenuItems () {
      return this.textAnnotations;
    }
  },
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
    },
    textAnnotations: {
      query: TextAnnotationsIndex,
      update: ({ textAnnotations }) => new TextAnnotationConnectionSerializer(textAnnotations)
    }
  },
  methods: {
    setAnnotationComponents (annotation) {
      const mainComponent = this.ANNOTATION_TO_DETAIL_MAIN_COMPONENT_MAP[annotation];
      const leftComponent = this.ANNOTATION_TO_DETAIL_LEFT_COMPONENT_MAP[annotation];

      this.detailMainComponent = mainComponent || this.detailMainComponent;
      this.detailLeftComponent = leftComponent || this.detailLeftComponent;
    },
    onTextDetailSearchBarOutput (searchResult) {
      const { annotation } = searchResult;

      if (annotation) {
        this.setAnnotationComponents(annotation);

        this.$router.push(
          this.text.readRoute({ query: { annotation } }),
          { appendQuery: true }
        );
      }
    },
    onCtrlMenuItemClick ({ label }) {
      this.text.annotations.push(
        new TextAnnotationRelation({ label })
      );
    },
    triggerCtrlMenu () {
      this.ctrlMenuPositionX = this.cursorUtility.x;
      this.ctrlMenuPositionY = this.cursorUtility.y;
      this.ctrlMenuEnabled = true;
    },
    onDetailMainComponentContextMenuClick (e) {
      this.triggerCtrlMenu();

      // Prevent the browser's own context menu.
      e.preventDefault();
    }
  },
  created () {
    for (const annotation of Object.keys(this.annotations)) {
      this.setAnnotationComponents(annotation);
    }
  },
  components: {
    TextDetailLayout
  }
};
