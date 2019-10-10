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
      extensions: ['.js', '.vue', '.json', '.ts'],
      alias: {
        '@': src,
        '@assets': resolve(src, 'assets'),
        '@buttons': resolve(components, 'buttons'),
        '@components': components,
        '@env': resolve(__dirname, 'env', process.env.NODE_ENV),
        '@icons': resolve(components, 'icons'),
        '@layouts': resolve(components, 'layouts'),
        '@models': resolve(src, 'store', 'models'),
        '@navigation': resolve(components, 'navigation'),
        '@primitives': resolve(components, 'primitives'),
        '@utils': resolve(src, 'utils'),
        '@views': resolve(src, 'views')
      }
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader'
        }
      ]
    }
  }
};
