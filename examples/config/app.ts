import ajax, { AjaxTransformer } from '../../src/index'
import qs from 'qs'

// ajax.defaults.headers.common['test2'] = 123
//
// ajax({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })
//
// ajax({
//   transformRequest: [(function(data) {
//     return qs.stringify(data)
//   }), ...(ajax.defaults.transformRequest as AjaxTransformer[])],
//   transformResponse: [...(ajax.defaults.transformResponse as AjaxTransformer[]), function(data) {
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   }],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then((res) => {
//   console.log(res.data)
// })

const instance = ajax.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(ajax.defaults.transformRequest as AjaxTransformer[])],
  transformResponse: [...(ajax.defaults.transformResponse as AjaxTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})
