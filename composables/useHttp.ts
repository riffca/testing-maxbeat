import type { NitroFetchRequest } from 'nitropack'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface HttpRequestOptions<T = unknown> {
  method?: HttpMethod
  body?: T
  headers?: Record<string, string>
  params?: Record<string, string>
}

export const useHttp = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || ''

  const request = async <T = any, R = any>(
    endpoint: NitroFetchRequest,
    options: HttpRequestOptions<R> = { method: 'GET' }
  ): Promise<{ data: T | null; error: any | null }> => {
    try {
      const response = await $fetch<T>(endpoint, {
        baseURL,
        method: options.method,
        body: options.body || undefined,
        query: options.params || undefined,
        headers: options.headers
      })

      return { data: response, error: null }
    } catch (error: any) {
      const errorData = error.data || error.message || 'Unknown error occurred'
      console.error('API Error:', errorData)
      
      return { 
        data: null, 
        error: {
          status: error.statusCode || 500,
          message: errorData,
          raw: error
        } 
      }
    }
  }

  return {
    get: <T = any>(endpoint: string, params?: Record<string, string>) => 
      request<T>(endpoint, { method: 'GET', params }),
      
    post: <T = any, R = any>(endpoint: string, body: R) => 
      request<T, R>(endpoint, { method: 'POST', body }),
      
    put: <T = any, R = any>(endpoint: string, body: R) => 
      request<T, R>(endpoint, { method: 'PUT', body }),
      
    patch: <T = any, R = any>(endpoint: string, body: R) => 
      request<T, R>(endpoint, { method: 'PATCH', body }),
      
    delete: <T = any>(endpoint: string) => 
      request<T>(endpoint, { method: 'DELETE' })
  }
}