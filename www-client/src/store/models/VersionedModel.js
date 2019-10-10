import Base from './Base';
import { versionFromGlobalID, pkFromGlobalID } from './utils';

export default class VersionedModel extends Base {
  get pk () {
    return parseInt(pkFromGlobalID(this.id));
  }

  get version () {
    return parseInt(versionFromGlobalID(this.id));
  }
};
