const { merge } = require('webpack-merge');
const common = require('./webpack.common')
const baseUrl = require('../api_config/server')

const config = merge(common,{
    mode: 'development',
    output: {
        filename: '[name].[chunkhash].bundle.js',
    },
    module: {
        rules: [
          {
              test: /\.css$/, use: ['style-loader', 'css-loader']
          },
          {
              test: /\.s[ac]ss$/, use: ['style-loader', 'css-loader', 'sass-loader']
          },
        ]  
      },
    plugins: [],
    devtool: "inline-source-map",
    devServer: {
        compress: true,
        port: 9000,
        proxy: {
            '/': {
              target: baseUrl,
              changeOrigin: true,
            },
        },
    },
    stats: 'errors-only'
})

module.exports = config