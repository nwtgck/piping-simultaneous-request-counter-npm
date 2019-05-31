const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const operationalTestPath   = path.resolve(__dirname, 'operational-test');
const buildPath    = path.resolve(operationalTestPath, 'dist');

module.exports = {
  entry: path.join(operationalTestPath, 'index.ts'),

  output: {
    path: buildPath,
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.ts']
  },

  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(operationalTestPath , 'index.html'),
      filename: 'index.html'
    })
  ]
};
