import ajax from '../../src/index'

// ajax({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })
//
// ajax.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })
//
// ajax.get('/extend/get')
//
// ajax.options('/extend/options')
//
// ajax.delete('/extend/delete')
//
// ajax.head('/extend/head')
//
// ajax.post('/extend/post', { msg: 'post' })
//
// ajax.put('/extend/put', { msg: 'put' })
//
// ajax.patch('/extend/patch', { msg: 'patch' })

// ajax({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })
//
// ajax('/extend/post', {
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return ajax<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}


async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()
