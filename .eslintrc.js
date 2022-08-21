module.exports = {
    // 继承eslint官方规则
    extends: ["eslint:recommended"],
    env: {
        node: true, // 启用node中全局变量
        browser: true, // 启用浏览器中全局变量
        es6: true
    },
    parserOptions: {
        ecmaVersion: 6, // es6
        sourceType: "module", // es module
        requireConfigFile: false
    },
    rules: {
        "no-debugger": "off",
        "no-var": 2, // 不能是用var定义变量
    },
    parser: "@babel/eslint-parser",
    plugins: ["import"], // 解决动态导入语法报错
}