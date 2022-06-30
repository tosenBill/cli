let baseUrl = '/'

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://c.jlshuangcheng.com'
    // baseUrl = 'https//xxx.dev.com'
} else if(process.env.NODE_ENV === 'production') {
    baseUrl = 'https//xxx.live.com'
}

module.exports = baseUrl