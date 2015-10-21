//this file could be massively improved.
//inspired by https://christianalfoni.github.io/react-webpack-cookbook/
//please do visit this link! Awesome.

var webpack = require('webpack');
var path = require('path');
var appDir = path.join(__dirname, 'apps');
var explDir = path.join(__dirname, 'example');
var licenseBanner = 'Thanks to all the providers of the components. See the respective' +
  'github pages for their licenses.';

var outputPath, filename, entry, externals, output;
switch (process.env.NODE_ENV) {
  case 'example':
    outputPath = __dirname + '/example';
    filename = 'bundle.js';
    entry = ['webpack/hot/dev-server',
      (
        './example/main.js'
      )];
    output = {
      path: outputPath,
      filename: filename
    };
    externals = [];
    break;
  case 'production':
    outputPath = __dirname + '/dist';
    filename = 'd3-react-squared.js';
    entry = './apps/main.js';
    output = {
      path: outputPath,
      library: 'd3-react-squared',
      libraryTarget: 'umd',
      filename: filename
    };
    externals = [
      {
        'react': 'react',
        'react-dom': 'react-dom',
        'd3': 'd3'
      }
    ];
    break;
  default:
    outputPath = __dirname + '/dist';
    filename = 'bundle.js';
    entry = ['webpack/hot/dev-server',
      (
        './example/main.js'
      )];
    output = {
      path: outputPath,
      filename: filename
    };
    externals = [];
}

var config = {
  context: __dirname,

  entry: entry,

  output: output,

  module: {
    noParse: [],
    loaders: [
      {
        test: /\.js$/,
        include: [appDir, explDir],
        loader: 'babel-loader'
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        include: [appDir, explDir],
        loader: 'eslint'
      }
    ]
  },

  externals: externals,

  plugins: [
    new webpack.BannerPlugin(licenseBanner)
  ]
};

module.exports = config;