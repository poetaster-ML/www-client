/* global atob */

const fromGlobalID = (globalID) => {
  /* eslint-disable-next-line no-unused-vars */
  var type, id, pk, version;

  const string = atob(globalID);

  [type, id] = string.split(':');
  [pk, version] = id.split('.');

  return [pk, version];
};

const pkFromGlobalID = (globalID) => fromGlobalID(globalID)[0];

const versionFromGlobalID = (globalID) => fromGlobalID(globalID)[1];

export {
  pkFromGlobalID,
  versionFromGlobalID
};
