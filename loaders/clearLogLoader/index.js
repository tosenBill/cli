const scheme = require('./scheme.json')
module.exports = function (content) {
    // 清除文件内荣中的console.log
    // scheme符合JSON Scheme的规则
    const options = this.getOptions(scheme)

    const prefix = `
        /*
        * Author: ${options.author}
        */

    `
    return prefix + content.replace(/console\.log\(.*\);?/g,'');
}