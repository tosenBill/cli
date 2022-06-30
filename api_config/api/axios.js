import axios from "axios";

import baseUrl from '../server'

axios.defaults.timeout = 240000
axios.defaults.baseUrl = baseUrl

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use(
  (config) => {
    //...
    // config.headers = {
    //     "content-type": "application/json;charset=UTF-8",
    //     "authorization": "",
    //     "app-ver": "1.1.3",
    //     "plat-type": '0',
    //     "app-type": "1",
    //   }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
        return Promise.resolve(response);       
    } else {
        return Promise.reject(response);
    }
  },
  (err) => {
    const errResponse = err.response || { status: 'fail' }
    const { config: { url = '' } = {}, status } = errResponse
    let errMsg = `服务器异常-${url}`

    switch (status) {
      case 400:
        errMsg = `参数错误-${url}`
        break
      case 401: { // token失效时
        errMsg = `长时间未操作，请重新登录`
        break
      }
      case 404: {
        errMsg = `接口不存在-${url}`
        break
      }
      case 500:
      default:
        break
    }

    // if (!document.getElementsByClassName('el-message').length) {
    //   window._Vue.$message({
    //     type: 'error',
    //     message: errMsg,
    //     onClose: () => {
    //       if (status === 401 || status === 403) {
    //         removeToken()
    //         location.href = `${baseUrl()}login/#/`
    //       }
    //     }
    //   })
    // }

    return Promise.reject(errResponse);  
  }
)

export default axios