import Base from './Base';
import Text from './Text';

class Collection extends Base {
  static entity = 'collections';

  static fields () {
    return {
      name: this.attr(''),
      texts: this.hasMany(Text, 'collectionId'),
      ...super.fields()
    };
  }
};

export default Collection;
