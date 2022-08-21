class ClearWebpackPlugin {
    apply(compiler) {
        // 获取打包输出的目录
        const outputPath = compiler.options.output.path;
        const fs = compiler.outputFileSystem;
        // 注册钩子，在打包输出前 emit
        compiler.hooks.emit.tap('ClearWebpackPlugin', (compilation) => {
            // 通过fs删除打包输出的目录下的所有文件
            this.removeFiles(fs, outputPath)
        }) 
    }

    removeFiles(fs, filePath) {
        // 想要删除打包输出目录下所有资源，需要讲目录线下的资源删除，才能删除这个目录
        // 1.读取当前目录下的所有资源
        const files = fs.readdirSync(filePath)
        // 2.遍历一个个的删除
        files.forEach(file => {
            // 2.1遍历所有文件，判断是文件夹还是文件
            const path = `${filePath}/${file}`
            const fileStat = fs.statSync(path)
            if (fileStat.isDirectory()){
                // 2.2 是文件件，就得删除下面所有文件，才能删除文件夹
                this.removeFiles(fs, path)
            } else {
                // 2.3 是文件，直接删除
                fs.unlinkSync(path)
            }
        })
        fs.rmdirSync(filePath)// 如果文件夹是空的，就将自己删除掉
    }
}

module.exports = ClearWebpackPlugin