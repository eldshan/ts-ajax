import ajax from '../../src/index'

ajax.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
ajax.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
ajax.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

ajax.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let interceptor = ajax.interceptors.response.use(res => {
  res.data += '2'
  return res
})
ajax.interceptors.response.use(res => {
  res.data += '3'
  return res
})

ajax.interceptors.response.eject(interceptor)

ajax({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
})
