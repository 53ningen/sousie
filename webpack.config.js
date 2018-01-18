const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');

const src = path.resolve('./src');
const dist = path.resolve('./functions');

module.exports = {
  entry: {
    'alive/index': [path.join(src, 'alive/index.js')]
  },
  output: {
    libraryTarget: 'umd',
    path: dist,
    filename: '[name].js'
  },
  externals: {
    https: 'https'
  },
  resolve: {
    modules: [src, 'node_modules'],
    extensions: ['.json', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new UglifyJsPlugin({ uglifyOptions: { ecma: 6 } })
  ]
};
