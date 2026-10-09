import React, { useState, useEffect } from 'react'
import { useToast } from '../AdminLayout'
import api from '../../../services/api'
import './Leads.css'

const STATUSES = ['all','new','contacted','converted','closed']

const Leads = () => {
  const showToast = useToast()
  const [leads, setLeads]     = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [status, setStatus]   = useState('all')
  const [selected, setSelected] = useState(null)  // detail modal

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/inquiries')
        setLeads(res.data.data || [])
      } catch {
        setLeads([
          { id:1, client_name:'Prarthana Bhandari', email:'prarthanabhandari2003@gmail.com', phone:'+91 8308 882977', project_type:'3D Visualization Only', budget:'₹2–5 Lakhs', message:'I want 3D views of my living room.', status:'new',       created_at: new Date().toISOString() },
          { id:2, client_name:'Rohit Mehta',        email:'rohit@email.com',  phone:'+91 98765 43210', project_type:'Living Room Design', budget:'₹5–10 Lakhs', message:'Want a modern scandinavian look.', status:'contacted', created_at: new Date(Date.now()-86400000).toISOString() },
          { id:3, client_name:'Sunita Kapoor',      email:'sunita@email.com', phone:'+91 87654 32109', project_type:'Full Home Design',   budget:'Above ₹20 Lakhs', message:'Full 3BHK renovation in Pune.', status:'converted', created_at: new Date(Date.now()-172800000).toISOString() },
          { id:4, client_name:'Arjun Patel',        email:'arjun@email.com',  phone:'+91 76543 21098', project_type:'Bedroom Design',     budget:'₹2–5 Lakhs', message:'Need wardrobe and headboard design.', status:'new',       created_at: new Date(Date.now()-259200000).toISOString() },
          { id:5, client_name:'Deepa Nair',         email:'deepa@email.com',  phone:'+91 65432 10987', project_type:'Modular Kitchen',    budget:'₹5–10 Lakhs', message:'Want a modular kitchen with island.', status:'closed',    created_at: new Date(Date.now()-345600000).toISOString() },
        ])
      } finally { setLoading(false) }
    }
    load()
  }, [])

  const filtered = leads.filter(l => {
    const matchStatus = status === 'all' || l.status === status
    const q = search.toLowerCase()
    const matchSearch = !q || l.client_name?.toLowerCase().includes(q) || l.email?.toLowerCase().includes(q) || l.project_type?.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/inquiries/${id}`, { status: newStatus })
    } catch {}
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l))
    showToast(`Status updated to "${newStatus}"`)
  }

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return
    try { await api.delete(`/inquiries/${id}`) } catch {}
    setLeads(prev => prev.filter(l => l.id !== id))
    showToast('Inquiry deleted')
    if (selected?.id === id) setSelected(null)
  }

  const whatsapp = (phone, name) => {
    const clean = phone?.replace(/\D/g,'') || ''
    const msg = encodeURIComponent(`Hi ${name}, this is AM Interior's team. Thank you for reaching out! We'd love to discuss your project.`)
    window.open(`https://wa.me/${clean}?text=${msg}`, '_blank')
  }

  const fmt = (iso) => new Date(iso).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })

  const counts = { all: leads.length, new: leads.filter(l=>l.status==='new').length, contacted: leads.filter(l=>l.status==='contacted').length, converted: leads.filter(l=>l.status==='converted').length, closed: leads.filter(l=>l.status==='closed').length }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Leads / CRM</h1>
          <p className="admin-page-sub">Manage all client inquiries and follow-ups</p>
        </div>
        <div style={{ display:'flex', gap:'0.8rem', alignItems:'center' }}>
          <span className="leads-total">{leads.length} total inquiries</span>
        </div>
      </div>

      {/* Status tabs */}
      <div className="leads-tabs">
        {STATUSES.map(s => (
          <button
            key={s}
            className={`leads-tab ${status === s ? 'leads-tab--active' : ''}`}
            onClick={() => setStatus(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
            <span className="leads-tab-count">{counts[s]}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="leads-search-bar">
        <span>🔍</span>
        <input
          type="text" placeholder="Search by name, email, or project type…"
          value={search} onChange={e => setSearch(e.target.value)}
        />
        {search && <button onClick={() => setSearch('')} className="leads-clear">✕</button>}
      </div>

      {/* Table */}
      <div className="admin-card">
        <div style={{ overflowX:'auto' }}>
          {loading ? (
            <div style={{ padding:'3rem', textAlign:'center', color:'#aaa' }}>Loading leads…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding:'3rem', textAlign:'center', color:'#aaa' }}>No inquiries found.</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Project Type</th>
                  <th>Budget</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(lead => (
                  <tr key={lead.id} style={{ cursor:'pointer' }} onClick={() => setSelected(lead)}>
                    <td>
                      <div style={{ fontWeight:600, color:'#1a1714' }}>{lead.client_name}</div>
                      <div style={{ fontSize:'0.72rem', color:'#888' }}>{lead.email}</div>
                    </td>
                    <td>{lead.project_type}</td>
                    <td style={{ fontSize:'0.8rem', color:'#666' }}>{lead.budget || '—'}</td>
                    <td style={{ fontSize:'0.78rem', color:'#888' }}>{fmt(lead.created_at)}</td>
                    <td onClick={e => e.stopPropagation()}>
                      <select
                        className="leads-status-select"
                        value={lead.status}
                        onChange={e => updateStatus(lead.id, e.target.value)}
                        style={{ color: lead.status==='converted'?'#155724' : lead.status==='new'?'#1565c0' : '#856404' }}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      <div style={{ display:'flex', gap:'0.4rem' }}>
                        <button className="btn-success" title="WhatsApp"
                          onClick={() => whatsapp(lead.phone, lead.client_name)}>
                          💬
                        </button>
                        <button className="btn-secondary" style={{ padding:'0.4rem 0.7rem', fontSize:'0.7rem' }}
                          onClick={() => setSelected(lead)}>
                          View
                        </button>
                        <button className="btn-danger" title="Delete"
                          onClick={() => deleteLead(lead.id)}>
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="leads-overlay" onClick={() => setSelected(null)}>
          <div className="leads-modal" onClick={e => e.stopPropagation()}>
            <div className="leads-modal-header">
              <h3>{selected.client_name}</h3>
              <button onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="leads-modal-body">
              {[
                ['Email',        selected.email],
                ['Phone',        selected.phone],
                ['Project Type', selected.project_type],
                ['Budget',       selected.budget],
                ['Date',         fmt(selected.created_at)],
                ['Status',       selected.status],
              ].map(([label, val]) => (
                <div key={label} className="leads-detail-row">
                  <span className="leads-detail-label">{label}</span>
                  <span className="leads-detail-value">{val || '—'}</span>
                </div>
              ))}
              {selected.message && (
                <div className="leads-detail-msg">
                  <span className="leads-detail-label">Message</span>
                  <p>{selected.message}</p>
                </div>
              )}
            </div>
            <div className="leads-modal-footer">
              <button className="btn-primary"
                onClick={() => whatsapp(selected.phone, selected.client_name)}>
                💬 WhatsApp
              </button>
              <select
                className="leads-status-select"
                value={selected.status}
                onChange={e => { updateStatus(selected.id, e.target.value); setSelected({...selected, status: e.target.value}) }}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
              <button className="btn-danger" onClick={() => deleteLead(selected.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Leads