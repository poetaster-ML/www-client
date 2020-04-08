import {
  NLPDoc,
  NLPSentence,
  NLPToken,
  NLPSyntaxTree
} from '@models';
import {
  ModelSerializer,
  ListSerializer,
  ConnectionSerializer
} from './base';

class NLPSyntaxTreeSerializer extends ModelSerializer {
  static model = NLPSyntaxTree;
};

class NLPTokenListSerializer extends ListSerializer {
  static model = NLPToken;
};

class NLPSentenceListSerializer extends ListSerializer {
  static model = NLPSentence;

  static fields () {
    return {
      tokens: v => new NLPTokenListSerializer(v),
      tree: v => new NLPSyntaxTreeSerializer(v)
    };
  }
};

class NLPDocConnectionSerializer extends ConnectionSerializer {
  static model = NLPDoc;

  static fields () {
    return {
      sentences: v => new NLPSentenceListSerializer(JSON.parse(v))
    };
  }
};

export {
  NLPDocConnectionSerializer
};
