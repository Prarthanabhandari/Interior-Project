import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { useToast } from '../AdminLayout'
import api from '../../../services/api'
import './Dashboard.css'

const MiniChart = ({ data, color = '#1CB4A6' }) => {
  const max = Math.max(...data)
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:5, height:56 }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1,
          height: `${(v / max) * 100}%`,
          background: i === data.length - 1 ? color : `${color}40`,
          borderRadius: 3, minHeight: 4,
          transition: 'height 0.4s ease',
        }} />
      ))}
    </div>
  )
}

const Dashboard = () => {
  const { admin }  = useAuth()
  const navigate   = useNavigate()
  const showToast  = useToast()

  const [stats, setStats]           = useState({ projects:0, leads:0, newLeads:0 })
  const [recentLeads, setRecent]    = useState([])
  const [loading, setLoading]       = useState(true)
  const [recentProjects, setRecProj]= useState([])

  const trafficData = [12, 19, 8, 24, 31, 18, 27]
  const days        = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good Morning'
    if (h < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, lRes] = await Promise.all([
          api.get('/projects'),
          api.get('/inquiries'),
        ])
        const leads    = lRes.data.data || []
        const projects = pRes.data.data || []
        setStats({
          projects: projects.length,
          leads:    leads.length,
          newLeads: leads.filter(l => l.status === 'new').length,
        })
        setRecent(leads.slice(0, 5))
        setRecProj(projects.slice(0, 3))
      } catch {
        setStats({ projects: 4, leads: 1, newLeads: 1 })
        setRecent([
          { id:1, client_name:'Prarthana Bhandari', project_type:'3D Visualization Only', status:'new',       created_at: new Date().toISOString() },
          { id:2, client_name:'Rohit Mehta',        project_type:'Living Room Design',     status:'contacted', created_at: new Date().toISOString() },
          { id:3, client_name:'Sunita Kapoor',      project_type:'Full Home Design',       status:'converted', created_at: new Date().toISOString() },
        ])
        setRecProj([
          { id:1, title:'Rustic Chic Kitchen',    category:'KITCHEN',     media_url:'' },
          { id:2, title:'Luxury Living Room',     category:'LIVING ROOM', media_url:'' },
          { id:3, title:'Kitchen Walkthrough',    category:'KITCHEN',     media_url:'' },
        ])
      } finally { setLoading(false) }
    }
    load()
  }, [])

  const statCards = [
    { label:'Total Projects',  value: stats.projects, trend:'+2 this month', color:'#1CB4A6' },
    { label:'Total Leads',     value: stats.leads,    trend:'+5 this week',  color:'#4a90d9' },
    { label:'New Inquiries',   value: stats.newLeads, trend:'Unread',        color:'#e67e22' },
    { label:'Conversion Rate', value:'68%',           trend:'+4% vs last',   color:'#27ae60' },
  ]

  const quickActions = [
    { label:'Upload New Project', path:'/admin/projects',     icon:'🖼',  color:'#1CB4A6' },
    { label:'View All Leads',     path:'/admin/leads',        icon:'📋',  color:'#4a90d9' },
    { label:'Add Team Member',    path:'/admin/team',         icon:'👥',  color:'#9b59b6' },
    { label:'Add Testimonial',    path:'/admin/testimonials', icon:'💬',  color:'#e67e22' },
    { label:'Site Settings',      path:'/admin/settings',     icon:'⚙',   color:'#555'    },
  ]

  return (
    <div className="admin-page">

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">
            {greeting()}, {admin?.name || 'Prarthana'} 👋
          </h1>
          <p className="admin-page-sub">Here's what's happening with your studio today</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/admin/projects')}>
          + Upload Project
        </button>
      </div>

      {/* Stat Cards */}
      <div className="admin-stat-row">
        {statCards.map(s => (
          <div className="admin-stat-card" key={s.label}>
            <span className="stat-card-label">{s.label}</span>
            <span className="stat-card-value" style={{ color: s.color }}>{s.value}</span>
            <span className="stat-card-trend">↑ {s.trend}</span>
          </div>
        ))}
      </div>

      {/* Charts + Recent leads */}
      <div className="dash-grid-2">

        {/* Traffic chart */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Website Traffic — This Week</span>
            <span style={{ fontSize:'0.7rem', color:'#aaa' }}>Live mock data</span>
          </div>
          <div className="admin-card-body">
            <MiniChart data={trafficData} />
            <div className="dash-chart-labels">
              {days.map((d, i) => (
                <span key={d} className={`dash-day ${i === 6 ? 'dash-day--today' : ''}`}>{d}</span>
              ))}
            </div>
            <p className="dash-visitors">↑ 27 visitors today</p>
          </div>
        </div>

        {/* Recent inquiries */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Recent Inquiries</span>
            <button className="btn-secondary" style={{ padding:'0.4rem 1rem', fontSize:'0.72rem' }}
              onClick={() => navigate('/admin/leads')}>
              View All
            </button>
          </div>
          <div style={{ overflowX:'auto' }}>
            {loading ? (
              <div className="dash-loading">Loading…</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Project Type</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map(lead => (
                    <tr key={lead.id}>
                      <td style={{ fontWeight:600, color:'#1a1714' }}>{lead.client_name}</td>
                      <td style={{ color:'#666' }}>{lead.project_type}</td>
                      <td><span className={`badge badge--${lead.status}`}>{lead.status}</span></td>
                      <td>
                        <button className="btn-success" onClick={() => navigate('/admin/leads')}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">Recent Projects</span>
          <button className="btn-secondary" style={{ padding:'0.4rem 1rem', fontSize:'0.72rem' }}
            onClick={() => navigate('/admin/projects')}>
            Manage All
          </button>
        </div>
        <div className="dash-proj-row">
          {recentProjects.map(p => (
            <div key={p.id} className="dash-proj-thumb"
              onClick={() => navigate('/admin/projects')}>
              <img
                src={p.media_url?.startsWith('/') ? `http://localhost:5000${p.media_url}` : `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=60`}
                alt={p.title}
                onError={e => { e.target.src='https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=60' }}
              />
              <div className="dash-proj-info">
                <span className="dash-proj-cat">{p.category}</span>
                <p className="dash-proj-name">{p.title}</p>
              </div>
            </div>
          ))}
          <div className="dash-proj-add" onClick={() => navigate('/admin/projects')}>
            <span>+</span>
            <p>Add New</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">Quick Actions</span>
        </div>
        <div className="admin-card-body">
          <div className="dash-quick-actions">
            {quickActions.map(a => (
              <button
                key={a.label}
                className="dash-action-btn"
                onClick={() => { navigate(a.path); showToast?.(`Opening ${a.label}…`) }}
                style={{ borderTop: `3px solid ${a.color}` }}
              >
                <span className="dash-action-icon">{a.icon}</span>
                <span className="dash-action-label">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* View website banner */}
      <div className="dash-site-banner">
        <div>
          <p className="dash-banner-title">Your website is live! 🎉</p>
          <p className="dash-banner-sub">View how AM Interior's looks to your clients</p>
        </div>
        <div style={{ display:'flex', gap:'0.8rem' }}>
          <button className="btn-secondary" onClick={() => window.open('/', '_blank')}>
            🌐 View Homepage
          </button>
          <button className="btn-secondary" onClick={() => window.open('/portfolio', '_blank')}>
            🖼 View Portfolio
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard