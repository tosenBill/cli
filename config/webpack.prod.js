const os = require('os')
const path = require('path')
const { merge } = require('webpack-merge');
const common = require('./webpack.common')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const { extendDefaultPlugins } = require("svgo");   
const WorkboxPlugin = require('workbox-webpack-plugin');

const getStyleLoader = (pre) => {
    return [
        MiniCssExtractPlugin.loader, 
        'css-loader', 
        {
            // 能解决大多数样式兼容问题 + 配置package.json文件下'browserslist';
            // eg: display:flex ----> display: -ms-flexbox;
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env" 
                    ]
                }
            }
        },
        pre
    ].filter(Boolean)
}

const config = merge(common,{
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true,
    },
    module: {
      rules: [ 
        {
            test: /\.css$/, 
            use: getStyleLoader()
        },
        {
            test: /\.s[ac]ss$/, 
            use:  getStyleLoader('sass-loader'),
        },
        {
            test: /\.js$/,
            loader: path.resolve(__dirname, '../loaders/clearLogLoader'),
            options: {
                author: 'tosenBill',
                // age: 27 // 这里不能新增属性，因为clearLogLoader配置文件scheme.json中 "additionalProperties" 为 false
            }
        }
      ]  
    },
    plugins: [
        // 'MiniCssExtractPlugin.loader'提取css成单独的文件
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[name].[chunkhash].css'
        }),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
    optimization: {     
        // 压缩的操作
        // runtimeChunk: 'multiple' , // or true
        minimize: true,
        minimizer: [ 
            new CssMinimizerPlugin(), // 压缩css
            new TerserPlugin({
                extractComments: false, // 不配置此项，默认打包完会生成LISENCE.TXT文件
                parallel: os.cpus().length // 压缩js
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                  implementation: ImageMinimizerPlugin.imageminGenerate,
                  options: {
                    // Lossless optimization with custom option
                    // Feel free to experiment with options for better result for you
                    plugins: [
                      ["gifsicle", { interlaced: true }],
                      ["jpegtran", { progressive: true }],
                      ["optipng", { optimizationLevel: 5 }],
                      // Svgo configuration here https://github.com/svg/svgo#configuration
                      [
                        "svgo",
                        {
                            plugins: [
                                'preset-default',
                                'prefixIds',
                                {
                                    name: 'sortAttrs',
                                    params: {
                                      xmlnsOrder: 'alphabetical',
                                    },
                                  },
                            ]
                        //   plugins: extendDefaultPlugins([
                        //     {
                        //       name: "removeViewBox",
                        //       active: false,
                        //     },
                        //     {
                        //       name: "addAttributesToSVGElement",
                        //       params: {
                        //         attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                        //       },
                        //     },
                        //   ]),
                        },
                      ],
                    ],
                  },
                },
              }),
        ],
        splitChunks: {
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
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`,
        },
    },
    devtool: "cheap-module-source-map", // 提示行和列
})

module.exports = config