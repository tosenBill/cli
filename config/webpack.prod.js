const path = require('path')
const { merge } = require('webpack-merge');
const common = require('./webpack.common')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = merge(common,{
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true,
    },
    module: {
      rules: [
        {
            test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
            test: /\.s[ac]ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
      ]  
    },
    plugins: [
        // 'MiniCssExtractPlugin.loader'提取css成单独的文件
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[chunkhash].css'
        })
    ],
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
})

module.exports = config