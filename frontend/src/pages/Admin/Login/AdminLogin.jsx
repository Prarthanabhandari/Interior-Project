import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import api from '../../../services/api'
import './AdminLogin.css'

const AdminLogin = () => {
  const [form, setForm]     = useState({ email:'', password:'' })
  const [error, setError]   = useState('')
  const [loading, setLoad]  = useState(false)
  const [showPw, setShowPw] = useState(false)
  const { login }           = useAuth()
  const navigate            = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoad(true)
    try {
      const res = await api.post('/auth/login', form)
      if (res.data.token) {
        login(res.data.admin, res.data.token)
        navigate('/admin/dashboard', { replace: true })
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally { setLoad(false) }
  }

  return (
    <div className="al-page">
      <div className="al-card">
        <div className="al-logo-wrap">
          <svg width="52" height="46" viewBox="0 0 56 50" fill="none">
            <path d="M4 46L20 6L28 28L36 6L52 46" stroke="#1CB4A6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 28H42" stroke="#1CB4A6" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <div>
            <span className="al-brand">AM Interior's</span>
            <span className="al-sub">Admin Portal</span>
          </div>
        </div>
        <div className="al-divider" />
        <h1 className="al-title">Welcome Back</h1>
        <p className="al-desc">Sign in to manage your studio</p>

        {error && <div className="al-error">{error}</div>}

        <form onSubmit={handleSubmit} className="al-form">
          <div className="al-field">
            <label>Email Address</label>
            <input type="email" value={form.email}
              onChange={e => setForm({...form, email:e.target.value})}
              placeholder="your@email.com" required />
          </div>
          <div className="al-field">
            <label>Password</label>
            <div className="al-pw-wrap">
              <input type={showPw ? 'text' : 'password'} value={form.password}
                onChange={e => setForm({...form, password:e.target.value})}
                placeholder="••••••••" required />
              <button type="button" className="al-pw-eye" onClick={() => setShowPw(v=>!v)}>
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
          </div>
          <button type="submit" className="al-btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>
        <p className="al-back" onClick={() => navigate('/')}>← Back to Website</p>
      </div>
    </div>
  )
}

export default AdminLogin