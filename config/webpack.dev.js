const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const ESLintPlugin = require('eslint-webpack-plugin');

const devConfig = {
  mode: 'development',
  entry: './src/App.tsx',
  output: {
    publicPath: 'auto'
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    host: '0.0.0.0',
    allowedHosts: 'all',
    hot: true,
    port: 4008,
    historyApiFallback: true
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './src/assets/favicon-32x32.png'
    }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
      exclude: ['public', 'node_modules']
    })
  ]
};

module.exports = merge(commonConfig, devConfig);
