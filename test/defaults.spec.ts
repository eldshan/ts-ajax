import ajax, { AjaxTransformer } from '../src/index'
import { getAjaxRequest } from './helper'
import { deepMerge } from '../src/helpers/util'

describe('defaults', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should transform request json', () => {
    expect((ajax.defaults.transformRequest as AjaxTransformer[])[0]({ foo: 'bar' })).toBe(
      '{"foo":"bar"}'
    )
  })

  test('should do nothing to request string', () => {
    expect((ajax.defaults.transformRequest as AjaxTransformer[])[0]('foo=bar')).toBe('foo=bar')
  })

  test('should transform response json', () => {
    const data = (ajax.defaults.transformResponse as AjaxTransformer[])[0]('{"foo":"bar"}')

    expect(typeof data).toBe('object')
    expect(data.foo).toBe('bar')
  })

  test('should do nothing to response string', () => {
    expect((ajax.defaults.transformResponse as AjaxTransformer[])[0]('foo=bar')).toBe('foo=bar')
  })

  test('should use global defaults config', () => {
    ajax('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
    })
  })

  test('should use modified defaults config', () => {
    ajax.defaults.baseURL = 'http://example.com/'

    ajax('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('http://example.com/foo')
      delete ajax.defaults.baseURL
    })
  })

  test('should use request config', () => {
    ajax('/foo', {
      baseURL: 'http://www.example.com'
    })

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('http://www.example.com/foo')
    })
  })

  test('should use default config for custom instance', () => {
    const instance = ajax.create({
      xsrfCookieName: 'CUSTOM-XSRF-TOKEN',
      xsrfHeaderName: 'X-CUSTOM-XSRF-TOKEN'
    })
    document.cookie = instance.defaults.xsrfCookieName + '=foobarbaz'

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[instance.defaults.xsrfHeaderName!]).toBe('foobarbaz')
      document.cookie =
        instance.defaults.xsrfCookieName +
        '=;expires=' +
        new Date(Date.now() - 86400000).toUTCString()
    })
  })

  test('should use GET headers', () => {
    ajax.defaults.headers.get['X-CUSTOM-HEADER'] = 'foo'
    ajax.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['X-CUSTOM-HEADER']).toBe('foo')
      delete ajax.defaults.headers.get['X-CUSTOM-HEADER']
    })
  })

  test('should use POST headers', () => {
    ajax.defaults.headers.post['X-CUSTOM-HEADER'] = 'foo'
    ajax.post('/foo', {})

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['X-CUSTOM-HEADER']).toBe('foo')
      delete ajax.defaults.headers.post['X-CUSTOM-HEADER']
    })
  })

  test('should use header config', () => {
    const instance = ajax.create({
      headers: {
        common: {
          'X-COMMON-HEADER': 'commonHeaderValue'
        },
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        },
        post: {
          'X-POST-HEADER': 'postHeaderValue'
        }
      }
    })

    instance.get('/foo', {
      headers: {
        'X-FOO-HEADER': 'fooHeaderValue',
        'X-BAR-HEADER': 'barHeaderValue'
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders).toEqual(
        deepMerge(ajax.defaults.headers.common, ajax.defaults.headers.get, {
          'X-COMMON-HEADER': 'commonHeaderValue',
          'X-GET-HEADER': 'getHeaderValue',
          'X-FOO-HEADER': 'fooHeaderValue',
          'X-BAR-HEADER': 'barHeaderValue'
        })
      )
    })
  })

  test('should be used by custom instance if set before instance created', () => {
    ajax.defaults.baseURL = 'http://example.org/'
    const instance = ajax.create()

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('http://example.org/foo')
      delete ajax.defaults.baseURL
    })
  })

  test('should not be used by custom instance if set after instance created', () => {
    const instance = ajax.create()
    ajax.defaults.baseURL = 'http://example.org/'

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
    })
  })
})
