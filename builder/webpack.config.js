
const path = require('path');
const webpack = require('webpack');
const webpackAlias = require('./webpack-alias');

module.exports = {
  entry: {
    'core/background/boot': './src/background/boot/',
    'core/background/bundle': './src/background/',
    'core/ui/assets': './src/ui/assets',
    'core/ui/bundle': './src/ui/',
  },
  output: {
    path: process.env.npm_config_outdir,
    filename: '[name].js',
    chunkFilename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src/ui')
        ],
        query: {
          presets: ['react']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(jpg|png)$/, loader: 'url?limit=25000' },
      { test: /\.woff$/, loader: 'url?mimetype=application/font-woff'}
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/./, webpackAlias.newResource),
    // to not require('react') in every module
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    // todo: for prod builds
    /*
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
    */
  ],
  devtool: '#source-map'
};
