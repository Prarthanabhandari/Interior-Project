import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const token     = localStorage.getItem('am_token')
      const adminData = localStorage.getItem('am_admin')
      if (token && adminData) setAdmin(JSON.parse(adminData))
    } catch {}
    setLoading(false)
  }, [])

  const login = (adminData, token) => {
    localStorage.setItem('am_token', token)
    localStorage.setItem('am_admin', JSON.stringify(adminData))
    setAdmin(adminData)
  }

  const logout = () => {
    localStorage.removeItem('am_token')
    localStorage.removeItem('am_admin')
    setAdmin(null)
  }

  const getToken = () => localStorage.getItem('am_token')

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)