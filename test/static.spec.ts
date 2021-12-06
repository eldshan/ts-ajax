import ajax from '../src/index'

describe('static', () => {
  test('should support all', done => {
    let fulfilled = false

    ajax.all([true, false]).then(arg => {
      fulfilled = arg[0]
    })

    setTimeout(() => {
      expect(fulfilled).toBeTruthy()
      done()
    }, 100)
  })

  test('should support spread', done => {
    let sum = 0
    let fulfilled = false
    let result: any

    ajax
      .all([123, 456])
      .then(
        ajax.spread((a, b) => {
          sum = a + b
          fulfilled = true
          return 'hello world'
        })
      )
      .then(res => {
        result = res
      })

    setTimeout(() => {
      expect(fulfilled).toBeTruthy()
      expect(sum).toBe(123 + 456)
      expect(result).toBe('hello world')
      done()
    }, 100)
  })
})
