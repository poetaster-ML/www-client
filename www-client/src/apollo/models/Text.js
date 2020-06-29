import defaults from 'lodash/defaults';
import Delta from 'quill-delta';
import { Routable, Base } from './Base';
import { capitalize } from '@/utils/string';
import { pkFromGlobalID } from './utils';

const splitByNL = str => str.split('\n');

class Author extends Routable {
  static primaryKey = 'slug';
  static readRoute = 'authorRead';
  static editRoute = 'authorEdit';

  get display () {
    return this.name;
  }

  get lastName () {
    const bits = this.name.split(' ');
    return bits[bits.length - 1];
  }

  async save () {
    const { client, name, mutations } = this;

    const { data } = await client.mutate({
      mutation: mutations.AuthorCreate,
      variables: { name }
    });

    const { authorCreate } = data;

    this.populateFields(authorCreate.author);
  }
}

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

class TextRange {
  constructor (boundingDomEls, index, length = 0) {
    this.boundingDomEls = boundingDomEls;
    this.index = index;
    this.length = length;
  }
}

class Text extends TextBase {
  async save (fields = {}) {
    const client = await this.client;
    const {
      title,
      lines,
      raw,
      mutations
    } = this;

    const variables = defaults({ title, lines, raw }, fields);

    const { data } = await client.mutate({
      mutation: mutations.TextCreate,
      variables
    });

    const { textCreate } = data;

    this.populateFields(textCreate.text);
  }

  toQuillDelta () {
    const deltaOps = [{ insert: this.raw }];
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

class TextAnnotation extends Base {
  get display () {
    return capitalize(this.value);
  }
};

class TextAnnotationRelation extends Base {
  async save (fields = {}) {
    const client = await this.client;
    const {
      commentary,
      mutations
    } = this;

    const textSlug = this.text.slug;
    const textVersion = this.text.version;
    const labelId = pkFromGlobalID(this.annotation.id);
    const textIndex = this.textRange.index;

    const variables = defaults({
      textSlug,
      textVersion,
      labelId,
      commentary,
      textIndex
    }, fields);

    console.log(variables);

    const { data } = await client.mutate({
      mutation: mutations.TextAnnotationRelationCreate,
      variables
    });

    const { textAnnotationRelationCreate } = data;

    this.populateFields(textAnnotationRelationCreate.textAnnotationRelation);
  }

  toQuillDelta () {
    const deltaOps = [{ insert: this.commentary }];
    return new Delta(deltaOps);
  }

  applyQuillDelta (delta) {
    // Assume a "normalized" delta where a single
    // op contains all of our text.

    console.log(delta);

    if (delta.ops.length) {
      this.commentary = delta.ops[0].insert;
    } else {
      throw new Error(`Delta obj: ${delta} contains no ops`);
    }

    console.log(this.commentary);
  }
};

export {
  Author,
  Text,
  TextAnnotation,
  TextAnnotationRelation,
  TextSearchResult,
  TextRange
};
