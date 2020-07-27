import isFunction from 'lodash/isFunction';
import debounce from 'lodash/debounce';
import { DetailSearchEngine } from '@/search';
import {
  TextDetail,
  AuthorDetail,
  TextAnnotationsIndex,
  TextAnnotationRelations
} from '@queries';
import {
  AuthorConnectionSerializer,
  TextConnectionSerializer,
  TextAnnotationConnectionSerializer,
  TextAnnotationRelationConnectionSerializer
} from '@serializers';
import { currentSlug } from '@utils/queries';
import TextDetailSkeleton from './TextDetailSkeleton';
import { TextAnnotationRelation } from '@models';

export default {
  data: () => ({
    text: null,
    author: null,
    detailLeftComponent: null,
    detailMainComponent: null,
    ctrlMenuEnabled: false,
    ctrlMenuPositionY: 0,
    ctrlMenuPositionX: 0,
    textSelectionRange: null, // Abstract -- interface: `TextRange`
    textAnnotationRelations: [],
    searchEngine: new DetailSearchEngine(),
    initialQuery: false
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
    },
    textAnnotationRelations: {
      query: TextAnnotationRelations,
      variables () {
        return {
          textSlug: this.text.slug
        };
      },
      skip: vm => !vm.text,
      update: ({ textAnnotationRelations }) => new TextAnnotationRelationConnectionSerializer(textAnnotationRelations)
    }
  },
  methods: {
    interpretAnnotations (annotations) {
      for (const annotation in annotations) {
        this.setAnnotationComponents(annotation);
      }
    },
    interpretSearchQuery (query) {
      const searchResults = this.searchEngine.search(query);
      const { lines } = this.text;

      for (let i = 0; i < lines.length; i++) {
        const textLine = lines[i];
        const matchingSearchResults = searchResults.filter(({ refIndex }) => refIndex === i);

        if (matchingSearchResults.length) {
          const searchResult = matchingSearchResults.pop();

          textLine.matches = searchResult.matches;
          textLine.highlitKey = query;

          // Make things slightly more efficient --
          // we won't need to walk this element again.
          searchResults.splice(i, 1);
        } else {
          textLine.matches = [];
          textLine.highlitKey = null;
        }
      }
    },
    setAnnotationComponents (annotation) {
      const annotationToComponent = (map, annotation) => {
        let component = map[annotation];
        return isFunction(component)
          ? component(this)
          : component;
      };

      this.detailLeftComponent = annotationToComponent(
        this.ANNOTATION_TO_DETAIL_LEFT_COMPONENT_MAP, annotation);
      this.detailMainComponent = annotationToComponent(
        this.ANNOTATION_TO_DETAIL_MAIN_COMPONENT_MAP, annotation);
    },
    onCtrlMenuItemClick (annotation) {
      const { text } = this;

      // Probably shouldn't be writing to apollo-managed prop..
      this.textAnnotationRelations.push(
        new TextAnnotationRelation({
          text,
          annotation,
          commentary: '',
          textRange: this.textSelectionRange
        })
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
  watch: {
    text (newText) {
      if (newText) {
        this.searchEngine.fuse.setCollection(newText.lines);

        if (this.initialQuery) {
          this.interpretSearchQuery(this.$store.state.query.current.q);
          this.initialQuery = false;
        }
      }
    },
    '$store.state.query.current.q': debounce(function (currentQuery, oldQuery) {
      console.log('INTERPRETING...', currentQuery);
      this.interpretSearchQuery(currentQuery);
    }, 10),
    '$store.state.annotations.current' (currentAnnotations) {
      this.interpretAnnotations(currentAnnotations);
    }
  },
  mounted () {
    // TODOL Better to process the search server side
    if (this.$store.state.query.current.q && this.$apollo.queries.text.loading) {
      this.initialQuery = true;
    }
  },
  components: {
    TextDetailSkeleton
  }
};
