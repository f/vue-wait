var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/vuex-loading.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'vuex-loading.js',
    library: 'VuexLoading',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
  ])
}