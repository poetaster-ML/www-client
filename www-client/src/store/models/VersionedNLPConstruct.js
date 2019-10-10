import NLPConstruct from './NLPConstruct';
import VersionedModel from './VersionedModel';

export default class VersionedNLPConstruct extends VersionedModel {
  static fields () {
    return {
      ...super.fields(),
      ...NLPConstruct.fields()
    };
  }
}
