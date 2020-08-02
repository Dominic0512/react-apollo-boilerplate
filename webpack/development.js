const merge = require('webpack-merge')
const baseConfig = require('./base')
const Dotenv = require('dotenv-webpack')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new Dotenv()],
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    port: 3000,
    contentBase: './dist',
  },
})
