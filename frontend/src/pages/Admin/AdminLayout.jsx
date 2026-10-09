import React, { useState, createContext, useContext } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './AdminLayout.css'

// ── TOAST CONTEXT — shared across all admin pages ──
export const ToastContext = createContext(null)
export const useToast = () => useContext(ToastContext)

const NAV_ITEMS = [
  { path: '/admin/dashboard',    icon: '📊', label: 'Dashboard'    },
  { path: '/admin/leads',        icon: '📋', label: 'Leads / CRM'  },
  { path: '/admin/projects',     icon: '🖼',  label: 'Portfolio'    },
  { path: '/admin/team',         icon: '👥', label: 'Team'         },
  { path: '/admin/testimonials', icon: '💬', label: 'Testimonials' },
  { path: '/admin/settings',     icon: '⚙',  label: 'Settings'     },
]

const AdminLayout = () => {
  const { admin, logout }   = useAuth()
  const navigate            = useNavigate()
  const location            = useLocation()
  const [collapsed, setCol] = useState(false)
  const [toast, setToast]   = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <ToastContext.Provider value={showToast}>
      <div className={`admin-shell ${collapsed ? 'admin-shell--collapsed' : ''}`}>

        {/* ── SIDEBAR ── */}
        <aside className="admin-sidebar">
          <div className="sidebar-logo">
            <span className="sidebar-logo-icon">AM</span>
            {!collapsed && (
              <div className="sidebar-logo-text">
                <span className="slt-name">AM Interior's</span>
                <span className="slt-role">Admin Panel</span>
              </div>
            )}
            <button className="sidebar-collapse-btn" onClick={() => setCol(!collapsed)}>
              {collapsed ? '▶' : '◀'}
            </button>
          </div>

          <nav className="sidebar-nav">
            {NAV_ITEMS.map(item => (
              <button
                key={item.path}
                className={`sidebar-nav-item ${location.pathname === item.path ? 'sidebar-nav-item--active' : ''}`}
                onClick={() => navigate(item.path)}
                title={collapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && <span className="nav-label">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <div className="sidebar-user">
              <div className="user-avatar">
                {(admin?.name?.[0] || 'A').toUpperCase()}
              </div>
              {!collapsed && (
                <div className="user-info">
                  <span className="user-name">{admin?.name || 'Admin'}</span>
                  <span className="user-email">{admin?.email || ''}</span>
                </div>
              )}
            </div>
            <button className="sidebar-logout-btn" onClick={handleLogout} title="Logout">
              {collapsed ? '↩' : '↩ Logout'}
            </button>
            <button className="sidebar-visit-btn" onClick={() => navigate('/')} title="View Website">
              {collapsed ? '🌐' : '🌐 View Website'}
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="admin-main">
          <Outlet />
        </main>

        {/* ── TOAST ── */}
        {toast && (
          <div className={`admin-toast ${toast.type === 'error' ? 'admin-toast--error' : ''}`}>
            {toast.type === 'success' ? '✓ ' : '✕ '}{toast.msg}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}

export default AdminLayout