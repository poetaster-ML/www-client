import { Author, Text, TextSearchResult } from '../models';
import {
  ModelSerializer,
  ConnectionSerializer
} from './base';
import { NLPDocConnectionSerializer } from './nlpDoc';

class AuthorSerializer extends ModelSerializer {
  static model = Author;
};

class AuthorConnectionSerializer extends ConnectionSerializer {
  static model = Author;

  static fields () {
    return {
      texts: v => new TextConnectionSerializer(v)
    };
  }
};

class TextConnectionSerializer extends ConnectionSerializer {
  static model = Text;

  static fields () {
    return {
      author: v => new AuthorSerializer(v),
      nlpDocVersions: v => new NLPDocConnectionSerializer(v)
    };
  }
};

class TextSearchResultConnectionSerializer extends ConnectionSerializer {
  static model = TextSearchResult;

  static fields () {
    return {
      author: v => new AuthorSerializer(v)
    };
  }
}

export {
  AuthorConnectionSerializer,
  TextConnectionSerializer,
  TextSearchResultConnectionSerializer
};
