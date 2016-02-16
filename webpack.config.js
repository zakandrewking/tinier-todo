const path = require('path')

module.exports = {
  entry: [ 'babel-polyfill', './js/app.js' ],
  output: {
    path: __dirname,
    filename: 'dist/app.js'
  },
  resolve: { fallback: path.join(__dirname, "node_modules") },
  resolveLoader: { fallback: path.join(__dirname, "node_modules") },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
