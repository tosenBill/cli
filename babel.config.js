module.exports = {
    presets: [
        // 智能预设，能够编译es6语法;eg (...args) / =>
        ['@babel/preset-env', { 
            useBuiltIns: "usage", // 按需加载自动引入
            corejs: 3
        }]
    ]
}