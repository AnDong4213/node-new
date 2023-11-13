import axios from 'axios'

window.requests = []
window.tokenRefreshing = false
const pendingMap = new Map()
const loadingInstance = {
  target: null,
  count: 0
}

export const getUrl = () => {
  const value = import.meta.env.VITE_AXIOS_BASE_URL
  return value == 'getCurrentDomain'
    ? window.location.protocol + '//' + window.location.host
    : value
}

/*
 * 创建Axios
 * 默认开启`reductDataFormat(简洁响应)`,返回类型为`ApiPromise`
 * 关闭`reductDataFormat`,返回类型则为`AxiosPromise`
 */
function createAxios(axiosConfig, options = {}) {
  const Axios = axios.create({
    baseURL: getUrl(),
    timeout: 1000 * 10,
    headers: {
      'Content-Type': 'application/json',
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTUxN2U5ZDYxMzRjZDI1NTY5YzZmODciLCJ1c2VybmFtZSI6IuWuieS4nDEyMyIsImVtYWlsIjoiMTAyMUBxcS5jb20iLCJwaG9uZSI6IjE1ODEwMzkyMzI4IiwiaW1hZ2UiOm51bGwsImNvdmVyIjpudWxsLCJjaGFubmVsZGVzIjpudWxsLCJzdWJzY3JpYmVDb3VudCI6MCwiY3JlYXRlQXQiOiIyMDIzLTExLTEzIDA5OjM0OjU1IiwidXBkYXRlQXQiOiIyMDIzLTExLTEzIDA5OjM0OjU1IiwiX192IjowLCJpYXQiOjE2OTk4Mzk2NTcsImV4cCI6MTY5OTkyNjA1N30.3-u99QU2312M32JFBe3DcTPtcy1ARy9HD_tcVcoekBs'
    }
  })

  options = Object.assign(
    {
      CancelDuplicateRequest: true, // 是否开启取消重复请求, 默认为 true
      loading: false, // 是否开启loading层效果, 默认为false
      reductDataFormat: true, // 是否开启简洁的数据结构响应, 默认为true
      showErrorMessage: true, // 是否开启接口错误信息展示,默认为true
      showCodeMessage: true, // 是否开启code不为1时的信息提示, 默认为true
      showSuccessMessage: false // 是否开启code为1时的信息提示, 默认为false
    },
    options
  )

  // 请求拦截
  Axios.interceptors.request.use(
    (config) => {
      console.log('config--', config)
      removePending(config)
      options.CancelDuplicateRequest && addPending(config)
      // 创建loading实例
      if (options.loading) {
        loadingInstance.count++
      }

      // 自动携带token
      if (config.headers) {
        // let token = getAdminToken('auth')
        // if (token) config.headers.token = token
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截
  Axios.interceptors.response.use(
    (response) => {
      removePending(response.config)
      options.loading && closeLoading(options) // 关闭loading
      if (response.config?.responseType === 'blob') {
        return response.data
      }

      return options.reductDataFormat ? response.data : response
    },
    (error) => {
      error.config && removePending(error.config)
      options.loading && closeLoading(options) // 关闭loading
      options.showErrorMessage && httpErrorStatusHandle(error) // 处理错误状态码
      return Promise.reject(error) // 错误继续返回给到具体页面
    }
  )

  return Axios(axiosConfig)
}

export default createAxios

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error) {
  // 处理被取消的请求
  if (axios.isCancel(error)) return console.error('因为请求重复被自动取消：' + error.message)
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = '接口重定向了！'
        break
      case 400:
        message = '参数不正确！'
        break
      case 401:
        message = '您未登录，或者登录已经超时，请先登录！'
        break
      case 403:
        message = '您没有权限操作！'
        break
      case 404:
        message = '请求地址出错:' + error.response.config.url
        break
      case 408:
        message = '请求超时！'
        break
      case 409:
        message = '系统已存在相同数据！'
        break
      case 500:
        message = '服务器内部错误！'
        break
      case 501:
        message = '服务未实现！'
        break
      case 502:
        message = '网关错误！'
        break
      case 503:
        message = '服务不可用！'
        break
      case 504:
        message = '服务暂时无法访问，请稍后再试！'
        break
      case 505:
        message = 'HTTP版本不受支持！'
        break
      default:
        message = '异常问题，请联系网站管理员！'
        break
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！'
  if (error.message.includes('Network'))
    message = window.navigator.onLine ? '服务端异常！' : '您断网了！'

  console.log('message-', message)
}

/**
 * 关闭Loading层实例
 */
function closeLoading(options) {
  if (options.loading && loadingInstance.count > 0) loadingInstance.count--
  if (loadingInstance.count === 0) {
    loadingInstance.target.close()
    loadingInstance.target = null
  }
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 */
function addPending(config) {
  const pendingKey = getPendingKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel)
      }
    })
}

/**
 * 删除重复的请求
 */
function removePending(config) {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}

/**
 * 生成每个请求的唯一key
 */
function getPendingKey(config) {
  let { url, method, params, data, headers } = config
  if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
  return [
    url,
    method,
    headers?.token ? headers.token : '',
    // headers && headers['ba-user-token'] ? headers['ba-user-token'] : '',
    JSON.stringify(params),
    JSON.stringify(data)
  ].join('&')
}

export function requestPayload(method, data) {
  if (method == 'GET') {
    return {
      params: data
    }
  } else if (method == 'POST') {
    return {
      data: data
    }
  }
}
