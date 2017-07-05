import axios from 'axios'

axios.defaults.timeout = 3000
// axios.defaults.headers.get['accept'] = '*/*'
// override request
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  config.url = encodeURI(config.url)
  return config
}, (error) => {
  // Do something with request error]
  return Promise.reject(error)
})
// override response
axios.interceptors.response.use((res) => {
  if (res.data.code !== 200) {
    window.alert('数据返回有误')
    return Promise.reject(res)
  }
  return res
}, (error) => {
  var {errorTip = true} = error.config
  // timeout
  if (error.code === 'ECONNABORTED') {
    // check network is working well
  }
  console.log('promise error:' + error)
  // 日志?
  if (errorTip) {
    window.alert('服务器错误')
  }
  return Promise.reject(error)
})
export default axios
