
/**
 * 1.webpack加载webpack.config.js中的配置，此时就会new TestPlugin(), 执行插件的constructor
 * 2.webpack创建compiler对象
 * 3.遍历所有plugins中插件，调用插件的apply方法
 * 4.执行剩下编译流程（触发各个hooks事件）
 */
class TestPlugin {
    constructor(){
        console.log('testplugin constructor')
    }
    apply(compiler) {
        debugger;
        console.log('compiler: ', compiler)
        // 有文档可知，environment是同步沟子，所以需要使用tap注册
        compiler.hooks.environment.tap("TestPlugin", () => {
            console.log('TestPlugin environment')
        })
        // emit (异步串行钩子 AsyncSeriesHook) 输出 asset 到 output 目录之前执行
        compiler.hooks.emit.tap("TestPlugin", (compilation) => {
            console.log('TestPlugin emit 111')
        })

        compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
            setTimeout(() => {
                console.log('TestPlugin emit 222')
                callback()
            }, 2000)
        })

        compiler.hooks.emit.tapPromise("TestPlugin", (compilation) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('TestPlugin emit 333')
                    resolve()
                }, 1000)
            })
        }) 
        // make (异步并行钩子 AsyncParallelHook ) compilation 结束之前执行
        compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
            // 根据生命周期可知，需要在compilation hooks触发前执行才能生效
            compilation.hooks.seal.tap('TestPlugin', () => {
                console.log('TestPlugin seal') 
            })
            setTimeout(() => {
                console.log('TestPlugin make 111 ')
                callback()
            }, 3000)
        })
        compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
            setTimeout(() => {
                console.log('TestPlugin make 222 ')
                callback()
            }, 1000)
        })
        compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
            setTimeout(() => {
                console.log('TestPlugin make 333 ')
                callback()
            }, 2000)
        })
    }
}

module.exports = TestPlugin