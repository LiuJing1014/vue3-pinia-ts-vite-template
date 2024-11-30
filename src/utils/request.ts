import axios, { AxiosRequestConfig } from 'axios'

window.pendingRequest = new Map()

// 为每个请求生成唯一的key
function generateReqKey(config: AxiosRequestConfig) {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// 将请求加入到列表中
function addPendingRequest(config: AxiosRequestConfig) {
  const key = generateReqKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!window.pendingRequest.has(key)) {
        window.pendingRequest.set(key, cancel)
      }
    })

  // console.log('列表：', window.pendingRequest)
}

// 取消重复请求
function removePendingRequest(config: AxiosRequestConfig) {
  const key = generateReqKey(config)
  if (window.pendingRequest.has(key)) {
    const cancel = window.pendingRequest.get(key)
    if (cancel) {
      cancel(key) // key可以理解成是它的取消原因
    }
    window.pendingRequest.delete(key)
  }
}

const service = axios.create({
  baseURL: '/app/',
  withCredentials: true,
  timeout: 10 * 1000,
})

service.interceptors.request.use(
  config => {
    // config.headers['Cookie'] = 'SESSION=ZTQ4MTI5YjctN2JkNi00YzhmLWE2ODYtNjY2MTNiZGI4MWVj'
    removePendingRequest(config)
    addPendingRequest(config)
    // console.log('配置：', config)4

    /**
     * 如果想直接取消当前请求，可以这么写
        config["cancelToken"] = new axios.CancelToken(function (cancel) {
          cancel("取消原因");
        });
     */
    return config
  },
  error => {
    // console.log('请求：', error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    // console.log('返回值：', response)
    removePendingRequest(response.config)
    return response.data
  },
  error => {
    // console.log('响应：', error)
    return Promise.reject(error)
  }
)

declare global {
  interface Window {
    pendingRequest: Map<string, (reason?: string) => void>
  }
}

export default service
