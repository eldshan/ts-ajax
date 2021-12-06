import ajax from '../src/index'
import { getAjaxRequest } from './helper'

describe('xsrf', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
    document.cookie =
      ajax.defaults.xsrfCookieName + '=;expires=' + new Date(Date.now() - 86400000).toUTCString()
  })

  test('should not set xsrf header if cookie is null', () => {
    ajax('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[ajax.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('should set xsrf header if cookie is set', () => {
    document.cookie = ajax.defaults.xsrfCookieName + '=12345'

    ajax('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[ajax.defaults.xsrfHeaderName!]).toBe('12345')
    })
  })

  test('should not set xsrf header for cross origin', () => {
    document.cookie = ajax.defaults.xsrfCookieName + '=12345'

    ajax('http://example.com/')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[ajax.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('should set xsrf header for cross origin when using withCredentials', () => {
    document.cookie = ajax.defaults.xsrfCookieName + '=12345'

    ajax('http://example.com/', {
      withCredentials: true
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[ajax.defaults.xsrfHeaderName!]).toBe('12345')
    })
  })
})
