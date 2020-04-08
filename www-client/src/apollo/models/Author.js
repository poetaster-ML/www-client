import { Routable } from './Base';

export default class Author extends Routable {
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
};
