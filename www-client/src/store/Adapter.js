import {
  DefaultAdapter, ConnectionMode, ArgumentMode
} from '@vuex-orm/plugin-graphql';

export default class Adapter extends DefaultAdapter {
  getConnectionMode () {
    return ConnectionMode.EDGES;
  }
  getArgumentMode () {
    return ArgumentMode.LIST;
  }
}
