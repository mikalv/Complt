const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const OfflinePlugin = require('offline-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
// const InlineManifest = require('inline-manifest-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const Dashboard = require('webpack-dashboard/plugin');
const paths = require('./paths');

module.exports = isProd => {
  const env = require('./env')('');
  const plugins = [
    new Clean([paths.appBuild], { root: paths.appRoot }),
    new Copy([{ context: paths.appPublic, from: '**/**', to: paths.appBuild }]),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: isProd
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : {},
    }),
    new webpack.DefinePlugin(env.stringified),
    new LodashModuleReplacementPlugin({ shorthands: true }),
    new BundleAnalyzerPlugin({
      analyzerMode: isProd ? 'static' : 'server',
      generateStatsFile: isProd,
      statsOptions: { all: true },
    }),
  ];
  if (isProd) {
    return plugins.concat([
      new webpack.optimize.ModuleConcatenationPlugin(),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor',
      //   minChunks(module) {
      //     const context = module.context;
      //     return (
      //       context &&
      //       context.indexOf('node_modules') !== -1 &&
      //       context.indexOf('@material') === -1 &&
      //       context.indexOf('react') === -1
      //     );
      //   },
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'manifest',
      // }),
      // new InlineManifest({ name: 'webpackManifest' }),
      // new webpack.NamedModulesPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unsafe_comps: true,
          properties: true,
          keep_fargs: false,
          pure_getters: true,
          collapse_vars: true,
          unsafe: true,
          warnings: false,
          screw_ie8: true,
          sequences: true,
          dead_code: true,
          drop_debugger: true,
          comparisons: true,
          conditionals: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          hoist_funs: true,
          if_return: true,
          join_vars: true,
          cascade: true,
          drop_console: false,
          pure_funcs: [
            'classCallCheck',
            '_classCallCheck',
            '_possibleConstructorReturn',
            'Object.freeze',
            'invariant',
            'warning',
          ],
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
        sourceMap: true,
      }),
      new OfflinePlugin({
        excludes: ['**/.*', '**/*.map', '_redirects'],
        ServiceWorker: {
          navigateFallbackURL: '/',
          output: 'service-worker.js',
        },
        AppCache: {
          FALLBACK: {
            '/': '/index.html',
          },
        },
      }),
      new ExtractTextPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
      }),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        as: 'script',
        include: ['mdc-select', 'dialogs', 'redux-persist'],
      }),
    ]);
  }
  return plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new Dashboard(),
  ]);
};
