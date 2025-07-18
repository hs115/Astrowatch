import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider, useAuth } from './context/AuthContext'
import AuthForm from './components/auth/AuthForm'
import Dashboard from './components/dashboard/Dashboard'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your cosmic journey...</div>
      </div>
    )
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <Navigate to="/dashboard" replace /> : <AuthForm />} 
      />
      <Route 
        path="/dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/" replace />} 
      />
    </Routes>
  )
}

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '386932037035801146160173-102p2ns1n3g616hcbjoaa5ee6qlki7ip.apps.googleusercontent.com'
  
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App