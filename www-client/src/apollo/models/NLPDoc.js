import * as hierarchy from 'd3-hierarchy';
import { Base } from './Base';

/**
 * An NLPDoc is a list of NLPSentences.
 */
class NLPDoc extends Base {};

class NLPSyntaxTree {
  constructor (data) {
    this.data = data;
    this.hierarchy = hierarchy.hierarchy(this.data);
  }
  get height () {
    return this.hierarchy.height;
  }
  toTidyTree (height) {
    const root = this.hierarchy;

    root.dy = height / (root.height + 1);
    root.dx = 40;

    return hierarchy.tree().nodeSize([root.dx, root.dy])(root);
  }
};

/**
 * An NLPSentence is a list of NLPTokens and a syntax tree.
 */
class NLPSentence extends Base {};

/**
 * An NLPToken contains the following attributes:
 *  - id
 *  - start
 *  - end
 *  - pos
 *  - tag
 *  - dep
 *  - head
 */
class NLPToken extends Base {};

export {
  NLPDoc,
  NLPSentence,
  NLPToken,
  NLPSyntaxTree
};
