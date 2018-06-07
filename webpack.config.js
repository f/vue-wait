const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ["./src/vue-wait.js"],
  output: {
    library: "VueWait",
    libraryTarget: "umd",
    filename: "vue-wait.js",
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
