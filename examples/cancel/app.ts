import ajax, { Canceler } from '../../src/index'

const CancelToken = ajax.CancelToken
const source = CancelToken.source()

ajax.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (ajax.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  ajax.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (ajax.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)

let cancel: Canceler

ajax.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (ajax.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(() => {
  cancel()
}, 200)
