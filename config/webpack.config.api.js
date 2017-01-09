const path = require('path');

module.exports = {
  entry: path.join(__dirname, '..', 'handler.js'),
  resolve: {
    extensions: ['.js', ''],
  },
  externals: ['aws-sdk', 'formidable'],
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '..', '.webpack'),
    filename: 'handler.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        include: path.join(__dirname, '..'),
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
};