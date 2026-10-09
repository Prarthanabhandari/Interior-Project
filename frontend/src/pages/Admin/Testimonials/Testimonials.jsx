import React, { useState } from 'react'
import { useToast } from '../AdminLayout'
import './Testimonials.css'

const DEFAULTS = [
  { id:1, client_name:'Priya Sharma',  location:'Karvenagar, Pune', rating:5, project:'Full Home Design', text:"AM Interior's transformed our 3BHK into a dream home. Anita and Monika's attention to detail is exceptional!", active:true },
  { id:2, client_name:'Rohit Mehta',   location:'Baner, Pune',      rating:5, project:'Modular Kitchen',  text:'The 3D Max views they provided before construction saved us from so many mistakes. Truly professional.', active:true },
  { id:3, client_name:'Deepa Nair',    location:'Kothrud, Pune',    rating:5, project:'Office Interior',  text:'From space planning to final reveal — a seamless and delightful experience. Highly recommended!', active:true },
]

const Testimonials = () => {
  const showToast = useToast()
  const [items, setItems] = useState(DEFAULTS)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)

  const empty = { client_name:'', location:'', rating:5, project:'', text:'', active:true }
  const [form, setForm] = useState(empty)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.text.trim() || !form.client_name.trim()) return
    if (editItem) {
      setItems(prev => prev.map(t => t.id === editItem.id ? { ...editItem, ...form } : t))
      showToast('Testimonial updated!')
    } else {
      setItems(prev => [...prev, { ...form, id: Date.now() }])
      showToast('Testimonial added!')
    }
    setForm(empty); setShowForm(false); setEditItem(null)
  }

  const startEdit = (t) => {
    setEditItem(t)
    setForm({ client_name:t.client_name, location:t.location, rating:t.rating, project:t.project, text:t.text, active:t.active })
    setShowForm(true)
    window.scrollTo({ top:0, behavior:'smooth' })
  }

  const deleteItem = (id) => {
    if (!window.confirm('Delete this testimonial?')) return
    setItems(prev => prev.filter(t => t.id !== id))
    showToast('Testimonial deleted')
  }

  const toggleActive = (id) => {
    setItems(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t))
  }

  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n)

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Testimonials Manager</h1>
          <p className="admin-page-sub">Manage client reviews shown on your homepage</p>
        </div>
        <button className="btn-primary" onClick={() => { setShowForm(!showForm); setEditItem(null); setForm(empty) }}>
          {showForm ? '✕ Cancel' : '+ Add Review'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="admin-card" style={{ marginBottom:'2rem' }}>
          <div className="admin-card-header">
            <span className="admin-card-title">{editItem ? 'Edit Testimonial' : 'Add New Testimonial'}</span>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleSubmit}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1rem' }}>
                <div className="admin-form-group">
                  <label>Client Name *</label>
                  <input value={form.client_name} onChange={e=>setForm({...form,client_name:e.target.value})} placeholder="Priya Sharma" required />
                </div>
                <div className="admin-form-group">
                  <label>Location</label>
                  <input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="Pune, Maharashtra" />
                </div>
                <div className="admin-form-group">
                  <label>Project Type</label>
                  <input value={form.project} onChange={e=>setForm({...form,project:e.target.value})} placeholder="Full Home Design" />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Star Rating</label>
                <div className="tm-star-picker">
                  {[1,2,3,4,5].map(n => (
                    <button type="button" key={n}
                      className={`tm-star-btn ${form.rating >= n ? 'active' : ''}`}
                      onClick={() => setForm({...form, rating:n})}
                    >★</button>
                  ))}
                  <span style={{ fontSize:'0.78rem', color:'#888', marginLeft:'0.5rem' }}>{form.rating}/5 stars</span>
                </div>
              </div>
              <div className="admin-form-group">
                <label>Review Text *</label>
                <textarea value={form.text} onChange={e=>setForm({...form,text:e.target.value})}
                  placeholder="What did the client say about your work?" rows={4} required />
                <small style={{ color:'#aaa', fontSize:'0.7rem' }}>{form.text.length} characters</small>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.2rem' }}>
                <input type="checkbox" id="tm-active" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})} style={{ width:16, height:16, accentColor:'#1CB4A6' }} />
                <label htmlFor="tm-active" style={{ fontSize:'0.82rem', color:'#555', cursor:'pointer' }}>Show on public homepage</label>
              </div>
              <div style={{ display:'flex', gap:'0.8rem' }}>
                <button type="submit" className="btn-primary">{editItem ? 'Save Changes' : 'Add Testimonial'}</button>
                <button type="button" className="btn-secondary" onClick={() => { setShowForm(false); setEditItem(null) }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonials grid */}
      <div className="tm-grid">
        {items.map(t => (
          <div key={t.id} className={`tm-card ${!t.active ? 'tm-card--inactive' : ''}`}>
            <div className="tm-card-top">
              <div className="tm-stars">{stars(t.rating)}</div>
              <span className="tm-active-badge">{t.active ? '● Live' : '○ Hidden'}</span>
            </div>
            <p className="tm-text">"{t.text}"</p>
            <div className="tm-author">
              <div className="tm-author-avatar">{t.client_name[0]}</div>
              <div>
                <p className="tm-author-name">{t.client_name}</p>
                <p className="tm-author-meta">{t.location} · {t.project}</p>
              </div>
            </div>
            <div className="tm-actions">
              <button className="btn-secondary" style={{ flex:1, fontSize:'0.7rem' }} onClick={() => startEdit(t)}>✏ Edit</button>
              <button className="btn-secondary" style={{ fontSize:'0.7rem' }} onClick={() => toggleActive(t.id)} title="Toggle visibility">
                {t.active ? '👁' : '🙈'}
              </button>
              <button className="btn-danger" onClick={() => deleteItem(t.id)}>🗑</button>
            </div>
          </div>
        ))}
        {/* Add new card */}
        <div className="tm-add-card" onClick={() => { setShowForm(true); setEditItem(null); setForm(empty); window.scrollTo({top:0,behavior:'smooth'}) }}>
          <span>+</span>
          <p>Add Review</p>
        </div>
      </div>
    </div>
  )
}

export default Testimonials