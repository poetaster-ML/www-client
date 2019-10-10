import VersionedModel from './VersionedModel';
import TextDependencyParse from './TextDependencyParse';
import TextPartsOfSpeech from './TextPartsOfSpeech';
import TextTokens from './TextTokens';

import Author from './Author';

class Text extends VersionedModel {
  static entity = 'texts';
  static primaryKey = 'slug';
  static NLPConstructs = [
    'dependencyParseVersions',
    'partsOfSpeechVersions',
    'tokensVersions'
  ];

  static readRoute = 'textRead';
  static editRoute = 'textEdit';

  static fields () {
    return {
      slug: this.attr(''),
      title: this.attr(''),
      raw: this.attr(''),
      lines: this.attr([]),
      authorSlug: this.attr(''),
      author: this.belongsTo(Author, 'authorSlug'),
      dependencyParseVersions: this.hasMany(TextDependencyParse, 'texSlug', 'pk'),
      partsOfSpeechVersions: this.hasMany(TextPartsOfSpeech, 'textSlug', 'pk'),
      tokensVersions: this.hasMany(TextTokens, 'textSlug', 'pk'),
      ...super.fields()
    };
  }
};

export default Text;
