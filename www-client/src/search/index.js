import Fuse from 'fuse.js';

const COLON = ':';
const COLON_RE = new RegExp(COLON, 'g');

const SYN = 'syntax';
const SEM = 'semantics';
const COM = 'commentary';

const ANNOTATION = 'annotation';

const ANNOTATIONS = {
  SYN,
  SEM,
  COM
};

const ANNOTATION_TO_REGEX_MAP = {
  [SYN]: new RegExp('syntax', 'i'),
  [SEM]: new RegExp('semantics', 'i'),
  [COM]: new RegExp('commentary', 'i')
};

class AnnotationSelectionInterpreterResult {
  constructor (annotation) {
    this.annotation = annotation;
  }
}

class AnnotationSelectionInterpreter {
  search (query) {
    const queryBits = query.split(' ');
    const regExps = Object.entries(ANNOTATION_TO_REGEX_MAP);
    const results = {};

    for (const bit of queryBits) {
      // Is it a key val expression?
      // And is the key what we're looking for?
      const [bitKey, bitVal] = bit.split(COLON_RE);
      if (!(bitKey && bitVal) || bitKey !== ANNOTATION) {
        continue;
      }

      for (const [annotationType, annotationRegExp] of regExps) {
        if (bitVal.match(annotationRegExp)) {
          results[annotationType] = annotationType;
        }
      }
    }

    return results;
  }

  /*
   * Remove elements of a string that conform to LASI syntax
   */
  static redact (string) {
    const annotationRegExps = Object.values(ANNOTATIONS).map(
      annotation => new RegExp(`${ANNOTATION}${COLON}${annotation}`, 'g')
    );

    console.log(annotationRegExps);

    for (const regExp of annotationRegExps) {
      string = string.replace(regExp, '');
    }

    return string;
  }
}

const baseFuseOptions = {
  includeScore: true,
  useExtendedSearch: true,
  includeMatches: true,
  ignoreLocation: true
  // threshold: 0.1
};

// FIXME: I should inherit from fuse
// Seems to be a problem with fuses's typescript compilation into es2016 rather than 18 (?)
// not allowing class syntax
class SearchEngine {
  constructor (docs = [], options = {}, index) {
    this.fuse = new Fuse(
      docs,
      {
        keys: ['value'],
        ...baseFuseOptions
      },
      index
    );
  }
}

class IndexSearchEngine extends SearchEngine {
}

class DetailSearchEngine extends SearchEngine {
  search (query) {
    return this.fuse.search(query);
  }
}

const LASI = AnnotationSelectionInterpreter;
const LASIResult = AnnotationSelectionInterpreterResult;

export {
  IndexSearchEngine,
  DetailSearchEngine,
  LASI,
  LASIResult,
  ANNOTATIONS
};
