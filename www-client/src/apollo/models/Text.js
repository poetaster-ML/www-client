import Delta from 'quill-delta';
import { Routable } from './Base';

const splitByNL = str => str.split('\n');

class TextBase extends Routable {
  static primaryKey = 'slug';
  static readRoute = 'textRead';
  static editRoute = 'textEdit';

  get linesFromRaw () {
    return splitByNL(this.raw);
  }

  get display () {
    return this.title;
  }
}

class Text extends TextBase {
  toQuillDelta () {
    const deltaOps = [
      { insert: this.raw }
    ];
    return new Delta(deltaOps);
  }

  applyQuillDelta (delta) {
    // Assume a "normalized" delta where a single
    // op contains all of our text.
    if (delta.ops.length) {
      this.raw = delta.ops[0].insert;
      this.lines = splitByNL(this.raw);
    } else {
      throw new Error(`Delta obj: ${delta} contains no ops`);
    }
  }
}

class TextSearchResult extends TextBase {
  get rawHighlight () {
    return !!this.highlights.raw;
  }
  get titleHighlight () {
    return !!this.highlights.title;
  }
  get highlightedLinesFromRaw () {
    if (this.rawHighlight) {
      return splitByNL(this.highlights.raw);
    }
  }
}

export {
  Text,
  TextSearchResult
};
