const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ["./src/vue-loading.js"],
  output: {
    library: "VueLoading",
    libraryTarget: "umd",
    filename: "vue-loading.js"
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
