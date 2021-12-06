export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AjaxRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AjaxTransformer | AjaxTransformer[]
  transformResponse?: AjaxTransformer | AjaxTransformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
  auth?: AjaxBasicCredentials
  validateStatus?: (status: number) => boolean
  paramsSerializer?: (params: any) => string
  baseURL?: string

  [propName: string]: any
}

export interface AjaxResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AjaxRequestConfig
  request: any
}

export interface AjaxPromise<T = any> extends Promise<AjaxResponse<T>> {}

export interface AjaxError extends Error {
  config: AjaxRequestConfig
  code?: string
  request?: any
  response?: AjaxResponse
  isAjaxError: boolean
}

export interface Ajax {
  defaults: AjaxRequestConfig
  interceptors: {
    request: AjaxInterceptorManager<AjaxRequestConfig>
    response: AjaxInterceptorManager<AjaxResponse>
  }

  request<T = any>(config: AjaxRequestConfig): AjaxPromise<T>

  get<T = any>(url: string, config?: AjaxRequestConfig): AjaxPromise<T>

  delete<T = any>(url: string, config?: AjaxRequestConfig): AjaxPromise<T>

  head<T = any>(url: string, config?: AjaxRequestConfig): AjaxPromise<T>

  options<T = any>(url: string, config?: AjaxRequestConfig): AjaxPromise<T>

  post<T = any>(url: string, data?: any, config?: AjaxRequestConfig): AjaxPromise<T>

  put<T = any>(url: string, data?: any, config?: AjaxRequestConfig): AjaxPromise<T>

  patch<T = any>(url: string, data?: any, config?: AjaxRequestConfig): AjaxPromise<T>

  getUri(config?: AjaxRequestConfig): string
}

export interface AjaxInstance extends Ajax {
  <T = any>(config: AjaxRequestConfig): AjaxPromise<T>

  <T = any>(url: string, config?: AjaxRequestConfig): AjaxPromise<T>
}

export interface AjaxClassStatic {
  new (config: AjaxRequestConfig): Ajax
}

export interface AjaxStatic extends AjaxInstance {
  create(config?: AjaxRequestConfig): AjaxInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean

  all<T>(promises: Array<T | Promise<T>>): Promise<T[]>

  spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R

  Ajax: AjaxClassStatic
}

export interface AjaxInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AjaxTransformer {
  (data: any, headers?: any): any
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}

export interface AjaxBasicCredentials {
  username: string
  password: string
}
