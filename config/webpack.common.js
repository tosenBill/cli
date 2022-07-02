const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require("chalk");
const { VueLoaderPlugin } = require('vue-loader')

// const NODE_ENV = process.env.NODE_ENV

const progressPlugin = new ProgressBarPlugin({
    width: 50, 					 // 默认20，进度格子数量即每个代表进度数，如果是20，那么一格就是5。
    format: chalk.blue.bold("build") + chalk.yellow('[:bar] ') + chalk.green.bold(':percent') + ' (:elapsed秒)',
    stream: process.stderr,        // 默认stderr，输出流
    complete: "#",                 // 默认“=”，完成字符
    clear: false,                  // 默认true，完成时清除栏的选项
    renderThrottle: "",            // 默认16，更新之间的最短时间（以毫秒为单位）
    callback() {                   // 进度条完成时调用的可选函数
      console.log(chalk.green.bold("successful！"))
    }
  })


const config = {
    entry: './src/main.js',
    output: {
        filename: '[name].[chunkhash].bundle.js',
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.vue$/, use: {
                            loader: 'vue-loader'
                        }
                    },
                    {
                        test: /\.m?js$/, use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    },
                    // old 语法
                    // {
                    //     test: /\.(jpg|gif|jpeg|png|svg|webp)$/, use: {
                    //         loader: 'file-loader',
                    //         options: {
                    //             esModule: false
                    //         }
                    //     }
                    // }
                    // webpack5 语法
                    {
                        test: /\.(jpg|gif|jpeg|png|svg|webp)$/, 
                        // webpack 将按照默认条件，自动地在 resource 和 inline 之间进行选择：
                        // 小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型
                        type: 'asset',
                        generator: {
                            // 生成输出文件名称 query代表url后面”？“的参数
                            filename: 'static/images/[hash:10][ext][query]'
                        },
                    },
                    {
                        test: /\.(ttf|woff2?|mp3|mp4|avi)$/, 
                        type: 'asset/resource', // 只会原封不动输出，不会转base64
                        generator: {
                            // 生成输出文件名称 query代表url后面”？“的参数
                            filename: 'static/media/[hash:10][ext][query]'
                        },
                    },
                    {
                        test: /\.js$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader'
                        // use: {
                        //   loader: 'babel-loader',
                        //   options: {
                        //     presets: ['@babel/preset-env']
                        //   }
                        // }
                    }
                ]
            }
        ],
    },
    plugins: [
        progressPlugin,
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: './favicon.ico'
        })
    ],
    resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@api': path.resolve(__dirname, '../api_config/api'),
        },
      }
}

module.exports = config