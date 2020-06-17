import Fuse from 'fuse.js';

const COLON_RE = /[:]/;

const SYN = 'syntax';
const SEM = 'semantics';
const COM = 'commentary';

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

class LinguisticAnnotationSelectionResult {
  constructor (annotation) {
    this.annotation = annotation;
  }
}

class LinguisticAnnotationSelectionInterpreter {
  constructor (text) {
    this.text = text;
  }

  search (query) {
    const queryBits = query.split(' ');

    for (const bit of queryBits) {
      // Is it a key val expression?
      const [bitKey, bitVal] = bit.split(COLON_RE);
      if (bitKey && bitVal) {
        return [bitKey, bitVal];
      }

      const regExps = Object.entries(ANNOTATION_TO_REGEX_MAP);

      for (const [annotationKey, annotationVal] of regExps) {
        if (bit.match(annotationVal)) {
          return new LinguisticAnnotationSelectionResult(annotationKey);
        }
      }
    }
  }
}

class LASIFuseComposite {
  constructor (text) {
    const fuseOptions = {
      includeScore: true,
      useExtendedSearch: true
    };

    this.fuse = new Fuse(text, fuseOptions);
    this.lasi = new LinguisticAnnotationSelectionInterpreter(text);
  }

  search (query) {
    return this.lasi.search(query);
  }
}

const SearchEngine = LASIFuseComposite;

export default SearchEngine;

export {
  LinguisticAnnotationSelectionResult,
  ANNOTATIONS
};
