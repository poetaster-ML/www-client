import {
  NLPDoc,
  NLPSentence,
  NLPToken,
  NLPDependencyParse
} from '@models';
import {
  ModelSerializer,
  ListSerializer,
  ConnectionSerializer
} from './base';

class NLPDependencyParseSerializer extends ModelSerializer {
  static model = NLPDependencyParse;
};

class NLPTokenListSerializer extends ListSerializer {
  static model = NLPToken;
};

class NLPSentenceListSerializer extends ListSerializer {
  static model = NLPSentence;

  static fields () {
    return {
      tokens: v => new NLPTokenListSerializer(v),
      dependencyParse: v => new NLPDependencyParseSerializer(v)
    };
  }
};

class NLPDocConnectionSerializer extends ConnectionSerializer {
  static model = NLPDoc;

  static fields () {
    return {
      sentences: v => {
        v = JSON.parse(v);
        return new NLPSentenceListSerializer(v.sentences);
      }
    };
  }
};

export {
  NLPDocConnectionSerializer
};
