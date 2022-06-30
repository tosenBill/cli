import axios from './axios'
import { getToken } from '@/utils/auth'
import { locationPath } from '@/utils/index'

export default {
  // 判断是否需要token
  judgeToken() {
    // TODO:
    // const token = this.getHeaders().Authorization
    // const needToken = location.href.indexOf('login') === -1

    // if (needToken && !token) {
    //   location.href = `${locationPath()}login/#/`
    //   return 0
    // }
    return 1
  },
  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  get(url, params) {
    if (this.judgeToken()) {
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            params,
            headers: params?.headers || this.getHeaders()
          })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  post(url, params) {
    if (this.judgeToken()) {
      return new Promise((resolve, reject) => {
        axios
          .post(url, params, {
            headers: params?.headers || this.getHeaders()
          })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  getHeaders() {
    const token = getToken() || ''
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    if (token) {
      headers.Authorization = token.includes('Bearer ')
        ? token
        : `Bearer ${token}`
    }
    return headers
  }
}
