const path = require('path')
const { merge } = require('webpack-merge');
const common = require('./webpack.common')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
        }
      ]  
    },
    plugins: [
        // 'MiniCssExtractPlugin.loader'提取css成单独的文件
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[chunkhash].css'
        }),
        new CssMinimizerPlugin(),
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
        },
        devtool: "source-map", // 提示行和列
    }
})

module.exports = config