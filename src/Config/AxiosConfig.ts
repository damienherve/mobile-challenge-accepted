import axios, { AxiosError } from 'axios'

const BASE_URL = 'http://10.0.2.2:3000'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000
})

axiosInstance.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    // We can create a well designed response interceptor
    // to manage global errors in the same place
    // Here, we just return a generic message for every kind of error
    // and only intercepts timeout errors

    const genericErrorMessage = 'Something went wrong, please retry'
    var errorMessage = null

    if (error && error.isAxiosError) {
      const axiosError = error as AxiosError
      switch (axiosError.code) {
        // Client Timeout
        case 'ECONNABORTED':
          errorMessage = 'Timeout Error, please retry'
      }
    }
    const bla = errorMessage || genericErrorMessage
    return Promise.reject(bla)
  }
)

export default axiosInstance
