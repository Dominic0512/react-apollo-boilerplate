const merge = require("webpack-merge");
const baseConfig = require("./base");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
});
