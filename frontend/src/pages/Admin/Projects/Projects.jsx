import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../AdminLayout'
import api from '../../../services/api'
import './Projects.css'

const CATEGORIES = ['LIVING ROOM','BEDROOM','KITCHEN','OFFICE','BATHROOM','TOILET','DESIGN']

const ProjectsAdmin = () => {
  const navigate   = useNavigate()
  const showToast  = useToast()
  const fileRef    = useRef(null)

  const [projects, setProjects]   = useState([])
  const [showForm, setShowForm]   = useState(false)
  const [editItem, setEditItem]   = useState(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver]   = useState(false)
  const [filterCat, setFilterCat] = useState('ALL')

  const empty = { title:'', category:'KITCHEN', description:'', challenge:'', solution:'', is_featured:false, file:null, preview:null }
  const [form, setForm] = useState(empty)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const res = await api.get('/projects')
      setProjects(res.data.data || [])
    } catch {
      setProjects([
        { id:1, title:'Rustic Chic Kitchen',  category:'KITCHEN',     media_url:'', media_type:'image', is_featured:false },
        { id:2, title:'Luxury Living Room',   category:'LIVING ROOM', media_url:'', media_type:'image', is_featured:true  },
        { id:3, title:'Executive Office',     category:'OFFICE',      media_url:'', media_type:'image', is_featured:false },
        { id:4, title:'Kitchen Walkthrough',  category:'KITCHEN',     media_url:'', media_type:'video', is_featured:false },
      ])
    }
  }

  const handleFile = (file) => {
    if (!file) return
    setForm(f => ({ ...f, file, preview: URL.createObjectURL(file) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!editItem && !form.file) { showToast('Please select a file to upload', 'error'); return }
    setUploading(true)
    try {
      if (editItem) {
        await api.put(`/projects/${editItem.id}`, {
          title: form.title, category: form.category,
          description: form.description, is_featured: form.is_featured,
        })
        setProjects(prev => prev.map(p => p.id === editItem.id ? { ...p, ...form } : p))
        showToast('Project updated successfully!')
      } else {
        const fd = new FormData()
        fd.append('title',       form.title)
        fd.append('category',    form.category)
        fd.append('description', form.description)
        fd.append('challenge',   form.challenge)
        fd.append('solution',    form.solution)
        fd.append('is_featured', form.is_featured)
        fd.append('file', form.file)
        const res = await api.post('/projects', fd, { headers:{ 'Content-Type':'multipart/form-data' }})
        setProjects(prev => [res.data.data, ...prev])
        showToast('Project uploaded! Now visible in Portfolio ✓')
      }
      setForm(empty); setShowForm(false); setEditItem(null)
    } catch (err) {
      showToast(err.response?.data?.message || 'Upload failed. Check backend connection.', 'error')
    } finally { setUploading(false) }
  }

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project? It will be removed from the portfolio.')) return
    try { await api.delete(`/projects/${id}`) } catch {}
    setProjects(prev => prev.filter(p => p.id !== id))
    showToast('Project deleted')
  }

  const toggleFeatured = async (p) => {
    try { await api.put(`/projects/${p.id}`, { is_featured: !p.is_featured }) } catch {}
    setProjects(prev => prev.map(x => x.id === p.id ? { ...x, is_featured: !x.is_featured } : x))
    showToast(p.is_featured ? 'Removed from featured' : 'Marked as featured ⭐')
  }

  const startEdit = (p) => {
    setEditItem(p)
    setForm({ title:p.title, category:p.category, description:p.description||'', challenge:'', solution:'', is_featured:p.is_featured, file:null, preview:null })
    setShowForm(true)
    window.scrollTo({ top:0, behavior:'smooth' })
  }

  const filtered = filterCat === 'ALL' ? projects : projects.filter(p => p.category === filterCat)
  const imgSrc = (p) => p.media_url?.startsWith('/') ? `http://localhost:5000${p.media_url}` : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=60'

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Portfolio Manager</h1>
          <p className="admin-page-sub">Upload and manage all project photos & videos</p>
        </div>
        <div style={{ display:'flex', gap:'0.8rem' }}>
          <button className="btn-secondary" onClick={() => window.open('/portfolio', '_blank')}>
            🔗 View Portfolio
          </button>
          <button className="btn-primary"
            onClick={() => { setShowForm(!showForm); setEditItem(null); setForm(empty) }}>
            {showForm ? '✕ Cancel' : '+ Add Project'}
          </button>
        </div>
      </div>

      {/* Upload Form */}
      {showForm && (
        <div className="admin-card" style={{ marginBottom:'2rem' }}>
          <div className="admin-card-header">
            <span className="admin-card-title">{editItem ? '✏ Edit Project' : '📤 Upload New Project'}</span>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleSubmit}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.2rem' }}>
                <div className="admin-form-group">
                  <label>Project Title *</label>
                  <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Modern White Kitchen" required />
                </div>
                <div className="admin-form-group">
                  <label>Category *</label>
                  <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                    {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Brief project description…" rows={2} />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.2rem' }}>
                <div className="admin-form-group">
                  <label>The Challenge</label>
                  <textarea value={form.challenge} onChange={e=>setForm({...form,challenge:e.target.value})} placeholder="What was the main problem?" rows={2} />
                </div>
                <div className="admin-form-group">
                  <label>The Solution</label>
                  <textarea value={form.solution} onChange={e=>setForm({...form,solution:e.target.value})} placeholder="How did you solve it?" rows={2} />
                </div>
              </div>

              {/* Drop zone */}
              {!editItem && (
                <div className="admin-form-group">
                  <label>Photo / Video File *</label>
                  <div
                    className={`drop-zone ${dragOver ? 'drop-zone--active' : ''}`}
                    onClick={() => fileRef.current.click()}
                    onDragOver={e=>{e.preventDefault();setDragOver(true)}}
                    onDragLeave={()=>setDragOver(false)}
                    onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0])}}
                  >
                    {form.preview ? (
                      <img src={form.preview} alt="preview" style={{ maxHeight:160, maxWidth:'100%', borderRadius:6 }} />
                    ) : (
                      <>
                        <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>📁</div>
                        <p style={{ fontSize:'0.85rem', color:'#666', fontWeight:600 }}>Drag & drop or click to upload</p>
                        <p style={{ fontSize:'0.72rem', color:'#bbb', marginTop:'0.3rem' }}>JPG, PNG, WEBP, MP4 — Max 50MB</p>
                      </>
                    )}
                    <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display:'none' }}
                      onChange={e=>handleFile(e.target.files[0])} />
                  </div>
                  {form.file && <p style={{ fontSize:'0.72rem', color:'#1CB4A6', marginTop:'0.4rem' }}>✓ Selected: {form.file.name}</p>}
                </div>
              )}

              <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.5rem' }}>
                <input type="checkbox" id="feat" checked={form.is_featured}
                  onChange={e=>setForm({...form,is_featured:e.target.checked})}
                  style={{ width:16, height:16, accentColor:'#1CB4A6' }} />
                <label htmlFor="feat" style={{ fontSize:'0.82rem', color:'#555', cursor:'pointer' }}>
                  ⭐ Mark as Featured (appears on homepage)
                </label>
              </div>

              <div style={{ display:'flex', gap:'0.8rem' }}>
                <button type="submit" className="btn-primary" disabled={uploading}>
                  {uploading ? '⏳ Uploading…' : editItem ? '✓ Save Changes' : '📤 Upload Project'}
                </button>
                <button type="button" className="btn-secondary"
                  onClick={()=>{setShowForm(false);setEditItem(null)}}>Cancel</button>
                {!editItem && (
                  <button type="button" className="btn-secondary"
                    onClick={()=>window.open('/portfolio','_blank')}>
                    🔗 Preview Portfolio
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div className="proj-filter-bar">
        {['ALL',...CATEGORIES].map(c=>(
          <button key={c}
            className={`proj-filter-btn ${filterCat===c?'proj-filter-btn--active':''}`}
            onClick={()=>setFilterCat(c)}>
            {c}
            <span className="proj-filter-count">
              {c==='ALL' ? projects.length : projects.filter(p=>p.category===c).length}
            </span>
          </button>
        ))}
      </div>

      {/* Projects grid */}
      {filtered.length === 0 ? (
        <div className="proj-empty">
          <p style={{ fontSize:'2rem' }}>📂</p>
          <p>No projects in this category yet.</p>
          <button className="btn-primary" style={{ marginTop:'1rem' }} onClick={()=>setShowForm(true)}>Upload First Project</button>
        </div>
      ) : (
        <div className="proj-grid">
          {filtered.map(p => (
            <div key={p.id} className="admin-card proj-card">
              <div className="proj-card-img">
                <img src={imgSrc(p)} alt={p.title}
                  onError={e=>{e.target.src='https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=60'}} />
                {p.is_featured && <span className="proj-feat-badge">⭐ FEATURED</span>}
                <span className="proj-type-badge">{p.media_type?.toUpperCase() || 'IMAGE'}</span>
              </div>
              <div className="proj-card-body">
                <p className="proj-cat">{p.category}</p>
                <p className="proj-title">{p.title}</p>
                <div className="proj-card-actions">
                  <button className="btn-secondary" style={{ flex:1, fontSize:'0.7rem' }} onClick={()=>startEdit(p)}>✏ Edit</button>
                  <button className="btn-secondary" style={{ fontSize:'0.7rem' }} title="Toggle featured" onClick={()=>toggleFeatured(p)}>
                    {p.is_featured ? '⭐' : '☆'}
                  </button>
                  <button className="btn-danger" onClick={()=>deleteProject(p.id)}>🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom banner */}
      <div style={{ marginTop:'2rem', padding:'1.2rem 1.5rem', background:'#e8f8f7', borderRadius:8, border:'1px solid rgba(28,180,166,0.2)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <p style={{ fontSize:'0.85rem', fontWeight:700, color:'#1CB4A6' }}>Projects uploaded here appear live on your portfolio page</p>
          <p style={{ fontSize:'0.75rem', color:'#666', marginTop:'0.2rem' }}>Make sure backend is running on port 5000 for uploads to save permanently</p>
        </div>
        <button className="btn-primary" onClick={()=>window.open('/portfolio','_blank')}>
          🔗 Open Portfolio Page
        </button>
      </div>
    </div>
  )
}

export default ProjectsAdmin