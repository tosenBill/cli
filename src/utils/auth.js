import Cookies from 'js-cookie'

const TokenKey = 'xxxx'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  /** 设置过期时间为"15"分钟 */
  // var expires = new Date(new Date().getTime() + 15 * 60 * 1000)
  return Cookies.set(TokenKey, token, {
    expires: 99 // 过期时间为99天
  })
}

export function removeToken() {
  localStorage.removeItem('teacher')
  // 每次退出清除悬浮框标示
  localStorage.removeItem('feedFlag')
  return Cookies.remove(TokenKey)
}
