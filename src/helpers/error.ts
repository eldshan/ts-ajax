import { AjaxRequestConfig, AjaxResponse } from '../types'

export class AjaxError extends Error {
  isAjaxError: boolean
  config: AjaxRequestConfig
  code?: string | null
  request?: any
  response?: AjaxResponse

  /* istanbul ignore next */
  constructor(
    message: string,
    config: AjaxRequestConfig,
    code?: string | null,
    request?: any,
    response?: AjaxResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAjaxError = true

    Object.setPrototypeOf(this, AjaxError.prototype)
  }
}

export function createError(
  message: string,
  config: AjaxRequestConfig,
  code?: string | null,
  request?: any,
  response?: AjaxResponse
): AjaxError {
  const error = new AjaxError(message, config, code, request, response)

  return error
}
