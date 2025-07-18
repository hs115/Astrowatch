import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiClient } from '../lib/api'

export interface Profile {
  id: string
  email: string
  full_name: string
  birth_date: string
  birth_time: string
  birth_place: string
  zodiac_sign: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signUp: (email: string, password: string, fullName?: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session in localStorage
    const token = localStorage.getItem('authToken')
    if (token) {
      apiClient.setToken(token)
      checkSession()
    } else {
      setLoading(false)
    }
  }, [])

  const checkSession = async () => {
    try {
      const { data, error } = await apiClient.getSession()
      if (error) {
        localStorage.removeItem('authToken')
        apiClient.setToken(null)
        setUser(null)
        setProfile(null)
      } else if (data && typeof data === 'object' && 'session' in data) {
        const sessionData = data as any
        if (sessionData.session?.user) {
          setUser(sessionData.session.user)
          await fetchProfile()
        }
      }
    } catch (error) {
      console.error('Session check error:', error)
      localStorage.removeItem('authToken')
      apiClient.setToken(null)
      setUser(null)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchProfile = async () => {
    try {
      const { data, error } = await apiClient.getProfile()
      if (error) {
        console.error('Error fetching profile:', error)
      } else if (data && typeof data === 'object' && 'profile' in data) {
        const profileData = data as any
        setProfile(profileData.profile)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error } = await apiClient.signUp(email, password, fullName)
      if (error) {
        return { error }
      }
      
      if (data && typeof data === 'object' && 'user' in data) {
        const userData = data as any
        if (userData.user) {
          setUser(userData.user)
        }
        // For signup, we might need to handle email confirmation
        return { data, error: null }
      }
      
      return { data, error: null }
    } catch (error) {
      return { error: 'Signup failed' }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await apiClient.signIn(email, password)
      if (error) {
        return { error }
      }
      
      if (data && typeof data === 'object' && 'session' in data) {
        const sessionData = data as any
        if (sessionData.session?.access_token) {
          localStorage.setItem('authToken', sessionData.session.access_token)
          apiClient.setToken(sessionData.session.access_token)
          if (sessionData.user) {
            setUser(sessionData.user)
          }
          await fetchProfile()
          return { data, error: null }
        }
      }
      
      return { data, error: null }
    } catch (error) {
      return { error: 'Signin failed' }
    }
  }

  const signOut = async () => {
    try {
      await apiClient.signOut()
    } catch (error) {
      console.error('Signout error:', error)
    } finally {
      localStorage.removeItem('authToken')
      apiClient.setToken(null)
      setUser(null)
      setProfile(null)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user logged in' }

    try {
      const { data, error } = await apiClient.updateProfile(updates)
      if (error) {
        return { error }
      }
      
      if (data && typeof data === 'object' && 'profile' in data) {
        const profileData = data as any
        setProfile(profileData.profile)
      }
      
      return { data, error: null }
    } catch (error) {
      return { error: 'Profile update failed' }
    }
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}