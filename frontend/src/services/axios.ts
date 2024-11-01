import axios from 'axios'

// create the instance config
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
})

// export the instance to be used in other files
export default instance

// add a request interceptor to add the token into every request before sending
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      // if there is a token saved it will attach it to the request
      config.headers.Authorization = `Bearer ${token}`
    }
    // return the modified config in case there was a token
    // if not it will return the original config
    return config
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: any) => {
    return Promise.reject(error)
  }
)
