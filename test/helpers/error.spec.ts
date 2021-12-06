import { createError } from '../../src/helpers/error'
import { AjaxRequestConfig, AjaxResponse } from '../../src/types'

describe('helpers::error', function() {
  test('should create an Error with message, config, code, request, response and isAjaxError', () => {
    const request = new XMLHttpRequest()
    const config: AjaxRequestConfig = { method: 'post' }
    const response: AjaxResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: { foo: 'bar' }
    }
    const error = createError('Boom!', config, 'SOMETHING', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('Boom!')
    expect(error.config).toBe(config)
    expect(error.code).toBe('SOMETHING')
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
    expect(error.isAjaxError).toBeTruthy()
  })
})
