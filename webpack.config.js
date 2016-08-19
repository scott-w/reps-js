/* jshint node: true */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './app/driver.js',
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'underscore-template-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.test\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css!sass")
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'js/bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'underscore'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),
    new ExtractTextPlugin("css/reps.css")
  ],
  resolve: {
    modulesDirectories: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'sass')
    ],
    root: path.join(__dirname, 'app')
  },
  resolveLoader: {
    root: path.join(__dirname , 'node_modules')
  }
};
