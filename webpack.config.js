const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ProgressPlugin } = require('webpack')
const chalk = require("chalk");
const TerserPlugin = require('terser-webpack-plugin')

const baseUrl = require('./api_config/server')
const NODE_ENV = process.env.NODE_ENV

const progressPlugin = new ProgressPlugin({
    activeModules: true,         // 默认false，显示活动模块计数和一个活动模块正在进行消息。
    entries: true,  			   // 默认true，显示正在进行的条目计数消息。
    modules: false,              // 默认true，显示正在进行的模块计数消息。
    modulesCount: 5000,          // 默认5000，开始时的最小模块数。PS:modules启用属性时生效。
    profile: false,         	   // 默认false，告诉ProgressPlugin为进度步骤收集配置文件数据。
    dependencies: false,         // 默认true，显示正在进行的依赖项计数消息。
    dependenciesCount: 10000,
    handler: (percentage, message, ...args) => {
        console.log(chalk.yellow("进度：") + chalk.green.bold(~~(percentage * 100) + "%"))
    }
  });

// const htmlTemplate
const config = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist '),
        filename: '[name].[chunkhash].bundle.js',
        clean: true,
        // assetModuleFilename: 'images/[hash][ext][query]'
        // publicPath:''
    },
    module: {
        rules: [
            {
                test: /\.vue$/, use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.s[ac]ss$/, use: ['style-loader', 'css-loader', 'sass-loader']
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
                    filename: 'static/[hash][ext][query]'
                }
            }
        ],
        
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: './src/assets/img/favicon.png'
        }),
        progressPlugin
    ],
    resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
          '@api': path.resolve(__dirname, 'api_config/api'),
        },
      },
    //   
    optimization: {     
        // runtimeChunk: 'multiple' , // or true
        minimize: true,
        minimizer: [ 
            new TerserPlugin({
                extractComments: false // 不配置此项，默认打包完会生成LISENCE.TXT文件
            })
        ],
        splitChunks: {       
            // chunks: "all",
            cacheGroups: {         
                vendors: {           
                    test: /[\\/]node_modules[\\/]/ ,           
                    chunks: 'all',           
                    name: 'vendors',           
                    enforce: true , // 不参考全域的属性          
                    // priority: 10 , // 预设为0，必须大于预设cacheGroups 
                    minSize: 0, // 限制最小大小( byte )         
                },
            },     
        }
    } 
    // target: 'web', // 默认
}
if (NODE_ENV === 'development') {
    config.devtool = "inline-source-map",
    config.devServer = {
        compress: true,
        port: 9000,
        proxy: {
            '/': {
              target: baseUrl,
              changeOrigin: true,
            },
          },
    }
}

module.exports = config