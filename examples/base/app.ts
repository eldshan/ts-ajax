import ajax from '../../src/index'

// ajax({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })
//
// ajax({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })
//
// const date = new Date()
//
// ajax({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })
//
// ajax({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })
//
// ajax({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })
//
// ajax({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })
//
// ajax({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })
//
// ajax({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })
//
// ajax({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json;charset=utf-8'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })
//
// const arr = new Int32Array([21, 31])
//
// ajax({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })
//
//
// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
//
// ajax({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

ajax({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
})

ajax({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then((res) => {
  console.log(res)
})
