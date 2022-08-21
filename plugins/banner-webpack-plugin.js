class BannerWebpackPlugin {
    constructor(opts = {}) {
        this.opts = opts
    }
    apply(compiler) {
        compiler.hooks.emit.tap("BannerWebpackPlugin", (compilation) => {
            // debugger
            const extensions = ["css", "js"]
            // 1. 获取即将输出的资源文件，compilation.assets
            // 2. 过滤只保留js和css资源
            const assets = Object.keys(compilation.assets).filter(assetPath => {
                const splited = assetPath.split('.')
                const _ext = splited[splited.length - 1]

                return extensions.includes(_ext)
            })
            const prefix = `/*
* Author: ${this.opts.author}
* createTime: ${this.opts.createTime}
*/
`;
            // 3. 遍历剩下的资源添加上遍历
            assets.forEach(asset => {
                // 获取原来的内容
                const source =  compilation.assets[asset].source()
                // 拼接上注释
                const content = prefix + source
                // 修改资源
                compilation.assets[asset] = {
                    // 最终资源输出时，调用source方法，source方法的返回值就是资源的具体内容
                    source () {
                        return content
                    },
                    // 资源大小
                    size () {
                        return content.length
                    }
                }

            })
        })
    }
}

module.exports = BannerWebpackPlugin