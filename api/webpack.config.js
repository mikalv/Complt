const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './handler.js',
  resolve: {
    extensions: ['.js', ''],
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        include: __dirname,
      },
    ],
  },
};
