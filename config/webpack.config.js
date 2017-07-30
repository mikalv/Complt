const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

process.env.REACT_APP_AUTH0_DOMAIN = 'complt.auth0.com';
process.env.REACT_APP_AUTH0_CLIENT_ID = 'SlKB0j8GVBIfYVzJicd63jSIO9oeY3q7';
process.env.REACT_APP_GIT_REF = process.env.CI_BUILD_REF;
process.env.REACT_APP_COUCH_URL = 'https://api.complt.xyz/envoy';

const paths = require('./paths');
const babelConfig = require('./babel');
const plugins = require('./plugins');

const cssLoader = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      minimize: true,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        autoprefixer({
          browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        }),
      ],
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      includePaths: [paths.appNodeModules],
    },
  },
];

module.exports = env => {
  const isProd = env && env.production;
  return {
    bail: isProd,
    entry: isProd
      ? [require.resolve('./polyfills'), paths.appIndexJs]
      : [
          `${require.resolve('webpack-dev-server/client')}?/`,
          require.resolve('webpack/hot/dev-server'),
          require.resolve('./polyfills'),
          paths.appIndexJs,
        ],
    output: {
      path: paths.appBuild,
      filename: isProd
        ? 'static/js/[name].[chunkhash:8].js'
        : 'static/js/[name].[hash:8].js',
      chunkFilename: isProd
        ? 'static/js/[name].[chunkhash:8].chunk.js'
        : 'static/js/[name].[hash:8].chunk.js',
      publicPath: '/',
    },
    resolve: {
      mainFields: ['module', 'jsnext:main', 'browser', 'main'],
      extensions: ['.jsx', '.js'],
      alias: {
        react: 'preact',
        'react-dom': path.join(paths.appSrc, 'common', 'utils', 'ReactDOM.js'),
        'react-icon-base': path.join(
          paths.appSrc,
          'web',
          'components',
          'IconBase.js'
        ),
        'lodash/sortBy': path.join(paths.appSrc, 'web', 'sortBy.js'),
        'lodash/find': path.join(paths.appSrc, 'web', 'find.js'),
        'pouchdb-selector-core': 'fbjs/lib/emptyFunction',
        'pouchdb-debug': 'fbjs/lib/emptyFunction',
        'pouchdb-changes-filter': 'fbjs/lib/emptyFunction',
        '@material/drawer/persistent': 'fbjs/lib/emptyFunction',
        tinytime: 'tinytime/dist/tinytime.min.js',
        'preact-redux': 'preact-redux/dist/preact-redux.js',
        preact: 'preact/dist/preact.js',
        'preact-router/match': 'preact-router/src/match',
        // 'pouchdb-adapter-websql-core': 'pouchdb-adapter-websql-core/lib/index.es.js',
        // 'pouchdb-adapter-utils': 'pouchdb-adapter-utils/lib/index.es.js',
        // 'pouchdb-merge': 'pouchdb-merge/lib/index.es.js',
        // 'pouchdb-errors': 'pouchdb-errors/lib/index.es.js',
        // 'pouchdb-collections': 'pouchdb-collections/lib/index.es.js',
        // 'pouchdb-utils': 'pouchdb-utils/lib/index.es.js',
        // 'pouchdb-binary-utils': 'pouchdb-binary-utils/lib/index.es.js',
        // 'pouchdb-promise': 'pouchdb-promise/lib/index.es.js',
        // 'pouchdb-md5': 'pouchdb-md5/lib/index-browser.es.js',
        // 'pouchdb-ajax': 'pouchdb-ajax/lib/index-browser.es.js',
        // 'pouchdb-json': 'pouchdb-json/lib/index.es.js',
        // 'pouchdb-generate-replication-id': 'pouchdb-generate-replication-id/lib/index.es.js',
        // 'pouchdb-collate': 'pouchdb-collate/lib/index.es.js',
        // 'pouchdb-checkpointer': 'pouchdb-checkpointer/lib/index.es.js',
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          use: [
            {
              loader: 'eslint-loader',
            },
          ],
          include: paths.appSrc,
        },
        {
          test: /\.(js|jsx)$/,
          include: [
            paths.appSrc,
            /(preact-material-components|@material|preact-router\/src)/,
          ],
          loader: 'babel-loader',
          options: babelConfig({ isProd: true, jsx: 'h' }),
        },
        {
          test: /\.(js|jsx)$/,
          include: [/react-sortable-hoc/, /react-icons/],
          loader: 'babel-loader',
          options: babelConfig({ isProd: true, jsx: 'React.createElement' }),
        },
        {
          test: /\.(sass|scss|css)$/,
          use: isProd
            ? ExtractText.extract(
                Object.assign(cssLoader, { fallback: 'style-loader' })
              )
            : ['style-loader'].concat(cssLoader),
        },
        {
          exclude: [
            /\.html$/,
            /\.(js|jsx)$/,
            /\.(css|scss)$/,
            /\.json$/,
            /\.svg$/,
          ],
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    plugins: plugins(isProd),
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    devServer: {
      contentBase: paths.appBuild,
      port: process.env.PORT || 3000,
      historyApiFallback: true,
      compress: isProd,
      inline: !isProd,
      hot: !isProd,
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      Buffer: 'mock',
      process: false,
    },
  };
};
