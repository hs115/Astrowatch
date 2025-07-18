const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

interface ApiResponse<T> {
  data?: T
  error?: string
}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  setToken(token: string | null) {
    this.token = token
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || 'Request failed' }
      }

      return { data }
    } catch (error) {
      console.error('API request failed:', error)
      return { error: 'Network error' }
    }
  }

  // Auth endpoints
  async signUp(email: string, password: string, fullName?: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name: fullName }),
    })
  }

  async signIn(email: string, password: string) {
    return this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async getSession() {
    return this.request('/auth/session')
  }

  async signOut() {
    return this.request('/auth/signout', {
      method: 'POST',
    })
  }

  // Profile endpoints
  async getProfile() {
    return this.request('/profiles')
  }

  async updateProfile(updates: any) {
    return this.request('/profiles', {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  // Horoscope endpoints
  async getHoroscope(zodiacSign: string, type: 'daily' | 'weekly' | 'monthly', date?: string) {
    const dateParam = date ? `?date=${date}` : ''
    return this.request(`/horoscopes/${zodiacSign}/${type}${dateParam}`)
  }

  async getHoroscopes(zodiacSign: string, type?: string, limit?: number) {
    const params = new URLSearchParams()
    if (type) params.append('type', type)
    if (limit) params.append('limit', limit.toString())
    
    const queryString = params.toString()
    const url = `/horoscopes/${zodiacSign}${queryString ? `?${queryString}` : ''}`
    
    return this.request(url)
  }
}

export const apiClient = new ApiClient(API_BASE_URL) 