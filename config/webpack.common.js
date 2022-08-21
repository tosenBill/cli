const os = require('os')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require("chalk");
const { VueLoaderPlugin } = require('vue-loader')
const ESLintPlugin = require('eslint-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const TestPlugin = require('../plugins/test-plugin')

//多进程打包在项目大的时候效果明显，项目小反而可能慢，因为每个进程池开启需要600ms左右延迟
// 获取cpu核数，为了多进程打包
const threads = os.cpus().length  
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
        chunkFilename: 'static/js/[name].chunk.js', // 给打包输出的其它文件命名
        // 图片字体等通过type: asset处理资源的命名方式
        assetModuleFilename: "static/media/[hash:10][ext][query]",
    },
    module: {
        rules: [
            {
                test: /\.vue$/, use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.(jpg|gif|jpe?g|png|svg)$/i, 
                // webpack 将按照默认条件，自动地在 resource 和 inline 之间进行选择：
                // 小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型
                type: 'asset',
                // generator: { // output.assetModuleFilename 统一命名
                //     // 生成输出文件名称 query代表url后面”？“的参数
                //     filename: 'static/images/[hash:10][ext][query]'
                // },
            },
            {
                test: /\.(ttf|woff2?|mp3|mp4|avi)$/, 
                type: 'asset/resource', // 只会原封不动输出，不会转base64
                // generator: { // output.assetModuleFilename 统一命名
                //     // 生成输出文件名称 query代表url后面”？“的参数
                //     filename: 'static/media/[hash:10][ext][query]'
                // },
            },
            {
                test: /\.m?js$/, 
                include: path.resolve(__dirname, '../src'), // 只处理src下的文件，其它文件都不处理。
                // exclude: /(node_modules)/, // 排除 node_modules 下的文件，其它文件都处理。
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            works: threads // 进程池数量
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            // presets: ['@babel/preset-env'] // .babelrc.js已经定义过了，这里不用再加
                            cacheDirectory: true, // 开启babel缓存（非第一次）
                            cacheCompression: false, // 关闭缓存文件压缩
                            // babel默认情况下会为每个文件注入辅助代码，辅助代码会是一个新的定义，可能定义了n次，
                            //使用下面这个插件，就会直接使用 @babel/plugin-transform-runtime 上面的辅助代码，就不会重新定义了,
                            // 避免了重复定义，从而减小体积，代码越多越明显。
                            plugins: ['@babel/plugin-transform-runtime']
                        }
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
        }),
        new PreloadWebpackPlugin({
            rel: 'preload',
            as: 'script'
        }),
        new ESLintPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: 'node_modules', // 默认值
            cache: true,
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslint-catch'),
            threads, // 开启多进程
        }),
        new TestPlugin()
    ],
    resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@api': path.resolve(__dirname, '../api_config/api'),
        },
    }
}

module.exports = config