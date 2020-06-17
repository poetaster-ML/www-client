import { TextDetail, AuthorDetail } from '@queries';
import { AuthorConnectionSerializer, TextConnectionSerializer } from '@serializers';
import { currentSlug } from '@utils/queries';
import TextDetailLayout from './TextDetailLayout';

export default {
  data: () => ({
    text: null,
    author: null,
    detailLeftComponent: null,
    detailMainComponent: null
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
