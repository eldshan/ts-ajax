import ajax, { AjaxError } from '../../src/index'

ajax({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

ajax({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

setTimeout(() => {
  ajax({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log(res)
  }).catch((e) => {
    console.log(e)
  })
}, 5000)

ajax({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AjaxError) => {
  console.log(e.message)
  console.log(e.config)
  console.log(e.code)
  console.log(e.request)
  console.log(e.isAjaxError)
})
