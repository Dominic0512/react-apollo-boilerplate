const merge = require("webpack-merge");
const baseConfig = require("./base");

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: "inline-source-map",
});
