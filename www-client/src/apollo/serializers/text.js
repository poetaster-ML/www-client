import {
  Author,
  Text,
  TextLabel,
  TextSearchResult,
  TextLabelRelation
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
      nlpDocVersions: v => new NLPDocConnectionSerializer(v)
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

class TextLabelRelationSerializer extends ModelSerializer {
  static model = TextLabelRelation;
}

class TextLabelSerializer extends ModelSerializer {
  static model = TextLabel;
}

class TextLabelRelationConnectionSerializer extends ConnectionSerializer {
  static model = TextLabelRelation;

  static fields () {
    return {
      label: v => new TextLabelSerializer(v)
    };
  }
}

export {
  AuthorSerializer,
  AuthorConnectionSerializer,
  TextLabelRelationSerializer,
  TextLabelSerializer,
  TextLabelRelationConnectionSerializer,
  TextConnectionSerializer,
  TextSearchResultConnectionSerializer
};
