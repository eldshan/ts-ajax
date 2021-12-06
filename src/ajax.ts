import { AjaxRequestConfig, AjaxStatic } from './types'
import Ajax from './core/Ajax'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AjaxRequestConfig): AjaxStatic {
  const context = new Ajax(config)
  const instance = Ajax.prototype.request.bind(context)

  extend(instance, context)

  return instance as AjaxStatic
}

const ajax = createInstance(defaults)

ajax.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

ajax.CancelToken = CancelToken
ajax.Cancel = Cancel
ajax.isCancel = isCancel

ajax.all = function all(promises) {
  return Promise.all(promises)
}

ajax.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

ajax.Ajax = Ajax

export default ajax
