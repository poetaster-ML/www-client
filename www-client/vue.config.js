const path = require('path');

const resolve = path.resolve;

const src = resolve(__dirname, 'src/');
const components = resolve(src, 'components');

module.exports = {
  devServer: {
    disableHostCheck: true
  },

  // Don't resolve libs linked to in development with `yarn link`.
  chainWebpack: config => {
    config.resolve.symlinks(false);
    config.module.rules.delete('svg');
  },

  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts', '.gql'],
      alias: {
        '@': src,
        '@env': resolve(__dirname, 'env', process.env.NODE_ENV),
        '@assets': resolve(src, 'assets'),
        '@utils': resolve(src, 'utils'),
        '@queries': resolve(src, 'apollo', 'gql', 'queries.gql'),
        '@mutations': resolve(src, 'apollo', 'gql', 'mutations.gql'),
        '@models': resolve(src, 'apollo', 'models'),
        '@serializers': resolve(src, 'apollo', 'serializers'),
        '@components': components,
        '@views': resolve(components, 'views'),
        '@buttons': resolve(components, 'buttons'),
        '@icons': resolve(components, 'icons'),
        '@layouts': resolve(components, 'layouts'),
        '@navigation': resolve(components, 'navigation'),
        '@primitives': resolve(components, 'primitives')
      }
    },
    module: {
      rules: [
        {
          test: /\.gql$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        },
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader'
        }
      ]
    }
  }
};
