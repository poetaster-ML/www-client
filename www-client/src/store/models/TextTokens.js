import VersionedNLPConstruct from './VersionedNLPConstruct';

export default class TextTokens extends VersionedNLPConstruct {
  static entity = 'textTokensVersions';
  static fields () {
    return super.fields();
  }
}
