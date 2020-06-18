import {
  Author,
  Text,
  TextAnnotation,
  TextSearchResult,
  TextAnnotationRelation
} from '../models';
import {
  ModelSerializer,
  ConnectionSerializer
} from './base';
import { NLPDocConnectionSerializer } from './nlpDoc';

class AuthorSerializer extends ModelSerializer {
  static model = Author;
}

class AuthorConnectionSerializer extends ConnectionSerializer {
  static model = Author;

  static fields () {
    return {
      texts: v => new TextConnectionSerializer(v)
    };
  }
}

class TextConnectionSerializer extends ConnectionSerializer {
  static model = Text;

  static fields () {
    return {
      author: v => new AuthorSerializer(v),
      nlpDocVersions: v => new NLPDocConnectionSerializer(v),
      annotations: v => new TextAnnotationRelationConnectionSerializer(v)
    };
  }
}

class TextSearchResultConnectionSerializer extends ConnectionSerializer {
  static model = TextSearchResult;

  static fields () {
    return {
      author: v => new AuthorSerializer(v)
    };
  }
}

class TextAnnotationConnectionSerializer extends ConnectionSerializer {
  static model = TextAnnotation;
}

class TextAnnotationSerializer extends ModelSerializer {
  static model = TextAnnotation;
}

class TextAnnotationRelationSerializer extends ModelSerializer {
  static model = TextAnnotationRelation;
}

class TextAnnotationRelationConnectionSerializer extends ConnectionSerializer {
  static model = TextAnnotationRelation;

  static fields () {
    return {
      annotation: v => new TextAnnotationSerializer(v)
    };
  }
}

export {
  AuthorSerializer,
  AuthorConnectionSerializer,
  TextAnnotationRelationSerializer,
  TextAnnotationConnectionSerializer,
  TextAnnotationRelationConnectionSerializer,
  TextConnectionSerializer,
  TextSearchResultConnectionSerializer
};
