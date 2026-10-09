import React, { useState } from 'react'
import { useToast } from '../AdminLayout'
import './Settings.css'

const Settings = () => {
  const showToast = useToast()

  const [contact, setContact] = useState({
    business_name: "AM Interior's",
    tagline: 'Designing Spaces That Inspire',
    phone1: '+91 8308 882977',
    phone2: '+91 7057 266506',
    email: 'AMinteriors.2420@gmail.com',
    address: 'Laxmi Terrace, 4th Floor, Flat No.8, Jawalkarnagar, Karvenagar, Pune 411052',
  })

  const [social, setSocial] = useState({
    instagram: 'https://instagram.com/aminteriors',
    linkedin:  '',
    pinterest: '',
    youtube:   '',
    whatsapp:  '919308882977',
  })

  const [hero, setHero] = useState({
    heading1: 'Designing Spaces',
    heading2: 'That Inspire',
    subtext:  'Luxury interiors tailored to your lifestyle — by Anita Acharya & Monika Gurav',
  })

  const [activeTab, setActiveTab] = useState('contact')

  const save = (section) => {
    showToast(`${section} settings saved!`)
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Site Settings</h1>
          <p className="admin-page-sub">Manage your website content and contact information</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="settings-tabs">
        {[
          { id:'contact', label:'Contact Info',  icon:'📞' },
          { id:'social',  label:'Social Links',  icon:'🔗' },
          { id:'hero',    label:'Hero Text',      icon:'🏠' },
          { id:'danger',  label:'Advanced',       icon:'⚙'  },
        ].map(t => (
          <button key={t.id}
            className={`settings-tab ${activeTab===t.id?'settings-tab--active':''}`}
            onClick={()=>setActiveTab(t.id)}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Contact Info */}
      {activeTab === 'contact' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">📞 Contact Information</span>
            <span style={{ fontSize:'0.72rem', color:'#aaa' }}>Shown in footer and contact page</span>
          </div>
          <div className="admin-card-body">
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.2rem' }}>
              <div className="admin-form-group">
                <label>Business Name</label>
                <input value={contact.business_name} onChange={e=>setContact({...contact,business_name:e.target.value})} />
              </div>
              <div className="admin-form-group">
                <label>Tagline</label>
                <input value={contact.tagline} onChange={e=>setContact({...contact,tagline:e.target.value})} />
              </div>
              <div className="admin-form-group">
                <label>Phone 1 (Anita)</label>
                <input value={contact.phone1} onChange={e=>setContact({...contact,phone1:e.target.value})} />
              </div>
              <div className="admin-form-group">
                <label>Phone 2 (Monika)</label>
                <input value={contact.phone2} onChange={e=>setContact({...contact,phone2:e.target.value})} />
              </div>
              <div className="admin-form-group">
                <label>Email</label>
                <input type="email" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})} />
              </div>
            </div>
            <div className="admin-form-group">
              <label>Full Address</label>
              <textarea value={contact.address} onChange={e=>setContact({...contact,address:e.target.value})} rows={2} />
            </div>
            <button className="btn-primary" onClick={() => save('Contact')}>Save Contact Info</button>
          </div>
        </div>
      )}

      {/* Social Links */}
      {activeTab === 'social' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">🔗 Social Media Links</span>
          </div>
          <div className="admin-card-body">
            {[
              { key:'instagram', label:'Instagram URL',  icon:'📷', placeholder:'https://instagram.com/yourpage' },
              { key:'linkedin',  label:'LinkedIn URL',   icon:'💼', placeholder:'https://linkedin.com/in/yourprofile' },
              { key:'pinterest', label:'Pinterest URL',  icon:'📌', placeholder:'https://pinterest.com/yourpage' },
              { key:'youtube',   label:'YouTube URL',    icon:'▶',  placeholder:'https://youtube.com/@yourchannel' },
              { key:'whatsapp',  label:'WhatsApp Number (digits only)', icon:'💬', placeholder:'919308882977' },
            ].map(s => (
              <div key={s.key} className="admin-form-group">
                <label>{s.icon} {s.label}</label>
                <input value={social[s.key]} placeholder={s.placeholder}
                  onChange={e=>setSocial({...social,[s.key]:e.target.value})} />
              </div>
            ))}
            <button className="btn-primary" onClick={() => save('Social links')}>Save Social Links</button>
          </div>
        </div>
      )}

      {/* Hero text */}
      {activeTab === 'hero' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">🏠 Hero Section Text</span>
            <span style={{ fontSize:'0.72rem', color:'#aaa' }}>Homepage hero heading & subtitle</span>
          </div>
          <div className="admin-card-body">
            <div className="admin-form-group">
              <label>Heading Line 1</label>
              <input value={hero.heading1} onChange={e=>setHero({...hero,heading1:e.target.value})} />
            </div>
            <div className="admin-form-group">
              <label>Heading Line 2 (teal italic)</label>
              <input value={hero.heading2} onChange={e=>setHero({...hero,heading2:e.target.value})} />
            </div>
            <div className="admin-form-group">
              <label>Sub Text</label>
              <textarea value={hero.subtext} onChange={e=>setHero({...hero,subtext:e.target.value})} rows={2} />
            </div>
            {/* Preview */}
            <div className="settings-hero-preview">
              <p style={{ fontSize:'0.6rem', color:'#aaa', marginBottom:'0.5rem', letterSpacing:'0.1em', textTransform:'uppercase' }}>Preview</p>
              <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.6rem', color:'#333' }}>{hero.heading1}</h2>
              <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.6rem', color:'#1CB4A6', fontStyle:'italic' }}>{hero.heading2}</h2>
              <p style={{ fontSize:'0.85rem', color:'#666', marginTop:'0.5rem' }}>{hero.subtext}</p>
            </div>
            <button className="btn-primary" style={{ marginTop:'1rem' }} onClick={() => save('Hero text')}>Save Hero Text</button>
          </div>
        </div>
      )}

      {/* Advanced/Danger */}
      {activeTab === 'danger' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">⚙ Advanced Settings</span>
          </div>
          <div className="admin-card-body">
            <div className="settings-danger-item">
              <div>
                <p className="settings-danger-title">Clear All Portfolio Projects</p>
                <p className="settings-danger-sub">Permanently removes all uploaded projects from the database</p>
              </div>
              <button className="btn-danger" onClick={() => { if(window.confirm('Are you sure? This cannot be undone!')) showToast('Feature requires backend confirmation', 'error') }}>
                Clear Projects
              </button>
            </div>
            <div className="settings-danger-item">
              <div>
                <p className="settings-danger-title">Export All Leads</p>
                <p className="settings-danger-sub">Download all client inquiries as a CSV file</p>
              </div>
              <button className="btn-secondary" onClick={() => showToast('Export feature coming soon')}>
                Export CSV
              </button>
            </div>
            <div className="settings-danger-item">
              <div>
                <p className="settings-danger-title">Admin Password</p>
                <p className="settings-danger-sub">Change your admin login password</p>
              </div>
              <button className="btn-secondary" onClick={() => showToast('Password change requires backend — use create_admin.js script')}>
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings