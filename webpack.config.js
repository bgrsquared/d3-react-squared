//this file could be massively improved.
//inspired by https://christianalfoni.github.io/react-webpack-cookbook/
//please do visit this link! Awesome.

var webpack = require('webpack');
var path = require('path');
var nodeModulesDir = path.join(__dirname, 'node_modules');
var appDir = path.join(__dirname, 'app');
var explDir = path.join(__dirname, 'example');
var licenseBanner = 'Thanks to all the providers of the components. See the respective' +
  'github pages for their licenses.';

var config = {
  addVendor: function(name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(path);
  },
  context: __dirname,
  entry: {
    app: ['webpack/hot/dev-server',
      (
        './example/main.js'
      )]
  },
  output: {
    path: __dirname + "/example",
    filename: "bundle.js"
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.js$/,
        include: [appDir, explDir,
          path.join(nodeModulesDir, 'd3-react-squared')
          //the last line is to show how you'd include this
          //component to babel
        ],
        loader: 'babel-loader'
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        include: [appDir, explDir,
          path.join(nodeModulesDir, 'd3-react-squared')
        ],
        loader: 'eslint'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('app', null, false),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.BannerPlugin(licenseBanner)
  ]
};

//example for addVendor
//config.addVendor('jquery', path.resolve(bower_dir, 'jquery/dist/jquery.js'));

module.exports = config;