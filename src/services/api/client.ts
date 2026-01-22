import axios from 'axios'
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { API_CONFIG } from '@/utils/constants'

const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Use Bearer token authentication (recommended by TMDB)
    if (API_CONFIG.API_TOKEN) {
      config.headers.Authorization = `Bearer ${API_CONFIG.API_TOKEN}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status
      
      switch (status) {
        case 401:
          console.error('Unauthorized: Invalid API key or token')
          break
        case 404:
          console.error('Resource not found')
          break
        case 429:
          console.error('Rate limit exceeded')
          break
        default:
          console.error(`API Error: ${status}`)
      }
    } else if (error.request) {
      console.error('Network error: No response received')
    } else {
      console.error('Request error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export { apiClient }
