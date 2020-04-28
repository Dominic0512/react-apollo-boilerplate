const merge = require("webpack-merge");
const baseConfig = require("./base");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    publicPath: "/",
    historyApiFallback: true,
    port: 3000,
    contentBase: "./dist",
  },
});
