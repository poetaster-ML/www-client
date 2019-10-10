import Base from './Base';
// import Collection from './Collection';
import Text from './Text';

export default class Author extends Base {
  static entity = 'authors';
  static primaryKey = 'slug';
  static readRoute = 'authorRead';
  static fields () {
    return {
      name: this.attr(''),
      slug: this.attr(''),
      texts: this.hasMany(Text, 'authorSlug'),
      // collections: this.hasMany(Collection, 'authorSlug'),
      ...super.fields()
    };
  }
};
