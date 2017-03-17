const path = require('path')
const BASE = path.resolve(__dirname)
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: path.resolve(BASE, 'src', 'functions.js'),
  output: {
    path: BASE,
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  target: 'node',
  node: {
    fs: 'empty'
  },
  externals: [ /firebase/ ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: {
      warnings: false,
      drop_console: true,
      dead_code: true,
    },
      comments: false }),
  ]
}
