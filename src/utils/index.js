export function locationPath() {
    let myBaseUrl = ''
    const pathname = location.pathname
    const environment = ['dev', 'test']
    const enFlag = environment.some((item, index) => {
      return pathname.includes(item)
    })
    const pathArr = pathname.split('/')
    if (enFlag) {
      myBaseUrl = `/${pathArr[1]}/`
    } else {
      myBaseUrl = '/'
    }
    return myBaseUrl
  }