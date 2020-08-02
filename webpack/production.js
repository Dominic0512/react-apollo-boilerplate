const merge = require('webpack-merge')
const baseConfig = require('./base')

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        GRAPHQL_URI: JSON.stringify(process.env.GRAPHQL_URI),
      },
    }),
  ],
})
