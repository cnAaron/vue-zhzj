import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
})

request.interceptors.request.use(
  (config) => {
    return config
  },
  (catchError) => {
    return Promise.reject(catchError)
  }
)

request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response?.data?.data
    } else {
      return Promise.reject(response)
    }
  },
  (catchError) => {
    let message = catchError?.response?.data?.message || '未知错误'
    if (message === '请滑动滑块验证码！') {
      message =
        '请使用智慧职教APP退出登录 然后使用智慧职教APP重新登录后，本站就可以登录了!'
    }
    ElNotification({
      title: 'Error',
      message,
      type: 'error',
      showClose: false,
    })
    return Promise.reject(catchError)
  }
)

export default request
