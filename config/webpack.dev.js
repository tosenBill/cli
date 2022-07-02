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
              oneOf: [ // 每个文件只能被其中第一个处理
                {
                    test: /\.css$/, use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.s[ac]ss$/, use: ['style-loader', 'css-loader', 'sass-loader']
                },
              ]
          }
        ]  
      },
    plugins: [],
    devtool: "cheap-module-source-map", // 开发环境只用提示行
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