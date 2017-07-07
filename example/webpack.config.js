const path = require('path');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        include: [resolve('src')]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    contentBase: __dirname,
    port: 3000
  }
};
